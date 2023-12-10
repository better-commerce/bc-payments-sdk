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

export enum PaymentTransactionStatus {
    NONE = 'None',
    TXN_CHARGED = 'TXN_CHARGED',
    TXN_FAILED = 'TXN_FAILED',
    ORDER_REFUNDED = 'ORDER_REFUNDED',
}

export module Checkout {
    export enum EventType {
        PAYMENT_APPROVED = 'payment_approved',
        PAYMENT_CAPTURED = 'payment_captured',
    }

    export enum ResponseSummaryType {
        APPROVED = 'Approved',
        DECLINED = 'Declined',
        SOFT_DECLINE = 'Soft Decline',
        HARD_DECLINE = 'Hard Decline',
        RISK_RESPONSES = 'Risk Responses',
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