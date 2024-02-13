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
import { Logger } from "../../modules/better-commerce/Logger";

/**
 * Class {BasePaymentOperation} defines concrete methods for specific payment operations of all the gateway providers. This also acts as an abstract for {PaymentOperation} class, thereby allowing the {PaymentOperation} class to directly inherit the concrete operation method(s) for all gateway providers. 
 */
export abstract class BasePaymentOperation implements ICheckoutPaymentProvider, IKlarnaPaymentProvider, IPayPalPaymentProvier, IStripePaymentProvider, IApplePayPaymentProvider {

    /**
     * Specific to {Klarna}, creates a one time payment order.
     * 
     * API Reference - https://docs.klarna.com/klarna-payments/integrate-with-klarna-payments/step-3-create-an-order/create-a-one-time-payment-order/
     * 
     * @param data {Object}
     */
    public async createOneTimePaymentOrder(data: any): Promise<any> {
        const paymentProvider = this.getPaymentProvider();
        if (paymentProvider === PaymentMethodType.KLARNA) {
            return await new KlarnaPayment().createOneTimePaymentOrder(data);
        }
        return null;
    }

    /**
     * Specific to {ApplePay}, validates the payment session.
     * 
     * API Reference - https://developer.apple.com/documentation/apple_pay_on_the_web/apple_pay_js_api/providing_merchant_validation
     * 
     * @param data {Object}
     */
    public async validatePaymentSession(data: any) {
        const paymentProvider = this.getPaymentProvider();
        if (paymentProvider === PaymentMethodType.CHECKOUT_APPLE_PAY) {
            return await new ApplePayPayment().validatePaymentSession(data);
        }
        return null;
    }

    /**
     * Specific to {Checkout}, Exchange card details for a reference token that can be used later to request a card payment. Tokens are single use and expire after 15 minutes.
     * 
     * API Reference - https://api-reference.checkout.com/#operation/requestAToken
     * 
     * @param data {Object}
     */
    public async requestToken(data: any) {
        const paymentProvider = this.getPaymentProvider();
        if (paymentProvider === PaymentMethodType.CHECKOUT) {
            return await new CheckoutPayment().requestToken(data);
        }
        return null;
    }

    /**
     * Specific to {Checkout}, Sends an Payment Context request.
     * 
     * API Reference - https://api-reference.checkout.com/#operation/requestAPaymentContext
     * 
     * @param data 
     */
    public async createPaymentContext(data: any) {
        const paymentProvider = this.getPaymentProvider();
        if (paymentProvider === PaymentMethodType.CHECKOUT) {
            return await new CheckoutPayment().createPaymentContext(data);
        }
        return null;
    }

    /**
     * Specific to {Checkout}, Creates a Klarna session for a customer.
     * 
     * API Reference - https://www.checkout.com/docs/previous/payments/payment-methods/invoice-and-pay-later/klarna#Create_a_session
     * 
     * @param data 
     */
    public async createSession(data: any) {
        const paymentProvider = this.getPaymentProvider();
        if (paymentProvider === PaymentMethodType.CHECKOUT) {
            return await new CheckoutPayment().createSession(data);
        }
        return null;
    }

    /**
     * Specific to {Checkout},Returns all the Payment Context details.
     * @param data 
     * 
     *  API Reference - https://api-reference.checkout.com/#operation/getPaymentContext
     * 
     */
    public async getPaymentContext(data: any) {
        throw new Error("Method not implemented.");
    }

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
     * Generic abstract factory helper to determine the payment gateway provider.
     * @returns 
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
        }
        return obj;
    }
}