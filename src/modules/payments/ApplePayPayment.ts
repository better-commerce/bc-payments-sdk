// Package Imports
import { Payment } from "bc-apple-pay-sdk";

// Other Imports
import { IPaymentProvider } from "../../base/contracts/IPaymentProvider";
import { BasePaymentProvider } from "../../base/entity/BasePaymentProvider";
import { IApplePayPaymentProvider } from "../../base/contracts/GatewayProviders/IApplePayPaymentProvider";

export class ApplePayPayment extends BasePaymentProvider implements IPaymentProvider, IApplePayPaymentProvider {

    async validatePaymentSession(data: any) {
        try {
            if (super.initSDK()) {
                const validateResult = await new Payment().validateSession(data);
                return validateResult;
            }
            return null;
        }
        catch (error: any) {
            return { hasError: true, error: error?.message };
        }
    }

    async initPaymentIntent(data: any) {
        throw new Error("Method not implemented.");
    }
    async requestPayment(data: any) {
        throw new Error("Method not implemented.");
    }
    async getOrderDetails(data: any) {
        throw new Error("Method not implemented.");
    }
}