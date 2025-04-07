/**
 * Enum that represents the order intent.
 * @enum {string}
 * @readonly
 * @ordinal {string} CAPTURE - The merchant intends to capture payment immediately after the customer makes a payment.
 * @ordinal {string} AUTHORIZE - The merchant intends to authorize a payment and place funds on hold after the customer makes a payment. Authorized payments are best captured within three days of authorization but are available to capture for up to 29 days. After the three-day honor period, the original authorized payment expires and you must re-authorize the payment. You must capture the authorized payment within 29 days of authorization. If you do not capture the payment, the authorization will expire and you will not be able to capture the payment.
 */
export enum OrderIntent {

    // The merchant intends to capture payment immediately after the customer makes a payment.
    CAPTURE = "CAPTURE",

    // The merchant intends to authorize a payment and place funds on hold after the customer makes a payment. Authorized payments are best captured within three days of authorization but are available to capture for up to 29 days. After the three-day honor period, the original authorized payment expires and you must re-authorize the payment. You must make a separate request to capture payments on demand. This intent is not supported when you have more than one purchase_unit within your order.
    AUTHORIZE = "AUTHORIZE",
}