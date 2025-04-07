/**
 * Enum representing different types of transactions that can be performed.
 * @enum {string}
 * @readonly
 * @property {string} CREDIT_CARD_SALE - Credit card sale transaction type.
 * @property {string} CREDIT_CARD_AUTH_Only - Credit card authorization only transaction type.
 * @property {string} CREDIT_CARD_VERIFY - Credit card verification transaction type.
 * @property {string} CREDIT_CARD_ADD_RECURRING - Credit card add recurring transaction type.
 * @property {string} CREDIT_CARD_ADD_INSTALLMENT - Credit card add installment transaction type.
 * @property {string} CREDIT_CARD_GENERATE_TOKEN - Credit card generate token transaction type.
 * @property {string} ELECTRONIC_CHECK_PURCHASE - Electronic check purchase transaction type.
 * @property {string} ELECTRONIC_CHECK_ADD_RECURRING - Electronic check add recurring transaction type.
 * @property {string} ELECTRONIC_CHECK_ADD_INSTALLMENT - Electronic check add installment transaction type.
 * @property {string} ELECTRONIC_GIFT_CARD_REDEMPTION - Electronic gift card redemption transaction type.
 * @property {string} POS_LENDING_WITH_CHECKOUT_JS - POS lending with checkout.js transaction type.
 * @property {string} GOOGLE_PAY_WITH_CHECKOUT_JS - Google Pay with checkout.js transaction type.
 * @property {string} CLICK_TO_PAY_WITH_CHECKOUT_JS - Click to pay with checkout.js transaction type.
 * @property {string} PAYPAL_WITH_CHECKOUT_JS - PayPal with checkout.js transaction type.
 * @property {string} SURCHARGE_WITH_CHECKOUT_JS - Surcharge with checkout.js transaction type.
 */
export enum TransactionType {
    CREDIT_CARD_SALE = "ccsale",
    CREDIT_CARD_AUTH_Only = "ccauthonly",
    CREDIT_CARD_VERIFY = "ccverify",
    CREDIT_CARD_ADD_RECURRING = "ccaddrecurring",
    CREDIT_CARD_ADD_INSTALLMENT = "ccaddinstall",
    CREDIT_CARD_GENERATE_TOKEN = "ccgettoken",
    ELECTRONIC_CHECK_PURCHASE = "ecspurchase",
    ELECTRONIC_CHECK_ADD_RECURRING = "ecsaddrecurring",
    ELECTRONIC_CHECK_ADD_INSTALLMENT = "ecsaddinstall",
    ELECTRONIC_GIFT_CARD_REDEMPTION = "egcsale",
    POS_LENDING_WITH_CHECKOUT_JS = "ccsale",
    GOOGLE_PAY_WITH_CHECKOUT_JS = "ccsale",
    CLICK_TO_PAY_WITH_CHECKOUT_JS = "ccsale",
    PAYPAL_WITH_CHECKOUT_JS = "ccsale",
    SURCHARGE_WITH_CHECKOUT_JS = "ccsale",
    THREE_D_SECURE2_WITH_CHECKOUT_JS = "ccsale"
}