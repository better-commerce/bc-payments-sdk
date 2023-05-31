import { BCEnvironment } from "../base/config/BCEnvironment";
import { IPaymentProvider } from "../base/contracts/IPaymentProvider";
import { CheckoutPayment } from "./payments/CheckoutPayment";
import { ClearPayPayment } from "./payments/ClearPayPament";
import { KlarnaPayment } from "./payments/KlarnaPayment";
import { PayPalPayment } from "./payments/PayPalPayment";

/**
 * Class {BCPaymentOperation}
 */
export class BCPaymentOperation implements IPaymentProvider {

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
        if (config?.systemName === "Paypal") {
            obj = new PayPalPayment();
        } else if (config?.systemName === "Checkout") {
            obj = new CheckoutPayment();
        } else if (config?.systemName === "Clearpay") {
            obj = new ClearPayPayment();
        } else if (config?.systemName === "Klarna") {
            obj = new KlarnaPayment();
        }
        return obj;
    }
}