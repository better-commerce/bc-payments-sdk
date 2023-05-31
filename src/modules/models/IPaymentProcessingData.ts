export interface IPaymentProcessingData {
    readonly isCOD: boolean;
    readonly orderId: string;
    readonly txnOrderId: string;
    readonly bankOfferDetails: any;
    readonly extras: any;
}