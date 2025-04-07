import { IPaymentProcessingData } from "../models/better-commerce/IPaymentProcessingData";
import { IPaymentHookProcessingData } from "../models/better-commerce/IPaymentHookProcessingData";

export interface ICommerceProvider {
    getCompanyDetails(data: any): any;
    convertOrder(data: any): any;
    processPayment(data: IPaymentProcessingData): any;
    processPaymentHook(data: IPaymentHookProcessingData): any;
}