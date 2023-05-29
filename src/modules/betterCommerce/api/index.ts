import fetcher from "./util/fetcher";
import { RequestOptions } from "../../../base/entity/RequestOptions";
import { RequestMethod } from "../../../constants/enums/RequestMethod";
import { BCEnvironment } from "../../../base/config/BCEnvironment";

/**
 * Class {Api}
 */
export class Api {

    static async call(url: string, method: string, params?: any, cookies?: any, requestOptions?: RequestOptions): Promise<any> {

        if (requestOptions == undefined) {
            requestOptions = RequestOptions.createDefault();
        }

        let options = {
            url,
            method,
            cookies,
            baseUrl: BCEnvironment.baseApiUrl,
        };

        if (params) {
            if (method?.toUpperCase() === RequestMethod.GET) {
                options = {
                    ...options,
                    ...{ params: params },
                };
            } else if (method?.toUpperCase() === RequestMethod.POST) {
                options = {
                    ...options,
                    ...{ data: params },
                };
            }
        }

        return await fetcher(options);
    }
}