import { SDKs } from "../../../../SDKs/lib";

export default interface IPayment {

    /**
     * Request a payment or payout. Sends a request for payment or payout.
     * @param data {IPaymentRequest}
     */
    request(data: SDKs.Checkout.Domain.Models.PaymentRequest): any;

    /**
     * Get payment details. Returns the details of the payment with the specified identifier string.
     * @param data {String}
     */
    getDetails(data: any): any;
}