import { SDKs } from "../../../../SDKs/lib"

/**
 * Interface {@link ICredentialOnFile} represents a stored card.
 * 
 * @interface ICredentialOnFile
 * @property {string} transactionReference - Previous transaction reference
 * @property {InitiatorType} initiator - Initiator of the transaction
 * @property {RecurringType} type - Type of the transaction
 */
export default interface ICredentialOnFile {
    readonly transactionReference: string, // Previous transaction reference
    readonly initiator: SDKs.Opayo.Domain.Enums.InitiatorType,
    readonly type: SDKs.Opayo.Domain.Enums.RecurringType,
}