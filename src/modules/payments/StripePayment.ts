// Package Imports
import { Payment } from "bc-stripe-sdk";

// Other Imports
import { IPaymentProvider } from "../../base/contracts/IPaymentProvider";
import { BasePaymentProvider } from "../../base/entity/BasePaymentProvider";

export class StripePayment extends BasePaymentProvider implements IPaymentProvider {

    /**
     * Create a PaymentIntent. Creates a PaymentIntent object.
     * API Reference - https://stripe.com/docs/api/payment_intents/create
     * @param data {Object}
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

    async requestPayment(data: any): Promise<any> {
        throw new Error("Method not implemented.");
    }

    /**
     * Retrieve a PaymentIntent. Retrieves the details of a PaymentIntent that has previously been created.
     * API Reference - https://stripe.com/docs/api/payment_intents/retrieve
     * @param data {String}
     * @returns 
     */
    async getOrderDetails(data: any): Promise<any> {
        try {
            if (super.initSDK()) {
                const orderDetailsResult = await new Payment().getDetails(data);
                return orderDetailsResult;
            }
            return null;
        }
        catch (error: any) {
            return { hasError: true, error: error?.message };
        }
    }
}