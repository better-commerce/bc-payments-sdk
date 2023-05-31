import { RequestMethod } from "../../constants/enums/RequestMethod";
import { Api } from "./api";

/**
 * Class {PaymentResponse}
 */
export class PaymentResponse {

    static async put(data: any, { headers, cookies }: any): Promise<any> {
        console.log("paymentResponseInput", { ...data, ...{ headers, cookies } });
        const paymentResponseResult = await Api.call(`api/v2/commerce/checkout/${data?.orderId}/payment-response`, RequestMethod.PUT, data, headers, cookies);
        console.log("paymentResponseResult", paymentResponseResult);
        return paymentResponseResult;
    }
}