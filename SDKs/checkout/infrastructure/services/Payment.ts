// Other Imports
import { Domain, Utils } from "../../../../src";
import { SDKs } from "../../../../SDKs/lib";

/**
 * Class representing a payment.
 * 
 * Provides methods to request a payment and retrieve the details of a payment.
 * 
 * @class Payment
 * @implements {IPayment}
 */
export default class Payment implements SDKs.Checkout.Domain.Contracts.IPayment {

    /**
     * Sends a payment request to the API.
     * The amount is sanitized before sending.
     * 
     * API Reference - https://api-reference.checkout.com/#operation/requestAPaymentOrPayout
     * 
     * @param data {IPaymentRequest} - The payment request data.
     * @returns A promise resolving to the payment request result or an error object.
     */
    async request(data: SDKs.Checkout.Domain.Models.PaymentRequest): Promise<any> {

        try {
            const paymentRequestResult = await SDKs.Checkout.Infra.Core.API.call(`payments`, Domain.Enums.RequestMethod.POST, { ...data, ...{ amount: Utils.AppUtil.sanitizeAmount(data?.amount) } });
            return paymentRequestResult;
        } catch (error) {
            return { hasError: true, error: error };
        }
    }

    
    /**
     * Retrieves the details of a payment from the API.
     * 
     * API Reference - https://api-reference.checkout.com/#operation/getPaymentDetails
     * 
     * @param data {String} - The payment id.
     * @returns A promise resolving to the payment details result or an error object.
     */
    async getDetails(data: any): Promise<any> {
        try {
            const paymentDetailsResult = await SDKs.Checkout.Infra.Core.API.call(`payments/${data}`, Domain.Enums.RequestMethod.GET);
            return paymentDetailsResult;
        } catch (error) {
            return { hasError: true, error: error };
        }
    }
}