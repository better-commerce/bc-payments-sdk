// Package Imports

// Other Imports
import { IPaymentProvider } from "../../base/contracts/IPaymentProvider";
import { BasePayment } from "../../base/entity/BasePayment";

/**
 * Class {KlarnaPayment}
 */
export class KlarnaPayment extends BasePayment implements IPaymentProvider {

    async requestPayment(data: any): Promise<any> {
        throw new Error("Method not implemented.");
    }

    async getOrderDetails(data: any): Promise<any> {
        throw new Error("Not Implemented");
    }
}