import { BCEnvironment } from "../base/config/BCEnvironment";
import { IPaymentProvider } from "../base/contracts/IPaymentProvider";
import { PaymentGateway } from "../constants/enums/PaymentGateway";
import { CheckoutPayment } from "../modules/payments/CheckoutPayment";
import { ClearPayPayment } from "../modules/payments/ClearPayPament";
import { KlarnaPayment } from "../modules/payments/KlarnaPayment";
import { PayPalPayment } from "../modules/payments/PayPalPayment";
import { StripePayment } from "../modules/payments/StripePayment";

/**
 * Class {PaymentOperation}
 */
export class PaymentOperation implements IPaymentProvider {

    async initPaymentIntent(data: any): Promise<any> {
        const obj = this.getObject();
        if (obj) {
            const requestPaymentResult = await obj.initPaymentIntent(data);
            return requestPaymentResult;
        }
        return null;
    }

    async requestPayment(data: any): Promise<any> {
        const obj = this.getObject();
        if (obj) {
            const requestPaymentResult = await obj.requestPayment(data);
            return requestPaymentResult;
        }
        return null;
    }

    async getOrderDetails(data: any): Promise<any> {
        const obj = this.getObject();
        if (obj) {
            const orderResult = await obj.getOrderDetails(data);
            return orderResult;
        }
        return null;
    }

    private getObject(): IPaymentProvider {
        let obj: IPaymentProvider;
        const config: any = BCEnvironment.getConfig();
        console.log("getObject() config", config);
        if (config?.systemName?.toLowerCase() === PaymentGateway.PAYPAL) {
            obj = new PayPalPayment();
        } else if (config?.systemName?.toLowerCase() === PaymentGateway.CHECKOUT) {
            obj = new CheckoutPayment();
        } else if (config?.systemName?.toLowerCase() === PaymentGateway.CLEAR_PAY) {
            obj = new ClearPayPayment();
        } else if (config?.systemName?.toLowerCase() === PaymentGateway.KLARNA) {
            obj = new KlarnaPayment();
        } else if (config?.systemName?.toLowerCase() === PaymentGateway.STRIPE) {
            obj = new StripePayment();
        }
        return obj;
    }
}