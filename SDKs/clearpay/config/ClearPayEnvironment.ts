import { SDKs } from "../../../SDKs/lib";

/**
 * Class {ClearPayEnvironment} is used to store the ClearPay environment configuration such as the user ID, password, and base URL.
 * The class provides a static method {init} to set the configuration.
 */
export default class ClearPayEnvironment {

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
     * Initializes the ClearPay environment with the provided credentials and sets the base URL.
     * 
     * @param userId - The user ID for authentication.
     * @param password - The password for authentication.
     * @param useSandBox - Optional flag to determine if the sandbox environment should be used. Defaults to true.
     *                     If true, sets the base URL to the sandbox environment; otherwise, sets it to the production environment.
     * @returns The ClearPayEnvironment class with updated credentials and base URL.
     */
    static init(userId: string, password: string, useSandBox = true) {
        ClearPayEnvironment.userId = userId;
        ClearPayEnvironment.password = password;

        if (useSandBox) {
            ClearPayEnvironment.baseUrl = SDKs.Clearpay.Domain.Constants.Endpoints.Base.SANDBOX_URL;
        } else {
            ClearPayEnvironment.baseUrl = SDKs.Clearpay.Domain.Constants.Endpoints.Base.PRODUCTION_URL;
        }
        return this;
    }

    /**
     * Gets the user ID for authentication.
     * @returns {string} The user ID for authentication.
     */
    static getUserId(): string {
        return ClearPayEnvironment.userId;
    }

    /**
     * Gets the password for authentication.
     * @returns {string} The password for authentication.
     */
    static getPassword(): string {
        return ClearPayEnvironment.password;
    }

    /**
     * Gets the base URL for the ClearPay API.
     * @returns {string} The base URL for the ClearPay API.
     */
    static getBaseUrl(): string {
        return ClearPayEnvironment.baseUrl;
    }
}