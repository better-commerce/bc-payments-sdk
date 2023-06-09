// Model Imports
import { IPaymentProcessingData } from "../models/better-commerce/IPaymentProcessingData";

// Other Imports
import { Order } from "../modules/better-commerce/Order";
import { PaymentMethod } from "../modules/better-commerce/PaymentMethod";
import { PayPalPayment } from "../modules/payments/PayPalPayment";
import { CheckoutPayment } from "../modules/payments/CheckoutPayment";
import { Checkout } from "../modules/better-commerce/Checkout";
import { Defaults } from "../constants/constants";
import { ICommerceProvider } from "../base/contracts/ICommerceProvider";
import { PaymentStatus } from "../constants/enums/PaymentStatus";
import { Checkout as CheckoutGateway, Klarna as KlarnaGateway, PayPal as PayPalGateway, PaymentGateway, Stripe as StripeGateway, ClearPay as ClearPayGateway } from "../constants/enums/PaymentGateway";
import { StripePayment } from "../modules/payments/StripePayment";
import { OrderStatus } from "../constants/enums/OrderStatus";
import { KlarnaPayment } from "../modules/payments/KlarnaPayment";

/**
 * Class {BetterCommerceOperation} enacapsulates all generic BetterCommerce operations.
 */
export class BetterCommerceOperation implements ICommerceProvider {

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

        let orderModel: any;
        const isCancelled = data?.extras?.isCancelled ?? false;
        const gateway = data?.extras?.gateway || Defaults.String.Value;

        if (gateway) {
            let paymentGatewayOrderTxnId = "";

            // For PayPal, Checkout, Stripe, Klarna & ClearPay
            if (gateway?.toLowerCase() === PaymentGateway.PAYPAL?.toLowerCase() || gateway?.toLowerCase() === PaymentGateway.CHECKOUT?.toLowerCase() || gateway?.toLowerCase() === PaymentGateway.STRIPE?.toLowerCase() || gateway?.toLowerCase() === PaymentGateway.KLARNA?.toLowerCase() || gateway?.toLowerCase() === PaymentGateway.CLEAR_PAY?.toLowerCase()) {
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
                        };
                        paymentStatus = {
                            statusId: PaymentStatus.AUTHORIZED,
                        }
                    } else {

                        // Call gateway specific SDK API to get the order/payment status.
                        paymentStatus = await this.getPaymentStatus(gateway, paymentGatewayOrderTxnId);
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
                            paymentInfo1: "", // (pspInformation)
                            paymentInfo2: "", // (paymentIdentifier)
                            paymentInfo3: "", // (gateway i.e. Billdesk, Razorpay, etc)
                            paymentInfo4: null, // (cardType)
                            paymentInfo5: null, // (cardIssuer)
                            paymentInfo6: null, // (cardBrand)
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
                        };
                    }

                    if (orderModel) {
                        const paymentResponseInput = {
                            model: orderModel,
                            orderId: orderId,
                        };
                        const { result: paymentResponseResult } = await Checkout.updatePaymentResponse(paymentResponseInput, { cookies: data?.extras?.cookies });
                        if (paymentResponseResult) {
                            return isCancelled
                                ? PaymentStatus.DECLINED
                                : paymentResponseResult?.orderStatusCode === OrderStatus.APPROVED
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

            case PaymentGateway.PAYPAL?.toLowerCase():

                // Get PayPal payment details
                const paypalOrderDetails = await new PayPalPayment().getOrderDetails(data);
                if (paypalOrderDetails?.status === PayPalGateway.PaymentStatus.COMPLETED) {
                    statusId = PaymentStatus.PAID;
                }
                purchaseAmount = parseFloat(paypalOrderDetails?.purchase_units[0]?.amount?.value.toString());
                break;

            case PaymentGateway.CHECKOUT?.toLowerCase():

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

            case PaymentGateway.KLARNA?.toLowerCase():

                // Get Klarna payment details
                const klarnaOrderDetails = await new KlarnaPayment().getOrderDetails(data);
                if (klarnaOrderDetails?.status?.toLowerCase() === KlarnaGateway.PaymentStatus.AUTHORIZED?.toLowerCase() || klarnaOrderDetails?.status?.toLowerCase() === KlarnaGateway.PaymentStatus.CAPTURED?.toLowerCase()) {
                    statusId = PaymentStatus.PAID;
                }
                purchaseAmount = parseFloat(klarnaOrderDetails?.order_amount.toString()) / 100.0;
                break;

            case PaymentGateway.STRIPE?.toLowerCase():

                // Get Stripe payment details
                const stripeOrderDetails = await new StripePayment().getOrderDetails(data);
                if (stripeOrderDetails?.status?.toLowerCase() === StripeGateway.PaymentStatus.SUCCEEDED?.toLowerCase()) {
                    statusId = PaymentStatus.PAID;
                }
                purchaseAmount = parseFloat(stripeOrderDetails?.amount_received.toString()) / 100.0;
                break;

            case PaymentGateway.CLEAR_PAY?.toLowerCase():

                // Get ClearPay payment details
                const clearPayOrderDetails = await new StripePayment().getOrderDetails(data);
                if (clearPayOrderDetails?.status?.toLowerCase() === ClearPayGateway.PaymentStatus.APPROVED?.toLowerCase()) {
                    statusId = PaymentStatus.PAID;
                } else {
                    statusId = PaymentStatus.DECLINED;
                }
                purchaseAmount = parseFloat(clearPayOrderDetails?.originalAmount?.amount?.toString());
                break;
        }

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