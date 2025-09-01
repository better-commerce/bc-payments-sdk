/**
 * Enum {PaymentStatus} contains the list of payment statuses for a payment operation.
 *
 * These statuses are used to represent the current state of a payment operation.
 *
 * @enum {number}
 * @readonly
 * @memberof Payment
 * @ordinal {number} PENDING - Payment is in progress.
 * @ordinal {number} AUTHORIZED - Payment was authorized by the payment provider.
 * @ordinal {number} PAID - Payment was successfully paid.
 * @ordinal {number} DECLINED - Payment was declined by the payment provider.
 * @ordinal {number} CANCELLED - Payment was cancelled.
 * @ordinal {number} CANCELLED_BY_PSP - Payment was cancelled by the payment service provider.
 * @ordinal {number} REFUNDED - Payment was refunded.
 * @ordinal {number} CHARGING - Payment is being charged.
 * @ordinal {number} VOIDED - Payment was voided.
 * @ordinal {number} REQUIRE_PRE_AUTH - Pre-authorization is required for the payment.
 * @ordinal {number} PROBLEM_IN_REFUND - There was a problem refunding the payment.
 * @ordinal {number} PROBLEM_IN_POST_AUTH - There was a problem performing the post-authorization process.
 * @ordinal {number} AWAITING_POST_AUTH_RESPONSE - The payment is waiting for a response from the post-authorization process.
 * @ordinal {number} REQUEST_TO_CANCEL_PRE_AUTH - There was a request to cancel the pre-authorization.
 * @ordinal {number} PROBLEM_IN_CANCEL_PRE_AUTH - There was a problem cancelling the pre-authorization.
 * @ordinal {number} PO_RECEIVED - The purchase order was received.
 * @ordinal {number} DUPLICATE_REQUEST - The payment request was a duplicate.
 * @ordinal {number} INITIATED - The payment was initiated.
 * @ordinal {number} RETRY_REFUND - The payment refund should be retried.
 */
export enum PaymentStatus {
  PENDING = 0,
  AUTHORIZED = 1,
  PAID = 2,
  DECLINED = 3,
  CANCELLED = 4,
  CANCELLED_BY_PSP = 5,
  REFUNDED = 6,
  CHARGING = 7,
  VOIDED = 8,
  REQUIRE_PRE_AUTH = 9,
  PROBLEM_IN_REFUND = 10,
  PROBLEM_IN_POST_AUTH = 11,
  AWAITING_POST_AUTH_RESPONSE = 12,
  REQUEST_TO_CANCEL_PRE_AUTH = 13,
  PROBLEM_IN_CANCEL_PRE_AUTH = 14,
  PO_RECEIVED = 15,
  DUPLICATE_REQUEST = 16,
  INITIATED = 17,
  RETRY_REFUND = 18,
};

export module PayPal {

  /**
   * Enum {PaymentStatus} contains the list of payment statuses for a PayPal payment operation.
   *
   * These statuses are used to represent the current state of a PayPal payment operation.
   *
   * @enum {string}
   * @readonly
   * @memberof PayPal
   */
  export enum PaymentStatus {

    // The order was created with the specified context.
    CREATED = "CREATED",

    // The order was saved and persisted. The order status continues to be in progress until a capture is made with final_capture = true for all purchase units within the order.
    SAVED = "SAVED",

    // The customer approved the payment through the PayPal wallet or another form of guest or unbranded payment. For example, a card, bank account, or so on.
    APPROVED = "APPROVED",

    // All purchase units in the order are voided.
    VOIDED = "VOIDED",

    // The payment was authorized or the authorized payment was captured for the order.
    COMPLETED = "COMPLETED",

    // The order requires an action from the payer (e.g. 3DS authentication). Redirect the payer to the "rel":"payer-action" HATEOAS link returned as part of the response prior to authorizing or capturing the order.
    PAYER_ACTION_REQUIRED = "PAYER_ACTION_REQUIRED",
  };
};

export module Checkout {

  /**
   * Enum {PaymentStatus} contains the list of payment statuses for a Checkout payment operation.
   *
   * These statuses are used to represent the current state of a Checkout payment operation.
   *
   * @enum {string}
   * @readonly
   * @memberof Checkout
   */
  export enum PaymentStatus {
    PENDING = "Pending",
    AUTHORIZED = "Authorized",
    CARD_VERIFIED = "Card Verified",
    VOIDED = "Voided",
    PARTIALLY_CAPTURED = "Partially Captured",
    CAPTURED = "Captured",
    PARTIALLY_REFUNDED = "Partially Refunded",
    REFUNDED = "Refunded",
    DECLINED = "Declined",
    CANCELED = "Canceled",
    EXPIRED = "Expired",
    PAID = "Paid",
  };
};

export module Stripe {

  /**
   * Enum {PaymentStatus} contains the list of payment statuses for a Stripe payment operation.
   *
   * These statuses are used to represent the current state of a Stripe payment operation.
   *
   * @enum {string}
   * @readonly
   * @memberof Stripe
   */
  export enum PaymentStatus {
    SUCCEEDED = "succeeded",
    PROCESSING = "processing",
    UNSUCCESSFUL = "requires_payment_method",
  };
};

export module Klarna {

  /**
   * Enum {PaymentStatus} contains the list of payment statuses for a Klarna payment operation.
   *
   * These statuses are used to represent the current state of a Klarna payment operation.
   *
   * @enum {string}
   * @readonly
   * @memberof Klarna
   *
   * @ordinal {string} AUTHORIZED - The payment method has been authorized.
   * @ordinal {string} PART_CAPTURED - A partial capture has been taken.
   * @ordinal {string} CAPTURED - A full capture has been taken.
   * @ordinal {string} CANCELLED - The payment has been cancelled.
   * @ordinal {string} EXPIRED - The payment has expired.
   * @ordinal {string} CLOSED - The payment has been closed.
   */
  export enum PaymentStatus {
    AUTHORIZED = "AUTHORIZED",
    PART_CAPTURED = "PART_CAPTURED",
    CAPTURED = "CAPTURED",
    CANCELLED = "CANCELLED",
    EXPIRED = "EXPIRED",
    CLOSED = "CLOSED",
  };
};

export module ClearPay {

  /**
   * Enum {PaymentStatus} contains the list of payment statuses for a ClearPay payment operation.
   *
   * These statuses are used to represent the current state of a ClearPay payment operation.
   *
   * @enum {string}
   * @readonly
   * @memberof ClearPay
   *
   * @ordinal {string} APPROVED - The payment was approved.
   * @ordinal {string} DECLINED - The payment was declined.
   */
  export enum PaymentStatus {
    APPROVED = "APPROVED",
    DECLINED = "DECLINED",
  };
};

export module OmniCapital {

  /**
   * Enum {@link PaymentStatus} represents the various statuses a transaction can have
   * in the OmniCapital retail finance workflow.
   *
   * @readonly
   * @enum {string}
   */
  export enum PaymentStatus {
    PENDING = 'Pending',
    IN_PROGRESS = 'In Progress',
    DECLINED = 'Declined',
    UNDERWRITER = 'Underwriter',
    CUSTOMER_ACTION_REQUIRED = 'Customer Action Required',
    REFERRAL_OVERRIDE_APPROVE = 'Referral (Override - Approve)',
    REFERRAL_OVERRIDE_RESCORE = 'Referral (Override - Rescore)',
    SIGN_DOCUMENTS = 'Sign Documents',
    SIGN_DOCUMENTS_AMENDMENT = 'Sign Documents (Amendment)',
    APPROVED = 'Approved',
    AWAITING_FULFILMENT = 'Awaiting fulfilment',
    EXCEPTION = 'Exception',
    PAYMENT_REQUESTED = 'Payment Requested',
    CDS_NOTE_REQUIRED = 'C.D.S. Note Required',
    CDS_NOTE_REVIEW = 'C.D.S. Note Review',
    CDS_NOTE_REVIEW_CUSTOMER = 'C.D.S. Note Review (Customer)',
    CDS_NOTE_REVIEW_CUSTOMER_INVESTIGATION = 'C.D.S. Note Review (Customer - Investigation)',
    CDS_NOTE_REVIEW_CUSTOMER_ISSUE = 'C.D.S. Note Review (Customer - Issue)',
    COMPLETE = 'Complete',
    ORDER_CANCELLED = 'Order cancelled',
    FINANCE_OFFER_WITHDRAWN = 'Finance offer withdrawn',
    ORDER_REFUNDED = 'Order refunded',
    APPLICATION_LAPSED = 'Application Lapsed',
    CREDIT_CHECK_DECLINED = 'Credit Check Declined',
    CREDIT_CHECK_PRE_DECLINE = 'Credit Check Pre Decline',
  }

}

export module Juspay {

  /**
   * Enum {PaymentStatus} contains the list of payment statuses for a Juspay payment operation.
   *
   * These statuses are used to represent the current state of a Juspay payment operation.
   *
   * @enum {string}
   * @readonly
   * @memberof Juspay
   *
   * @property {string} AUTHORIZATION_FAILED - The authorization of the payment failed.
   * @property {string} AUTHENTICATION_FAILED - The authentication of the payment failed.
   * @property {string} PENDING - The payment is pending.
   * @property {string} VBV_SUCCESSFUL - The VBV (Verified by Visa) authentication of the payment was successful.
   * @property {string} CHARGED - The payment was charged.
   * @property {string} JUSPAY_DECLINED - The payment was declined by Juspay.
   * @property {string} AUTO_REFUNDED - The payment was automatically refunded.
   * @property {string} CAPTURE_FAILED - The capture of the payment failed.
   * @property {string} NOT_FOUND - The payment was not found.
   */
  export enum PaymentOrderStatus {
    AUTHORIZATION_FAILED = "AUTHORIZATION_FAILED",
    AUTHENTICATION_FAILED = "AUTHENTICATION_FAILED", // UPI
    PENDING = "PENDING_VBV", // Card
    VBV_SUCCESSFUL = "VBV_SUCCESSFUL",
    CHARGED = "CHARGED",
    JUSPAY_DECLINED = "JUSPAY_DECLINED",
    AUTO_REFUNDED = "AUTO_REFUNDED",
    CAPTURE_FAILED = "CAPTURE_FAILED",
    NOT_FOUND = "NOT_FOUND",
    AUTHORIZING = "AUTHORIZING",
    STARTED = "STARTED",
    CAPTURE_INITIATED = "CAPTURE_INITIATED",
  };
};