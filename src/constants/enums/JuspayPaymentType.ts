/**
 * Enum {JuspayPaymentType} provides the list of payment types supported by Juspay payment gateway.
 * 
 * @enum {number}
 * @readonly
 * @memberof Juspay
 * @ordinal {number} CARD - The payment type for credit/debit card payments.
 * @ordinal {number} NET_BANKING - The payment type for net banking payments.
 * @ordinal {number} WALLET - The payment type for wallet payments.
 * @ordinal {number} UPI - The payment type for UPI payments.
 */
export enum JuspayPaymentType {
    CARD = 1,
    NET_BANKING = 2,
    WALLET = 3,
    UPI = 4,
}