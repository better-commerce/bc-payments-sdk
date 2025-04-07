// Other Imports
import { SDKs } from "../../../../SDKs/lib";
import { IPaymentProvider } from "../../contracts/IPaymentProvider";
import { BasePaymentProvider } from "../../../infrastructure/core/BasePaymentProvider";

/**
 * Class {ClearPayPayment} is a concrete implementation of a payment provider.
 * It provides a set of methods that can be used to interact with the Clearpay payment gateway.
 * 
 * @class ClearPayPayment
 * @extends {BasePaymentProvider}
 * @implements {IPaymentProvider}
 */
export class ClearPayPayment extends BasePaymentProvider implements IPaymentProvider {

    /**
     * Initiates a payment intent using the Clearpay payment gateway.
     * 
     * This method initializes the SDK and attempts to create a payment intent
     * with the provided data. If successful, it returns the result of the intent
     * creation. If the SDK initialization fails, it returns null. In case of an 
     * error during the process, it returns an object containing the error details.
     * 
     * API Reference - https://developers.clearpay.co.uk/clearpay-online/reference/create-checkout
     * 
     * @param data - The payment intent data required by Clearpay.
     * @returns A promise that resolves to the result of the payment intent creation
     *          or an object with error details if an error occurs.
     */
    async initPaymentIntent(data: any): Promise<any> {
        try {
            if (super.initSDK()) {
                const intentResult = await new SDKs.Clearpay.Infra.Services.Payment().initIntent(data);
                return intentResult;
            }
            return null;
        }
        catch (error: any) {
            return { hasError: true, error: error?.message };
        }
    }

    
    /**
     * Requests a payment or payout from Clearpay.
     * 
     * This method initializes the SDK and attempts to request a payment or payout
     * with the provided data. If successful, it returns the result of the request.
     * If the SDK initialization fails, it returns null. In case of an 
     * error during the process, it returns an object containing the error details.
     * 
     * API Reference - https://developers.clearpay.co.uk/clearpay-online/reference/capture-full-payment
     * 
     * @param data - The payment data required by Clearpay.
     * @returns A promise that resolves to the result of the payment request
     *          or an object with error details if an error occurs.
     */
    async requestPayment(data: any): Promise<any> {
        try {
            if (super.initSDK()) {
                const intentResult = await new SDKs.Clearpay.Infra.Services.Payment().requestPayment(data);
                return intentResult;
            }
            return null;
        }
        catch (error: any) {
            return { hasError: true, error: error?.message };
        }
    }

    
    /**
     * Retrieves the details of an order from Clearpay.
     * 
     * This method attempts to retrieve the order details with the provided data.
     * If successful, it returns the result of the order details request.
     * If the SDK initialization fails, it returns null. In case of an 
     * error during the process, it returns an object containing the error details.
     * 
     * API Reference - https://developers.clearpay.co.uk/clearpay-online/reference/get-payment-by-order-id
     * 
     * @param data - The order ID required by Clearpay.
     * @returns A promise that resolves to the result of the order details request
     *          or an object with error details if an error occurs.
     */
    async getOrderDetails(data: any): Promise<any> {
        try {
            if (super.initSDK()) {
                const payment = new SDKs.Clearpay.Infra.Services.Payment();
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