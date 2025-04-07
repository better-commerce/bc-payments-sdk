// Package Imports
import axios, { AxiosRequestConfig } from "axios";

// Other Imports
import { SDKs } from "../../../../SDKs/lib";
import { Domain } from "../../../../src";


/**
 * Class representing a token.
 * 
 * A token is a request to the Checkout.com API to create a secure token to be used in payments.
 * The request includes the public key and the payment method details.
 * 
 * @class Token
 * @implements {IToken}
 */
export default class Token implements SDKs.Checkout.Domain.Contracts.IToken {
    
    /**
     * Request a token
     * @param data {Object} - The token request data. Needs to contain a publicKey.
     * @returns {Promise<Object>} - A promise resolving to the token request result or an error object.
     */
    async requestToken(data: any) {
        const { publicKey, ...rest } = data
        try {
            const computedUrl = new URL(`tokens`, SDKs.Checkout.Config.CheckoutEnvironment.getBaseUrl());
            const config: AxiosRequestConfig<any> = {
                url: computedUrl.href,
                method: Domain.Enums.RequestMethod.POST,
                data: { ...rest },
                headers: { "Authorization": `Bearer ${publicKey}` },
            };
            const { data: tokenResult } = await axios(config)
            /*const tokenResult = await Api.call(`tokens`, Domain.Enums.RequestMethod.POST, { ...rest }, {}, { "Authorization": `Bearer ${publicKey}` });*/
            return tokenResult;
        } catch (error) {
            return { hasError: true, error: error };
        }
    }
}