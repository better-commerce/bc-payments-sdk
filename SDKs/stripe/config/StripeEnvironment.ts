/**
 * Class {StripeEnvironment}
 */
export default class StripeEnvironment {

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

    /**
     * Initializes the StripeEnvironment with the provided public and secret keys.
     * 
     * @param publicKey {string} - The public key for Stripe API authentication.
     * @param secretKey {string} - The secret key for Stripe API authentication.
     * @returns {StripeEnvironment} - The current instance of StripeEnvironment.
     */
    static init(publicKey: string, secretKey: string) {
        StripeEnvironment.publicKey = publicKey;
        StripeEnvironment.secretKey = secretKey;
        return this;
    }

    /**
     * Retrieves the public key used for Stripe API authentication.
     * @returns {string} - The public key used for Stripe API authentication.
     */
    static getPublicKey(): string {
        return StripeEnvironment.publicKey;
    }

    /**
     * Retrieves the secret key used for Stripe API authentication.
     * @returns {string} - The secret key used for Stripe API authentication.
     */
    static getSecretKey(): string {
        return StripeEnvironment.secretKey;
    }
}