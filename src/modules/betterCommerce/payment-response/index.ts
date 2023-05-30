import { RequestMethod } from "../../../constants/enums/RequestMethod";
import { Api } from "../api";

/**
 * Class {PaymentResponse}
 */
export class PaymentResponse {

    static async put(data: any): Promise<any> {

        const paymentResponseResult = await Api.call(`api/v2/commerce/checkout/${data?.orderId}/payment-response`, RequestMethod.PUT, data);
        return paymentResponseResult;
    }
}