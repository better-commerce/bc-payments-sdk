// Package Imports
import { Transaction } from "bc-omnicapital-sdk";

// Other Imports
import { IPaymentProvider } from "../../base/contracts/IPaymentProvider";
import { BasePaymentProvider } from "../../base/entity/BasePaymentProvider";

/**
 * Class {OmniCapitalPayment} is a concrete implementation of a payment provider.
 * It provides a set of methods that can be used to interact with the OmniCapital payment gateway.
 * 
 * @class OmniCapitalPayment
 * @extends {BasePaymentProvider}
 * @implements {IPaymentProvider}
 */
export class OmniCapitalPayment extends BasePaymentProvider implements IPaymentProvider {
    async initPaymentIntent(data: any): Promise<any> {
        try {
            if (super.initSDK()) {
                const intentResult = await new Transaction().request(data);
                return intentResult;
            }
            return null;
        }
        catch (error: any) {
            return { hasError: true, error: error?.message };
        }
    }


    requestPayment(data: any) {
        throw new Error("Method not implemented.");
    }


    async getOrderDetails(data: any): Promise<any> {
        try {
            if (super.initSDK()) {
                const payment = new Transaction();
                const orderDetailsResult = await payment.getDetails(data);
                return orderDetailsResult;
            }
            return null;
        }
        catch (error: any) {
            return { hasError: true, error: error?.message };
        }
    }
}