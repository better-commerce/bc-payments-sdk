import { Transaction } from "bc-nuvei-sdk";
import { INuveiPaymentProvider } from "../../base/contracts/GatewayProviders/INuveiPaymentProvider";
import { IPaymentProvider } from "../../base/contracts/IPaymentProvider";
import { BasePaymentProvider } from "../../base/entity/BasePaymentProvider";

export class NuveiPayment extends BasePaymentProvider implements IPaymentProvider, INuveiPaymentProvider {

    /**
     * Requests a token from the Nuvei payment provider.
     * 
     * This method receives a merchant’s authentication details 
     * and returns a unique session token (sessionToken). 
     * sessionToken is used throughout the payment session as an authentication token.
     * _____
     * Nuvei
     * ‾‾‾‾‾
     * API Reference - https://docs.nuvei.com/api/main/indexMain_v1_0.html?json#getSessionToken
     * 
     * @param data - The data required for creating a session with Nuvei.
     * @returns A promise that resolves to the result of the session creation
     *          or an object with error details if an error occurs.
     */
    async requestToken(data: any): Promise<any> {
        try {
            if (super.initSDK()) {
                const transaction = new Transaction();
                const requestTokenResult = await transaction.getSessionToken();
                return requestTokenResult;
            }
            return null;
        }
        catch (error: any) {
            return { hasError: true, error: error?.message };
        }
    }

    /**
     * Requests a token from the Nuvei payment provider.
     * 
     * Calling the server-side /openOrder API request is the first step in a Web SDK or Simply Connect flow. 
     * /openOrder authenticates your Nuvei merchant credentials, sets up an order in the Nuvei system, and returns a sessionToken.
     * 
     * sessionToken must be included in all subsequent Web SDK and Simply Connect method calls in that session, 
     * such as for createPayment() or checkout().
     * 
     * /openOrder also allows you to set user-related parameters such as shipping details and billing details. 
     * Using the preventOverride parameter either allows or prevents subsequent Web SDK and Simply Connect 
     * method calls from overriding these user-related parameters.
     * _____
     * Nuvei
     * ‾‾‾‾‾
     * API Reference - https://docs.nuvei.com/api/main/indexMain_v1_0.html?json#openorder
     * 
     * @param data - The data required for creating a session with Nuvei.
     * @returns A promise that resolves to the result of the session creation
     *          or an object with error details if an error occurs.
     */
    async openOrder(data: any): Promise<any> {
        try {
            if (super.initSDK()) {
                const transaction = new Transaction();
                const openOrderResult = await transaction.openOrder(data);
                return openOrderResult;
            }
            return null;
        }
        catch (error: any) {
            return { hasError: true, error: error?.message };
        }
    }

    initPaymentIntent(data: any) {
        throw new Error("Method not implemented.");
    }
    requestPayment(data: any) {
        throw new Error("Method not implemented.");
    }
    getOrderDetails(data: any) {
        throw new Error("Method not implemented.");
    }
}