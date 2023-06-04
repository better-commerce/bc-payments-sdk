export interface IPaymentProvider {
    initPaymentIntent(data: any);
    requestPayment(data: any);
    getOrderDetails(data: any): any;
}