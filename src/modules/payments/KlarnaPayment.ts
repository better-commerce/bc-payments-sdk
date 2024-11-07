// Package Imports
import { Payment } from "bc-klarna-sdk";

// Other Imports
import { BasePaymentProvider } from "../../base/entity/BasePaymentProvider";
import { IPaymentProvider } from "../../base/contracts/IPaymentProvider";
import { IKlarnaPaymentProvider } from "../../base/contracts/GatewayProviders/IKlarnaPaymentProvider";

/**
 * Class {KlarnaPayment} is a concrete implementation of a payment provider.
 * It provides a set of methods that can be used to interact with the Klarna payment gateway.
 * 
 * @class KlarnaPayment
 * @extends {BasePaymentProvider}
 * @implements {IPaymentProvider}
 * @implements {IKlarnaPaymentProvider}
 */
export class KlarnaPayment extends BasePaymentProvider implements IPaymentProvider, IKlarnaPaymentProvider {

    
    /**
     * Initializes a payment intent using the Klarna payment gateway.
     * 
     * This method initializes the SDK and attempts to create a payment intent
     * with the provided data. If successful, it returns the result of the intent
     * creation. If the SDK initialization fails, it returns null. In case of an 
     * error during the process, it returns an object containing the error details.
     * 
     * API Reference - https://docs.klarna.com/klarna-payments/integrate-with-klarna-payments/step-1-initiate-a-payment/
     * 
     * @param data - The payment intent data required by Klarna.
     * @returns A promise that resolves to the result of the payment intent creation
     *          or an object with error details if an error occurs.
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
     * Creates a one time payment order. This method initializes the SDK and attempts to create a payment intent
     * with the provided data. If successful, it returns the result of the intent creation. If the SDK initialization fails, it returns null. In case of an 
     * error during the process, it returns an object containing the error details.
     * 
     * API Reference - https://docs.klarna.com/klarna-payments/integrate-with-klarna-payments/step-3-create-an-order/create-a-one-time-payment-order/
     * 
     * @param data - The payment intent data required by Klarna.
     * @returns A promise that resolves to the result of the payment intent creation
     *          or an object with error details if an error occurs.
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

    
    /**
     * Retrieves the details of an order from Klarna.
     * 
     * This method attempts to retrieve the order details with the provided data.
     * If successful, it returns the result of the order details request.
     * If the SDK initialization fails, it returns null. In case of an 
     * error during the process, it returns an object containing the error details.
     * 
     * API Reference - https://docs.klarna.com/api/ordermanagement/#operation/getOrder
     * 
     * @param data - The order ID required by Klarna.
     * @returns A promise that resolves to the result of the order details request
     *          or an object with error details if an error occurs.
     */
    async getOrderDetails(data: any): Promise<any> {
        try {
            if (super.initSDK()) {
                const payment = new Payment();
                const orderDetailsResult = await payment.getDetails(data);
                return orderDetailsResult;
            }
            return null;
        }
        catch (error: any) {
            return { hasError: true, error: error?.message };
        }
    }
}