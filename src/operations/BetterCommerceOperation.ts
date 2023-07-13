// Model Imports
import { IPaymentProcessingData } from "../models/better-commerce/IPaymentProcessingData";

// Other Imports
import { B2B } from "../modules/better-commerce/B2B";
import { Order } from "../modules/better-commerce/Order";
import { PaymentMethod } from "../modules/better-commerce/PaymentMethod";
import { PayPalPayment } from "../modules/payments/PayPalPayment";
import { CheckoutPayment } from "../modules/payments/CheckoutPayment";
import { Checkout } from "../modules/better-commerce/Checkout";
import { Defaults } from "../constants/constants";
import { ICommerceProvider } from "../base/contracts/ICommerceProvider";
import { PaymentStatus } from "../constants/enums/PaymentStatus";
import { PaymentMethodType } from "../constants/enums/PaymentMethodType";
import { Checkout as CheckoutGateway, Klarna as KlarnaGateway, PayPal as PayPalGateway, Stripe as StripeGateway, ClearPay as ClearPayGateway } from "../constants/enums/PaymentStatus";
import { StripePayment } from "../modules/payments/StripePayment";
import { OrderStatus } from "../constants/enums/OrderStatus";
import { KlarnaPayment } from "../modules/payments/KlarnaPayment";
import { ClearPayPayment } from "../modules/payments/ClearPayPament";
import { IPaymentInfo } from "../models/better-commerce/IPaymentInfo";

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
     * Converts the list of items in a basket to an order on the CommerceHub plaform.
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
                        const { result: paymentResponseResult } = await Checkout.updatePaymentResponse(paymentResponseInput, { cookies: data?.extras?.cookies });
                        if (paymentResponseResult) {

                            // Get order details
                            const { result: orderResultPostPaymentResponse }: any = await Order.get(orderId, { cookies: data?.extras?.cookies });
                            console.log("orderResultPostPaymentResponse", orderResultPostPaymentResponse);

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
        return null;
    }

    private async getPaymentStatus(gateway: string, data: any): Promise<{ statusId: number, purchaseAmount: number }> {
        let purchaseAmount = 0;
        let statusId = PaymentStatus.PENDING;

        switch (gateway?.toLowerCase()) {

            case PaymentMethodType.PAYPAL?.toLowerCase():

                // Get PayPal payment details
                const paypalOrderDetails = await new PayPalPayment().getOrderDetails(data);
                if (paypalOrderDetails?.status === PayPalGateway.PaymentStatus.COMPLETED) {
                    statusId = PaymentStatus.PAID;
                }
                purchaseAmount = parseFloat(paypalOrderDetails?.purchase_units[0]?.amount?.value.toString());
                break;

            case PaymentMethodType.CHECKOUT?.toLowerCase():

                // Get Checkout payment details
                const checkoutOrderDetails = await new CheckoutPayment().getOrderDetails(data);
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
                const klarnaOrderDetails = await new KlarnaPayment().getOrderDetails(data);
                if (klarnaOrderDetails?.status?.toLowerCase() === KlarnaGateway.PaymentStatus.AUTHORIZED?.toLowerCase() || klarnaOrderDetails?.status?.toLowerCase() === KlarnaGateway.PaymentStatus.CAPTURED?.toLowerCase()) {
                    statusId = PaymentStatus.PAID;
                }
                purchaseAmount = parseFloat(klarnaOrderDetails?.order_amount.toString()) / 100.0;
                break;

            case PaymentMethodType.STRIPE?.toLowerCase():

                // Get Stripe payment details
                const stripeOrderDetails = await new StripePayment().getOrderDetails(data);
                if (stripeOrderDetails?.status?.toLowerCase() === StripeGateway.PaymentStatus.SUCCEEDED?.toLowerCase()) {
                    statusId = PaymentStatus.PAID;
                }
                purchaseAmount = parseFloat(stripeOrderDetails?.amount_received.toString()) / 100.0;
                break;

            case PaymentMethodType.CLEAR_PAY?.toLowerCase():

                // Get ClearPay payment details
                const clearPayOrderDetails = await new ClearPayPayment().getOrderDetails(data);
                if (clearPayOrderDetails?.status?.toLowerCase() === ClearPayGateway.PaymentStatus.APPROVED?.toLowerCase()) {
                    statusId = PaymentStatus.PAID;
                } else {
                    statusId = PaymentStatus.DECLINED;
                }
                purchaseAmount = parseFloat(clearPayOrderDetails?.originalAmount?.amount?.toString());
                break;
        }
        console.log("payment status", { statusId, purchaseAmount });
        return { statusId, purchaseAmount };
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
}