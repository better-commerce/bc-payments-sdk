import { Api } from "./api";
import { BCEnvironment } from "../../base/config/BCEnvironment";
import { Defaults } from "../../constants/constants";
import { RequestMethod } from "../../constants/enums/RequestMethod";

/**
 * The {Order} class provides methods for interacting with the Order endpoint on the CommerceHub API.
 */
export class Order {

    /**
     * Retrieves the details of an order using the specified data.
     * 
     * This method makes an API call to fetch order information based on the provided
     * data, headers, and cookies. It constructs a set of parameters including country,
     * currency, and basket ID, which are used in the API request.
     * 
     * @param data - The data required to identify the order.
     * @param headers - The headers to include in the request.
     * @param cookies - Cookies to use for setting additional headers like Currency, Language, etc.
     * @returns A promise that resolves to the order details or an error object if the request fails.
     */
    static async get(data: any, { headers, cookies }: any): Promise<any> {

        const params = { country: data?.countryCode || BCEnvironment.getDefaultCountry(), currency: data?.currencyCode || BCEnvironment.getDefaultCurrency(), basketId: data?.basketId || Defaults.Guid.Value, }
        const orderResult = await Api.call(`api/v2/commerce/order/${data}`, RequestMethod.GET, params, headers, cookies);
        return orderResult;
    }
}