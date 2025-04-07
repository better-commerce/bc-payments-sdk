import { SDKs } from "../../../../SDKs/lib";

export default interface IPayment {

    /**
     * Initiate a payment. This endpoint creates a checkout that is used to initiate the Clearpay payment process. Clearpay uses the information in the order request to assist with the consumer’s pre-approval process.
     * API Reference - https://developers.clearpay.co.uk/clearpay-online/reference/create-checkout
     * @param data {IPaymentIntent}
     */
    initIntent(data: SDKs.Clearpay.Domain.Models.IPaymentIntent): any;

    /**
     * Capture Full Payment. This endpoint performs a payment capture for the full value of the payment plan.
     * API Reference - https://developers.clearpay.co.uk/clearpay-online/reference/capture-full-payment
     * @param data 
     */
    requestPayment(data: any): any;

    /**
     * Get Payment By Order ID. This endpoint retrieves an individual payment along with its order details.
     * API Reference - https://developers.clearpay.co.uk/clearpay-online/reference/get-payment-by-order-id
     * @param data {String}
     * @returns 
     */
    getDetails(data: any): any;
}