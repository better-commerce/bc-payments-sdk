import { Api } from "./api";
import { RequestMethod } from "../../constants/enums/RequestMethod";

/**
 * Class {Checkout} contains methods that can be used to interact with the Checkout 
 * module on the CommerceHub platform.
 * 
 * The methods in this class can be used to convert a basket into an order, 
 * update the payment response for a given order, and more.
 */
export class Checkout {

    
    /**
     * Converts a basket into an order on the CommerceHub platform.
     * API Reference - https://api20.bettercommerce.io/swagger/ui/index#!/Checkout/CheckoutConvertBasket
     * @param data - The data which contains the basket id
     * @param {Object} options - The options object that contains headers and cookies
     * @returns The order details response from the CommerceHub platform
     */
    static async convertOrder(data: any, { headers, cookies }: any): Promise<any> {
        console.log("createOrderInput", { ...data, ...{ headers, cookies } });
        const createOrderResult = await Api.call(`api/v2/commerce/checkout/${data?.basketId}/convert`, RequestMethod.POST, data, headers, cookies);
        console.log("createOrderResult", createOrderResult);
        return createOrderResult;
    }

    
    /**
     * Updates the payment response in the database based on the payment response data.
     * API Reference - https://api20.bettercommerce.io/swagger/ui/index#!/Checkout/CheckoutUpdatePaymentResponse
     * @param data - The data which contains the payment response data
     * @param {Object} options - The options object that contains headers and cookies
     * @returns The payment response result from the CommerceHub platform
     */
    static async updatePaymentResponse(data: any, { headers, cookies }: any): Promise<any> {
        console.log("paymentResponseInput", { ...data, ...{ headers, cookies } });
        const { model: paymentResponsePayload } = data;
        const paymentResponseResult = await Api.call(`api/v2/commerce/checkout/${data?.orderId}/payment-response`, RequestMethod.PUT, paymentResponsePayload, headers, cookies);
        return paymentResponseResult;
    }
}