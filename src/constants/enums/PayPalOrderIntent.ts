/**
 * Enum {PayPalOrderIntent} represents the different intents available 
 * for a PayPal order during the checkout process.
 * 
 * @enum {string}
 * @readonly
 * @memberof PayPal
 * @ordinal {string} CAPTURE - The intent to capture payment immediately 
 *         after the customer makes a payment. This is typically used when 
 *         the merchant wants to finalize the transaction at the time of 
 *         checkout, ensuring funds are transferred right after the payment 
 *         is made by the customer.
 * @ordinal {string} AUTHORIZE - The intent to authorize a payment and 
 *         place funds on hold after the customer makes a payment. This 
 *         allows the merchant to capture the payment at a later time. 
 *         Authorized payments are ideally captured within three days of 
 *         authorization, but can be captured up to 29 days. Beyond the 
 *         three-day honor period, the authorization expires and requires 
 *         re-authorization.
 */
export enum PayPalOrderIntent {

    // The merchant intends to capture payment immediately after the customer makes a payment.
    CAPTURE = "CAPTURE",

    // The merchant intends to authorize a payment and place funds on hold after the customer makes a payment. Authorized payments are best captured within three days of authorization but are available to capture for up to 29 days. After the three-day honor period, the original authorized payment expires and you must re-authorize the payment. You must make a separate request to capture payments on demand. This intent is not supported when you have more than one purchase_unit within your order.
    AUTHORIZE = "AUTHORIZE",
};