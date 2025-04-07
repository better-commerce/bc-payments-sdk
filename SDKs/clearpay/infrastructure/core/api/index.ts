import { SDKs } from "../../../../../SDKs/lib";
import { Domain } from "../../../../../src";
import fetcher from "./fetcher";

/**
 * Class {Api} is the entry point for making requests to the ClearPay API.
 * This class provides a convenient interface for making API calls.
 */
export default class Api {

    /**
     * Make a request to the ClearPay API.
     * @param url The endpoint to call.
     * @param method The HTTP method to use.
     * @param params If the method is GET, these are the query parameters. If the method is POST, these are the request body.
     * @param cookies Cookies to send with the request.
     * @returns The response from the ClearPay API.
     */
    static async call(url: string, method: string, params?: any, cookies?: any): Promise<any> {

        let options = { url, method, cookies, baseUrl: SDKs.Clearpay.Config.ClearPayEnvironment.baseUrl, };

        if (params) {
            if (method?.toUpperCase() === Domain.Enums.RequestMethod.GET) {
                options = { ...options, ...{ params: params }, };
            } else if (method?.toUpperCase() === Domain.Enums.RequestMethod.POST) {
                options = { ...options, ...{ data: params }, };
            }
        }

        return await fetcher(options);
    }
}