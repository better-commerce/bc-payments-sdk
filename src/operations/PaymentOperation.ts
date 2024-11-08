import { IPaymentProvider } from "../base/contracts/IPaymentProvider";
import { BasePaymentOperation } from "../base/entity/BasePaymentOperation";

/**
 * Class {PaymentOperation} contains the payment operation methods for all the gateway providers.
 * 
 * @class PaymentOperation
 * @extends {BasePaymentOperation}
 * @implements {IPaymentProvider}
 */
export class PaymentOperation extends BasePaymentOperation implements IPaymentProvider {
    
    /**
     * Initiates a payment intent using the appropriate payment provider.
     * 
     * The method attempts to retrieve a payment provider object and then calls its `initPaymentIntent` method 
     * with the provided data. If successful, it returns the result of the payment intent initialization. 
     * Otherwise, it catches any errors that occur during the process and returns an error object.
     * 
     * ________
     * CHECKOUT
     * ‾‾‾‾‾‾‾‾
     * <Not Required>
     * 
     * ________
     * CLEARPAY
     * ‾‾‾‾‾‾‾‾
     * Initiate a payment. This endpoint creates a checkout that is used to initiate the Clearpay payment process. Clearpay uses the information in the order request to assist with the consumer’s pre-approval process.
     * API Reference - https://developers.clearpay.co.uk/clearpay-online/reference/create-checkout
     * 
     * ______
     * KLARNA
     * ‾‾‾‾‾‾
     * Initiate a payment. 
     * API Reference - https://docs.klarna.com/klarna-payments/integrate-with-klarna-payments/step-1-initiate-a-payment/
     * 
     * ______
     * PAYPAL
     * ‾‾‾‾‾‾
     * <Not Required>
     * 
     * ______
     * STRIPE
     * ‾‾‾‾‾‾
     * Create a PaymentIntent. Creates a PaymentIntent object.
     * API Reference - https://api-reference.checkout.com/#operation/requestAPaymentOrPayout
     * 
     * ________
     * ApplePay
     * ‾‾‾‾‾‾‾‾
     * <Not Required>
     * 
     * @param data - The payment intent data required by the payment provider.
     * @returns A promise that resolves to the result of the payment intent initialization or an error object in case of a failure.
     */
    async initPaymentIntent(data: any): Promise<any> {
        try {
            const obj = this.getObject();
            if (obj) {
                const requestPaymentResult = await obj.initPaymentIntent(data);
                return requestPaymentResult;
            }
        } catch (error: any) {
            return { hasError: true, error: error };
        }
        return null;
    }

 
    /**
     * Requests a payment or payout from the appropriate payment provider.
     * 
     * The method attempts to retrieve a payment provider object and then calls its `requestPayment` method 
     * with the provided data. If successful, it returns the result of the payment request. Otherwise, it catches any errors that occur during the process and returns an error object.
     * 
     * ________
     * CHECKOUT
     * ‾‾‾‾‾‾‾‾
     * Request a payment or payout. Sends a request for payment or payout.
     * API Reference - https://api-reference.checkout.com/#operation/requestAPaymentOrPayout
     * 
     * ________
     * CLEARPAY
     * ‾‾‾‾‾‾‾‾
     * Capture Full Payment. This endpoint performs a payment capture for the full value of the payment plan.
     * API Reference - https://developers.clearpay.co.uk/clearpay-online/reference/capture-full-payment
     * 
     * ______
     * KLARNA
     * ‾‾‾‾‾‾
     * <Not Required>
     * 
     * ______
     * PAYPAL
     * ‾‾‾‾‾‾
     * <Not Required>
     * 
     * ______
     * STRIPE
     * ‾‾‾‾‾‾
     * <Not Required>
     * 
     * _________________
     * Checkout ApplePay
     * ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
     * Request a payment or payout. Sends a request for payment or payout.
     * API Reference - https://www.checkout.com/docs/payments/add-payment-methods/apple-pay#Endpoints_2
     * 
     * @param data - The payment data required by the payment provider.
     * @returns A promise that resolves to the result of the payment request or an error object in case of a failure.
     */
    async requestPayment(data: any): Promise<any> {
        try {
            const obj = this.getObject();
            if (obj) {
                const requestPaymentResult = await obj.requestPayment(data);
                return requestPaymentResult;
            }
        } catch (error: any) {
            return { hasError: true, error: error };
        }
        return null;
    }

    
    /**
     * Get order details. Returns the details of an order based on the order ID.
     * 
     * ________
     * CHECKOUT
     * ‾‾‾‾‾‾‾‾
     * Get payment details. Returns the details of the payment with the specified identifier string.
     * API Reference - https://api-reference.checkout.com/#operation/getPaymentDetails
     * 
     * ________
     * CLEARPAY
     * ‾‾‾‾‾‾‾‾
     * Get Payment By Order ID. This endpoint retrieves an individual payment along with its order details.
     * API Reference - https://developers.clearpay.co.uk/clearpay-online/reference/get-payment-by-order-id
     * 
     * ______
     * KLARNA
     * ‾‾‾‾‾‾
     * Get the details of an order. An order that has the given order id.
     * API Reference - https://docs.klarna.com/api/ordermanagement/#operation/getOrder
     * 
     * ______
     * PAYPAL
     * ‾‾‾‾‾‾
     * Show order details. Shows details for an order, by ID.
     * API Reference - https://developer.paypal.com/docs/api/orders/v2/#orders_get
     * 
     * ______
     * STRIPE
     * ‾‾‾‾‾‾
     * Retrieve a PaymentIntent. Retrieves the details of a PaymentIntent that has previously been created.
     * API Reference - https://stripe.com/docs/api/payment_intents/retrieve
     * 
     * ________
     * ApplePay
     * ‾‾‾‾‾‾‾‾
     * <Not Required>
     *
     * @param data - The order ID required by the payment provider.
     * @returns A promise that resolves to the result of the order details request or an error object in case of a failure.
     */
    async getOrderDetails(data: any): Promise<any> {
        try {
            const obj = this.getObject();
            if (obj) {
                const orderResult = await obj.getOrderDetails(data);
                return orderResult;
            }
        } catch (error: any) {
            return { hasError: true, error: error };
        }
        return null;
    }
}