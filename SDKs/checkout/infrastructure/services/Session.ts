// Package Imports
import axios, { AxiosRequestConfig } from "axios";

// Other Imports
//import { Api } from "../api";
import { Domain } from "../../../../src";
import { SDKs } from "../../../../SDKs/lib";

/**
 * Class representing a session.
 * 
 * A session is a request to the Checkout.com API to create a session.
 * The request includes the session details and the processing channel id.
 * 
 * @class Session
 * @implements {ISession}
 */
export default class Session implements SDKs.Checkout.Domain.Contracts.ISession {
    
    /**
     * Creates a session for the provided payment source.
     * 
     * API Reference - https://api-reference.checkout.com/payments/payments
     * 
     * @param data {any} The session data.
     * @returns A promise resolving to a session object or an error object.
     */
    async create(data: any) {
        const { secretKey, ...rest } = data
        try {
            const computedUrl = new URL(`apms/klarna/credit-sessions`, SDKs.Checkout.Config.CheckoutEnvironment.getBaseUrl());
            const config: AxiosRequestConfig<any> = {
                url: computedUrl.href,
                method: Domain.Enums.RequestMethod.POST,
                data: { ...rest },
                headers: { "Content-Type": "application/json", "Authorization": `Bearer ${secretKey}` },
            };
            const { data: tokenResult } = await axios(config)
            return tokenResult;
        } catch (error) {
            console.log(error)
            return { hasError: true, error: error };
        }
    }
}