import { SDKs } from "../../../SDKs/lib";


/**
 * Class {ApplePayEnvironment} is used to initialize the ApplePay environment.
 * The class should be initialized before using any other class in the SDK.
 */
export default class ApplePayEnvironment {

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
     * Field to store the apple pay merchant id.
     * @property {string}
     */
    static merchantId: string;

    /**
     * Field to store the domain name.
     * @property {string}
     */
    static domainName: string;

    /**
     * Field to store the display name.
     * @property {string}
     */
    static displayName: string;
    static pemCert: Buffer;
    static keyCert: Buffer;

    static environment: string;

    /**
     * Field to store the checkout api base url.
     * @property {string}
     */
    static baseUrl: string;

    /**
     * Initializes the ApplePayEnvironment with the given parameters.
     * @param {string} merchantId - The apple pay merchant id.
     * @param {string} domainName - The domain name of the merchant.
     * @param {string} displayName - The display name of the merchant.
     * @param {Buffer} pemCert - The pem formatted certificate.
     * @param {Buffer} keyCert - The pem formatted key.
     * @param {boolean} [useSandBox=true] - If true, uses sandbox, otherwise uses production.
     * @returns {ApplePayEnvironment} The ApplePayEnvironment instance.
     */
    static init(merchantId: string, domainName: string, displayName: string, pemCert: Buffer, keyCert: Buffer, useSandBox = true) {
        ApplePayEnvironment.merchantId = merchantId;
        ApplePayEnvironment.domainName = domainName;
        ApplePayEnvironment.displayName = displayName;
        ApplePayEnvironment.pemCert = pemCert;
        ApplePayEnvironment.keyCert = keyCert;

        if (useSandBox) {
            ApplePayEnvironment.baseUrl = SDKs.ApplePay.Domain.Constants.Endpoints.Base.Api.SANDBOX_URL;
            ApplePayEnvironment.environment = "sandbox";
        } else {
            ApplePayEnvironment.baseUrl = SDKs.ApplePay.Domain.Constants.Endpoints.Base.Api.PRODUCTION_URL;
            ApplePayEnvironment.environment = "production";
        }
        return this;
    }

    /**
     * Retrieves the merchant ID for the Apple Pay environment.
     * 
     * @returns {string} The merchant ID.
     */
    static getMerchantId(): string {
        return ApplePayEnvironment.merchantId;
    }

    /**
     * Retrieves the domain name of the merchant for the Apple Pay environment.
     * 
     * @returns {string} The domain name of the merchant.
     */
    static getDomainName(): string {
        return ApplePayEnvironment.domainName;
    }

    /**
     * Retrieves the display name of the merchant for the Apple Pay environment.
     * 
     * @returns {string} The display name of the merchant.
     */
    static getDisplayName(): string {
        return ApplePayEnvironment.displayName;
    }

    /**
     * Retrieves the PEM formatted certificate for the Apple Pay environment.
     * 
     * @returns {Buffer} The PEM formatted certificate.
     */
    static getPEMCert(): Buffer {
        return ApplePayEnvironment.pemCert;
    }

    /**
     * Retrieves the PEM formatted key certificate for the Apple Pay environment.
     * 
     * @returns {Buffer} The key certificate.
     */
    static getKeyCert(): Buffer {
        return ApplePayEnvironment.keyCert;
    }

    /**
     * Retrieves the Apple Pay environment name, which is either "sandbox" or "production", depending on whether the sandbox or production environment is used.
     * 
     * @returns {string} The environment name.
     */
    static getEnvironment(): string {
        return ApplePayEnvironment.environment;
    }

    /**
     * Retrieves the base URL for the Apple Pay environment.
     * 
     * @returns {string} The base URL, which varies based on whether the sandbox or production environment is used.
     */
    static getBaseUrl(): string {
        return ApplePayEnvironment.baseUrl;
    }
}