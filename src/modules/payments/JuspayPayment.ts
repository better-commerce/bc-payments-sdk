// Package Imports
import { ExpressCheckout } from 'bc-juspay-sdk'

// Other Imports
import { IPaymentProvider } from "../../base/contracts/IPaymentProvider";
import { BasePaymentProvider } from "../../base/entity/BasePaymentProvider";
import { IJuspayPaymentProvider } from '../../base/contracts/GatewayProviders/IJuspayPaymentProvider';

export class JuspayPayment extends BasePaymentProvider implements IPaymentProvider, IJuspayPaymentProvider {

    initPaymentIntent(data: any) {
        throw new Error("Method not implemented.");
    }

    requestPayment(data: any) {
        throw new Error("Method not implemented.");
    }

    /**
     * Retrieves the details of an order from Juspay.
     * 
     * This method attempts to retrieve the order details with the provided data.
     * If successful, it returns the result of the order details request.
     * If the SDK initialization fails, it returns null. In case of an 
     * error during the process, it returns an object containing the error details.
     * 
     * API Reference - https://docs.juspay.io/api-reference/docs/express-checkout/order-status-api
     * 
     * @param data - The order ID required by Juspay.
     * @returns A promise that resolves to the result of the order details request
     *          or an object with error details if an error occurs.
     */
    async getOrderDetails(data: any): Promise<any> {
        try {
            if (super.initSDK()) {
                const orderDetailsResult = await ExpressCheckout.Order.get(data);
                return orderDetailsResult;
            }
            return null;
        }
        catch (error: any) {
            return { hasError: true, error: error?.message };
        }
    }

    /**
     * Retrieves the payment methods available for the merchant from Juspay.
     * 
     * This method attempts to retrieve the payment methods with the provided data.
     * If successful, it returns the result of the payment methods request.
     * If the SDK initialization fails, it returns null. In case of an 
     * error during the process, it returns an object containing the error details.
     * 
     * API Reference - https://docs.juspay.io/api-reference/docs/express-checkout/payment-methods
     * 
     * @param data - The payment method data required by Juspay.
     * @returns A promise that resolves to the result of the payment methods request
     *          or an object with error details if an error occurs.
     */
    async getPaymentMethods(data: any): Promise<any> {
        try {
            if (super.initSDK()) {
                const paymentMethods = await ExpressCheckout.Merchant.paymentMethods(data);
                return paymentMethods;
            }
            return null;
        }
        catch (error: any) {
            return { hasError: true, error: error?.message };
        }
    }

    /**
     * Retrieves the customer details from Juspay.
     * 
     * This method attempts to retrieve the customer details with the provided data.
     * If successful, it returns the result of the customer details request.
     * If the SDK initialization fails, it returns null. In case of an 
     * error during the process, it returns an object containing the error details.
     * 
     * API Reference - https://docs.juspay.io/api-reference/docs/express-checkout/getcustomer
     * 
     * @param data - The customer ID required by Juspay.
     * @returns A promise that resolves to the result of the customer details request
     *          or an object with error details if an error occurs.
     */
    async getCustomer(data: any): Promise<any> {
        try {
            if (super.initSDK()) {
                const paymentMethods = await ExpressCheckout.Customer.get(data);
                return paymentMethods;
            }
            return null;
        }
        catch (error: any) {
            return { hasError: true, error: error?.message };
        }
    }
}