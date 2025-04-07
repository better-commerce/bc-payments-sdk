/**
 * Enum representing different payment intents.
 * 
 * @enum {string}
 * @ordinal {string} BUY - For one-time payments.
 * @ordinal {string} TOKENIZE - To enable recurring payments without charging your customer at checkout.
 * @ordinal {string} BUY_AND_TOKENIZE - To charge the customer at checkout and enable recurring payments at the same time.
 */
export enum PaymentIntent {

    // For one-time payments
    BUY = "buy",

    // To enable recurring payments without charging your customer at checkout
    TOKENIZE = "tokenize",

    // To charge the customer at checkout and enable recurring payments at the same time
    BUY_AND_TOKENIZE = "buy_and_tokenize",
}