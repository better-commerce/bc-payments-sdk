//import { IPaymentRequest } from "../../models/IPaymentRequest";

export default interface IPayment {

    validateSession(data: any): any;

    /**
     * Request a payment or payout. Sends a request for payment or payout.
     * @param data {IPaymentRequest}
     */
    //request(data: IPaymentRequest): any;

    /**
     * Get payment details. Returns the details of the payment with the specified identifier string.
     * @param data {String}
     */
    //getDetails(data: any): any;
}