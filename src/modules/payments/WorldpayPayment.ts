// Package Imports
import { Transaction } from "bc-worldpay-sdk";

// Other Imports
import { IPaymentProvider } from "../../base/contracts/IPaymentProvider";
import { BasePaymentProvider } from "../../base/entity/BasePaymentProvider";

/**
 * Class {WorldpayPayment} is a concrete implementation of a payment provider.
 * It provides a set of methods that can be used to interact with the Worldpay Hosted Payment Page.
 *
 * @class WorldpayPayment
 * @extends {BasePaymentProvider}
 * @implements {IPaymentProvider}
 */
export class WorldpayPayment extends BasePaymentProvider implements IPaymentProvider {
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
                const orderDetailsResult = await new Transaction().getDetails(data);
                return orderDetailsResult;
            }
            return null;
        }
        catch (error: any) {
            return { hasError: true, error: error?.message };
        }
    }
}
