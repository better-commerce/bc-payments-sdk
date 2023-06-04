// Package Imports
import { Payment } from "bc-checkout-sdk";

// Other Imports
import { IPaymentProvider } from "../../base/contracts/IPaymentProvider"
import { BasePayment } from "../../base/entity/BasePayment";

export class CheckoutPayment extends BasePayment implements IPaymentProvider {
    
    initPaymentIntent(data: any) {
        throw new Error("Method not implemented.");
    }

    async requestPayment(data: any): Promise<any> {
        try {
            if (super.initSDK()) {
                const payment = new Payment();
                const paymentRequestResult = await payment.request(data);
                return paymentRequestResult;
            }
            return null;
        }
        catch (error: any) {
            return { hasError: true, error: error?.message };
        }
    }

    async getOrderDetails(data: any): Promise<any> {
        try {
            if (super.initSDK()) {
                const payment = new Payment();
                const paymentRequestResult = await payment.getDetails(data);
                return paymentRequestResult;
            }
            return null;
        }
        catch (error: any) {
            return { hasError: true, error: error?.message };
        }
    }
}