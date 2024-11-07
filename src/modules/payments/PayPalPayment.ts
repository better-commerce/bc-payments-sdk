// Package Imports
import { Order } from "bc-paypal-sdk";

// Other Imports
import { IPaymentProvider } from "../../base/contracts/IPaymentProvider";
import { BasePaymentProvider } from "../../base/entity/BasePaymentProvider";

/**
 * Class {PayPalPayment} extends {BasePaymentProvider} and implements {IPaymentProvider}.
 * It provides the concrete implementation of the PayPal payment provider.
 * 
 * @class PayPalPayment
 * @extends BasePaymentProvider
 * @implements IPaymentProvider
 * 
 * @remark
 * This class is responsible for initializing the PayPal SDK and providing the concrete implementation of the PayPal payment provider methods.
 */
export class PayPalPayment extends BasePaymentProvider implements IPaymentProvider {

    initPaymentIntent(data: any) {
        throw new Error("Method not implemented.");
    }

    async requestPayment(data: any): Promise<any> {
        throw new Error("Method not implemented.");
    }

    
    /**
     * Retrieves the details of an order from PayPal.
     * 
     * This method attempts to retrieve the order details with the provided data.
     * If successful, it returns the result of the order details request.
     * If the SDK initialization fails, it returns null. In case of an 
     * error during the process, it returns an object containing the error details.
     * 
     * API Reference - https://developer.paypal.com/docs/api/orders/v2/#orders_get
     * 
     * @param data - The order ID required by PayPal.
     * @returns A promise that resolves to the result of the order details request
     *          or an object with error details if an error occurs.
     */
    async getOrderDetails(data: any): Promise<any> {

        try {
            if (super.initSDK()) {
                const order = new Order();
                const orderDetailsResult = await order.get(data);
                return orderDetailsResult;
            }
            return null;
        }
        catch (error: any) {
            return { hasError: true, error: error?.message };
        }
    }
}