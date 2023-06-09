import { RequestMethod } from "../../constants/enums/RequestMethod";
import { Api } from "./api";

/**
 * Class {Checkout}
 */
export class Checkout {

    /**
     * Convert basket into an order.
     * API Reference - https://api20.bettercommerce.io/swagger/ui/index#!/Checkout/CheckoutConvertBasket
     * @param data 
     */
    static async convertOrder(data: any, { headers, cookies }: any): Promise<any> {
        console.log("createOrderInput", { ...data, ...{ headers, cookies } });
        const createOrderResult = await Api.call(`api/v2/commerce/checkout/${data?.basketId}/convert`, RequestMethod.POST, data, headers, cookies);
        console.log("createOrderResult", createOrderResult);
        return createOrderResult;
    }

    /**
     * Update order payment response received from payment gateway.
     * API Reference - https://api20.bettercommerce.io/swagger/ui/index#!/Checkout/CheckoutUpdatePaymentResponse
     * @param data 
     * @returns 
     */
    static async updatePaymentResponse(data: any, { headers, cookies }: any): Promise<any> {
        console.log("paymentResponseInput", { ...data, ...{ headers, cookies } });
        const paymentResponseResult = await Api.call(`api/v2/commerce/checkout/${data?.orderId}/payment-response`, RequestMethod.PUT, data, headers, cookies);
        console.log("paymentResponseResult", paymentResponseResult);
        return paymentResponseResult;
    }
}