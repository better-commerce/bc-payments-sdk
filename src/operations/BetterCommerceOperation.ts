// Model Imports
import { IPaymentProcessingData } from "../models/better-commerce/IPaymentProcessingData";
import { IPaymentHookProcessingData } from "../models/better-commerce/IPaymentHookProcessingData";

// Other Imports
import { Logger } from "../modules/better-commerce/Logger";
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
import { matchStrings } from "../utils/parse-util";
import { getAuthCode, getCardBrand, getCardIssuer, getCardType, getIsSavePSPInfo, getOrderNo, getPSPGatewayInfo, getPSPInfo, getPSPResponseMsg, getPaymentIdentifier, getPaymentNo, getPaymentTransactionOrderId, getPaymentTransactionStatus, getSignature } from "../utils/payment-util";

/**
 * Class {BetterCommerceOperation} is the main entry point for all the operations related to BetterCommerce.
 * It contains methods for getting order details, creating orders, updating orders, getting payment methods, processing payments and more.
 * @implements {ICommerceProvider}
 */
export class BetterCommerceOperation implements ICommerceProvider {

    /**
     * Retrieves the company details by user id. This method is used to get the company details which is linked to the user
     * API Reference - https://api20.bettercommerce.io/swagger/ui/index#!/B2B/B2BGetCompanyDetailByUserId
     * @param data - The data which contains the user id
     * @returns The company details
     */
    async getCompanyDetails(data: any) {
        const companyDetailsResult = await B2B.getCompanyDetailsByUserId(data, { cookies: data?.extras?.cookies });
        return companyDetailsResult;
    }

    /**
     * Converts a basket into an order on the CommerceHub platform.
     * API Reference - https://api20.bettercommerce.io/swagger/ui/index#!/Checkout/CheckoutConvertBasket
     * @param data - The data which contains the basket id
     * @returns The order details response from the CommerceHub platform
     */
    async convertOrder(data: any): Promise<any> {
        const createOrderResult = await Checkout.convertOrder(data, { cookies: data?.extras?.cookies });
        return createOrderResult;
    }

    
    /**
     * Processes a payment based on the provided payment data.
     * 
     * This method handles different payment gateways, including PayPal, Checkout,
     * Stripe, Klarna, and ClearPay. It retrieves payment method details, constructs
     * the order model with payment information, and updates the payment response.
     * The method also handles Cash on Delivery (COD) orders and different payment
     * statuses such as authorized, paid, declined, and pending.
     * 
     * @param data - The payment processing data, including order details, payment
     * method, extras, and more.
     * @returns A promise that resolves to the payment status or an error object
     * if an error occurs during the payment process.
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
                    info = { ...info, paymentInfo1: paymentInfo?.paymentInfo1 }
                }
                if (paymentInfo?.paymentInfo2) {
                    info = { ...info, paymentInfo2: paymentInfo?.paymentInfo2 }
                }
                if (paymentInfo?.paymentInfo3) {
                    info = { ...info, paymentInfo3: paymentInfo?.paymentInfo3 }
                }
                if (paymentInfo?.paymentInfo4) {
                    info = { ...info, paymentInfo4: paymentInfo?.paymentInfo4 }
                }
                if (paymentInfo?.paymentInfo5) {
                    info = { ...info, paymentInfo5: paymentInfo?.paymentInfo5 }
                }
                if (paymentInfo?.paymentInfo6) {
                    info = { ...info, paymentInfo6: paymentInfo?.paymentInfo6 }
                }
                if (paymentInfo?.paymentInfo7) {
                    info = { ...info, paymentInfo7: paymentInfo?.paymentInfo7 }
                }
                if (paymentInfo?.paymentInfo8) {
                    info = { ...info, paymentInfo8: paymentInfo?.paymentInfo8 }
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

                            if (gateway?.toLowerCase() === PaymentMethodType.ACCOUNT_CREDIT?.toLowerCase() || gateway?.toLowerCase() === PaymentMethodType.WALLET?.toLowerCase()) {
                                paymentStatus = { statusId: PaymentStatus.PAID, purchaseAmount: orderAmount }
                            } else if (gateway?.toLowerCase() === PaymentMethodType.CHEQUE?.toLowerCase()) {
                                paymentStatus = { statusId: PaymentStatus.AUTHORIZED, purchaseAmount: orderAmount }
                            } else {

                                // Call gateway specific SDK API to get the order/payment status.
                                paymentStatus = await this.getPaymentStatus(gateway, paymentGatewayOrderTxnId);
                            }

                            orderModel = {
                                id: txnOrderId?.split('-')[1],
                                cardNo: null,
                                orderNo: parseInt(txnOrderId?.split('-')[0]),
                                orderAmount: 0, // Always send orderAmount = 0
                                paidAmount: !isCancelled
                                    ? paymentStatus?.purchaseAmount
                                    : 0,
                                balanceAmount: '0.00',
                                isValid: true,
                                status: !isCancelled
                                    ? paymentStatus?.statusId
                                    : PaymentStatus.DECLINED,
                                authCode: !isCancelled
                                    ? (gateway?.toLowerCase() === PaymentMethodType.PAYPAL?.toLowerCase()) ? data?.extras?.token : paymentGatewayOrderTxnId
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
                            console.log('---- paymentResponseInput ----', JSON.stringify(paymentResponseInput))
                            await Logger.logPayment({ data: orderModel, message: `${gateway?.toLowerCase()} | UpdatePaymentResponse API20 Request` }, { headers: {}, cookies: {} })
                            const { result: paymentResponseResult } = await Checkout.updatePaymentResponse(paymentResponseInput, { cookies: data?.extras?.cookies });
                            if (paymentResponseResult) {

                                await Logger.logPayment({ data: paymentResponseResult, message: `${gateway?.toLowerCase()} | UpdatePaymentResponse API20 Response` }, { headers: {}, cookies: {} })

                                // Get order details
                                const { result: orderResultPostPaymentResponse }: any = await Order.get(orderId, { cookies: data?.extras?.cookies });
                                console.log("---- orderResultPostPaymentResponse ----", orderResultPostPaymentResponse);

                                return isCancelled
                                    ? PaymentStatus.DECLINED
                                    : ((paymentStatus?.statusId === PaymentStatus.PAID || paymentStatus?.statusId === PaymentStatus.AUTHORIZED) || (orderResultPostPaymentResponse?.id && orderResultPostPaymentResponse?.orderStatusCode === OrderStatus.APPROVED))
                                        ? PaymentStatus.PAID
                                        : PaymentStatus.PENDING;
                                /*return isCancelled
                                    ? PaymentStatus.DECLINED
                                    : ((gateway?.toLowerCase() === PaymentMethodType.PAYPAL?.toLowerCase() && paymentStatus?.statusId === PaymentStatus.PAID) || (orderResultPostPaymentResponse?.id && orderResultPostPaymentResponse?.orderStatusCode === OrderStatus.APPROVED))
                                        ? PaymentStatus.PAID
                                        : PaymentStatus.PENDING;*/
                            }

                        }
                    }
                }
            }
        } catch (error: any) {
            await Logger.logPayment(error, { headers: {}, cookies: {} })
            return { hasError: true, error: error }
        }
        return null;
    }

    /**
     * Process the payment hook.
     * @param {IPaymentHookProcessingData} data The payment hook processing data.
     * @returns {Promise<any>} The promise of the processed payment hook result.
     */
    async processPaymentHook(data: IPaymentHookProcessingData): Promise<any> {
        try {
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
                        const paymentNoDetails = details?.split(',')[1];
                        if (paymentNoDetails && paymentNoDetails?.split('-')?.length) {
                            orderNo = paymentNoDetails?.split('-')[0];
                            paymentNo = paymentNoDetails?.split('-')[1];
                        }
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
                                let statusId = PaymentStatus.DECLINED
                                const payment = payments?.find(
                                    (x: any) =>
                                        x?.id == paymentNo &&
                                        x?.status == PaymentStatus.PENDING
                                );
                                console.log('--- payment ---', payment)

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
        } catch (error: any) {
            await Logger.logPayment(error, { headers: {}, cookies: {} })
            return { hasError: true, error: error }
        }
        return null;
    }

    /**
     * Retrieves the payment status for a given payment gateway and transaction data.
     * 
     * This method interacts with specific payment gateway SDKs to obtain the order or payment status.
     * It supports various payment gateways including PayPal, Checkout, Klarna, Stripe, and ClearPay.
     * The method determines the payment status based on the gateway-specific response and calculates
     * the purchase amount from the order details.
     * 
     * @param gateway - The name of the payment gateway used for the transaction.
     * @param data - The transaction data required to fetch the payment status from the gateway.
     * @param returnOrderDetails - Flag indicating whether to return order details in the response.
     * @returns A promise that resolves to an object containing the status ID, purchase amount, and
     * optionally the order details if `returnOrderDetails` is true.
     */
    private async getPaymentStatus(gateway: string, data: any, returnOrderDetails = false): Promise<{ statusId: number, purchaseAmount: number, orderDetails?: any }> {
        let orderDetails: any = Defaults.Object.Value;
        let purchaseAmount = 0;
        let statusId = PaymentStatus.PENDING;

        switch (gateway?.toLowerCase()) {

            case PaymentMethodType.PAYPAL?.toLowerCase():

                // Get PayPal payment details
                let paypalOrderDetails = orderDetails = await new PayPalPayment().getOrderDetails(data);

                try {
                    await Logger.logPayment({ data: paypalOrderDetails, message: `${gateway?.toLowerCase()} | GetPaymentStatus` }, { headers: {}, cookies: {} })
                } catch (error: any) {
                    // Bypass error incurred due to logging.
                }

                // Call get payment status once again if status received is uncaptured.
                if (!(paypalOrderDetails?.status === PayPalGateway.PaymentStatus.COMPLETED || paypalOrderDetails?.status === PayPalGateway.PaymentStatus.APPROVED || paypalOrderDetails?.status === PayPalGateway.PaymentStatus.VOIDED)) {
                    paypalOrderDetails = orderDetails = await new PayPalPayment().getOrderDetails(data);

                    try {
                        await Logger.logPayment({ data: paypalOrderDetails, message: `${gateway?.toLowerCase()} | GetPaymentStatus` }, { headers: {}, cookies: {} })
                    } catch (error: any) {
                        // Bypass error incurred due to logging.
                    }
                }

                if (paypalOrderDetails?.status === PayPalGateway.PaymentStatus.COMPLETED || paypalOrderDetails?.status === PayPalGateway.PaymentStatus.APPROVED) {
                    statusId = PaymentStatus.PAID;
                } else if (paypalOrderDetails?.status === PayPalGateway.PaymentStatus.VOIDED) {
                    statusId = PaymentStatus.DECLINED;
                }
                purchaseAmount = paypalOrderDetails?.purchase_units?.length
                    ? parseFloat(paypalOrderDetails?.purchase_units[0]?.amount?.value.toString() || Defaults.Int.Value.toString())
                    : Defaults.Int.Value;
                break;

            case PaymentMethodType.CHECKOUT?.toLowerCase():

                // Get Checkout payment details
                const checkoutOrderDetails = orderDetails = await new CheckoutPayment().getOrderDetails(data);

                try {
                    await Logger.logPayment({ data: checkoutOrderDetails, message: `${gateway?.toLowerCase()} | GetPaymentStatus` }, { headers: {}, cookies: {} })
                } catch (error: any) {
                    // Bypass error incurred due to logging.
                }

                if (checkoutOrderDetails?.approved || (checkoutOrderDetails?.status === CheckoutGateway.PaymentStatus.PAID || checkoutOrderDetails?.status === CheckoutGateway.PaymentStatus.CAPTURED)) {
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

                try {
                    await Logger.logPayment({ data: clearPayOrderDetails, message: `${gateway?.toLowerCase()} | GetPaymentStatus` }, { headers: {}, cookies: {} })
                } catch (error: any) {
                    // Bypass error incurred due to logging.
                }

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

    /**
     * Retrieves a payment method based on the provided gateway and headers/cookies.
     * 
     * @param gateway - The name of the payment gateway to retrieve the payment method for.
     * @param { headers, cookies } - The headers and cookies to use while retrieving the payment method.
     * @returns A promise that resolves to the retrieved payment method or null if the payment method could not be found.
     */
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

    /**
     * Updates the payment response in the database after a successful payment hook.
     * @param methodName - The name of the payment method.
     * @param methodId - The id of the payment method.
     * @param orderId - The id of the order.
     * @param order - The order object.
     * @param statusId - The id of the payment status.
     * @param orderValue - The value of the order.
     * @param bcOrder - The order object from the BC database.
     * @param extras - Additional data that may be required for updating the payment response.
     * @returns A promise that resolves to the updated payment response or null if the payment response could not be updated.
     */
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
                    status: PaymentStatus.PAID,
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
                await Logger.logPayment({ data: orderModel, message: `${methodName?.toLowerCase()} | UpdatePaymentWebhook | UpdatePaymentResponse API20 Request` }, { headers: {}, cookies: {} })
                console.log('--- OrderSuccess paymentResponseInput ---', JSON.stringify(paymentResponseInput))
                const { result: paymentResponseResult } = await Checkout.updatePaymentResponse(paymentResponseInput, { cookies: {} });
                return paymentResponseResult;
            }
        }
        return null;
    }

    /**
     * Handles the update of payment response in the case of a failed payment hook.
     * 
     * This method constructs the order model with payment information for a failed
     * payment and updates the payment response in the database. It checks if the
     * order ID matches with the BC order ID and processes the update if the order
     * amount is valid.
     * 
     * @param methodName - The name of the payment method.
     * @param methodId - The ID of the payment method.
     * @param orderId - The ID of the order.
     * @param order - The order object containing payment details.
     * @param statusId - The ID indicating the status of the payment.
     * @param orderValue - The value of the order.
     * @param bcOrder - The order object from the BC database.
     * @param extras - Additional data that may be required for updating the payment response.
     * @returns A promise that resolves to the updated payment response or null if the update could not be processed.
     */
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
                await Logger.logPayment({ data: orderModel, message: `${methodName?.toLowerCase()} | UpdatePaymentWebhook | UpdatePaymentResponse API20 Request` }, { headers: {}, cookies: {} })
                console.log('--- OrderFailure paymentResponseInput ---', JSON.stringify(paymentResponseInput))
                const { result: paymentResponseResult } = await Checkout.updatePaymentResponse(paymentResponseInput, { cookies: {} });
                return paymentResponseResult;
            }
        }
        return null;
    }
}