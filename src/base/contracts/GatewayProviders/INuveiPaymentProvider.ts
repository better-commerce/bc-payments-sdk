/**
 * Interface {@link INuveiPaymentProvider} provides methods for payment processing with Nuvei
 */
export interface INuveiPaymentProvider {
    requestToken(data: any): any;
    getTransactionDetails(data: any): any;
    getGooglePayMerchantInfoJwt(data: any): any;
};