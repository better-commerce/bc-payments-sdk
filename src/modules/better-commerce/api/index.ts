import fetcher from "./util/fetcher";
import { RequestMethod } from "../../../constants/enums/RequestMethod";
import { BCEnvironment } from "../../../base/config/BCEnvironment";

/**
 * Class {Api}
 */
export class Api {

    static async call(url: string, method: string, params?: any, headers?: any, cookies?: any): Promise<any> {

        let options = {
            url,
            method,
            headers,
            cookies,
            baseUrl: BCEnvironment.baseApiUrl,
        };

        if (params) {
            if (method?.toUpperCase() === RequestMethod.GET) {
                options = {
                    ...options,
                    ...{ params: params },
                };
            } else if (method?.toUpperCase() === RequestMethod.POST || method?.toUpperCase() === RequestMethod.PUT) {
                options = {
                    ...options,
                    ...{ data: params },
                };
            }
        }

        return await fetcher(options);
    }
}