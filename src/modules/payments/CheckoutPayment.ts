// Package Imports
import { Payment } from "bc-checkout-sdk";

// Other Imports
import { IPaymentProvider } from "../../base/contracts/IPaymentProvider"
import { BasePaymentProvider } from "../../base/entity/BasePaymentProvider";

export class CheckoutPayment extends BasePaymentProvider implements IPaymentProvider {

    initPaymentIntent(data: any) {
        throw new Error("Method not implemented.");
    }

    /**
     * Request a payment or payout. Sends a request for payment or payout.
     * API Reference - https://api-reference.checkout.com/#operation/requestAPaymentOrPayout
     * @param data {IPaymentRequest}
     * @returns 
     */
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

    /**
     * Get payment details. Returns the details of the payment with the specified identifier string.
     * API Reference - https://api-reference.checkout.com/#operation/getPaymentDetails
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