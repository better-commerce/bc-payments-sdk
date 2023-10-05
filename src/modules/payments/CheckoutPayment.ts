// Package Imports
import { Payment, Token } from "bc-checkout-sdk";

// Other Imports
import { IPaymentProvider } from "../../base/contracts/IPaymentProvider"
import { BasePaymentProvider } from "../../base/entity/BasePaymentProvider";
import { ICheckoutPaymentProvider } from "../../base/contracts/GatewayProviders/ICheckoutPaymentProvider";

export class CheckoutPayment extends BasePaymentProvider implements IPaymentProvider, ICheckoutPaymentProvider {

    initPaymentIntent(data: any) {
        throw new Error("Method not implemented.");
    }

    /**
     * Generate a token from Apple Pay / Google Pay token
     * ________
     * CHECKOUT
     * ‾‾‾‾‾‾‾‾
     * API Reference - https://www.checkout.com/docs/payments/add-payment-methods/apple-pay#Step_1:_Generate_a_Checkout.com_token_from_the_Apple_Pay_token
     * @param data 
     */
    async requestToken(data: any): Promise<any> {
        try {
            if (super.initSDK()) {
                const token = new Token();
                const tokenRequestResult = await token.requestToken(data);
                return tokenRequestResult;
            }
            return null;
        }
        catch (error: any) {
            return { hasError: true, error: error?.message };
        }
    }

    /**
     * Request a payment or payout. Sends a request for payment or payout.
     * ________
     * CHECKOUT
     * ‾‾‾‾‾‾‾‾
     * API Reference - https://api-reference.checkout.com/#operation/requestAPaymentOrPayout
     * _________________
     * Checkout ApplePay
     * ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
     * API Reference - https://www.checkout.com/docs/payments/add-payment-methods/apple-pay#Endpoints_2
     * 
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