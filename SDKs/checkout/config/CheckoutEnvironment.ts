import { SDKs } from "../../../SDKs/lib";


/**
 * {CheckoutEnvironment} class is used to setup the environment.
 * This class provides options to select the environment.
 */
export default class CheckoutEnvironment {

    // Static variables
    /**
     * Field to store the public key.
     * @property {string}
     */
    static publicKey: string;

    /**
     * Field to store the secret key.
     * @property {string}
     */
    static secretKey: string;

    // Static variables
    /**
     * Field to store the access id.
     * @property {string}
     */
    static accessId: string;

    /**
     * Field to store the access secret.
     * @property {string}
     */
    static accessSecret: string;

    static procesingChannelId: string;
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
     * Initialize the Checkout client with the given public and secret keys.
     * @param publicKey {string} The public key provided by Checkout.
     * @param secretKey {string} The secret key provided by Checkout.
     * @returns {CheckoutEnvironment} The class instance.
     */
    static initClient(publicKey: string, secretKey: string) {
        CheckoutEnvironment.publicKey = publicKey;
        CheckoutEnvironment.secretKey = secretKey;
        return this;
    }

    /**
     * Initialize the Checkout client with the given access id, secret, and processing channel id.
     * @param accessId {string} The access id provided by Checkout.
     * @param accessSecret {string} The access secret provided by Checkout.
     * @param procesingChannelId {string} The processing channel id provided by Checkout.
     * @param useSandBox {boolean} If true, the client will point to the sandbox environment.
     * @param extras {Object} Additional configuration options for the client.
     * @returns {CheckoutEnvironment} The class instance.
     */
    static initServer(accessId: string, accessSecret: string, procesingChannelId: string, useSandBox = true, extras = {}) {
        CheckoutEnvironment.accessId = accessId;
        CheckoutEnvironment.accessSecret = accessSecret;
        CheckoutEnvironment.procesingChannelId = procesingChannelId;
        CheckoutEnvironment.extras = extras;

        if (useSandBox) {
            CheckoutEnvironment.authUrl = SDKs.Checkout.Domain.Constants.Endpoints.Base.Auth.SANDBOX_URL;
            CheckoutEnvironment.baseUrl = SDKs.Checkout.Domain.Constants.Endpoints.Base.Api.SANDBOX_URL;
            CheckoutEnvironment.environment = "sandbox";
        } else {
            CheckoutEnvironment.authUrl = SDKs.Checkout.Domain.Constants.Endpoints.Base.Auth.PRODUCTION_URL;
            CheckoutEnvironment.baseUrl = SDKs.Checkout.Domain.Constants.Endpoints.Base.Api.PRODUCTION_URL;
            CheckoutEnvironment.environment = "production";
        }
        return this;
    }

    /**
     * Get the public key provided by Checkout.
     * @returns {string} The public key.
     */
    static getPublicKey(): string {
        return CheckoutEnvironment.publicKey;
    }

    /**
     * Get the secret key provided by Checkout.
     * @returns {string} The secret key.
     */
    static getSecretKey(): string {
        return CheckoutEnvironment.secretKey;
    }

    /**
     * Get the access id provided by Checkout.
     * @returns {string} The access id.
     */
    static getAccessId(): string {
        return CheckoutEnvironment.accessId;
    }

    /**
     * Get the access secret provided by Checkout.
     * @returns {string} The access secret.
     */
    static getAccessSecret(): string {
        return CheckoutEnvironment.accessSecret;
    }

    /**
     * Get the processing channel ID provided by Checkout.
     * @returns {string} The processing channel ID.
     */
    static getProcessingChannelId(): string {
        return CheckoutEnvironment.procesingChannelId;
    }

    /**
     * Get any additional configuration options that were passed in the constructor.
     * @returns {Object} The additional configuration options.
     */
    static getExtras(): any {
        return CheckoutEnvironment.extras;
    }

    /**
     * Get the environment set for the CheckoutEnvironment.
     * For example, "sandbox" or "production".
     * @returns {string} The environment.
     */
    static getEnvironment(): string {
        return CheckoutEnvironment.environment;
    }

    /**
     * Returns the base url of the Checkout authentication service.
     * @returns {string} The base url of the Checkout authentication service.
     */
    static getAuthUrl(): string {
        return CheckoutEnvironment.authUrl;
    }

    /**
     * Returns the base url of the Checkout API service.
     * @returns {string} The base url of the Checkout API service.
     */
    static getBaseUrl(): string {
        return CheckoutEnvironment.baseUrl;
    }
}