// Model Imports
import { IPaymentProcessingData } from "../models/better-commerce/IPaymentProcessingData";
import { IPaymentHookProcessingData } from "../models/better-commerce/IPaymentHookProcessingData";

// Other Imports
import { B2B } from "../modules/better-commerce/B2B";
import { Order } from "../modules/better-commerce/Order";
import { PaymentMethod } from "../modules/better-commerce/PaymentMethod";
import { PayPalPayment } from "../modules/payments/PayPalPayment";
import { CheckoutPayment } from "../modules/payments/CheckoutPayment";
import { Checkout } from "../modules/better-commerce/Checkout";
import { Defaults, PaymentTransactionStatus } from "../constants/constants";
import { ICommerceProvider } from "../base/contracts/ICommerceProvider";
import { PaymentStatus } from "../constants/enums/PaymentStatus";
import { PaymentMethodType } from "../constants/enums/PaymentMethodType";
import { Checkout as CheckoutGateway, Klarna as KlarnaGateway, PayPal as PayPalGateway, Stripe as StripeGateway, ClearPay as ClearPayGateway } from "../constants/enums/PaymentStatus";
import { StripePayment } from "../modules/payments/StripePayment";
import { OrderStatus } from "../constants/enums/OrderStatus";
import { KlarnaPayment } from "../modules/payments/KlarnaPayment";
import { ClearPayPayment } from "../modules/payments/ClearPayPament";
import { IPaymentInfo } from "../models/better-commerce/IPaymentInfo";
import { PaymentMethodTypeId } from "../constants";
import { PaymentOrderStatus } from "../constants/enums";
import { matchStrings, stringToBoolean } from "../utils/parse-util";
import { getAuthCode, getCardBrand, getCardIssuer, getCardType, getIsSavePSPInfo, getOrderNo, getPSPGatewayInfo, getPSPInfo, getPSPResponseMsg, getPaymentIdentifier, getPaymentNo, getPaymentTransactionOrderId, getPaymentTransactionStatus, getSignature } from "../utils/payment-util";

/**
 * Class {BetterCommerceOperation} enacapsulates all generic BetterCommerce operations.
 */
export class BetterCommerceOperation implements ICommerceProvider {

    /**
     * Get the company details by UserId.
     * API Reference - https://api20.bettercommerce.io/swagger/ui/index#!/B2B/B2BGetCompanyDetailByUserId
     * @param data 
     */
    async getCompanyDetails(data: any) {
        const companyDetailsResult = await B2B.getCompanyDetailsByUserId(data, { cookies: data?.extras?.cookies });
        return companyDetailsResult;
    }

    /**
     * Converts the list of items in a basket to an order on the CommerceHub platform.
     * @param data 
     */
    async convertOrder(data: any): Promise<any> {
        const createOrderResult = await Checkout.convertOrder(data, { cookies: data?.extras?.cookies });
        return createOrderResult;
    }

    /**
     * Processes the response received from the payment gateway provider for the payment transaction to update the payment response statues on the CommerceHub platform.
     * @param data 
     * @returns 
     */
    async processPayment(data: IPaymentProcessingData): Promise<any> {
        try {
            const getPaymentInfoPayload = (paymentInfo: IPaymentInfo) => {

                /* ******
                    Info
                   ******
                   paymentInfo1 is for [pspInformation[]
                   paymentInfo2 is for [paymentIdentifier]
                   paymentInfo3 is for gateway type i.e. Billdesk, Razorpay, etc
                   paymentInfo4 is for [cardType]
                   paymentInfo5 is for [cardIssuer]
                   paymentInfo6 is for [cardBrand]
                   paymentInfo7 is for [chequeNumber]
                   paymentInfo8 is untilized
                */

                let info: any = {}
                if (paymentInfo?.paymentInfo1) {
                    info = {
                        ...info,
                        paymentInfo1: paymentInfo?.paymentInfo1
                    }
                }
                if (paymentInfo?.paymentInfo2) {
                    info = {
                        ...info,
                        paymentInfo2: paymentInfo?.paymentInfo2
                    }
                }
                if (paymentInfo?.paymentInfo3) {
                    info = {
                        ...info,
                        paymentInfo3: paymentInfo?.paymentInfo3
                    }
                }
                if (paymentInfo?.paymentInfo4) {
                    info = {
                        ...info,
                        paymentInfo4: paymentInfo?.paymentInfo4
                    }
                }
                if (paymentInfo?.paymentInfo5) {
                    info = {
                        ...info,
                        paymentInfo5: paymentInfo?.paymentInfo5
                    }
                }
                if (paymentInfo?.paymentInfo6) {
                    info = {
                        ...info,
                        paymentInfo6: paymentInfo?.paymentInfo6
                    }
                }
                if (paymentInfo?.paymentInfo7) {
                    info = {
                        ...info,
                        paymentInfo7: paymentInfo?.paymentInfo7
                    }
                }
                if (paymentInfo?.paymentInfo8) {
                    info = {
                        ...info,
                        paymentInfo8: paymentInfo?.paymentInfo8
                    }
                }
                return info
            }

            let orderModel: any;
            const isCancelled = data?.extras?.isCancelled ?? false;
            const gateway = data?.extras?.gateway || Defaults.String.Value;

            if (gateway) {
                let paymentGatewayOrderTxnId = "";

                // For PayPal, Checkout, Stripe, Klarna & ClearPay
                if (gateway?.toLowerCase() === PaymentMethodType.PAYPAL?.toLowerCase() || gateway?.toLowerCase() === PaymentMethodType.CHECKOUT?.toLowerCase() || gateway?.toLowerCase() === PaymentMethodType.STRIPE?.toLowerCase() || gateway?.toLowerCase() === PaymentMethodType.KLARNA?.toLowerCase() || gateway?.toLowerCase() === PaymentMethodType.CLEAR_PAY?.toLowerCase()) {
                    paymentGatewayOrderTxnId = data?.extras?.orderId;
                }

                const paymentMethod = await this.getPaymentMethod(gateway, { cookies: data?.extras?.cookies });
                if (paymentMethod) {
                    const additionalServiceCharge = paymentMethod?.settings?.length
                        ? paymentMethod?.settings?.find((x: any) => x?.key === "AdditionalServiceCharge")?.value || "0"
                        : "0";

                    const { isCOD, orderId, txnOrderId, bankOfferDetails } = data;
                    const { result: orderResult }: any = await Order.get(orderId, { cookies: data?.extras?.cookies });
                    const { headers, cookies, ...rest } = data?.extras;
                    if (orderResult) {
                        let paymentStatus: any;
                        const orderAmount = orderResult?.grandTotal?.raw?.withTax || 0;

                        // If this is COD order.
                        if (isCOD) {
                            orderModel = {
                                id: txnOrderId?.split('-')[1],
                                cardNo: null,
                                orderNo: parseInt(txnOrderId?.split('-')[0]),
                                orderAmount: orderAmount,
                                paidAmount: 0.0,
                                balanceAmount: orderAmount,
                                isValid: true,
                                status: !isCancelled
                                    ? PaymentStatus.AUTHORIZED
                                    : PaymentStatus.DECLINED,
                                authCode: null,
                                issuerUrl: null,
                                paRequest: null,
                                pspSessionCookie: null,
                                pspResponseCode: null,
                                pspResponseMessage: null,
                                paymentGatewayId: paymentMethod?.id,
                                paymentGateway: paymentMethod?.systemName,
                                token: null,
                                payerId: null,
                                cvcResult: null,
                                avsResult: null,
                                secure3DResult: null,
                                cardHolderName: null,
                                issuerCountry: null,
                                info1: '',
                                fraudScore: null,
                                paymentMethod: gateway,
                                cardType: null,
                                operatorId: null,
                                refStoreId: null,
                                tillNumber: null,
                                externalRefNo: null,
                                expiryYear: null,
                                expiryMonth: null,
                                isMoto: true,
                                upFrontPayment: false,
                                upFrontAmount: '0.00',
                                upFrontTerm: '76245369',
                                isPrePaid: false,
                                additionalServiceCharge: additionalServiceCharge,
                                ...{ ...getPaymentInfoPayload(data?.extras?.paymentInfo) },
                            };
                            paymentStatus = {
                                statusId: PaymentStatus.AUTHORIZED,
                            }
                        } else {

                            if (gateway?.toLowerCase() === PaymentMethodType.ACCOUNT_CREDIT?.toLowerCase()) {
                                paymentStatus = {
                                    statusId: PaymentStatus.PAID,
                                    purchaseAmount: orderAmount
                                }
                            } else if (gateway?.toLowerCase() === PaymentMethodType.CHEQUE?.toLowerCase()) {
                                paymentStatus = {
                                    statusId: PaymentStatus.AUTHORIZED,
                                    purchaseAmount: orderAmount
                                }
                            } else {

                                // Call gateway specific SDK API to get the order/payment status.
                                paymentStatus = await this.getPaymentStatus(gateway, paymentGatewayOrderTxnId);
                            }

                            orderModel = {
                                id: txnOrderId?.split('-')[1],
                                cardNo: null,
                                orderNo: parseInt(txnOrderId?.split('-')[0]),
                                orderAmount: orderAmount,
                                paidAmount: !isCancelled
                                    ? paymentStatus?.purchaseAmount
                                    : 0,
                                balanceAmount: '0.00',
                                isValid: true,
                                status: !isCancelled
                                    ? paymentStatus?.statusId
                                    : PaymentStatus.DECLINED,
                                authCode: !isCancelled
                                    ? paymentGatewayOrderTxnId
                                    : null,
                                issuerUrl: null,
                                paRequest: null,
                                pspSessionCookie: JSON.stringify({ ...rest }),
                                pspResponseCode: null,
                                pspResponseMessage: null,
                                paymentGatewayId: paymentMethod?.id,
                                paymentGateway: paymentMethod?.systemName,
                                token: null,
                                payerId: null,
                                cvcResult: null,
                                avsResult: null,
                                secure3DResult: null,
                                cardHolderName: null,
                                issuerCountry: null,
                                info1: '',
                                fraudScore: null,
                                paymentMethod: gateway,
                                cardType: null,
                                operatorId: null,
                                refStoreId: null,
                                tillNumber: null,
                                externalRefNo: null,
                                expiryYear: null,
                                expiryMonth: null,
                                isMoto: false,
                                upFrontPayment: false,
                                upFrontAmount: '0.00',
                                isPrePaid: !isCOD,

                                discountedTotal: bankOfferDetails?.discountedTotal ?? 0,
                                externalPromoCode: bankOfferDetails?.voucherCode ?? null,
                                externalVoucher: bankOfferDetails?.voucherCode
                                    ? {
                                        code: bankOfferDetails?.offerCode,
                                        additionalInfo1: bankOfferDetails?.value,
                                        additionalInfo2: bankOfferDetails?.status,
                                    }
                                    : null,
                                ...{ ...getPaymentInfoPayload(data?.extras?.paymentInfo) }
                            };
                        }

                        if (orderModel) {
                            const paymentResponseInput = {
                                model: orderModel,
                                orderId: orderId,
                            };
                            //console.log('---- paymentResponseInput ----', JSON.stringify(paymentResponseInput))
                            const { result: paymentResponseResult } = await Checkout.updatePaymentResponse(paymentResponseInput, { cookies: data?.extras?.cookies });
                            if (paymentResponseResult) {

                                // Get order details
                                const { result: orderResultPostPaymentResponse }: any = await Order.get(orderId, { cookies: data?.extras?.cookies });
                                console.log("---- orderResultPostPaymentResponse ----", orderResultPostPaymentResponse);

                                return isCancelled
                                    ? PaymentStatus.DECLINED
                                    : (orderResultPostPaymentResponse?.id && orderResultPostPaymentResponse?.orderStatusCode === OrderStatus.APPROVED)
                                        ? PaymentStatus.PAID
                                        : PaymentStatus.PENDING; //paymentStatus?.statusId
                            }

                        }
                    }
                }
            }
        } catch (error: any) {
            return { hasError: true, error };
        }
        return null;
    }

    async processPaymentHook(data: IPaymentHookProcessingData): Promise<any> {
        let paymentNo, orderNo;
        let paymentGatewayOrderTxnId = Defaults.String.Value;
        const { paymentMethodTypeId, paymentMethodType, data: hookData } = data

        // Read transaction type from the incoming hook data.
        const paymentTransactionStatus = getPaymentTransactionStatus(paymentMethodTypeId, hookData);
        console.log('--- paymentTransactionStatus ---', paymentTransactionStatus)

        // If web hook transaction is applicable for further processing.
        if (paymentTransactionStatus.toLowerCase() !== PaymentTransactionStatus.NONE) {
            let orderId;
            if (paymentMethodTypeId === PaymentMethodTypeId.PAYPAL) {
                const details: string = await getPaymentTransactionOrderId(paymentMethodTypeId, hookData);
                console.log('--- details ---', details)
                if (details) {
                    orderId = details?.split(',')[0];
                    orderNo = details?.split(',')[0];
                    paymentNo = details?.split(',')[1];
                }
            } else {
                orderId = await getPaymentTransactionOrderId(paymentMethodTypeId, hookData);
            }

            console.log('--- orderId ---', orderId)

            if (orderId != Defaults.Guid.Value) {
                const { result: orderResult }: any = await Order.get(orderId, { cookies: Defaults.Object.Value });
                console.log('--- orderResult ---', orderResult)
                if (orderResult?.id && orderResult?.id != Defaults.Guid.Value) {

                    if (paymentMethodTypeId === PaymentMethodTypeId.CHECKOUT) {
                        paymentGatewayOrderTxnId = hookData?.data?.id;
                    } else if (paymentMethodTypeId === PaymentMethodTypeId.PAYPAL) {
                        paymentGatewayOrderTxnId = hookData?.resource?.supplementary_data?.related_ids?.order_id;
                    }
                    console.log('--- paymentGatewayOrderTxnId ---', paymentGatewayOrderTxnId)

                    const payments = orderResult?.payments;
                    if (payments?.length) {

                        // Call gateway specific SDK API to get the order/payment status.
                        const paymentStatus = await this.getPaymentStatus(paymentMethodType, paymentGatewayOrderTxnId, true);
                        console.log('--- paymentStatus ---', paymentStatus)

                        if (paymentMethodTypeId !== PaymentMethodTypeId.PAYPAL) {
                            paymentNo = getPaymentNo(paymentMethodTypeId, paymentStatus?.orderDetails);
                        }
                        console.log('--- paymentNo ---', paymentNo)

                        if (paymentTransactionStatus.toLowerCase() === PaymentTransactionStatus.ORDER_REFUNDED.toLowerCase()) {
                            // Order Refunded

                        } else {

                            const processTxn = (paymentTransactionStatus.toLowerCase() === PaymentTransactionStatus.TXN_CHARGED.toLowerCase() || paymentTransactionStatus.toLowerCase() === PaymentTransactionStatus.TXN_FAILED.toLowerCase())
                            let statusId = PaymentOrderStatus.DECLINED
                            const payment = payments?.find(
                                (x: any) =>
                                    x?.id == paymentNo &&
                                    x?.status == PaymentOrderStatus.PENDING
                            );

                            if (payment && processTxn /*&& paymentStatus?.statusId === PaymentStatus.PENDING*/) {
                                let result = Defaults.Object.Value;
                                const orderValue = paymentStatus?.purchaseAmount;
                                const paymentStatusId: number = paymentStatus?.statusId
                                if (paymentStatusId === PaymentStatus.PAID) {
                                    console.log('--- SuccessUpdate ---')
                                    result = await this.paymentHookOrderSuccessUpdate(
                                        paymentMethodType,
                                        paymentMethodTypeId,
                                        orderId,
                                        paymentStatus?.orderDetails,
                                        statusId,
                                        orderValue,
                                        orderResult,
                                        {
                                            paymentNo,
                                            orderNo,
                                            hookData,
                                        }
                                    )
                                } else if (paymentStatusId == PaymentStatus.DECLINED) {
                                    console.log('--- FailureUpdate ---')
                                    result = await this.paymentHookOrderFailureUpdate(
                                        paymentMethodType,
                                        paymentMethodTypeId,
                                        orderId,
                                        paymentStatus?.orderDetails,
                                        statusId,
                                        orderValue,
                                        orderResult,
                                        {
                                            paymentNo,
                                            orderNo,
                                            hookData,
                                        }
                                    )
                                }
                                return result;
                            }
                        }
                    }
                }

            }
        }
        return null;
    }

    private async getPaymentStatus(gateway: string, data: any, returnOrderDetails = false): Promise<{ statusId: number, purchaseAmount: number, orderDetails?: any }> {
        let orderDetails: any = Defaults.Object.Value;
        let purchaseAmount = 0;
        let statusId = PaymentStatus.PENDING;

        switch (gateway?.toLowerCase()) {

            case PaymentMethodType.PAYPAL?.toLowerCase():

                // Get PayPal payment details
                const paypalOrderDetails = orderDetails = await new PayPalPayment().getOrderDetails(data);
                if (paypalOrderDetails?.status === PayPalGateway.PaymentStatus.COMPLETED) {
                    statusId = PaymentStatus.PAID;
                }
                purchaseAmount = parseFloat(paypalOrderDetails?.purchase_units[0]?.amount?.value.toString());
                break;

            case PaymentMethodType.CHECKOUT?.toLowerCase():

                // Get Checkout payment details
                const checkoutOrderDetails = orderDetails = await new CheckoutPayment().getOrderDetails(data);
                if (checkoutOrderDetails?.approved || checkoutOrderDetails?.status === CheckoutGateway.PaymentStatus.PAID) {
                    statusId = PaymentStatus.PAID;
                } else {
                    if (checkoutOrderDetails?.status === CheckoutGateway.PaymentStatus.DECLINED || checkoutOrderDetails?.status === CheckoutGateway.PaymentStatus.CANCELED || checkoutOrderDetails?.status === CheckoutGateway.PaymentStatus.EXPIRED) {
                        statusId = PaymentStatus.DECLINED;
                    }
                }
                purchaseAmount = checkoutOrderDetails?.amount / 100.0;
                break;

            case PaymentMethodType.KLARNA?.toLowerCase():

                // Get Klarna payment details
                const klarnaOrderDetails = orderDetails = await new KlarnaPayment().getOrderDetails(data);
                if (klarnaOrderDetails?.status?.toLowerCase() === KlarnaGateway.PaymentStatus.AUTHORIZED?.toLowerCase() || klarnaOrderDetails?.status?.toLowerCase() === KlarnaGateway.PaymentStatus.CAPTURED?.toLowerCase()) {
                    statusId = PaymentStatus.PAID;
                }
                purchaseAmount = parseFloat(klarnaOrderDetails?.order_amount.toString()) / 100.0;
                break;

            case PaymentMethodType.STRIPE?.toLowerCase():

                // Get Stripe payment details
                const stripeOrderDetails = orderDetails = await new StripePayment().getOrderDetails(data);
                if (stripeOrderDetails?.status?.toLowerCase() === StripeGateway.PaymentStatus.SUCCEEDED?.toLowerCase()) {
                    statusId = PaymentStatus.PAID;
                }
                purchaseAmount = parseFloat(stripeOrderDetails?.amount_received.toString()) / 100.0;
                break;

            case PaymentMethodType.CLEAR_PAY?.toLowerCase():

                // Get ClearPay payment details
                const clearPayOrderDetails = orderDetails = await new ClearPayPayment().getOrderDetails(data);
                if (clearPayOrderDetails?.status?.toLowerCase() === ClearPayGateway.PaymentStatus.APPROVED?.toLowerCase()) {
                    statusId = PaymentStatus.PAID;
                } else {
                    statusId = PaymentStatus.DECLINED;
                }
                purchaseAmount = parseFloat(clearPayOrderDetails?.originalAmount?.amount?.toString());
                break;
        }
        console.log("payment status", { statusId, purchaseAmount });
        return { statusId, purchaseAmount, orderDetails: returnOrderDetails ? orderDetails : Defaults.Object.Value };
    }

    private async getPaymentMethod(gateway: string, { headers, cookies }: any): Promise<any> {

        const data = {
            countryCode: cookies?.Country,
            currencyCode: cookies?.Currency,
            basketId: cookies?.basketId,
        }
        const { result: paymentMethods }: any = await PaymentMethod.getAll(data, { headers, cookies });
        //console.log("paymentMethods", paymentMethods);
        if (paymentMethods?.length) {
            const paymentMethod = paymentMethods?.find((x: any) => x?.systemName?.toLowerCase() === gateway?.toLowerCase());
            return paymentMethod;
        }
        return null;
    }

    private async paymentHookOrderSuccessUpdate(methodName: string, methodId: number, orderId: string, order: any, statusId: number, orderValue: any, bcOrder: any, extras?: any) {

        if (bcOrder?.id && matchStrings(orderId, bcOrder?.id, true)) {
            const dbOrderAmount = bcOrder?.grandTotal?.raw?.withTax || 0

            if (dbOrderAmount > 0) {
                let savePspInfo = getIsSavePSPInfo(methodId, order);

                const orderModel = {
                    id: (methodId === PaymentMethodTypeId.PAYPAL) ? extras?.paymentNo : getPaymentNo(methodId, order),
                    cardNo: null,
                    orderNo: (methodId === PaymentMethodTypeId.PAYPAL) ? extras?.orderNo : getOrderNo(methodId, order),
                    orderAmount: dbOrderAmount,
                    paidAmount: orderValue,
                    balanceAmount: '0.00',
                    isValid: true,
                    status: PaymentOrderStatus.PAID,
                    authCode: getAuthCode(methodId, order),
                    issuerUrl: null,
                    paRequest: null,
                    pspSessionCookie: getSignature(methodId, order, extras?.hookData),
                    pspResponseCode: statusId,
                    pspResponseMessage: getPSPResponseMsg(methodId, order),
                    paymentGatewayId: methodId,
                    paymentGateway: methodName,
                    token: null,
                    payerId: null,
                    cvcResult: null,
                    avsResult: null,
                    secure3DResult: null,
                    cardHolderName: null,
                    issuerCountry: null,
                    info1: '',
                    fraudScore: null,
                    paymentMethod: methodName,
                    paymentInfo1: getPSPInfo(methodId, order), // (pspInformation)
                    paymentInfo2: savePspInfo ? getPaymentIdentifier(methodId, order) : null, // (paymentIdentifier)
                    paymentInfo3: getPSPGatewayInfo(methodId, order), // (pspGatewayInfo)
                    paymentInfo4: getCardType(methodId, order), // (cardType)
                    paymentInfo5: getCardIssuer(methodId, order), // (cardIssuer)
                    paymentInfo6: getCardBrand(methodId, order), // (cardBrand)
                    cardType: null,
                    operatorId: null,
                    refStoreId: null,
                    tillNumber: null,
                    externalRefNo: null,
                    expiryYear: null,
                    expiryMonth: null,
                    isMoto: false,
                    upFrontPayment: false,
                    upFrontAmount: '0.00',
                    isPrePaid: false,
                }

                const paymentResponseInput = {
                    model: orderModel,
                    orderId: orderId,
                };
                console.log('--- OrderSuccess paymentResponseInput ---', JSON.stringify(paymentResponseInput))
                const { result: paymentResponseResult } = await Checkout.updatePaymentResponse(paymentResponseInput, { cookies: {} });
                return paymentResponseResult;
            }
        }
        return null;
    }

    private async paymentHookOrderFailureUpdate(methodName: string, methodId: number, orderId: string, order: any, statusId: number, orderValue: any, bcOrder: any, extras?: any) {

        if (bcOrder?.id && matchStrings(orderId, bcOrder?.id, true)) {
            const orderAmount = bcOrder?.grandTotal?.raw?.withTax || 0

            if (orderAmount > 0) {
                let savePspInfo = getIsSavePSPInfo(methodId, order);

                const orderModel = {
                    id: (methodId === PaymentMethodTypeId.PAYPAL) ? extras?.paymentNo : getPaymentNo(methodId, order),
                    cardNo: null,
                    orderNo: (methodId === PaymentMethodTypeId.PAYPAL) ? extras?.orderNo : getOrderNo(methodId, order),
                    orderAmount: orderAmount,
                    paidAmount: 0,
                    balanceAmount: '0.00',
                    isValid: true,
                    status: statusId,
                    authCode: getAuthCode(methodId, order),
                    issuerUrl: null,
                    paRequest: null,
                    pspSessionCookie: getSignature(methodId, order, extras?.hookData),
                    pspResponseCode: statusId,
                    pspResponseMessage: getPSPResponseMsg(methodId, order),
                    paymentGatewayId: methodId,
                    paymentGateway: methodName,
                    token: null,
                    payerId: null,
                    cvcResult: null,
                    avsResult: null,
                    secure3DResult: null,
                    cardHolderName: null,
                    issuerCountry: null,
                    info1: '',
                    fraudScore: null,
                    paymentMethod: methodName,
                    paymentInfo1: getPSPInfo(methodId, order), // (pspInformation)
                    paymentInfo2: savePspInfo ? getPaymentIdentifier(methodId, order) : null, // (paymentIdentifier)
                    paymentInfo3: getPSPGatewayInfo(methodId, order), // (pspGatewayInfo)
                    paymentInfo4: getCardType(methodId, order), // (cardType)
                    paymentInfo5: getCardIssuer(methodId, order), // (cardIssuer)
                    paymentInfo6: getCardBrand(methodId, order), // (cardBrand)
                    cardType: null,
                    operatorId: null,
                    refStoreId: null,
                    tillNumber: null,
                    externalRefNo: null,
                    expiryYear: null,
                    expiryMonth: null,
                    isMoto: false,
                    upFrontPayment: false,
                    upFrontAmount: '0.00',
                    isPrePaid: false,
                }

                const paymentResponseInput = {
                    model: orderModel,
                    orderId: orderId,
                };
                console.log('--- OrderFailure paymentResponseInput ---', JSON.stringify(paymentResponseInput))
                const { result: paymentResponseResult } = await Checkout.updatePaymentResponse(paymentResponseInput, { cookies: {} });
                return paymentResponseResult;
            }
        }
        return null;
    }
}