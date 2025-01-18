/**
 * The enumeration {PaymentMethodTypeId} provides the unique identifier for various payment methods.
 *
 * @enum {number}
 * @readonly
 * @ordinal {number} COD - The identifier for Cash on Delivery (COD) payment method.
 * @ordinal {number} JUSPAY - The identifier for Juspay payment method.
 * @ordinal {number} PAYPAL - The identifier for PayPal payment method.
 * @ordinal {number} CHECKOUT - The identifier for Checkout payment method.
 * @ordinal {number} MASTER_CARD - The identifier for Mastercard payment method.
 * @ordinal {number} CLEAR_PAY - The identifier for ClearPay payment method.
 * @ordinal {number} KLARNA - The identifier for Klarna payment method.
 * @ordinal {number} STRIPE - The identifier for Stripe payment method.
 * @ordinal {number} ACCOUNT_CREDIT - The identifier for Account Credit payment method.
 * @ordinal {number} CHEQUE - The identifier for Cheque payment method.
 * @ordinal {number} CHECKOUT_APPLE_PAY - The identifier for Apple Pay payment method which is a sub-type of Checkout payment method.
 * @ordinal {number} CHECKOUT_KLARNA - The identifier for Klarna payment method which is a sub-type of Checkout payment method.
 */
export enum PaymentMethodTypeId {
    COD = 0,
    JUSPAY = 1,
    PAYPAL = 2,
    CHECKOUT = 3,
    MASTER_CARD = 4,
    CLEAR_PAY = 5,
    KLARNA = 6,
    STRIPE = 7,
    ACCOUNT_CREDIT = 8,
    CHEQUE = 9,
    CHECKOUT_APPLE_PAY = 10,
    CHECKOUT_KLARNA = 11,
    ELAVON = 12,
}