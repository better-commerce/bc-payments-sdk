// Package Imports
import { Payment, PaymentContext, Session, Token } from "bc-checkout-sdk";

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
     * ________
     * CHECKOUT
     * ‾‾‾‾‾‾‾‾
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

    /**
     * Request a Payment Context. Send an Payment Context request.
     * ________
     * CHECKOUT
     * ‾‾‾‾‾‾‾‾
     * API Reference - https://api-reference.checkout.com/#operation/requestAPaymentContext
     * @param data {Object}
     */
    async createPaymentContext(data: any) {
        try {
            if (super.initSDK()) {
                const paymentContext = new PaymentContext();
                const paymentContextRequestResult = await paymentContext.request(data);
                return paymentContextRequestResult;
            }
            return null;
        }
        catch (error: any) {
            return { hasError: true, error: error?.message };
        }
    }

    /**
     * Get Payment Context details. Returns all the Payment Context details.
     * ________
     * CHECKOUT
     * ‾‾‾‾‾‾‾‾
     * API Reference - https://api-reference.checkout.com/#operation/getPaymentContext
     * @param data {String}
     */
    async getPaymentContext(data: any) {
        try {
            if (super.initSDK()) {
                const paymentContext = new PaymentContext();
                const paymentContextDetailsResult = await paymentContext.getDetails(data);
                return paymentContextDetailsResult;
            }
            return null;
        }
        catch (error: any) {
            return { hasError: true, error: error?.message };
        }
    }

    /**
     * Create a session. Creates a Klarna session for a customer.
     * ________
     * CHECKOUT
     * ‾‾‾‾‾‾‾‾
     * API Reference - https://www.checkout.com/docs/previous/payments/payment-methods/invoice-and-pay-later/klarna#Create_a_session
     * @param data {Object}
     */
    async createSession(data: any) {
        try {
            if (super.initSDK()) {
                const session = new Session();
                const sessionCreateResult = await session.create(data);
                return sessionCreateResult;
            }
            return null;
        }
        catch (error: any) {
            return { hasError: true, error: error?.message };
        }
    }
}