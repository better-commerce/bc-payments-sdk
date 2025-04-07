import { SDKs } from "../../../../SDKs/lib"

export default interface IPayment {

    /**
     * Initiate a payment.
     * @param data {IPaymentIntent}
     */
    initIntent(data: SDKs.Klarna.Domain.Models.IPaymentIntent): any;

    /**
     * Create a one-time payment order.
     * @param data {Object}
     */
    createOneTimePaymentOrder(data: any): any;

    /**
     * Get the details of an order. An order that has the given order id.
     * API Reference - https://docs.klarna.com/api/ordermanagement/#operation/getOrder
     * @param data {String}
     * @returns 
     */
    getDetails(data: any): any;
}