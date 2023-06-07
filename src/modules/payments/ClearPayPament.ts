// Package Imports

// Other Imports
import { IPaymentProvider } from "../../base/contracts/IPaymentProvider";
import { BasePaymentProvider } from "../../base/entity/BasePaymentProvider";

export class ClearPayPayment extends BasePaymentProvider implements IPaymentProvider {

    initPaymentIntent(data: any) {
        throw new Error("Method not implemented.");
    }

    async requestPayment(data: any): Promise<any> {
        throw new Error("Method not implemented.");
    }

    async getOrderDetails(data: any): Promise<any> {
        throw new Error("Not Implemented");
    }
}