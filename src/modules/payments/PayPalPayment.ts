// Package Imports
import { Order } from "bc-paypal-sdk";

// Other Imports
import { IPaymentProvider } from "../../base/contracts/IPaymentProvider";
import { BasePayment } from "../../base/entity/BasePayment";

export class PayPalPayment extends BasePayment implements IPaymentProvider {

    initPaymentIntent(data: any) {
        throw new Error("Method not implemented.");
    }
    
    async requestPayment(data: any): Promise<any> {
        throw new Error("Method not implemented.");
    }

    async getOrderDetails(data: any): Promise<any> {

        try {
            if (super.initSDK()) {
                const order = new Order();
                const orderResult = await order.get(data);
                return orderResult;
            }
            return null;
        }
        catch (error: any) {
            return { hasError: true, error: error?.message };
        }
    }
}