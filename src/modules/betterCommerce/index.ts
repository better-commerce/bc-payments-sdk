// Model Imports
import { IPaymentProcessingData } from "./entity/IPaymentProcessingData";

// Other Imports
import { ICommerceProvider } from "../../base/contracts/ICommerceProvider";
import { Defaults } from "../../constants/constants";
import { PaymentMethod } from "./payment-method";
import { Order } from "./order";
import { PaymentOrderStatus } from "../../constants/enums/PaymentOrderStatus";
import { PayPal, PaymentGateway } from "../../constants/enums/PaymentGateway";
import { PayPalPayment } from "../payments/payPal";
import { PaymentResponse } from "./payment-response";

/**
 * Class {BCOperation}
 */
export class BCOperation implements ICommerceProvider {

    async processPayment(data: IPaymentProcessingData): Promise<any> {

        let orderModel: any;
        const isCancelled = data?.extras?.isCancelled ?? false;
        const gateway = data?.extras?.gateway || Defaults.String.Value;

        if (gateway) {
            let paymentGatewayOrderTxnId = "";
            if (gateway === PaymentGateway.PAYPAL) {
                paymentGatewayOrderTxnId = data?.extras?.orderId;
            }
            const paymentMethod = await this.getPaymentMethod(gateway, data?.extras?.cookies);
            if (paymentMethod) {
                const additionalServiceCharge = paymentMethod?.settings?.length
                    ? paymentMethod?.settings?.find((x: any) => x?.key === "AdditionalServiceCharge")?.value || "0"
                    : "0";

                const { isCOD, orderId, txnOrderId, bankOfferDetails } = data;
                const { result: orderResult }: any = Order.get(orderId);
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
                            pspSessionCookie: JSON.stringify(data?.extras),
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
                            paymentMethod: PaymentGateway.PAYPAL,
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
                            isPrePaid: false,

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
                        const { result: paymentResponseResult } = await PaymentResponse.put(paymentResponseInput);
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

                const orderDetails = await new PayPalPayment().getOrderDetails(data);
                if (orderDetails?.status === PayPal.PaymentOrderStatus.COMPLETED) {
                    statusId = PaymentOrderStatus.PAID;
                }
                purchaseAmount = parseFloat(orderDetails?.purchase_units?.amount?.value.toString());
                break;
        }

        return { statusId, purchaseAmount };
    }

    private async getPaymentMethod(gateway: string, cookies: any): Promise<any> {

        const data = {
            countryCode: cookies?.Country,
            currencyCode: cookies?.Currency,
            basketId: cookies?.basketId,
        }
        const { result: paymentMethods }: any = PaymentMethod.getAll(data);
        if (paymentMethods?.length) {
            const paymentMethod = paymentMethods?.find((x: any) => x?.displayName?.toLowerCase() === gateway?.toLowerCase());
            return paymentMethod;
        }
        return null;
    }
}