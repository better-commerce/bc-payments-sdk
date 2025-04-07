export default interface IPaymentContext {

    /**
     * Request a Payment Context. Send an Payment Context request.
     * @param data {Object}
     */
    request(data: any): any;

    /**
     * Get Payment Context details. Returns all the Payment Context details.
     * @param data {String}
     */
    getDetails(data: any): any;
}