import { IPaymentProcessingData } from "../../modules/better-commerce/entity/IPaymentProcessingData";

export interface ICommerceProvider {
    processPayment(data: IPaymentProcessingData): any;
}