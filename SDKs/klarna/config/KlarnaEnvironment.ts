import { SDKs } from "../../../SDKs/lib";

/**
 * Class {KlarnaEnvironment}
 */
export default class KlarnaEnvironment {

    // Static variables
    /**
     * Field to store the user id.
     * @property {string}
     */
    static userId: string;

    /**
     * Field to store the password.
     * @property {string}
     */
    static password: string;

    /**
     * Field to store the paypal base url.
     * @property {string}
     */
    static baseUrl: string;

    /**
     * Initializes the KlarnaEnvironment with the user id and password.
     * Additionally, chooses which base url to use. If useSandBox is true, the sandbox url is used. Otherwise, the production url is used.
     * @param {string} userId - The user id.
     * @param {string} password - The password.
     * @param {boolean} useSandBox - If true, use the sandbox url. Otherwise, use the production url.
     * @returns {KlarnaEnvironment}
     */
    static init(userId: string, password: string, useSandBox = true) {
        KlarnaEnvironment.userId = userId;
        KlarnaEnvironment.password = password;

        if (useSandBox) {
            KlarnaEnvironment.baseUrl = SDKs.Klarna.Domain.Constants.Endpoints.Base.SANDBOX_URL;
        } else {
            KlarnaEnvironment.baseUrl = SDKs.Klarna.Domain.Constants.Endpoints.Base.PRODUCTION_URL;
        }
        return this;
    }

    /**
     * Returns the user id.
     * @returns {string} The user id.
     */
    static getUserId(): string {
        return KlarnaEnvironment.userId;
    }

    /**
     * Returns the password.
     * @returns {string} The password.
     */
    static getPassword(): string {
        return KlarnaEnvironment.password;
    }

    /**
     * Returns the base url.
     * @returns {string} The base url.
     */
    static getBaseUrl(): string {
        return KlarnaEnvironment.baseUrl;
    }
}