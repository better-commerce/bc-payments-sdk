// Package Imports
import { ExpressCheckout, JuspayEnv } from 'bc-juspay-sdk'

// Other Imports
import { IPaymentProvider } from "../../base/contracts/IPaymentProvider";
import { BasePaymentProvider } from "../../base/entity/BasePaymentProvider";

export class JuspayPayment extends BasePaymentProvider implements IPaymentProvider {

    initPaymentIntent(data: any) {
        throw new Error("Method not implemented.");
    }

    requestPayment(data: any) {
        throw new Error("Method not implemented.");
    }

    /**
     * Retrieves the details of an order from Juspay.
     * 
     * This method attempts to retrieve the order details with the provided data.
     * If successful, it returns the result of the order details request.
     * If the SDK initialization fails, it returns null. In case of an 
     * error during the process, it returns an object containing the error details.
     * 
     * API Reference - https://docs.juspay.io/api-reference/docs/express-checkout/order-status-api
     * 
     * @param data - The order ID required by Juspay.
     * @returns A promise that resolves to the result of the order details request
     *          or an object with error details if an error occurs.
     */
    async getOrderDetails(data: any): Promise<any> {
        try {
            if (super.initSDK()) {
                const orderDetailsResult = await ExpressCheckout.Order.get(data);
                return orderDetailsResult;
            }
            return null;
        }
        catch (error: any) {
            return { hasError: true, error: error?.message };
        }
    }
}