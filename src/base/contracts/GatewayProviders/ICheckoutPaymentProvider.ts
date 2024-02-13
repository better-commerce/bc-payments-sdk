export interface ICheckoutPaymentProvider {
    requestToken(data: any): any;
    createPaymentContext(data: any): any;
    getPaymentContext(data: any): any;
    createSession(data: any): any;
};