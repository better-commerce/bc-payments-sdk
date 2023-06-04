// Package Imports
import { Payment } from "bc-stripe-sdk";

// Other Imports
import { IPaymentProvider } from "../../base/contracts/IPaymentProvider";
import { BasePayment } from "../../base/entity/BasePayment";

export class StripePayment extends BasePayment implements IPaymentProvider {

    async initPaymentIntent(data: any): Promise<any> {

        try {
            if (super.initSDK()) {
                const intentResult = await new Payment().initIntent(data);
                return intentResult;
            }
            return null;
        }
        catch (error: any) {
            return { hasError: true, error: error?.message };
        }
    }

    async requestPayment(data: any): Promise<any> {
        throw new Error("Method not implemented.");
    }

    getOrderDetails(data: any) {
        throw new Error("Method not implemented.");
    }
}