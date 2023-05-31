import { IPaymentProcessingData } from "../../models/better-commerce/IPaymentProcessingData";

export interface ICommerceProvider {
    processPayment(data: IPaymentProcessingData): any;
}