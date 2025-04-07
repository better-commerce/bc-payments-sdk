// Other Imports
import { SDKs } from "../../../../SDKs/lib";
import { IPaymentProvider } from "../../contracts/IPaymentProvider";
import { BasePaymentProvider } from "../../../infrastructure/core/BasePaymentProvider";

/**
 * Class {OpayoPayment} extends {BasePaymentProvider} and implements {IPaymentProvider}.
 * It provides the concrete implementation of the Opayo/Sagepay payment provider.
 * 
 * @class OpayoPayment
 * @extends BasePaymentProvider
 * @implements IPaymentProvider
 * 
 * @remark
 * This class is responsible for initializing the Opayo SDK and providing the concrete 
 * implementation of the Opayo/Sagepay payment provider methods.
 */
export class OpayoPayment extends BasePaymentProvider implements IPaymentProvider {

    initPaymentIntent(data: any) {
        throw new Error("Method not implemented.");
    }

    /**
     * Requests a payment or payout through the Opayo/Sagepay payment provider.
     * 
     * This method initializes the SDK and attempts to request a payment or payout
     * with the provided data. If the SDK initialization is successful, it returns
     * the result of the transaction request. If the SDK initialization fails, it
     * returns null. In case of an error during the process, it returns an object
     * containing the error details.
     * 
     * _____
     * OPAYO
     * ‾‾‾‾‾
     * API Reference - https://developer.elavon.com/products/hosted-payment-page/v1/take-a-payment
     * 
     * @param data - The payment data required by Opayo/Sagepay.
     * @returns A promise that resolves to the result of the payment request
     *          or an object with error details if an error occurs.
     */
    async requestPayment(data: any): Promise<any> {
        try {
            if (super.initSDK()) {
                const transaction = new SDKs.Opayo.Infra.Services.Transaction();
                const transactionResult = await transaction.request(data);
                return transactionResult;
            }
            return null;
        }
        catch (error: any) {
            return { hasError: true, error: error?.message };
        }
    }

    getOrderDetails(data: any) {
        throw new Error("Method not implemented.");
    }
}