// Other Imports
import { SDKs } from "../../../../SDKs/lib";
import { Domain } from "../../../../src";


export default class Transaction implements SDKs.Opayo.Domain.Contracts.ITransaction {

    /**
     * Initiates a transaction request.
     *
     * @param {ITransactionRequest} data The transaction request data.
     * @returns {Promise<any>} A promise resolving to the result of the transaction request.
     * @throws {Error} If the request fails, an error is thrown.
     */
    async request(data: SDKs.Opayo.Domain.Models.ITransactionRequest): Promise<any> {

        try {
            const transactionResult = await SDKs.Opayo.Infra.Core.API.call(`/api/v1/transactions`, Domain.Enums.RequestMethod.POST, data, {}, { 'Content-Type': 'application/json' });
            return transactionResult;
        } catch (error) {
            return { hasError: true, error: error };
        }
    }

    getDetails(data: any) {
        throw new Error("Method not implemented.");
    }
}