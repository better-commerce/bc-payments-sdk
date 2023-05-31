import { IPaymentProcessingData } from "../../modules/models/IPaymentProcessingData";

export interface ICommerceProvider {
    processPayment(data: IPaymentProcessingData): any;
}