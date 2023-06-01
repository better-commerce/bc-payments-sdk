export interface IPaymentProvider {
    requestPayment(data: any);
    getOrderDetails(data: any): any;
}