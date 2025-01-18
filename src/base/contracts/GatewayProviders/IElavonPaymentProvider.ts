/**
 * Interface {@link IElavonPaymentProvider} provides methods for payment processing with Elavon
 */
export interface IElavonPaymentProvider {
    requestToken(data: any): any;
};