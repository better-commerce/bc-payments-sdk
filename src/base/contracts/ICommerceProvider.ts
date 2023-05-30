import { IPaymentProcessingData } from "../../modules/betterCommerce/entity/IPaymentProcessingData";

export interface ICommerceProvider {
    processPayment(data: IPaymentProcessingData): any;
}