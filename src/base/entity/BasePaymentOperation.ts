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
import { IJuspayPaymentProvider } from "../contracts/GatewayProviders/IJuspayPaymentProvider";
import { IElavonPaymentProvider } from "../contracts/GatewayProviders/IElavonPaymentProvider";
import { ElavonPayment } from "../../modules/payments/ElavonPayment";
import { IOpayoPaymentProvider } from "../contracts/GatewayProviders/IOpayoPaymentProvider";
import { OmniCapitalPayment } from "../../modules/payments/OmniCapitalPayment";
import { INuveiPaymentProvider } from "../contracts/GatewayProviders/INuveiPaymentProvider";
import { IOpenOrderResponse } from "bc-nuvei-sdk";
import { NuveiPayment } from "../../modules/payments/NuveiPayment";

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
export abstract class BasePaymentOperation implements ICheckoutPaymentProvider, IKlarnaPaymentProvider, IPayPalPaymentProvier, IStripePaymentProvider, IApplePayPaymentProvider, IJuspayPaymentProvider, IElavonPaymentProvider, IOpayoPaymentProvider, INuveiPaymentProvider {

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
        } else if (paymentProvider === PaymentMethodType.ELAVON) {
            return await new ElavonPayment().requestToken(data);
        } else if (paymentProvider === PaymentMethodType.NUVEI) {
            return await new ElavonPayment().requestToken(data);
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
     * Retrieves the payment methods available for the current payment provider.
     * Specific to {Juspay}, Retrieves the payment methods available for the merchant from Juspay.
     * 
     * The method attempts to retrieve a payment provider object and then calls its `getPaymentMethods` method 
     * with the provided data. If successful, it returns the result of the payment methods request. Otherwise, it returns null.
     * 
     * API Reference - https://docs.juspay.io/api-reference/docs/express-checkout/payment-methods
     * 
     * @param data - The payment method data required by the payment provider.
     * @returns A promise that resolves to the result of the payment methods request
     *          or null if the payment provider is not {Juspay}.
     */
    public async getPaymentMethods(data: any) {
        const paymentProvider = this.getPaymentProvider();
        if (paymentProvider === PaymentMethodType.JUSPAY) {
            return await new JuspayPayment().getPaymentMethods(data);
        }
        return null;
    }

    /**
     * Retrieves the customer details from the current payment provider.
     * Specific to {Juspay}, Retrieves the customer details from Juspay.
     * 
     * The method attempts to retrieve a payment provider object and then calls its `getCustomer` method 
     * with the provided data. If successful, it returns the result of the customer details request. Otherwise, it returns null.
     * 
     * API Reference - https://docs.juspay.io/api-reference/docs/express-checkout/getcustomer
     * 
     * @param data - The customer ID required by the payment provider.
     * @returns A promise that resolves to the result of the customer details request
     *          or null if the payment provider is not {Juspay}.
     */
    public async getCustomer(data: any) {
        const paymentProvider = this.getPaymentProvider();
        if (paymentProvider === PaymentMethodType.JUSPAY) {
            return await new JuspayPayment().getCustomer(data);
        }
        return null;
    }

    /**
     * Creates a customer in the current payment provider.
     * Specific to {Juspay}, creates a customer in Juspay.
     * 
     * The method attempts to retrieve a payment provider object and then calls its `createCustomer` method 
     * with the provided data. If successful, it returns the result of the create customer request. Otherwise, it returns null.
     * 
     * API Reference - https://docs.juspay.io/api-reference/docs/express-checkout/createcustomer
     * 
     * @param data - The customer data required by the payment provider.
     * @returns A promise that resolves to the result of the create customer request
     *          or null if the payment provider is not {Juspay}.
     */
    public async createCustomer(data: any) {
        const paymentProvider = this.getPaymentProvider();
        if (paymentProvider === PaymentMethodType.JUSPAY) {
            return await new JuspayPayment().createCustomer(data);
        }
        return null;
    }

    /**
     * Creates an order in the current payment provider.
     * Specific to {Juspay}, creates an order in Juspay.
     * 
     * The method attempts to retrieve a payment provider object and then calls its `createOrder` method 
     * with the provided data. If successful, it returns the result of the create order request. Otherwise, it returns null.
     * 
     * API Reference - https://docs.juspay.io/api-reference/docs/express-checkout/create-order-api
     * 
     * @param data - The order data required by the payment provider.
     * @returns A promise that resolves to the result of the create order request
     *          or null if the payment provider is not {Juspay}.
     */
    public async createOrder(data: any) {
        const paymentProvider = this.getPaymentProvider();
        if (paymentProvider === PaymentMethodType.JUSPAY) {
            return await new JuspayPayment().createOrder(data);
        }
        return null;
    }

    /**
     * Updates an order in the current payment provider.
     * Specific to {Juspay}, updates an order in Juspay.
     * 
     * The method attempts to retrieve a payment provider object and then calls its `updateOrder` method 
     * with the provided data. If successful, it returns the result of the update order request. Otherwise, it returns null.
     * 
     * API Reference - https://docs.juspay.io/api-reference/docs/express-checkout/update-order-api
     * 
     * @param data - The order data required by the payment provider.
     * @returns A promise that resolves to the result of the update order request
     *          or null if the payment provider is not {Juspay}.
     */
    public async updateOrder(data: any) {
        const paymentProvider = this.getPaymentProvider();
        if (paymentProvider === PaymentMethodType.JUSPAY) {
            return await new JuspayPayment().updateOrder(data);
        }
        return null;
    }

    /**
     * Retrieves the card information for the current payment provider.
     * Specific to {Juspay}, Retrieves the card information for the current payment provider.
     * 
     * The method attempts to retrieve a payment provider object and then calls its `getCardInfo` method 
     * with the provided data. If successful, it returns the result of the card information request. Otherwise, it returns null.
     * 
     * API Reference - https://docs.juspay.io/api-reference/docs/express-checkout/card-info
     * 
     * @param data - The card data required by the payment provider.
     * @returns A promise that resolves to the result of the card information request
     *          or null if the payment provider is not {Juspay}.
     */
    public async getCardInfo(data: any) {
        const paymentProvider = this.getPaymentProvider();
        if (paymentProvider === PaymentMethodType.JUSPAY) {
            return await new JuspayPayment().getCardInfo(data);
        }
        return null;
    }

    /**
     * Tokenizes a card using the current payment provider.
     * Specific to {Juspay}, exchanges card details for a token.
     * 
     * The method attempts to retrieve a payment provider object and then calls its `tokenizeCard` method 
     * with the provided data. If successful, it returns the result of the tokenization request. Otherwise, it returns null.
     * 
     * API Reference - https://juspay.io/in/docs/api-reference/docs/express-checkout/tokenize
     * 
     * @param data - The card data required by the payment provider.
     * @returns A promise that resolves to the result of the tokenization request
     *          or null if the payment provider is not {Juspay}.
     */
    public async tokenizeCard(data: any) {
        const paymentProvider = this.getPaymentProvider();
        if (paymentProvider === PaymentMethodType.JUSPAY) {
            return await new JuspayPayment().tokenizeCard(data);
        }
        return null;
    }

    /**
     * Saves a card using the current payment provider.
     * Specific to {Juspay}, Saves a card to Juspay.
     * 
     * The method attempts to retrieve a payment provider object and then calls its `saveCard` method 
     * with the provided data. If successful, it returns the result of the save card request. Otherwise, it returns null.
     * 
     * API Reference - https://docs.juspay.io/api-reference/docs/express-checkout/add-card
     * 
     * @param data - The card data required by the payment provider.
     * @returns A promise that resolves to the result of the save card request
     *          or null if the payment provider is not {Juspay}.
     */
    public async saveCard(data: any) {
        const paymentProvider = this.getPaymentProvider();
        if (paymentProvider === PaymentMethodType.JUSPAY) {
            return await new JuspayPayment().saveCard(data);
        }
        return null;
    }

    /**
     * Deletes a card using the current payment provider.
     * Specific to {Juspay}, Deletes a card from Juspay.
     * 
     * The method attempts to retrieve a payment provider object and then calls its `deleteCard` method 
     * with the provided data. If successful, it returns the result of the delete card request. Otherwise, it returns null.
     * 
     * API Reference - https://docs.juspay.io/api-reference/docs/express-checkout/delete-card
     * 
     * @param data - The card data required by the payment provider.
     * @returns A promise that resolves to the result of the delete card request
     *          or null if the payment provider is not {Juspay}.
     */
    public async deleteCard(data: any) {
        const paymentProvider = this.getPaymentProvider();
        if (paymentProvider === PaymentMethodType.JUSPAY) {
            return await new JuspayPayment().deleteCard(data);
        }
        return null;
    }

    /**
     * Retrieves the cards associated with the current payment provider.
     * Specific to {Juspay}, Retrieves the cards associated with the merchant from Juspay.
     * 
     * The method attempts to retrieve a payment provider object and then calls its `getCards` method 
     * with the provided data. If successful, it returns the result of the cards request. Otherwise, it returns null.
     * 
     * API Reference - https://docs.juspay.io/api-reference/docs/express-checkout/list-stored-cards
     * 
     * @param data - The card data required by the payment provider.
     * @returns A promise that resolves to the result of the cards request
     *          or null if the payment provider is not {Juspay}.
     */
    public async getCards(data: any) {
        const paymentProvider = this.getPaymentProvider();
        if (paymentProvider === PaymentMethodType.JUSPAY) {
            return await new JuspayPayment().getCards(data);
        }
        return null;
    }

    /**
     * Verifies a VPA using the current payment provider.
     * Specific to {Juspay}, verifies a VPA with Juspay.
     * 
     * The method attempts to retrieve a payment provider object and then calls its `verifyVPA` method 
     * with the provided data. If successful, it returns the result of the verification request. Otherwise, it returns null.
     * 
     * API Reference - https://docs.juspay.io/api-reference/docs/express-checkout/verify-vpa
     * 
     * @param data - The VPA data required by the payment provider.
     * @returns A promise that resolves to the result of the verification request
     *          or null if the payment provider is not {Juspay}.
     */
    public async verifyVPA(data: any) {
        const paymentProvider = this.getPaymentProvider();
        if (paymentProvider === PaymentMethodType.JUSPAY) {
            return await new JuspayPayment().verifyVPA(data);
        }
        return null;
    }

    /**
     * Retrieves the offers associated with the current payment provider.
     * Specific to {Juspay}, Retrieves the offers associated with the merchant from Juspay.
     * 
     * The method attempts to retrieve a payment provider object and then calls its `getOffers` method 
     * with the provided data. If successful, it returns the result of the offers request. Otherwise, it returns null.
     * 
     * API Reference - https://docs.juspay.io/api-reference/docs/express-checkout/offer-list
     * 
     * @param data - The offer data required by the payment provider.
     * @returns A promise that resolves to the result of the offers request
     *          or null if the payment provider is not {Juspay}.
     */
    public async getOffers(data: any) {
        const paymentProvider = this.getPaymentProvider();
        if (paymentProvider === PaymentMethodType.JUSPAY) {
            return await new JuspayPayment().getOffers(data);
        }
        return null;
    }

    /**
     * Calling the server-side /openOrder API request is the first step in a Web SDK or Simply Connect flow. 
     * /openOrder authenticates your Nuvei merchant credentials, sets up an order in the Nuvei system, and returns a sessionToken.
     * 
     * sessionToken must be included in all subsequent Web SDK and Simply Connect method calls in that session, such as for createPayment() or checkout().
     * 
     * /openOrder also allows you to set user-related parameters such as shipping details and billing details. 
     * Using the preventOverride parameter either allows or prevents subsequent Web SDK and 
     * Simply Connect method calls from overriding these user-related parameters.
     * 
     * This method should be implemented by the concrete payment operation classes.
     * It should attempt to open an order in the current payment provider and return the result.
     * 
     * API Reference - https://docs.nuvei.com/api/main/indexMain_v1_0.html?json#openOrder
     * 
     * @param data - The order data required by the payment provider.
     * @throws {Error} - If the method is not implemented.
     * @returns {any} - The result of the open order request.
     */
    public async openOrder(data: any): Promise<IOpenOrderResponse> {
        const paymentProvider = this.getPaymentProvider();
        if (paymentProvider === PaymentMethodType.NUVEI) {
            return await new NuveiPayment().openOrder(data);
        }
        return null;
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
        } else if (paymentProvider === PaymentMethodType.ELAVON) {
            obj = new ElavonPayment();
        } else if (paymentProvider === PaymentMethodType.OPAYO) {
            obj = new ElavonPayment();
        } else if (paymentProvider === PaymentMethodType.OMNICAPITAL) {
            obj = new OmniCapitalPayment();
        }
        return obj;
    }
}