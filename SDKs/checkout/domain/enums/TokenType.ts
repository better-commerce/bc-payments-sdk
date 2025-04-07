/**
 * TokenType enum represents the different types of tokenized payment methods that can be used.
 *
 * @ordinal {string} CARD - Represents a card token type.
 * @ordinal {string} APPLE_PAY - Represents an Apple Pay token type.
 * @ordinal {string} GOOGLE_PAY - Represents a Google Pay token type.
 */
export enum TokenType {
    CARD = "card",
    APPLE_PAY = "applepay",
    GOOGLE_PAY = "googlepay",
};