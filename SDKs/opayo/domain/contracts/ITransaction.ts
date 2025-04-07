import { SDKs } from "../../../../SDKs/lib"

export default interface ITransaction {

    /**
     * Initiates a transaction request.
     * @param data {ITransactionRequest}
     */
    request(data: SDKs.Opayo.Domain.Models.ITransactionRequest): any;

    /**
     * Get payment details.
     * @param data {String}
     */
    getDetails(data: any): any;
}