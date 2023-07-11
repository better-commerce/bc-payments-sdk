import axios from "../../../../base/api"
import { BCEnvironment } from "../../../../base/config/BCEnvironment"
import { APIException } from "../../../../base/entity/exception/APIException";
import { AuthenticationException } from "../../../../base/entity/exception/AuthenticationException";
import { InvalidRequestException } from "../../../../base/entity/exception/InvalidRequestException";
import { RequestMethod } from "../../../../constants/enums/RequestMethod";
import { Guid } from "../../../../types/guid";

const SingletonFactory = (function () {
    let accessToken = '';
    const axiosInstance = axios.create({
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

const fetcher = async ({
    url = '',
    method = 'post',
    data = {},
    params = {},
    headers = {},
    cookies = {},
    baseUrl = "",
}: any) => {
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
    const config: any = {
        method: method,
        url: computedUrl.href,
        headers: { ...headers, ...newConfig },
    };

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