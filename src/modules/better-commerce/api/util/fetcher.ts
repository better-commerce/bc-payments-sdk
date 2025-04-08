import Agent from 'agentkeepalive'
import axios from "../../../../base/api"
import { BCEnvironment } from "../../../../base/config/BCEnvironment"
import { APIException } from "../../../../base/entity/exception/APIException";
import { AuthenticationException } from "../../../../base/entity/exception/AuthenticationException";
import { InvalidRequestException } from "../../../../base/entity/exception/InvalidRequestException";
import { RequestMethod } from "../../../../constants/enums/RequestMethod";
import { Guid } from "../../../../types/guid";

// Create a reusable connection instance that can be passed around to different controllers
const keepAliveAgent = new Agent({
    maxSockets: 128,
    maxFreeSockets: 128, // or 128 / os.cpus().length if running node across multiple CPUs
    timeout: 60000, // active socket keepalive for 60 seconds
    freeSocketTimeout: 30000, // free socket keepalive for 30 seconds
})

// HTTPS agent
const httpsKeepAliveAgent = new Agent.HttpsAgent({
    maxSockets: 128, // or 128 / os.cpus().length if running node across multiple CPUs
    maxFreeSockets: 128, // or 128 / os.cpus().length if running node across multiple CPUs
    timeout: 60000, // active socket keepalive for 30 seconds
    freeSocketTimeout: 30000, // free socket keepalive for 30 seconds
})

const SingletonFactory = (function () {
    let accessToken = '';
    const axiosInstance = axios.create({

        // Create an agent for both HTTP and HTTPS
        httpAgent: keepAliveAgent,
        httpsAgent: httpsKeepAliveAgent,

        baseURL: BCEnvironment.baseApiUrl,
        withCredentials: true,
    });
    const getToken = () => accessToken;

    const setToken = (token: string) => (accessToken = token);

    const clearToken = () => (accessToken = '');

    axiosInstance.interceptors.request.use(
        (config: any) => {
            const token = getToken();
            //this is to be changed when we implement currency / language switcher
            if (token) {
                config.headers['Authorization'] = 'Bearer ' + token;
            }
            return config;
        },
        (err) => Promise.reject(err)
    );

    /**
     * Creates an interceptor that will catch 401 errors and try to refresh the
     * token by calling the token endpoint with the client credentials.
     *
     * If the token refresh is successful, it will retry the original request with
     * the new access token. If the token refresh fails, it will reject the promise
     * with the error.
     *
     * The interceptor will be ejected after a 401 error is caught to prevent
     * infinite loops in case the token refresh also returns a 401 error.
     *
     * This interceptor will be recreated after the promise returned by this
     * function is resolved or rejected.
     */
    function createAxiosResponseInterceptor() {
        const interceptor = axiosInstance.interceptors.response.use(
            (response: any) => response,
            (error: any) => {
                // Reject promise if usual error
                if (error?.response?.status !== 401) {
                    return Promise.reject(error);
                }
                /*
                 * When response code is 401, try to refresh the token.
                 * Eject the interceptor so it doesn't loop in case
                 * token refresh causes the 401 response
                 */
                axiosInstance.interceptors.response.eject(interceptor);

                // return getAuthToken().finally(createAxiosResponseInterceptor)
                const url = new URL('oAuth/token', BCEnvironment.getBaseAuthUrl());

                return axiosInstance({
                    url: url.href,
                    method: RequestMethod.POST,
                    data: `client_id=${BCEnvironment.getClientId()}&client_secret=${BCEnvironment.getSharedSecret()}&grant_type=client_credentials`,
                })
                    .then((res: any) => {
                        setToken(res.data.access_token);
                        error.response.config.headers['Authorization'] = `Bearer ${res.data.access_token}`;
                        return axiosInstance(error.response.config);
                    })
                    .catch((error) => {
                        //@TODO redirect here to Login page
                        return Promise.reject(error);
                    })
                    .finally(createAxiosResponseInterceptor)
            }
        )
    }

    createAxiosResponseInterceptor();
    return { axiosInstance };
})()

const axiosInstance = SingletonFactory.axiosInstance;

Object.freeze(axiosInstance)

/**
 * Makes an HTTP request using the specified parameters and returns the response data or an error object.
 *
 * @param {string} url - The endpoint URL for the request.
 * @param {string} method - The HTTP method to use (e.g., 'post', 'get').
 * @param {object} data - The data to send in the request body (for POST/PUT requests).
 * @param {object} params - The URL parameters to include in the request.
 * @param {object} headers - The headers to include in the request.
 * @param {object} cookies - Cookies to use for setting additional headers like Currency, Language, etc.
 * @param {string} baseUrl - The base URL to use if not specified in the environment config.
 *
 * @returns {Promise<any>} The response data if the request is successful, or an error object if it fails.
 *
 * @throws {InvalidRequestException} If the response status is 400 or 404.
 * @throws {AuthenticationException} If the response status is 401.
 * @throws {APIException} For any other non-2xx response status.
 */
const fetcher = async ({ url = '', method = 'post', data = {}, params = {}, headers = {}, cookies = {}, baseUrl = "", }: any) => {
    const computedUrl = new URL(url, baseUrl || BCEnvironment.getBaseApiUrl());
    const newConfig = {
        Currency: cookies.Currency || BCEnvironment.getDefaultCurrency(),
        Language: cookies.Language || BCEnvironment.getDefaultLanguage(),
        Country: cookies.Country || BCEnvironment.getDefaultCountry(),
        DeviceId: cookies?.deviceId || "",
        SessionId: cookies?.sessionId || "",
        CompanyId: cookies?.CompanyId && cookies?.CompanyId != Guid.empty
            ? cookies?.CompanyId
            : Guid.empty,
        ClientIP: cookies?.ClientIP || "",
    };

    // Pass UserToken if received in from the consuming application (server-side)
    let userToken = null
    if (cookies?.["ut"]) {
        userToken = cookies?.["ut"] as string
    }
    const config: any = { method: method, url: computedUrl.href, headers: { ...headers, ...newConfig, UserToken: userToken }, };

    if (Object.keys(params).length) {
        config.params = params;
    }

    if (data && Object.keys(data).length) {
        config.data = data;
    }
    //console.log(config)
    try {
        const response = await axiosInstance(config);

        let responseCode = response.status;
        let responseBody = response.data;
        if (responseCode >= 200 && responseCode < 300) {
            return responseBody;
        } else {
            let status = undefined;
            let errorCode = undefined;
            let errorMessage = undefined;

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
                    throw new InvalidRequestException(responseCode, status, errorCode, errorMessage);

                case 401:
                    throw new AuthenticationException(responseCode, status, errorCode, errorMessage);

                default:
                    throw new APIException(responseCode, "internal_error", "internal_error", "Something went wrong.");
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