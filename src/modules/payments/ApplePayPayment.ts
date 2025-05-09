// Package Imports
import { Payment } from "bc-apple-pay-sdk";

// Other Imports
import { IPaymentProvider } from "../../base/contracts/IPaymentProvider";
import { BasePaymentProvider } from "../../base/entity/BasePaymentProvider";
import { IApplePayPaymentProvider } from "../../base/contracts/GatewayProviders/IApplePayPaymentProvider";

/**
 * Class {ApplePayPayment} extends {BasePaymentProvider} and implements {IPaymentProvider} and {IApplePayPaymentProvider}.
 * It provides the concrete implementation of the Apple Pay payment provider.
 * 
 * @class ApplePayPayment
 * @extends BasePaymentProvider
 * @implements {IPaymentProvider}
 * @implements {IApplePayPaymentProvider}
 * 
 * @remark
 * This class is responsible for initializing the Apple Pay SDK and providing the concrete implementation of the Apple Pay payment provider methods.
 */
export class ApplePayPayment extends BasePaymentProvider implements IPaymentProvider, IApplePayPaymentProvider {

    /**
     * Validates the payment session using the Apple Pay SDK.
     * 
     * @param data The Apple Pay session validation data.
     * @returns The result of the payment session validation. If the validation is successful, the result is the validated session object. Otherwise, the result is an error object with the error message.
     */
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