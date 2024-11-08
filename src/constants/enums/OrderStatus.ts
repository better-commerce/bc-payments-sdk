/**
 * Enum representing the various statuses of an order.
 * 
 * @enum {number}
 * @ordinal {number} UNKNOWN - The status of the order is unknown.
 * @ordinal {number} INCOMPLETE - The order is incomplete.
 * @ordinal {number} PREORDERUNTRUSTED - The preorder is in an untrusted state.
 * @ordinal {number} PROCESSING - The order is being processed.
 * @ordinal {number} COMPLETE - The order is complete.
 * @ordinal {number} CANCELLED - The order has been cancelled.
 * @ordinal {number} PENDING - The order is pending.
 * @ordinal {number} APPROVED - The order has been approved.
 * @ordinal {number} SENT_TO_WAREHOSE - The order has been sent to the warehouse.
 * @ordinal {number} ACCEPTED_IN_WAREHOUSE - The order has been accepted in the warehouse.
 * @ordinal {number} AWAITING_SETTLEMENT - The order is awaiting settlement.
 * @ordinal {number} ORDER_SETTLED - The order has been settled.
 * @ordinal {number} DISPATCH - The order is ready for dispatch.
 * @ordinal {number} PREORDER_APPROVED - The preorder has been approved.
 * @ordinal {number} READY_TO_DISPATCH - The order is ready to be dispatched.
 * @ordinal {number} PARTIALLY_DESPATCHED - The order has been partially dispatched.
 * @ordinal {number} ACCEPTED - The order has been accepted.
 * @ordinal {number} CREATE - The order is in creation state.
 * @ordinal {number} AWAITING_CUSTOMER_FEEDBACK - The order is awaiting feedback from the customer.
 * @ordinal {number} REFUNDED - The order has been refunded.
 * @ordinal {number} RETURNED_BY_WAREHOUSE - The order has been returned by the warehouse.
 * @ordinal {number} AWAITING_STOCK - The order is awaiting stock.
 * @ordinal {number} WAIT_FOR_STOCK - The order is waiting for stock.
 */
export enum OrderStatus {
    UNKNOWN = 0,
    INCOMPLETE = 1,
    PREORDERUNTRUSTED = 10,
    PROCESSING = 20,
    COMPLETE = 30,
    CANCELLED = 40,
    PENDING = 2,
    APPROVED = 3,
    SENT_TO_WAREHOSE = 4,
    ACCEPTED_IN_WAREHOUSE = 5,
    AWAITING_SETTLEMENT = 6,
    ORDER_SETTLED = 7,
    DISPATCH = 9,
    PREORDER_APPROVED = 11,
    READY_TO_DISPATCH = 12,
    PARTIALLY_DESPATCHED = 15,
    ACCEPTED = 21,
    CREATE = 22,
    AWAITING_CUSTOMER_FEEDBACK = 23,
    REFUNDED = 24,
    RETURNED_BY_WAREHOUSE = 25,
    AWAITING_STOCK = 26,
    WAIT_FOR_STOCK = 27,
    PICKED_UP = 41,
    SHIPMENT_DELAYED = 42,
    OUT_FOR_DELIVERY = 43,
    FAILED_DELIVERY = 44,
    RTO_REQUESTED = 45,
    RTO_RECEIVED = 46,
    RETURN_OUT_FOR_PICKUP = 47,
    RETURN_PICKUP_RESCHEDULED = 48,
    RETURN_PICKED_UP = 49,
    RETURN_PICKUP_CANCELLED = 50,
    RMA_RECEIVED = 51,
    EXCHANGE_REQUESTED = 52,
    EXCHANGE_DENIED = 53,
    IN_TRANSIT = 54,
    PARTIALLY_DELIVERED = 55,
    PROBLEM_WITH_ORDER = 100,
    DECLINED_PAYMENT = 101,
    CANCELLED_BY_STORE = 102,
    CANCELLED_BY_STORE_PAYMENT_ISSUE = 103,
    CANCELLED_BY_STORE_STOCK_ISSUE = 104,
    CANCELLED_BY_CUSTOMER = 105,
    REQUEST_RETURN = 106,
    ID_REQUIRED = 107,
    REFUND_REQUIRED = 108,
    REFUND_APPROVED = 109,
    CANCELLED_FAILED_FRAUD_SCREENING = 110,
    FAILED_IN_OMS = 200,
    NEW = 201,
    CANCELLED_BY_LAPSED_JOB = 202,
    AWAITING_TRACKING = 205,
    VOID = 206,
    PROOF_OF_BILLING_REQUIRED = 207,
    PHOTO_ID_AND_PROOF_OF_BILLING_REQUIRED = 208,
    REQUEST_A_CALL = 209,
    VERIFY_PAYPAL_EMAIL_ADDRESS = 210,
    DELIVERED = 211,
};