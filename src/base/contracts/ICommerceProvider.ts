import { IPaymentProcessingData } from "../../models/better-commerce/IPaymentProcessingData";

export interface ICommerceProvider {
    convertOrder(data: any): any;
    processPayment(data: IPaymentProcessingData): any;
}