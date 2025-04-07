import { Endpoints } from "../constants/Endpoints";

/**
 * Class {BCEnvironment}
 */
export class BCEnvironment {

    // Static variables
    /**
     *
     * @property {string}
     */
    static baseAuthUrl: string;

    /**
     *
     * @property {string}
     */
    static baseApiUrl: string;

    /**
     *
     * @property {string}
     */
    static clientId: string;

    /**
     *
     * @property {string}
     */
    static sharedSecret: string;

    /**
     *
     * @property {string}
     */
    static defaultCountry: string;

    /**
     *
     * @property {string}
     */
    static defaultCurrency: string;

    /**
     *
     * @property {string}
     */
    static defaultLanguage: string;

    /**
     *
     * @property {number}
     */
    static connectTimeout: number;

    /**
     *
     * @property {number}
     */
    static readTimeout: number;

    /**
     *
     * @property {Object}
     */
    static config: any;

    /**
     *
     * @property {Object}
     */
    static extras: any;

    static enableProviderLogging: boolean;

    /**
     *
     * @property {BCEnvironment}
     */
    static thisObj: any;

    /**
     * Initializes the BCEnvironment object with the required parameters to make API calls.
     * 
     * @param {string} clientId - The client ID of the BetterCommerce account.
     * @param {string} sharedSecret - The shared secret of the BetterCommerce account.
     * @param {Object} [config] - The configuration for payment gateways etc.
     * @param {string} [baseAuthUrl] - The base URL for the authentication API.
     * @param {string} [baseApiUrl] - The base URL for the API.
     * @param {number} [connectTimeout] - The timeout for the connection in milliseconds.
     * @param {number} [readTimeout] - The timeout for reading the response in milliseconds.
     * @param {string} [defaultCountry] - The default country to use for the API.
     * @param {string} [defaultCurrency] - The default currency to use for the API.
     * @param {string} [defaultLanguage] - The default language to use for the API.
     * @returns {BCEnvironment} - The initialized BCEnvironment object.
     */
    static init(clientId: string, sharedSecret: string, config?: any, baseAuthUrl?: string, baseApiUrl?: string, connectTimeout?: number, readTimeout?: number, defaultCountry?: string, defaultCurrency?: string, defaultLanguage?: string) {
        /*if (BCEnvironment.thisObj != undefined) {
            return BCEnvironment.thisObj;
        } else {*/
        BCEnvironment.thisObj = new BCEnvironment();
        BCEnvironment.clientId = clientId;
        BCEnvironment.sharedSecret = sharedSecret;
        BCEnvironment.baseAuthUrl = Endpoints.Base.AUTH_URL;
        BCEnvironment.baseApiUrl = Endpoints.Base.API_URL;
        BCEnvironment.defaultCountry = "GB";
        BCEnvironment.defaultCurrency = "GBP";
        BCEnvironment.defaultLanguage = "en-GB";
        BCEnvironment.config = config;
        BCEnvironment.enableProviderLogging = true;

        if (baseAuthUrl) {
            BCEnvironment.baseAuthUrl = baseAuthUrl;
        }

        if (baseApiUrl) {
            BCEnvironment.baseApiUrl = baseApiUrl;
        }

        if (connectTimeout) {
            BCEnvironment.connectTimeout = connectTimeout;
        }

        if (readTimeout) {
            BCEnvironment.readTimeout = readTimeout;
        }

        if (defaultCountry) {
            BCEnvironment.defaultCountry = defaultCountry;
        }

        if (defaultCurrency) {
            BCEnvironment.defaultCurrency = defaultCurrency;
        }

        if (defaultLanguage) {
            BCEnvironment.defaultLanguage = defaultLanguage;
        }
        return BCEnvironment.thisObj;
        //}
    }

    /**
     * Static class to hold environment variables for BetterCommerce API
     * and payment providers.
     * 
     * @remarks
     * The class is a singleton and should be initialized using the static
     * method {@link BCEnvironment.init}.
     * 
     * @example
     * BCEnvironment.init(clientId, sharedSecret, config);
     * 
     * @example
     * const environment = BCEnvironment.init(clientId, sharedSecret, config);
     * environment.addExtras({
     *     country: "GB",
     *     currency: "GBP",
     *     language: "en-GB",
     * });
     * 
     * @property {string} clientId - The BetterCommerce client ID.
     * @property {string} sharedSecret - The BetterCommerce shared secret.
     * @property {string} baseAuthUrl - The base URL for authentication.
     * @property {string} baseApiUrl - The base URL for API requests.
     * @property {number} connectTimeout - The timeout in milliseconds to wait for a connection to be established.
     * @property {number} readTimeout - The timeout in milliseconds to wait for a response to be read.
     * @property {string} defaultCountry - The default country code.
     * @property {string} defaultCurrency - The default currency code.
     * @property {string} defaultLanguage - The default language code.
     * @property {object} config - The configuration object.
     * @property {object} extras - Additional environment variables.
     */
    static addExtras(extras: any) {
        if (extras) {
            BCEnvironment.extras = extras;
            if (extras?.country) {
                BCEnvironment.defaultCountry = extras?.country;
            }
            if (extras?.currency) {
                BCEnvironment.defaultCurrency = extras?.currency;
            }
            if (extras?.language) {
                BCEnvironment.defaultLanguage = extras?.language;
            }
        }
        return BCEnvironment.thisObj;
    }

    /**
     * Retrieves the base URL for authentication.
     * 
     * @return {string} The base URL for authentication.
     */
    static getBaseAuthUrl(): string {
        return BCEnvironment.baseAuthUrl;
    }

    /**
     * Retrieves the base URL for API requests.
     * 
     * @return {string} The base URL for API requests.
     */
    static getBaseApiUrl(): string {
        return BCEnvironment.baseApiUrl;
    }

    /**
     * Retrieves the client ID associated with the BetterCommerce account.
     * 
     * @return {string} The client ID.
     */
    static getClientId(): string {
        return BCEnvironment.clientId;
    }

    /**
     * Retrieves the shared secret associated with the BetterCommerce account.
     * 
     * @return {string} The shared secret.
     */
    static getSharedSecret(): string {
        return BCEnvironment.sharedSecret;
    }

    /**
     * Retrieves the default country associated with the BetterCommerce account.
     * 
     * @return {string} The default country.
     */
    static getDefaultCountry(): string {
        return BCEnvironment.defaultCountry;
    }

    /**
     * Retrieves the default currency associated with the BetterCommerce account.
     * 
     * @return {string} The default currency.
     */
    static getDefaultCurrency(): string {
        return BCEnvironment.defaultCurrency;
    }

    /**
     * Retrieves the default language associated with the BetterCommerce account.
     * 
     * @return {string} The default language.
     */
    static getDefaultLanguage(): string {
        return BCEnvironment.defaultLanguage;
    }
    
    /**
     * Retrieves the connection timeout value for the BetterCommerce API.
     * 
     * @return {number} The connection timeout in milliseconds.
     */
    static getConnectTimeout(): number {
        return BCEnvironment.connectTimeout;
    }
    
    /**
     * Retrieves the read timeout value for the BetterCommerce API.
     * 
     * @return {number} The read timeout in milliseconds.
     */
    static getReadTimeout(): number {
        return BCEnvironment.readTimeout;
    }

    /**
     * Retrieves the configuration object used for payment gateways and other settings.
     * 
     * @return {Object} The configuration object.
     */
    static getConfig(): Object {
        return BCEnvironment.config;
    }

    /**
     * Retrieves the additional environment variables.
     * 
     * @return {Object} The extras object containing additional environment variables.
     */
    static getExtras(): Object {
        return BCEnvironment.extras;
    }

    /**
     * Retrieves the flag indicating whether provider logging is enabled.
     * 
     * @return {boolean} True if provider logging is enabled, false otherwise.
     */
    static getEnableProviderLogging(): boolean {
        return BCEnvironment.enableProviderLogging;
    }
}