/**
 * Enum {PaymentMethodType} contains the list of payment methods that are supported by the application.
 * @enum {string}
 * @readonly
 * @ordinal {string} COD - Cash on Delivery payment method.
 * @ordinal {string} JUSPAY - Juspay payment method.
 * @ordinal {string} PAYPAL - PayPal payment method.
 * @ordinal {string} CHECKOUT - Checkout payment method.
 * @ordinal {string} MASTER_CARD - Master Card payment method.
 * @ordinal {string} CLEAR_PAY - Clear Pay payment method.
 * @ordinal {string} KLARNA - Klarna payment method.
 * @ordinal {string} STRIPE - Stripe payment method.
 * @ordinal {string} ACCOUNT_CREDIT - Account Credit payment method.
 * @ordinal {string} CHEQUE - Cheque payment method.
 * @ordinal {string} CHECKOUT_APPLE_PAY - Checkout Apple Pay payment method.
 * @ordinal {string} CHECKOUT_KLARNA - Checkout Klarna payment method.
 */
export enum PaymentMethodType {
    COD = "cod",
    JUSPAY = "juspay",
    PAYPAL = "paypal",
    CHECKOUT = "checkout",
    MASTER_CARD = "mastercard",
    CLEAR_PAY = "clearpay",
    KLARNA = "klarna",
    STRIPE = "stripe",
    ACCOUNT_CREDIT = "accountcredit",
    CHEQUE = "cheque",
    CHECKOUT_APPLE_PAY = 'checkoutapplepay',
    CHECKOUT_KLARNA = 'checkoutklarna',
    ELAVON = 'elavon',
    OPAYO = 'opayo',
    WALLET = 'wallet',
    OMNICAPITAL = 'omnicapital',
    NUVEI = 'nuvei',
    NUVEI_GOOGLE_PAY = 'nuveigooglepay',
    NUVEI_APPLE_PAY = 'nuveiapplepay',
    GIFT_CARD = 'giftcard',
    NUVEI_PAY_BY_BANK = 'nuveipaybybank',
};