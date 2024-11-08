// Package Imports
import { ExpressCheckout } from 'bc-juspay-sdk'

// Other Imports
import { IPaymentProvider } from "../../base/contracts/IPaymentProvider";
import { BasePaymentProvider } from "../../base/entity/BasePaymentProvider";
import { IJuspayPaymentProvider } from '../../base/contracts/GatewayProviders/IJuspayPaymentProvider';
import { JuspayPaymentType } from '../../constants/enums';

/**
 * Class {JuspayPayment} is a concrete implementation of a payment provider.
 * It provides a set of methods that can be used to interact with the Juspay payment gateway.
 *
 * @class JuspayPayment
 * @extends {BasePaymentProvider}
 * @implements {IPaymentProvider}
 * @implements {IJuspayPaymentProvider}
 * 
 * @remark
 * This class is responsible for initializing the Juspay SDK and providing the 
 * concrete implementation of the Juspay payment provider methods.
 */
export class JuspayPayment extends BasePaymentProvider implements IPaymentProvider, IJuspayPaymentProvider {

    /**
     * Initializes a payment intent using the Juspay payment gateway.
     * 
     * This method initializes the SDK and attempts to create a payment intent
     * with the provided data. If successful, it returns the result of the intent
     * creation. If the SDK initialization fails, it returns null. In case of an 
     * error during the process, it returns an object containing the error details.
     * 
     * API Reference
     * - Card: https://docs.juspay.io/api-reference/docs/express-checkout/credit--debit-card-transaction
     * - UPI: https://docs.juspay.io/api-reference/docs/express-checkout/upi-transaction
     * - Net Banking: https://docs.juspay.io/api-reference/docs/express-checkout/netbanking-payment
     * - Wallet: https://docs.juspay.io/api-reference/docs/express-checkout/wallet-payment
     * 
     * @param data - The payment intent data required by Juspay.
     * @returns A promise that resolves to the result of the payment intent creation
     *          or an object with error details if an error occurs.
     */
    async initPaymentIntent(data: any): Promise<any> {
        try {
            if (super.initSDK()) {
                if (data?.paymentMode) {
                    let paymentResult: any;
                    const { paymentMode, ...rest } = data
                    switch (data?.paymentMode) {

                        case JuspayPaymentType.CARD:
                            paymentResult = await ExpressCheckout.Payment.creditDebitCardPayment({ ...rest })
                            break;

                        case JuspayPaymentType.UPI:
                            paymentResult = await ExpressCheckout.Payment.upiIntentPayment({ ...rest })
                            break;

                        case JuspayPaymentType.NET_BANKING:
                            paymentResult = await ExpressCheckout.Payment.netbankingPayment({ ...rest })
                            break;

                        case JuspayPaymentType.WALLET:
                            paymentResult = await ExpressCheckout.Payment.walletPayment({ ...rest })
                            break;
                    }
                    return paymentResult
                }
            }
            return null;
        }
        catch (error: any) {
            return { hasError: true, error: error?.message };
        }
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
                const customerDetails = await ExpressCheckout.Customer.get(data);
                return customerDetails;
            }
            return null;
        }
        catch (error: any) {
            return { hasError: true, error: error?.message };
        }
    }

    /**
     * Creates a customer in Juspay.
     * 
     * This method initializes the SDK and attempts to create a customer
     * with the provided data. If successful, it returns the result of the 
     * create customer request. If the SDK initialization fails, it returns null. 
     * In case of an error during the process, it returns an object containing 
     * the error details.
     * 
     * API Reference - https://docs.juspay.io/api-reference/docs/express-checkout/createcustomer
     * 
     * @param data - The customer data required by Juspay.
     * @returns A promise that resolves to the result of the create customer request
     *          or an object with error details if an error occurs.
     */
    async createCustomer(data: any): Promise<any> {
        try {
            if (super.initSDK()) {
                const createCustomerResult = await ExpressCheckout.Customer.create(data);
                return createCustomerResult;
            }
            return null;
        }
        catch (error: any) {
            return { hasError: true, error: error?.message };
        }
    }

    /**
     * Creates an order in Juspay.
     * 
     * This method initializes the SDK and attempts to create an order
     * with the provided data. If successful, it returns the result of the 
     * create order request. If the SDK initialization fails, it returns null. 
     * In case of an error during the process, it returns an object containing 
     * the error details.
     * 
     * API Reference - https://docs.juspay.io/api-reference/docs/express-checkout/create-order-api
     * 
     * @param data - The order data required by Juspay.
     * @returns A promise that resolves to the result of the create order request
     *          or an object with error details if an error occurs.
     */
    async createOrder(data: any): Promise<any> {
        try {
            if (super.initSDK()) {
                const createOrderResult = await ExpressCheckout.Order.create(data);
                return createOrderResult;
            }
            return null;
        }
        catch (error: any) {
            return { hasError: true, error: error?.message };
        }
    }

    /**
     * Updates an order in Juspay.
     * 
     * This method initializes the SDK and attempts to update an order
     * with the provided data. If successful, it returns the result of the
     * update order request. If the SDK initialization fails, it returns null.
     * In case of an error during the process, it returns an object containing
     * the error details.
     * 
     * API Reference - https://docs.juspay.io/api-reference/docs/express-checkout/update-order-api
     * 
     * @param data - The order data required by Juspay.
     * @returns A promise that resolves to the result of the update order request
     *          or an object with error details if an error occurs.
     */
    async updateOrder(data: any): Promise<any> {
        try {
            if (super.initSDK()) {
                const updateOrderResult = await ExpressCheckout.Order.update(data);
                return updateOrderResult;
            }
            return null;
        }
        catch (error: any) {
            return { hasError: true, error: error?.message };
        }
    }
    
    /**
     * Retrieves the card information from Juspay.
     * 
     * This method initializes the SDK and attempts to retrieve the card information
     * with the provided data. If successful, it returns the result of the card information
     * request. If the SDK initialization fails, it returns null. In case of an 
     * error during the process, it returns an object containing the error details.
     * 
     * API Reference - https://docs.juspay.io/api-reference/docs/express-checkout/card-info
     * 
     * @param data - The card data required by Juspay.
     * @returns A promise that resolves to the result of the card information request
     *          or an object with error details if an error occurs.
     */
    async getCardInfo(data: any): Promise<any> {
        try {
            if (super.initSDK()) {
                const cardInfo = await ExpressCheckout.Card.binInfo(data);
                return cardInfo;
            }
            return null;
        }
        catch (error: any) {
            return { hasError: true, error: error?.message };
        }
    }

    /**
     * Tokenizes a card using Juspay.
     * 
     * This method initializes the SDK and attempts to tokenize a card
     * with the provided data. If successful, it returns the result of the 
     * tokenization request. If the SDK initialization fails, it returns null. 
     * In case of an error during the process, it returns an object containing 
     * the error details.
     * 
     * API Reference - https://juspay.io/in/docs/api-reference/docs/express-checkout/tokenize
     * 
     * @param data - The card data required by Juspay.
     * @returns A promise that resolves to the result of the tokenization request
     *          or an object with error details if an error occurs.
     */
    async tokenizeCard(data: any): Promise<any> {
        try {
            if (super.initSDK()) {
                const tokenizeCardResult = await ExpressCheckout.Card.tokenize(data);
                return tokenizeCardResult;
            }
            return null;
        }
        catch (error: any) {
            return { hasError: true, error: error?.message };
        }
    }

    /**
     * Saves a card using Juspay.
     * 
     * This method initializes the SDK and attempts to save a card
     * with the provided data. If successful, it returns the result of the
     * save card request. If the SDK initialization fails, it returns null.
     * In case of an error during the process, it returns an object containing
     * the error details.
     * 
     * API Reference - https://docs.juspay.io/api-reference/docs/express-checkout/add-card
     * 
     * @param data - The card data required by Juspay.
     * @returns A promise that resolves to the result of the save card request
     *          or an object with error details if an error occurs.
     */
    async saveCard(data: any): Promise<any> {
        try {
            if (super.initSDK()) {
                const addCardResult = await ExpressCheckout.Card.create(data);
                return addCardResult;
            }
            return null;
        }
        catch (error: any) {
            return { hasError: true, error: error?.message };
        }
    }

    /**
     * Deletes a card using Juspay.
     * 
     * This method initializes the SDK and attempts to delete a card
     * with the provided data. If successful, it returns the result of the
     * delete card request. If the SDK initialization fails, it returns null.
     * In case of an error during the process, it returns an object containing
     * the error details.
     * 
     * API Reference - https://docs.juspay.io/api-reference/docs/express-checkout/delete-card
     * 
     * @param data - The card data required by Juspay.
     * @returns A promise that resolves to the result of the delete card request
     *          or an object with error details if an error occurs.
     */
    async deleteCard(data: any): Promise<any> {
        try {
            if (super.initSDK()) {
                const deleteCardResult = await ExpressCheckout.Card.delete(data);
                return deleteCardResult;
            }
            return null;
        }
        catch (error: any) {
            return { hasError: true, error: error?.message };
        }
    }

    /**
     * Retrieves the cards associated with the merchant from Juspay.
     * 
     * This method initializes the SDK and attempts to retrieve the cards
     * with the provided data. If successful, it returns the result of the cards
     * request. If the SDK initialization fails, it returns null. In case of an 
     * error during the process, it returns an object containing the error details.
     * 
     * API Reference - https://docs.juspay.io/api-reference/docs/express-checkout/list-stored-cards
     * 
     * @param data - The card data required by Juspay.
     * @returns A promise that resolves to the result of the cards request
     *          or an object with error details if an error occurs.
     */
    async getCards(data: any): Promise<any> {
        try {
            if (super.initSDK()) {
                const listStoredCardsResult = await ExpressCheckout.Card.listAll(data);
                return listStoredCardsResult;
            }
            return null;
        }
        catch (error: any) {
            return { hasError: true, error: error?.message };
        }
    }

    /**
     * Verifies a VPA using Juspay.
     * 
     * This method initializes the SDK and attempts to verify a VPA
     * with the provided data. If successful, it returns the result of the 
     * verification request. If the SDK initialization fails, it returns null. 
     * In case of an error during the process, it returns an object containing 
     * the error details.
     * 
     * API Reference - https://docs.juspay.io/api-reference/docs/express-checkout/verify-vpa
     * 
     * @param data - The VPA data required by Juspay.
     * @returns A promise that resolves to the result of the verification request
     *          or an object with error details if an error occurs.
     */
    async verifyVPA(data: any): Promise<any> {
        try {
            if (super.initSDK()) {
                const listStoredCardsResult = await ExpressCheckout.UPI.verifyVPA(data);
                return listStoredCardsResult;
            }
            return null;
        }
        catch (error: any) {
            return { hasError: true, error: error?.message };
        }
    }

    /**
     * Retrieves the offers associated with the merchant from Juspay.
     * 
     * This method initializes the SDK and attempts to retrieve the offers
     * with the provided data. If successful, it returns the result of the offers
     * request. If the SDK initialization fails, it returns null. In case of an 
     * error during the process, it returns an object containing the error details.
     * 
     * API Reference - https://docs.juspay.io/api-reference/docs/express-checkout/offer-list
     * 
     * @param data - The offer data required by Juspay.
     * @returns A promise that resolves to the result of the offers request
     *          or an object with error details if an error occurs.
     */
    async getOffers(data: any): Promise<any> {
        try {
            if (super.initSDK()) {
                const listStoredCardsResult = await ExpressCheckout.Offers.list(data);
                return listStoredCardsResult;
            }
            return null;
        }
        catch (error: any) {
            return { hasError: true, error: error?.message };
        }
    }
}