// Package Imports
import { Order } from "bc-paypal-sdk";

// Other Imports
import { IPaymentProvider } from "../../base/contracts/IPaymentProvider";
import { BasePaymentProvider } from "../../base/entity/BasePaymentProvider";

export class PayPalPayment extends BasePaymentProvider implements IPaymentProvider {

    initPaymentIntent(data: any) {
        throw new Error("Method not implemented.");
    }

    async requestPayment(data: any): Promise<any> {
        throw new Error("Method not implemented.");
    }

    /**
     * Show order details. Shows details for an order, by ID.
     * API Reference - https://developer.paypal.com/docs/api/orders/v2/#orders_get
     * @param data {String}
     * @returns 
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