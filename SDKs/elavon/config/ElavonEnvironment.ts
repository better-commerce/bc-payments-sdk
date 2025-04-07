import { SDKs } from "../../../SDKs/lib";

/**
 * {ElavonEnvironment} class is used to setup the environment.
 * This class provides options to select the environment.
 */
export default class ElavonEnvironment {

    /**
     * The Converge API uses no auth as an authentication method. Your credentials are sent in the request body using content type x-www-form-urlencoded.
     * Your Converge credentials include:
     *          Account ID (ssl_account_id)
     *          User ID (ssl_user_id)
     *          Converge PIN (ssl_pin)
     */
    static authorizationEnabled: boolean = false;

    // Static variables
    /**
     * Field to store the merchant id.
     * @property {string}
     */
    static merchantId: string;

    /**
     * Field to store the merchant user id.
     * @property {string}
     */
    static merchantUserId: string;

    // Static variables
    /**
     * Field to store the vendor id.
     * @property {string}
     */
    static vendorId: string;

    /**
     * Field to store the merchant pin.
     * @property {string}
     */
    static merchantPIN: string;

    static environment: string;
    static extras: any;

    /**
     * Field to store the checkout auth base url.
     * @property {string}
     */
    static authUrl: string;

    /**
     * Field to store the checkout api base url.
     * @property {string}
     */
    static baseUrl: string;

    
    /**
     * Initializes the server environment for Elavon.
     * 
     * This method sets up the environment by configuring merchant and vendor details,
     * as well as setting the appropriate API base URLs for authentication and communication.
     * 
     * @param {string} merchantId - The unique identifier for the merchant.
     * @param {string} merchantUserId - The user identifier for the merchant.
     * @param {string} merchantPIN - The PIN associated with the merchant account.
     * @param {string} vendorId - The identifier for the vendor.
     * @param {boolean} [useSandBox=true] - Flag indicating whether to use the sandbox environment. Defaults to true.
     * @param {any} [extras={}] - Additional configuration options or parameters.
     * 
     * @returns {ElavonEnvironment} The configured ElavonEnvironment instance.
     */
    static initServer(merchantId: string, merchantUserId: string, merchantPIN: string, vendorId: string, useSandBox = true, extras = {}) {
        ElavonEnvironment.merchantId = merchantId;
        ElavonEnvironment.merchantUserId = merchantUserId;
        ElavonEnvironment.merchantPIN = merchantPIN;
        ElavonEnvironment.vendorId = vendorId;
        ElavonEnvironment.extras = extras;

        if (useSandBox) {
            ElavonEnvironment.authUrl = SDKs.Elavon.Domain.Constants.Endpoints.Base.Auth.SANDBOX_URL;
            ElavonEnvironment.baseUrl = SDKs.Elavon.Domain.Constants.Endpoints.Base.Api.SANDBOX_URL;
            ElavonEnvironment.environment = "sandbox";
        } else {
            ElavonEnvironment.authUrl = SDKs.Elavon.Domain.Constants.Endpoints.Base.Auth.PRODUCTION_URL;
            ElavonEnvironment.baseUrl = SDKs.Elavon.Domain.Constants.Endpoints.Base.Api.PRODUCTION_URL;
            ElavonEnvironment.environment = "production";
        }
        return this;
    }

    static getAuthorizationEnabled(): boolean {
        return ElavonEnvironment.authorizationEnabled;
    }

    /**
     * Gets the merchant identifier.
     * 
     * @returns {string} The unique identifier for the merchant.
     */
    static getMerchantId(): string {
        return ElavonEnvironment.merchantId;
    }

    /**
     * Gets the user identifier for the merchant.
     * 
     * @returns {string} The user identifier for the merchant.
     */
    static getMerchantUserId(): string {
        return ElavonEnvironment.merchantUserId;
    }

    /**
     * Gets the merchant's PIN.
     * 
     * @returns {string} The PIN associated with the merchant account.
     */
    static getMerchantPIN(): string {
        return ElavonEnvironment.merchantPIN;
    }

    /**
     * Gets the vendor identifier.
     * 
     * @returns {string} The unique identifier for the vendor.
     */
    static getVendorId(): string {
        return ElavonEnvironment.vendorId;
    }

    /**
     * Get any additional configuration options that were passed in the constructor.
     * @returns {Object} The additional configuration options.
     */
    static getExtras(): any {
        return ElavonEnvironment.extras;
    }

    /**
     * Get the environment set for the CheckoutEnvironment.
     * For example, "sandbox" or "production".
     * @returns {string} The environment.
     */
    static getEnvironment(): string {
        return ElavonEnvironment.environment;
    }

    /**
     * Returns the base url of the Checkout authentication service.
     * @returns {string} The base url of the Checkout authentication service.
     */
    static getAuthUrl(): string {
        return ElavonEnvironment.authUrl;
    }

    /**
     * Returns the base url of the Checkout API service.
     * @returns {string} The base url of the Checkout API service.
     */
    static getBaseUrl(): string {
        return ElavonEnvironment.baseUrl;
    }
}