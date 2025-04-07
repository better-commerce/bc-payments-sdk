import { SDKs } from "../../../../SDKs/lib"
import { Utils, Domain } from "../../../../src";

export default class Payment implements SDKs.Klarna.Domain.Contracts.IPayment {
    
    /**
     * Initiates a payment intent session with the provided payment data.
     * 
     * API Reference - https://docs.klarna.com/klarna-payments/integrate-with-klarna-payments/step-1-initiate-a-payment/
     * 
     * @param data - The payment intent data containing details such as order amount, tax amount, 
     *               order lines, and other related information.
     * @returns A promise resolving to the result of the payment intent creation or an error object 
     *          if an exception occurs.
     */
    async initIntent(data: SDKs.Klarna.Domain.Models.IPaymentIntent): Promise<any> {
        try {
            const inputData = {
                ...data,
                order_amount: Utils.AppUtil.sanitizeAmount(data?.order_amount),
                order_tax_amount: Utils.AppUtil.sanitizeAmount(data?.order_tax_amount),
                order_lines: data?.order_lines?.map((x: SDKs.Klarna.Domain.Models.IOrderLine) => ({
                    type: x?.type,
                    reference: x?.reference,
                    name: x?.name,
                    quantity: x?.quantity,
                    unit_price: Utils.AppUtil.sanitizeAmount(x?.unit_price),
                    tax_rate: Utils.AppUtil.sanitizeAmount(x?.tax_rate),
                    total_amount: Utils.AppUtil.sanitizeAmount(x?.total_amount),
                    total_discount_amount: Utils.AppUtil.sanitizeAmount(x?.total_discount_amount),
                    total_tax_amount: Utils.AppUtil.sanitizeAmount(x?.total_tax_amount),
                    image_url: x?.image_url,
                    product_url: x?.product_url,
                })),
            };
            const paymentIntentResult = await SDKs.Klarna.Infra.Core.API.call("payments/v1/sessions", Domain.Enums.RequestMethod.POST, inputData);
            return paymentIntentResult;
        } catch (error) {
            return { hasError: true, error: error };
        }
    }

    
    /**
     * Create a one-time payment order.
     * 
     * API Reference - https://docs.klarna.com/klarna-payments/integrate-with-klarna-payments/step-3-create-an-order/create-a-one-time-payment-order/
     * 
     * @param data - The payment order data containing details such as order amount, tax amount, 
     *               order lines, and other related information.
     * @returns A promise resolving to the result of the payment order creation or an error object 
     *          if an exception occurs.
     */
    async createOneTimePaymentOrder(data: any): Promise<any> {
        try {
            const { authorizationToken, ...rest } = data;
            console.log("createOneTimePaymentOrder [data]", data);
            const inputData = {
                ...rest,
                order_amount: Utils.AppUtil.sanitizeAmount(data?.order_amount),
                order_tax_amount: Utils.AppUtil.sanitizeAmount(data?.order_tax_amount),
                order_lines: data?.order_lines?.map((x: SDKs.Klarna.Domain.Models.IOrderLine) => ({
                    type: x?.type,
                    reference: x?.reference,
                    name: x?.name,
                    quantity: x?.quantity,
                    unit_price: Utils.AppUtil.sanitizeAmount(x?.unit_price),
                    tax_rate: Utils.AppUtil.sanitizeAmount(x?.tax_rate),
                    total_amount: Utils.AppUtil.sanitizeAmount(x?.total_amount),
                    total_discount_amount: Utils.AppUtil.sanitizeAmount(x?.total_discount_amount),
                    total_tax_amount: Utils.AppUtil.sanitizeAmount(x?.total_tax_amount),
                    image_url: x?.image_url,
                    product_url: x?.product_url,
                })),
            };
            const paymentOrderResult = await SDKs.Klarna.Infra.Core.API.call(`payments/v1/authorizations/${authorizationToken}/order`, Domain.Enums.RequestMethod.POST, inputData);
            return paymentOrderResult;
        } catch (error) {
            return { hasError: true, error: error };
        }
    }

    /**
     * Get the details of an order. An order that has the given order id.
     * 
     * API Reference - https://docs.klarna.com/api/ordermanagement/#operation/getOrder
     * 
     * @param data - The order id of the order to get the details for.
     * @returns A promise resolving to the order details or an error object if an exception occurs.
     */
    async getDetails(data: any): Promise<any> {
        try {
            const orderResult = await SDKs.Klarna.Infra.Core.API.call(`ordermanagement/v1/orders/${data}`, Domain.Enums.RequestMethod.GET);
            return orderResult;
        } catch (error) {
            return { hasError: true, error: error };
        }
    }
}