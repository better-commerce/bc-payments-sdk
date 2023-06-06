import { IPaymentProvider } from "../../base/contracts/IPaymentProvider";
import { BasePaymentOperation } from "../../base/entity/BasePaymentOperation";

/**
 * Class {PaymentOperation} encapsulates generic payment provider operations.
 */
export class PaymentOperation extends BasePaymentOperation implements IPaymentProvider {

    async initPaymentIntent(data: any): Promise<any> {
        try {
            const obj = this.getObject();
            if (obj) {
                const requestPaymentResult = await obj.initPaymentIntent(data);
                return requestPaymentResult;
            }
        } catch (error: any) {
            return { hasError: true, error: error };
        }
        return null;
    }

    async requestPayment(data: any): Promise<any> {
        try {
            const obj = this.getObject();
            if (obj) {
                const requestPaymentResult = await obj.requestPayment(data);
                return requestPaymentResult;
            }
        } catch (error: any) {
            return { hasError: true, error: error };
        }
        return null;
    }

    async getOrderDetails(data: any): Promise<any> {
        try {
            const obj = this.getObject();
            if (obj) {
                const orderResult = await obj.getOrderDetails(data);
                return orderResult;
            }
        } catch (error: any) {
            return { hasError: true, error: error };
        }
        return null;
    }
}