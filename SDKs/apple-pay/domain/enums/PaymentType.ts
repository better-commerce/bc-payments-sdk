/**
 * Enum {PaymentType} represents the type of payment.
 * 
 * @ordinal {string} Regular - The merchant intends to capture payment immediately after the customer makes a payment.
 * @ordinal {string} Recurring - The merchant intends to authorize a payment and place funds on hold after the customer makes a payment. Authorized payments are best captured within three days of authorization but are available to capture for up to 29 days. After the three-day honor period, the original authorized payment expires and you must re-authorize the payment. You must capture authorized payments within 29 days of authorization.
 * @ordinal {string} MOTO - Merchant-Initiated Transaction Online (MOTO) payment. The merchant initiates the payment on behalf of the customer.
 * @ordinal {string} Installment - Installment payment. Installment payments are a type of recurring payment that is used to pay for a purchase in multiple installments.
 * @ordinal {string} Unscheduled - Unscheduled payment. Unscheduled payments are payments that are not part of a recurring payment schedule.
 */
export enum PaymentType {
    Regular = "Regular",
    Recurring = "Recurring",
    MOTO = "MOTO",
    Installment = "Installment",
    Unscheduled = "Unscheduled",
};