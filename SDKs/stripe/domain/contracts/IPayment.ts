export default interface IPayment {

    /**
     * Create a PaymentIntent. Creates a PaymentIntent object.
     * @param data {Object}
     */
    initIntent(data: any): any;

    /**
     * Retrieve a PaymentIntent. Retrieves the details of a PaymentIntent that has previously been created.
     * @param data {String}
     */
    getDetails(data: any): any;
}