export module Defaults {
    export module Int {
        export const Value = 0;
    }

    export module String {
        export const Value = "";
    }

    export module Guid {
        export const Value = "00000000-0000-0000-0000-000000000000";
    }

    export module Object {
        export const Value = {};
    }
}

export module RegularExpression {
    export const ORDER_BASKET_ID_MATCH = /Order (.*?) for basket (.*?) for orderId (.*?)$/g
}

export enum PaymentTransactionStatus {
    NONE = 'None',
    TXN_INITIATED = 'TXN_INITIATED',
    TXN_CHARGED = 'TXN_CHARGED',
    TXN_FAILED = 'TXN_FAILED',
    ORDER_REFUNDED = 'ORDER_REFUNDED',
}

export module Checkout {

    /**
     * Enum {EventType} contains the list of events that can be triggered by Checkout.
     *
     * These events represent different stages in a payment process, such as when
     * a payment is approved, captured, or fails authentication.
     *
     * @ordinal {string} PAYMENT_APPROVED - The payment was approved by the system.
     * @ordinal {string} PAYMENT_CAPTURED - The payment was successfully captured.
     * @ordinal {string} PAYMENT_AUTHENTICATION_FAILED - The payment authentication failed, possibly requiring user intervention.
     */
    export enum EventType {
        PAYMENT_APPROVED = 'payment_approved',
        PAYMENT_CAPTURED = 'payment_captured',
        PAYMENT_AUTHENTICATION_FAILED = 'payment_authentication_failed',
    }

    /**
     * Enum {EventType} contains the list of events that can be triggered by Checkout.
     *
     * @enum {string}
     * @readonly
     * @memberof Checkout
     *
     * @ordinal {string} PAYMENT_APPROVED - The payment was approved.
     * @ordinal {string} PAYMENT_CAPTURED - The payment was captured.
     * @ordinal {string} PAYMENT_AUTHENTICATION_FAILED - The payment authentication failed.
     */
    export enum ResponseSummaryType {
        APPROVED = 'Approved',
        DECLINED = 'Declined',
        SOFT_DECLINE = 'Soft Decline',
        HARD_DECLINE = 'Hard Decline',
        RISK_RESPONSES = 'Risk Responses',
    }
}

export module Paypal {

    export enum EventType {
        PAYMENT_CAPTURED = 'PAYMENT.CAPTURE.COMPLETED',
        PAYMENT_REFUNDED = 'PAYMENT.REFUND.COMPLETED',
        PAYMENT_AUTHENTICATION_FAILED = 'PAYMENT.AUTHORIZATION.VOIDED',
    }

    export enum ResourceType {
        CAPTURE = 'capture',
    }
}

export module JusPay {
    export enum TransactionStatus {
        TXN_CHARGED = 'TXN_CHARGED',
        TXN_FAILED = 'TXN_FAILED',
        ORDER_REFUNDED = 'ORDER_REFUNDED',
    }

    export enum UPI {
        PAYMENT_METHOD_TYPE = 'UPI',
        PAYMENT_METHOD = 'UPI',
        TRANSACTION_TYPE = 'UPI_COLLECT',
    }

    export module Offers {
        export const ELIGIBLE_OFFER_STATUS = 'ELIGIBLE'

        export enum CalculationRuleType {
            PERCENTAGE = 'PERCENTAGE',
            ABSOLUTE = 'ABSOLUTE',
        }
    }
}