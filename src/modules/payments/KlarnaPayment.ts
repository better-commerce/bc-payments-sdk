// Package Imports

// Other Imports
import { IPaymentProvider } from "../../base/contracts/IPaymentProvider";

/**
 * Class {KlarnaPayment}
 */
export class KlarnaPayment implements IPaymentProvider {

    async getOrderDetails(data: any): Promise<any> {
        throw new Error("Not Implemented");
    }
}