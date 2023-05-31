import { Api } from "./api";
import { BCEnvironment } from "../../base/config/BCEnvironment";
import { Defaults } from "../../constants/constants";
import { RequestMethod } from "../../constants/enums/RequestMethod";

/**
 * Class {PaymentResponse}
 */
export class PaymentMethod {

    static async getAll(data: any): Promise<any> {

        const params = {
            country: data?.countryCode || BCEnvironment.getDefaultCountry(),
            currency: data?.currencyCode || BCEnvironment.getDefaultCurrency(),
            basketId: data?.basketId || Defaults.Guid.Value,
        }
        const paymentResponseResult = await Api.call(`api/v2/commerce/checkout/payment-methods`, RequestMethod.GET, params);
        return paymentResponseResult;
    }
}