import fetcher from "./util/fetcher";
import { RequestMethod } from "../../../enums";
import { BCEnvironment } from "../../../config/BCEnvironment";

/**
 * The {Api} class provides methods to make HTTP requests using specified parameters.
 * It integrates with the fetcher utility to handle HTTP requests and responses,
 * offering a consistent interface for interacting with external APIs.
 * 
 * @remark
 * This class assumes that the fetcher utility handles exceptions and errors,
 * and it is designed to work seamlessly with the BCEnvironment configuration.
 */
export default class Api {

    /**
     * Makes an HTTP request using the specified parameters and returns the response data or an error object.
     *
     * @param {string} url - The endpoint URL for the request.
     * @param {string} method - The HTTP method to use (e.g., 'post', 'get').
     * @param {object} params - The data to send in the request body (for POST/PUT requests) or as query parameters (for GET requests).
     * @param {object} headers - The headers to include in the request.
     * @param {object} cookies - Cookies to use for setting additional headers like Currency, Language, etc.
     *
     * @returns {Promise<any>} The response data if the request is successful, or an error object if it fails.
     *
     * @throws {InvalidRequestException} If the response status is 400 or 404.
     * @throws {AuthenticationException} If the response status is 401.
     * @throws {APIException} For any other non-2xx response status.
     */
    static async call(url: string, method: string, params?: any, headers?: any, cookies?: any): Promise<any> {

        let options = { url, method, headers, cookies, baseUrl: BCEnvironment.baseApiUrl, };

        if (params) {
            if (method?.toUpperCase() === RequestMethod.GET) {
                options = { ...options, ...{ params: params }, };
            } else if (method?.toUpperCase() === RequestMethod.POST || method?.toUpperCase() === RequestMethod.PUT) {
                options = { ...options, ...{ data: params }, };
            }
        }

        return await fetcher(options);
    }
}