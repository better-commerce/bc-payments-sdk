// Package Imports

// Other Imports
import { IPaymentProvider } from "../../../base/contracts/IPaymentProvider";

export class KlarnaPayment implements IPaymentProvider {

    async getOrderDetails(data: any, config: any): Promise<any> {
        throw new Error("Not Implemented");
    }
}