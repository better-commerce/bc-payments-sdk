import { Utils } from "../../../../src";
import { SDKs } from "../../../lib";

/**
 * Class {Payment} implements the IPayment interface and provides concrete implementation of all the methods.
 * 
 * @class Payment
 * @implements {IPayment}
 */
export default class Payment implements SDKs.Stripe.Domain.Contracts.IPayment {
    
    /**
     * Create a PaymentIntent. Creates a PaymentIntent object.
     * 
     * API Reference - https://stripe.com/docs/api/payment_intents/create
     * 
     * @param data {Object}
     * @returns {Promise<any>}
     */
    async initIntent(data: any): Promise<any> {
        try {
            const secretKey = SDKs.Stripe.Config.StripeEnvironment.getSecretKey();
            const stripe = require("stripe")(secretKey);
            const paymentIntentResult = await stripe.paymentIntents.create({ ...data, ...{ amount: Utils.AppUtil.sanitizeAmount(data?.amount) } });
            return paymentIntentResult;
        } catch (error) {
            return { hasError: true, error: error };
        }
    }

    /**
     * Retrieve a PaymentIntent. Retrieves the details of a PaymentIntent that has previously been created.
     * 
     * API Reference - https://stripe.com/docs/api/payment_intents/retrieve
     * 
     * @param data {String}
     * @returns {Promise<any>}
     */
    async getDetails(data: any): Promise<any> {
        try {
            const secretKey = SDKs.Stripe.Config.StripeEnvironment.getSecretKey();
            const stripe = require("stripe")(secretKey);
            const paymentDetailsResult = await stripe.paymentIntents.retrieve(data);
            return paymentDetailsResult;
        } catch (error) {
            return { hasError: true, error: error };
        }
    }
}