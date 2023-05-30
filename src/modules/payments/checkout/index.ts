// Package Imports

// Other Imports
import { IPaymentProvider } from "../../../base/contracts/IPaymentProvider"

export class CheckoutPayment implements IPaymentProvider {

    async getOrderDetails(data: any): Promise<any> {
        throw new Error("Not Implemented");
    }
}