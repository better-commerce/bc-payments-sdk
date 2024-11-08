import { Api } from "./api";
import { BCEnvironment } from "../../base/config/BCEnvironment";
import { Defaults } from "../../constants/constants";
import { RequestMethod } from "../../constants/enums/RequestMethod";

/**
 * Class {PaymentMethod} contains methods for interacting with the PaymentMethod endpoint on the CommerceHub API.
 * 
 * The methods in this class can be used to retrieve payment methods, update payment methods, and more.
 */
export class PaymentMethod {

    /**
     * Retrieves all payment methods.
     * 
     * Retrieves all payment methods based on the provided data, headers, and cookies.
     * The method makes an API call to fetch the payment methods and returns the result.
     * 
     * @param data - The data required to identify the basket.
     * @param { headers, cookies } - The headers and cookies to include in the request.
     * @returns A promise that resolves to the payment methods result or an error object if the request fails.
     */
    static async getAll(data: any, { headers, cookies }: any): Promise<any> {

        const params = { country: data?.countryCode || BCEnvironment.getDefaultCountry(), currency: data?.currencyCode || BCEnvironment.getDefaultCurrency(), basketId: data?.basketId || Defaults.Guid.Value, }
        const paymentMethodsResult = await Api.call(`api/v2/commerce/checkout/payment-methods`, RequestMethod.GET, params, headers, cookies);
        return paymentMethodsResult;
    }
}