import { ICheckoutPaymentProvider } from "../contracts/GatewayProviders/ICheckoutPaymentProvider";
import { IKlarnaPaymentProvider } from "../contracts/GatewayProviders/IKlarnaPaymentProvider";
import { IPayPalPaymentProvier } from "../contracts/GatewayProviders/IPayPalPaymentProivder";
import { IStripePaymentProvider } from "../contracts/GatewayProviders/IStripePaymentProvider";
import { BCEnvironment } from "../../base/config/BCEnvironment";
import { PaymentMethodType } from "../../constants/enums/PaymentMethodType";
import { CheckoutPayment } from "../../modules/payments/CheckoutPayment";
import { ClearPayPayment } from "../../modules/payments/ClearPayPament";
import { KlarnaPayment } from "../../modules/payments/KlarnaPayment";
import { PayPalPayment } from "../../modules/payments/PayPalPayment";
import { StripePayment } from "../../modules/payments/StripePayment";
import { IPaymentProvider } from "../contracts/IPaymentProvider";
import { IApplePayPaymentProvider } from "../contracts/GatewayProviders/IApplePayPaymentProvider";
import { ApplePayPayment } from "../../modules/payments/ApplePayPayment";
import { JuspayPayment } from "../../modules/payments/JuspayPayment";
import { Logger } from "../../modules/better-commerce/Logger";

/**
 * Abstract class {BasePaymentOperation} is the base class for all payment operations 
 * and defines the concrete methods for specific payment operations of all the gateway providers.
 *
 * Payment operations are responsible for creating payment orders, retrieving payment methods, processing payments and more.
 * This class provides the following methods that can be overridden by the concrete implementation classes:
 *
 * - {createOneTimePaymentOrder}: Creates a one time payment order.
 * - {getPaymentMethods}: Retrieves the payment methods for the current customer.
 * - {processPayment}: Processes a payment.
 * - {processPaymentHook}: Processes a payment hook.
 *
 * @abstract
 * @category Payment Operation
 */
export abstract class BasePaymentOperation implements ICheckoutPaymentProvider, IKlarnaPaymentProvider, IPayPalPaymentProvier, IStripePaymentProvider, IApplePayPaymentProvider {

    /**
     * Creates a one time payment order.
     * Specific to {Klarna}, creates a one time payment order.
     * 
     * This method retrieves the payment provider and checks if it is of type `KLARNA`.
     * If so, it calls the `createOneTimePaymentOrder` method of `KlarnaPayment` with the provided data.
     * If the payment provider is not `KLARNA`, it returns null.
     * 
     * 
     * API Reference - https://docs.klarna.com/klarna-payments/integrate-with-klarna-payments/step-3-create-an-order/create-a-one-time-payment-order/
     * 
     * @param data - The payment intent data required by the payment provider.
     * @returns A promise that resolves to the result of the payment intent creation
     *          or an object with error details if an error occurs.
     */
    public async createOneTimePaymentOrder(data: any): Promise<any> {
        const paymentProvider = this.getPaymentProvider();
        if (paymentProvider === PaymentMethodType.KLARNA) {
            return await new KlarnaPayment().createOneTimePaymentOrder(data);
        }
        return null;
    }

    /**
     * Validates the payment session using the Apple Pay SDK.
     * Specific to {ApplePay}, validates the payment session.
     * 
     * This method retrieves the payment provider and checks if it is of type `CHECKOUT_APPLE_PAY`.
     * If so, it calls the `validatePaymentSession` method of `ApplePayPayment` with the provided data.
     * If the payment provider is not `CHECKOUT_APPLE_PAY`, it returns null.
     * 
     * API Reference - https://developer.apple.com/documentation/apple_pay_on_the_web/apple_pay_js_api/providing_merchant_validation
     * 
     * @param data The Apple Pay session validation data.
     * @returns The result of the payment session validation. If the validation is successful, the result is the validated session object. Otherwise, the result is an error object with the error message.
     */
    public async validatePaymentSession(data: any) {
        const paymentProvider = this.getPaymentProvider();
        if (paymentProvider === PaymentMethodType.CHECKOUT_APPLE_PAY) {
            return await new ApplePayPayment().validatePaymentSession(data);
        }
        return null;
    }

    /**
     * Requests a token from the appropriate payment provider.
     * Specific to {Checkout}, Exchange card details for a reference token that can be used later to request a card payment. Tokens are single use and expire after 15 minutes.
     * 
     * This method retrieves the payment provider and checks if it is of type `CHECKOUT`.
     * If so, it calls the `requestToken` method of `CheckoutPayment` with the provided data.
     * If the payment provider is not `CHECKOUT`, it returns null.
     * 
     * API Reference - https://api-reference.checkout.com/#operation/requestAToken
     * 
     * @param data {Object} - The data required for requesting a token.
     * @returns A promise that resolves to the result of the token request
     *          or null if the payment provider is not `CHECKOUT`.
     */
    public async requestToken(data: any) {
        const paymentProvider = this.getPaymentProvider();
        if (paymentProvider === PaymentMethodType.CHECKOUT) {
            return await new CheckoutPayment().requestToken(data);
        }
        return null;
    }

    /**
     * Creates a payment context for the current payment provider.
     * Specific to {Checkout}, creates a payment context.
     * 
     * The method attempts to retrieve a payment provider object and then calls its `createPaymentContext` method 
     * with the provided data. If successful, it returns the result of the payment context creation. Otherwise, it catches any errors that occur during the process and returns an error object.
     * 
     * API Reference - https://api-reference.checkout.com/#operation/requestAPaymentContext
     * 
     * @param data {Object} - The payment context data required by the payment provider.
     * @returns A promise that resolves to the result of the payment context creation or an error object in case of a failure.
     */
    public async createPaymentContext(data: any) {
        const paymentProvider = this.getPaymentProvider();
        if (paymentProvider === PaymentMethodType.CHECKOUT) {
            return await new CheckoutPayment().createPaymentContext(data);
        }
        return null;
    }

    /**
     * Creates a session for a customer using the appropriate payment provider.
     * Specific to {Checkout}, Creates a Klarna session for a customer.
     * 
     * The method attempts to retrieve a payment provider object and then calls its `createSession` method 
     * with the provided data. If successful, it returns the result of the session creation. Otherwise, it catches any errors that occur during the process and returns an error object.
     * 
     * API Reference - https://www.checkout.com/docs/previous/payments/payment-methods/invoice-and-pay-later/klarna#Create_a_session
     * 
     * @param data {Object} - The session data required by the payment provider.
     * @returns A promise that resolves to the result of the session creation or an error object in case of a failure.
     */
    public async createSession(data: any) {
        const paymentProvider = this.getPaymentProvider();
        if (paymentProvider === PaymentMethodType.CHECKOUT) {
            return await new CheckoutPayment().createSession(data);
        }
        return null;
    }

    /**
     * Retrieves the payment context details for the current payment provider.
     * Specific to {Checkout},Returns all the Payment Context details.
     * 
     * This method should be implemented by subclasses to fetch payment context
     * details using the provided data. It throws an error if not implemented.
     * 
     * API Reference - https://api-reference.checkout.com/#operation/getPaymentContext
     * 
     * @param data - The payment context data required by the payment provider.
     * @returns A promise that resolves to the result of the payment context details request
     *          or an object with error details if an error occurs.
     */
    public async getPaymentContext(data: any) {
        throw new Error("Method not implemented.");
    }

    /**
     * Retrieves the payment provider type from the configuration.
     * 
     * This method accesses the current configuration to determine the 
     * payment provider being used. It logs the configuration details for 
     * debugging purposes and returns the provider's system name in 
     * lowercase form.
     * 
     * @protected
     * @returns {PaymentMethodType} The payment provider type in lowercase.
     */
    protected getPaymentProvider(): PaymentMethodType {
        const config: any = BCEnvironment.getConfig();
        console.log("getObject() config", config);
        /*Logger.logPayment({
            data: { data: config },
            message: `${config?.systemName} | GetPaymentProvider`,
        }, {})*/
        return config?.systemName?.toLowerCase();
    }


    /**
     * Retrieves an instance of the payment provider based on the configured payment method type.
     * 
     * This method determines the appropriate payment provider by calling `getPaymentProvider`.
     * It then creates and returns an instance of the corresponding payment provider class.
     * Supported payment methods include PayPal, Checkout, ClearPay, Klarna, Stripe, and Juspay.
     * 
     * @returns {IPaymentProvider} An instance of a payment provider corresponding to the
     * configured payment method type.
     */
    protected getObject(): IPaymentProvider {
        let obj: IPaymentProvider;
        const paymentProvider = this.getPaymentProvider();
        if (paymentProvider === PaymentMethodType.PAYPAL) {
            obj = new PayPalPayment();
        } else if (paymentProvider === PaymentMethodType.CHECKOUT) {
            obj = new CheckoutPayment();
        } else if (paymentProvider === PaymentMethodType.CLEAR_PAY) {
            obj = new ClearPayPayment();
        } else if (paymentProvider === PaymentMethodType.KLARNA) {
            obj = new KlarnaPayment();
        } else if (paymentProvider === PaymentMethodType.STRIPE) {
            obj = new StripePayment();
        } else if (paymentProvider === PaymentMethodType.JUSPAY) {
            obj = new JuspayPayment();
        }
        return obj;
    }
}