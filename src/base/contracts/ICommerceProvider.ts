import { IPaymentProcessingData } from "../../models/better-commerce/IPaymentProcessingData";

export interface ICommerceProvider {
    getCompanyDetails(data: any): any;
    convertOrder(data: any): any;
    processPayment(data: IPaymentProcessingData): any;
}