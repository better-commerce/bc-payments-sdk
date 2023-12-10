export interface IPaymentHookProcessingData {
    readonly paymentMethodType: string;
    readonly paymentMethodTypeId: number;
    readonly data: any;
}