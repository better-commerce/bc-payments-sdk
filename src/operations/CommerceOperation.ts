// Model Imports
import { IPaymentProcessingData } from "../models/better-commerce/IPaymentProcessingData";

// Other Imports
import { Order } from "../modules/better-commerce/Order";
import { PaymentMethod } from "../modules/better-commerce/PaymentMethod";
import { PayPalPayment } from "../modules/payments/PayPalPayment";
import { CheckoutPayment } from "../modules/payments/CheckoutPayment";
import { PaymentResponse } from "../modules/better-commerce/PaymentResponse";
import { Defaults } from "../constants/constants";
import { ICommerceProvider } from "../base/contracts/ICommerceProvider";
import { PaymentOrderStatus } from "../constants/enums/PaymentOrderStatus";
import { Checkout, PayPal, PaymentGateway } from "../constants/enums/PaymentGateway";

/**
 * Class {BCOperation}
 */
export class CommerceOperation implements ICommerceProvider {

    async processPayment(data: IPaymentProcessingData): Promise<any> {

        let orderModel: any;
        const isCancelled = data?.extras?.isCancelled ?? false;
        const gateway = data?.extras?.gateway || Defaults.String.Value;

        if (gateway) {
            let paymentGatewayOrderTxnId = "";
            if (gateway === PaymentGateway.PAYPAL || gateway === PaymentGateway.CHECKOUT) {
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
                                ? PaymentOrderStatus.AUTHORIZED
                                : PaymentOrderStatus.DECLINED,
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
                            statusId: PaymentOrderStatus.AUTHORIZED,
                        }
                    } else {
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
                                : PaymentOrderStatus.DECLINED,
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
                        const { result: paymentResponseResult } = await PaymentResponse.put(paymentResponseInput, { cookies: data?.extras?.cookies });
                        if (paymentResponseResult) {
                            return isCancelled
                                ? PaymentOrderStatus.DECLINED
                                : paymentStatus?.statusId;
                        }

                    }
                }

            }
        }
        return null;
    }

    private async getPaymentStatus(gateway: string, data: any): Promise<{ statusId: number, purchaseAmount: number }> {
        let purchaseAmount = 0;
        let statusId = PaymentOrderStatus.PENDING;

        switch (gateway?.toLowerCase()) {

            case PaymentGateway.PAYPAL?.toLowerCase():

                const paypalOrderDetails = await new PayPalPayment().getOrderDetails(data);
                if (paypalOrderDetails?.status === PayPal.PaymentOrderStatus.COMPLETED) {
                    statusId = PaymentOrderStatus.PAID;
                }
                purchaseAmount = parseFloat(paypalOrderDetails?.purchase_units[0]?.amount?.value.toString());
                break;

            case PaymentGateway.CHECKOUT?.toLowerCase():

                const checkoutOrderDetails = await new CheckoutPayment().getOrderDetails(data);
                if (checkoutOrderDetails?.approved || checkoutOrderDetails?.status === Checkout.PaymentOrderStatus.PAID) {
                    statusId = PaymentOrderStatus.PAID;
                } else {
                    if (checkoutOrderDetails?.status === Checkout.PaymentOrderStatus.DECLINED || checkoutOrderDetails?.status === Checkout.PaymentOrderStatus.CANCELED || checkoutOrderDetails?.status === Checkout.PaymentOrderStatus.EXPIRED) {
                        statusId = PaymentOrderStatus.DECLINED;
                    }
                }
                purchaseAmount = checkoutOrderDetails?.amount / 100.0;
                break;

            case PaymentGateway.CLEAR_PAY?.toLowerCase():
                break;

            case PaymentGateway.KLARNA?.toLowerCase():
                break;

            case PaymentGateway.STRIPE?.toLowerCase():
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