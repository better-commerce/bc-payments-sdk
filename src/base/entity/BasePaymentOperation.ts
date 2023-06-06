import { ICheckoutPaymentProvider } from "../contracts/GatewayProviders/ICheckoutPaymentProvider";
import { IKlarnaPaymentProvider } from "../contracts/GatewayProviders/IKlarnaPaymentProvider";
import { IPayPalPaymentProvier } from "../contracts/GatewayProviders/IPayPalPaymentProivder";
import { IStripePaymentProvider } from "../contracts/GatewayProviders/IStripePaymentProvider";
import { BCEnvironment } from "../../base/config/BCEnvironment";
import { PaymentGateway } from "../../constants/enums/PaymentGateway";
import { CheckoutPayment } from "../../modules/payments/CheckoutPayment";
import { ClearPayPayment } from "../../modules/payments/ClearPayPament";
import { KlarnaPayment } from "../../modules/payments/KlarnaPayment";
import { PayPalPayment } from "../../modules/payments/PayPalPayment";
import { StripePayment } from "../../modules/payments/StripePayment";
import { IPaymentProvider } from "../contracts/IPaymentProvider";

/**
 * Class {BasePaymentOperation} defines concrete methods for specific payment operations of all the gateway providers. This also acts as an abstract for {PaymentOperation} class, thereby allowing the {PaymentOperation} class to directly inherit the concrete operation method(s) for all gateway providers. 
 */
export abstract class BasePaymentOperation implements ICheckoutPaymentProvider, IKlarnaPaymentProvider, IPayPalPaymentProvier, IStripePaymentProvider {

    /**
     * Specific to {Klarna}, creates a one time payment order.
     * @param data {Object}
     */
    public async createOneTimePaymentOrder(data: any): Promise<any> {
        const paymentProvider = this.getPaymentProvider();
        if (paymentProvider === PaymentGateway.KLARNA) {
            return await new KlarnaPayment().createOneTimePaymentOrder(data);
        }
        return null;
    }

    protected getPaymentProvider(): PaymentGateway {
        const config: any = BCEnvironment.getConfig();
        console.log("getObject() config", config);
        return config?.systemName?.toLowerCase();
    }

    /**
     * Generic abstract factory helper to determine the payment gateway provider.
     * @returns 
     */
    protected getObject(): IPaymentProvider {
        let obj: IPaymentProvider;
        const paymentProvider = this.getPaymentProvider();
        if (paymentProvider === PaymentGateway.PAYPAL) {
            obj = new PayPalPayment();
        } else if (paymentProvider === PaymentGateway.CHECKOUT) {
            obj = new CheckoutPayment();
        } else if (paymentProvider === PaymentGateway.CLEAR_PAY) {
            obj = new ClearPayPayment();
        } else if (paymentProvider === PaymentGateway.KLARNA) {
            obj = new KlarnaPayment();
        } else if (paymentProvider === PaymentGateway.STRIPE) {
            obj = new StripePayment();
        }
        return obj;
    }
}