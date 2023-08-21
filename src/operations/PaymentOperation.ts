import { IPaymentProvider } from "../base/contracts/IPaymentProvider";
import { BasePaymentOperation } from "../base/entity/BasePaymentOperation";

/**
 * Class {PaymentOperation} encapsulates generic payment provider operations.
 */
export class PaymentOperation extends BasePaymentOperation implements IPaymentProvider {

    /**
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
     * @param data 
     * @returns 
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
     * ________
     * ApplePay
     * ‾‾‾‾‾‾‾‾
     * <Not Required>
     * 
     * @param data 
     * @returns 
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
     * @param data 
     * @returns 
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