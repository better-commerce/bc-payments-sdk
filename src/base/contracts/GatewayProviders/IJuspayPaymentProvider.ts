export interface IJuspayPaymentProvider {
    getPaymentMethods(data: any): any;
    getCustomer(data: any): any;
}