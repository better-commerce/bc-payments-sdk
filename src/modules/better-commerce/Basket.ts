import { Api } from "./api";
import { RequestMethod } from "../../constants/enums/RequestMethod";

/**
 * Class {Basket} contains methods that can be used to interact with the Basket 
 * module on the CommerceHub platform.
 * 
 * The methods in this class can be used to convert a basket into an order, 
 * update the payment response for a given order, and more.
 */
export class Basket {

    
    /**
     * Gets a basket on the CommerceHub platform.
     * API Reference - https://api20.bettercommerce.io/swagger/ui/index#!/Basket/BasketGetById
     * @param data - The data which contains the basket id
     * @param {Object} options - The options object that contains headers and cookies
     * @returns The order details response from the CommerceHub platform
     */
    static async get(data: any, { headers, cookies }: any): Promise<any> {
        console.log("getBasketInput", { ...data, ...{ headers, cookies } });
        const getBasketResult = await Api.call(`api/v2/commerce/basket/${data?.basketId}`, RequestMethod.GET, data, headers, cookies);
        console.log("getBasketResult", getBasketResult);
        return getBasketResult;
    }
}