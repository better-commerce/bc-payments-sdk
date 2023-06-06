// Package Imports
import { Payment } from "bc-klarna-sdk";

// Other Imports
import { BasePayment } from "../../base/entity/BasePayment";
import { IPaymentProvider } from "../../base/contracts/IPaymentProvider";
import { IKlarnaPaymentProvider } from "../../base/contracts/GatewayProviders/IKlarnaPaymentProvider";

/**
 * Class {KlarnaPayment}
 */
export class KlarnaPayment extends BasePayment implements IPaymentProvider, IKlarnaPaymentProvider {

    /**
     * Initiate a payment. 
     * API Reference - https://docs.klarna.com/klarna-payments/integrate-with-klarna-payments/step-1-initiate-a-payment/
     * @param data {IPaymentIntent}
     * @returns 
     */
    async initPaymentIntent(data: any): Promise<any> {
        try {
            if (super.initSDK()) {
                const intentResult = await new Payment().initIntent(data);
                return intentResult;
            }
            return null;
        }
        catch (error: any) {
            return { hasError: true, error: error?.message };
        }
    }

    /**
     * Create a one-time payment order. Once Klarna authorizes the purchase, use the authorization token to create an order and complete the one-time payment.
     * API Reference - https://docs.klarna.com/klarna-payments/integrate-with-klarna-payments/step-3-create-an-order/create-a-one-time-payment-order/
     * @param data {Object}
     * @returns 
     */
    async createOneTimePaymentOrder(data: any): Promise<any> {
        try {
            if (super.initSDK()) {
                const intentResult = await new Payment().createOneTimePaymentOrder(data);
                return intentResult;
            }
            return null;
        }
        catch (error: any) {
            return { hasError: true, error: error?.message };
        }
    }

    async requestPayment(data: any): Promise<any> {
        throw new Error("Method not implemented.");
    }

    async getOrderDetails(data: any): Promise<any> {
        throw new Error("Not Implemented");
    }
}