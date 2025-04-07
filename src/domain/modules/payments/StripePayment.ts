// Other Imports
import { SDKs } from "../../../../SDKs/lib";
import { IPaymentProvider } from "../../contracts/IPaymentProvider";
import { BasePaymentProvider } from "../../../infrastructure/core/BasePaymentProvider";

/**
 * Class {StripePayment} extends {BasePaymentProvider} and implements {IPaymentProvider}.
 * It provides the concrete implementation of the Stripe payment provider.
 * 
 * @class StripePayment
 * @extends BasePaymentProvider
 * @implements IPaymentProvider
 * 
 * @remark
 * This class is responsible for initializing the Stripe SDK and providing the concrete 
 * implementation of the Stripe payment provider methods.
 */
export class StripePayment extends BasePaymentProvider implements IPaymentProvider {

    /**
     * Initializes a payment intent using the Stripe payment gateway.
     * 
     * This method initializes the SDK and attempts to create a payment intent
     * with the provided data. If successful, it returns the result of the intent
     * creation. If the SDK initialization fails, it returns null. In case of an 
     * error during the process, it returns an object containing the error details.
     * 
     * API Reference - https://stripe.com/docs/api/payment_intents/create
     * 
     * @param data - The payment intent data required by Stripe.
     * @returns A promise that resolves to the result of the payment intent creation
     *          or an object with error details if an error occurs.
     */
    async initPaymentIntent(data: any): Promise<any> {

        try {
            if (super.initSDK()) {
                const intentResult = await new SDKs.Stripe.Infra.Services.Payment().initIntent(data);
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
     * Retrieves the details of an order from Stripe.
     * 
     * This method attempts to retrieve the order details with the provided data.
     * If successful, it returns the result of the order details request.
     * If the SDK initialization fails, it returns null. In case of an 
     * error during the process, it returns an object containing the error details.
     * 
     * API Reference - https://stripe.com/docs/api/payment_intents/retrieve
     * 
     * @param data - The order ID required by Stripe.
     * @returns A promise that resolves to the result of the order details request
     *          or an object with error details if an error occurs.
     */
    async getOrderDetails(data: any): Promise<any> {
        try {
            if (super.initSDK()) {
                const orderDetailsResult = await new SDKs.Stripe.Infra.Services.Payment().getDetails(data);
                return orderDetailsResult;
            }
            return null;
        }
        catch (error: any) {
            return { hasError: true, error: error?.message };
        }
    }
}