// Other Imports
import { IPaymentProvider } from "../../contracts/IPaymentProvider"
import { BasePaymentProvider } from "../../../infrastructure/core/BasePaymentProvider";
import { ICheckoutPaymentProvider } from "../../contracts/GatewayProviders/ICheckoutPaymentProvider";
import { SDKs } from "../../../../SDKs/lib";

/**
 * Class {CheckoutPayment} is a concrete implementation of a payment provider.
 * It provides a set of methods that can be used to interact with the Checkout payment gateway.
 * 
 * @class CheckoutPayment
 * @extends {BasePaymentProvider}
 * @implements {IPaymentProvider}
 * @implements {ICheckoutPaymentProvider}
 */
export class CheckoutPayment extends BasePaymentProvider implements IPaymentProvider, ICheckoutPaymentProvider {

    initPaymentIntent(data: any) {
        throw new Error("Method not implemented.");
    }

    /**
     * Requests a token from Checkout.com. Tokens are single use and expire after 15 minutes.
     * 
     * ________
     * CHECKOUT
     * ‾‾‾‾‾‾‾‾
     * API Reference - https://www.checkout.com/docs/payments/add-payment-methods/apple-pay#Step_1:_Generate_a_Checkout.com_token_from_the_Apple_Pay_token
     * 
     * @param data {Object}
     * @returns A promise that resolves to the result of the token request
     *          or an object with error details if an error occurs.
     */
    async requestToken(data: any): Promise<any> {
        try {
            if (super.initSDK()) {
                const token = new SDKs.Checkout.Infra.Services.Token();
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
     * Requests a payment or payout from Checkout.com.
     * 
     * ________
     * CHECKOUT
     * ‾‾‾‾‾‾‾‾
     * API Reference - https://api-reference.checkout.com/#operation/requestAPaymentOrPayout
     * _________________
     * Checkout ApplePay
     * ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
     * API Reference - https://www.checkout.com/docs/payments/add-payment-methods/apple-pay#Endpoints_2
     * 
     * @param data {Object}
     * @returns A promise that resolves to the result of the payment request
     *          or an object with error details if an error occurs.
     */
    async requestPayment(data: any): Promise<any> {
        try {
            if (super.initSDK()) {
                const payment = new SDKs.Checkout.Infra.Services.Payment();
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
     * Retrieves the details of an order from Checkout.com.
     * 
     * This method attempts to retrieve the order details with the provided data.
     * If successful, it returns the result of the order details request.
     * If the SDK initialization fails, it returns null. In case of an 
     * error during the process, it returns an object containing the error details.
     * ________
     * CHECKOUT
     * ‾‾‾‾‾‾‾‾
     * API Reference - https://api-reference.checkout.com/#operation/getPaymentDetails
     * 
     * @param data - The order ID required by Checkout.com.
     * @returns A promise that resolves to the result of the order details request
     *          or an object with error details if an error occurs.
     */
    async getOrderDetails(data: any): Promise<any> {
        try {
            if (super.initSDK()) {
                const payment = new SDKs.Checkout.Infra.Services.Payment();
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
     * Creates a payment context using Checkout.com.
     * 
     * This method initializes the SDK and attempts to create a payment context
     * with the provided data. If successful, it returns the result of the context
     * creation. If the SDK initialization fails, it returns null. In case of an 
     * error during the process, it returns an object containing the error details.
     * 
     * ________
     * CHECKOUT
     * ‾‾‾‾‾‾‾‾
     * API Reference - https://api-reference.checkout.com/#operation/requestAPaymentContext
     * 
     * @param data - The payment context data required by Checkout.com.
     * @returns A promise that resolves to the result of the payment context creation
     *          or an object with error details if an error occurs.
     */
    async createPaymentContext(data: any) {
        try {
            if (super.initSDK()) {
                const paymentContext = new SDKs.Checkout.Infra.Services.PaymentContext();
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
     * Retrieves the payment context details from Checkout.com.
     * 
     * This method attempts to retrieve the payment context details with the provided data.
     * If successful, it returns the result of the payment context details request.
     * If the SDK initialization fails, it returns null. In case of an 
     * error during the process, it returns an object containing the error details.
     * 
     * ________
     * CHECKOUT
     * ‾‾‾‾‾‾‾‾
     * API Reference - https://api-reference.checkout.com/#operation/getPaymentContext
     * 
     * @param data - The payment context data required by Checkout.com.
     * @returns A promise that resolves to the result of the payment context details request
     *          or an object with error details if an error occurs.
     */
    async getPaymentContext(data: any) {
        try {
            if (super.initSDK()) {
                const paymentContext = new SDKs.Checkout.Infra.Services.PaymentContext();
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
     * Creates a session for a customer using Checkout.com.
     * 
     * This method attempts to create a session with the provided data.
     * If successful, it returns the result of the session creation.
     * If the SDK initialization fails, it returns null. In case of an 
     * error during the process, it returns an object containing the error details.
     * 
     * ________
     * CHECKOUT
     * ‾‾‾‾‾‾‾‾
     * API Reference - https://www.checkout.com/docs/previous/payments/payment-methods/invoice-and-pay-later/klarna#Create_a_session
     *  
     * @param data - The session data required by Checkout.com.
     * @returns A promise that resolves to the result of the session creation
     *          or an object with error details if an error occurs.
     */
    async createSession(data: any) {
        try {
            if (super.initSDK()) {
                const session = new SDKs.Checkout.Infra.Services.Session();
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