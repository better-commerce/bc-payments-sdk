import { Domain } from "../../../../src"
import { SDKs } from "../../../../SDKs/lib"

/**
 * Class {Payment} implements the IPayment interface and provides a convenient interface for making payment-related API calls.
 * @implements IPayment
 */
export default class Payment implements SDKs.Clearpay.Domain.Contracts.IPayment {

    
    /**
     * Initiates a payment process by creating a checkout session.
     * This endpoint is used to start the Clearpay payment process, utilizing
     * the provided order information for consumer pre-approval.
     * 
     * API Reference - https://developers.clearpay.co.uk/clearpay-online/reference/create-checkout
     * 
     * @param data - The payment intent data containing order details
     * @returns A promise that resolves with the result of the checkout session creation, 
     *          or an error object if the request fails.
     */
    async initIntent(data: SDKs.Clearpay.Domain.Models.IPaymentIntent): Promise<any> {
        try {
            const paymentIntentResult = await SDKs.Clearpay.Infra.Core.API.call("v2/checkouts", Domain.Enums.RequestMethod.POST, data);
            return paymentIntentResult;
        } catch (error) {
            return { hasError: true, error: error };
        }
    }

    /**
     * Capture Full Payment. This endpoint performs a payment capture for the full value of the payment plan.
     * 
     * API Reference - https://developers.clearpay.co.uk/clearpay-online/reference/capture-full-payment
     * 
     * @param data - The payment capture data containing the checkout session token
     * @returns A promise that resolves with the result of the payment capture, or an error object if the request fails.
     */
    async requestPayment(data: any): Promise<any> {
        try {
            const paymentCaptureResult = await SDKs.Clearpay.Infra.Core.API.call("v2/payments/capture", Domain.Enums.RequestMethod.POST, data);
            return paymentCaptureResult;
        } catch (error) {
            return { hasError: true, error: error };
        }
    }

    
    /**
     * Get Payment By Order ID. This endpoint retrieves an individual payment along with its order details.
     * 
     * API Reference - https://developers.clearpay.co.uk/clearpay-online/reference/get-payment-by-order-id
     * 
     * @param data - The order ID
     * @returns A promise that resolves with the result of the get payment by order ID request, or an error object if the request fails.
     */
    async getDetails(data: any): Promise<any> {
        try {
            const orderResult = await SDKs.Clearpay.Infra.Core.API.call(`v2/payments/${data}`, Domain.Enums.RequestMethod.GET);
            return orderResult;
        } catch (error) {
            return { hasError: true, error: error };
        }
    }
}