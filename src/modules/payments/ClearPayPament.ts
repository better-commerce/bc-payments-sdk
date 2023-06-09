// Package Imports
import { Payment } from "bc-clearpay-sdk";

// Other Imports
import { IPaymentProvider } from "../../base/contracts/IPaymentProvider";
import { BasePaymentProvider } from "../../base/entity/BasePaymentProvider";

export class ClearPayPayment extends BasePaymentProvider implements IPaymentProvider {

    /**
     * Initiate a payment. This endpoint creates a checkout that is used to initiate the Clearpay payment process. Clearpay uses the information in the order request to assist with the consumer’s pre-approval process.
     * API Reference - https://developers.clearpay.co.uk/clearpay-online/reference/create-checkout
     * @param data {IPaymentIntent}
     * @returns 
     */
    async initPaymentIntent(data: any): Promise<any> {
        try {
            if (super.initSDK()) {
                const intentResult = await new Payment().initIntent(data);
                return intentResult;
            }
            return null;
        }
        catch (error: any) {
            return { hasError: true, error: error?.message };
        }
    }

    /**
     * Capture Full Payment. This endpoint performs a payment capture for the full value of the payment plan.
     * API Reference - https://developers.clearpay.co.uk/clearpay-online/reference/capture-full-payment
     * @param data 
     */
    async requestPayment(data: any): Promise<any> {
        try {
            if (super.initSDK()) {
                const intentResult = await new Payment().requestPayment(data);
                return intentResult;
            }
            return null;
        }
        catch (error: any) {
            return { hasError: true, error: error?.message };
        }
    }

    /**
     * Get Payment By Order ID. This endpoint retrieves an individual payment along with its order details.
     * API Reference - https://developers.clearpay.co.uk/clearpay-online/reference/get-payment-by-order-id
     * @param data {String}
     * @returns 
     */
    async getOrderDetails(data: any): Promise<any> {
        try {
            if (super.initSDK()) {
                const payment = new Payment();
                const orderDetailsResult = await payment.getDetails(data);
                return orderDetailsResult;
            }
            return null;
        }
        catch (error: any) {
            return { hasError: true, error: error?.message };
        }
    }
}