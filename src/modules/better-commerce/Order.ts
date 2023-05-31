import { Api } from "./api";
import { BCEnvironment } from "../../base/config/BCEnvironment";
import { Defaults } from "../../constants/constants";
import { RequestMethod } from "../../constants/enums/RequestMethod";

/**
 * Class {PaymentResponse}
 */
export class Order {

    static async get(data: any, { headers, cookies }: any): Promise<any> {

        const params = {
            country: data?.countryCode || BCEnvironment.getDefaultCountry(),
            currency: data?.currencyCode || BCEnvironment.getDefaultCurrency(),
            basketId: data?.basketId || Defaults.Guid.Value,
        }
        const orderResult = await Api.call(`api/v2/commerce/order/${data}`, RequestMethod.GET, params, headers, cookies);
        return orderResult;
    }
}