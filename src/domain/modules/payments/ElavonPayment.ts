import { SDKs } from "../../../../SDKs/lib";
import { IElavonPaymentProvider } from "../../contracts/GatewayProviders/IElavonPaymentProvider";
import { IPaymentProvider } from "../../contracts/IPaymentProvider";
import { BasePaymentProvider } from "../../../infrastructure/core/BasePaymentProvider";

export class ElavonPayment extends BasePaymentProvider implements IPaymentProvider, IElavonPaymentProvider {
    
    /**
     * Requests a token from the Elavon payment provider.
     * 
     * This method initializes the SDK and attempts to create a session
     * with the provided data. If successful, it returns the result of the 
     * session creation. If the SDK initialization fails, it returns null. 
     * In case of an error during the process, it returns an object containing 
     * the error details.
     * ______
     * ELAVON
     * ‾‾‾‾‾‾
     * API Reference - https://developer.elavon.com/products/hosted-payment-page/v1/api-reference#tag/Request-Session-Token/operation/session-token
     * 
     * @param data - The data required for creating a session with Elavon.
     * @returns A promise that resolves to the result of the session creation
     *          or an object with error details if an error occurs.
     */
    async requestToken(data: any): Promise<any> {
        try {
            if (super.initSDK()) {
                const session = new SDKs.Elavon.Infra.Services.Session();
                const requestTokenResult = await session.create(data);
                return requestTokenResult;
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