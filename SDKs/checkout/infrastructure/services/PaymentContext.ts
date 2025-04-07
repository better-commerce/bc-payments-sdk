// Other Imports
import { SDKs } from "../../../../SDKs/lib";
import { Domain } from "../../../../src";

/**
 * Class representing a payment context.
 * 
 * A payment context is a request to the Checkout.com API to perform a payment.
 * The request includes the payment details and the processing channel id.
 * 
 * @class PaymentContext
 * @implements {IPaymentContext}
 */
export default class PaymentContext implements SDKs.Checkout.Domain.Contracts.IPaymentContext {

    /**
     * Sends a payment context request.
     * 
     * API Reference - https://api-reference.checkout.com/#tag/Payment-Context
     * 
     * @param data - The payment context data to be sent in the request.
     * @returns A promise that resolves with the response of the payment context request.
     *          If the request fails, the promise resolves with an error object.
     */
    async request(data: any): Promise<any> {

        try {
            const paymentContextRequestResult = await SDKs.Checkout.Infra.Core.API.call(`payment-contexts`, Domain.Enums.RequestMethod.POST, data);
            return paymentContextRequestResult;
        } catch (error) {
            return { hasError: true, error: error };
        }
    }

    /**
     * Gets the payment context details.
     * 
     * API Reference - https://api-reference.checkout.com/#operation/getPaymentContext
     * 
     * @param data - The payment context id to be used in the request.
     * @returns A promise that resolves with the response of the payment context details request.
     *          If the request fails, the promise resolves with an error object.
     */
    async getDetails(data: any): Promise<any> {

        try {
            const paymentDetailsResult = await SDKs.Checkout.Infra.Core.API.call(`payment-contexts/${data}`, Domain.Enums.RequestMethod.GET);
            return paymentDetailsResult;
        } catch (error) {
            return { hasError: true, error: error };
        }
    }
}