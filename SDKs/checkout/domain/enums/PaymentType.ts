/**
 * Enum representing different types of payments.
 * 
 * @enum {string}
 * @ordinal {string} Regular - Regular payment type.
 * @ordinal {string} Recurring - Recurring payment type.
 * @ordinal {string} MOTO - Mail Order Telephone Order payment type.
 * @ordinal {string} Installment - Installment payment type.
 * @ordinal {string} Unscheduled - Unscheduled payment type.
 */
export enum PaymentType {
    Regular = "Regular",
    Recurring = "Recurring",
    MOTO = "MOTO",
    Installment = "Installment",
    Unscheduled = "Unscheduled",
};