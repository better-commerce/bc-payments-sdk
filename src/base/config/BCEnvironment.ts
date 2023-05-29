import { Endpoints } from "../../constants/Endpoints";

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
     * @property {BCEnvironment}
     */
    static thisObj: any;

    static init(baseAuthUrl?: string, baseApiUrl?: string, connectTimeout?: number, readTimeout?: number, defaultCountry?: string, defaultCurrency?: string, defaultLanguage?: string) {
        if (BCEnvironment.thisObj != undefined) {
            return BCEnvironment.thisObj;
        } else {
            BCEnvironment.thisObj = new BCEnvironment();
            BCEnvironment.baseAuthUrl = Endpoints.Base.AUTH_URL;
            BCEnvironment.baseApiUrl = Endpoints.Base.API_URL;
            BCEnvironment.defaultCountry = "GB";
            BCEnvironment.defaultCurrency = "GBP";
            BCEnvironment.defaultLanguage = "en-GB";

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
        }
    }

    static withCredentials(clientId: string, sharedSecret: string, baseAuthUrl?: string, baseApiUrl?: string, connectTimeout?: number, readTimeout?: number, defaultCountry?: string, defaultCurrency?: string, defaultLanguage?: string) {
        BCEnvironment.clientId = clientId;
        BCEnvironment.sharedSecret = sharedSecret;
        BCEnvironment.baseApiUrl = Endpoints.Base.API_URL;

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
        return this;
    }

    /**
     *
     * @return {string}
     */
    static getBaseAuthUrl(): string {
        return BCEnvironment.baseAuthUrl;
    }

    /**
     *
     * @return {string}
     */
    static getBaseApiUrl(): string {
        return BCEnvironment.baseApiUrl;
    }

    /**
     *
     * @return {string}
     */
    static getClientId(): string {
        return BCEnvironment.clientId;
    }

    /**
     *
     * @return {string}
     */
    static getSharedSecret(): string {
        return BCEnvironment.sharedSecret;
    }

    /**
     *
     * @return {string}
     */
    static getDefaultCountry(): string {
        return BCEnvironment.defaultCountry;
    }

    /**
     *
     * @return {string}
     */
    static getDefaultCurrency(): string {
        return BCEnvironment.defaultCurrency;
    }

    /**
     *
     * @return {string}
     */
    static getDefaultLanguage(): string {
        return BCEnvironment.defaultLanguage;
    }

    /**
     *
     * @return {number}
     */
    static getConnectTimeout(): number {
        return BCEnvironment.connectTimeout;
    }

    /**
     *
     * @return {number}
     */
    static getReadTimeout(): number {
        return BCEnvironment.readTimeout;
    }
}