import { Domain } from "../../../../src";
import { SDKs } from "../../../../SDKs/lib"

export default class Order implements SDKs.Paypal.Domain.Contracts.IOrder {

    /**
     * Show order details. Shows details for an order, by ID.
     * 
     * API Reference - https://developer.paypal.com/docs/api/orders/v2/#orders_get
     * 
     * @param id The ID of the order to show.
     * @returns The order details.
     */
    async get(id: string): Promise<any> {
        const getOrderResult = await SDKs.Paypal.Infra.Core.API.call(`v2/checkout/orders/${id}`, Domain.Enums.RequestMethod.GET);
        return getOrderResult;
    }
}