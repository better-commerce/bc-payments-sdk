import { SDKs } from "../../../../../SDKs/lib";
import { Infra, Domain } from "../../../../../src";

const axios = Infra.API.default

const SingletonFactory = (function () {
    let accessToken = '';
    const axiosInstance = axios.create({
        baseURL: SDKs.Clearpay.Config.ClearPayEnvironment.baseUrl,
        withCredentials: true,
    });

    axiosInstance.interceptors.request.use(
        (config: any) => {
            //const token = getToken();
            //this is to be changed when we implement currency / language switcher
            //if (token) {
            const auth = Buffer.from(`${SDKs.Clearpay.Config.ClearPayEnvironment.getUserId()}:${SDKs.Clearpay.Config.ClearPayEnvironment.getPassword()}`).toString("base64");
            config.headers['Authorization'] = 'Basic ' + auth;
            //}
            return config;
        },
        (err) => Promise.reject(err)
    );
    return { axiosInstance };
})()

const axiosInstance = SingletonFactory.axiosInstance;

Object.freeze(axiosInstance)

/**
 * Makes a HTTP request using the specified parameters and returns the response.
 * Utilizes Axios instance with pre-configured authentication and base URL.
 * 
 * @param {Object} options - Options for the HTTP request.
 * @param {string} options.url - The endpoint URL to be requested.
 * @param {string} options.method - The HTTP method to be used (default: 'post').
 * @param {Object} options.data - The request payload for POST requests.
 * @param {Object} options.params - The query parameters for GET requests.
 * @param {Object} options.headers - Custom headers to be sent with the request.
 * @param {Object} options.cookies - Cookies to be sent with the request.
 * @param {string} options.baseUrl - Optional base URL to override the default.
 * 
 * @returns {Promise<any>} - Resolves with the response body if the request is successful.
 *                           Resolves with an error object if the request fails.
 * 
 * @throws {InvalidRequestException} - When the request results in a 400 or 404 error.
 * @throws {AuthenticationException} - When the request results in a 401 error.
 * @throws {APIException} - For other server-side errors.
 */
const fetcher = async ({ url = '', method = 'post', data = {}, params = {}, headers = {}, cookies = {}, baseUrl = "", }: any) => {
    const computedUrl = new URL(url, baseUrl || SDKs.Clearpay.Config.ClearPayEnvironment.getBaseUrl());
    const config: any = {
        method: method,
        url: computedUrl.href,
        headers,
    };

    if (Object.keys(params).length) {
        config.params = params;
    }

    if (Object.keys(data).length) {
        config.data = data;
    }
    // console.log(config)
    try {
        const response = await axiosInstance(config);

        let responseCode: any = response.status;
        let responseBody = response.data;
        if (responseCode >= 200 && responseCode < 300) {
            return responseBody;
        } else {
            let status: any = undefined;
            let errorCode: any = undefined;
            let errorMessage: any = undefined;

            if (responseBody != undefined) {
                if ("status" in responseBody != undefined) {
                    status = responseBody.status;
                }

                if ("error_code" in responseBody != undefined) {
                    errorCode = responseBody.error_code;
                }

                if ("error_message" in responseBody != undefined) {
                    errorMessage = responseBody.error_message;
                }
            }
            switch (responseCode) {
                case 400:
                case 404:
                    throw new Domain.Entity.InvalidRequestException(responseCode, status, errorCode, errorMessage);

                case 401:
                    throw new Domain.Entity.AuthenticationException(responseCode, status, errorCode, errorMessage);

                default:
                    throw new Domain.Entity.APIException(responseCode, "internal_error", "internal_error", "Something went wrong.");
            }
        }
    } catch (error: any) {
        let errorData = {};

        if (error.response) {
            //errorData = error.response;
            errorData = {
                //headers: error.response.headers,
                status: error.response.status,
                data: error.response.data,
            };

            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        } else if (error.request) {
            errorData = error.request;

            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request);
        } else {
            errorData = error.message;

            // Something happened in setting up the request that triggered an Error
            console.log('Error: ' + error.message);
        }

        return { hasError: true, error: errorData };

        //console.log(error, 'error inside fetcher');
        //throw new Error(error.response.data.message);
    }
}
export default fetcher;