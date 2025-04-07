import { SDKs } from "../../../../../SDKs/lib";
import { Domain } from "../../../../../src";
import fetcher from "./fetcher";

/**
 * Class {Api}
 */
export default class Api {

    static async call(url: string, method: string, params?: any, cookies?: any): Promise<any> {

        let options = {
            url,
            method,
            cookies,
            baseUrl: SDKs.Klarna.Config.KlarnaEnvironment.baseUrl,
        };

        if (params) {
            if (method?.toUpperCase() === Domain.Enums.RequestMethod.GET) {
                options = {
                    ...options,
                    ...{ params: params },
                };
            } else if (method?.toUpperCase() === Domain.Enums.RequestMethod.POST) {
                options = {
                    ...options,
                    ...{ data: params },
                };
            }
        }

        return await fetcher(options);
    }
}