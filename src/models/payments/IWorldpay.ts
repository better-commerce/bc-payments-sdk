import { IBillingAddress, IHostedPaymentForm, VerificationMethod } from "bc-worldpay-sdk";
import { PaymentStatus } from "../../constants/enums/PaymentStatus";

/**
 * Billing details pre-filled on the Worldpay Hosted Payment Page.
 */
export interface IWorldpayBillingAddress extends IBillingAddress {
}

/**
 * Input for {@link WorldpayPayment.initPaymentIntent}. Values come from the BetterCommerce order
 * created by `POST /commerce/checkout/{basketId}/convert`.
 */
export interface IWorldpayPaymentRequest {
    /** BetterCommerce order id (GUID). */
    orderId: string;
    /** BetterCommerce order number; sent to Worldpay as `cartId`. */
    orderNo: string | number;
    /** Id of the pending BetterCommerce payment record (`order.payment.id`). */
    paymentId: string | number;
    /** Amount to charge, in major units (e.g. 12.50). */
    amount: number;
    /** ISO 4217 currency code, e.g. GBP. */
    currency: string;
    description?: string;
    email?: string;
    billingAddress?: IWorldpayBillingAddress;
    /** Optional Worldpay `paymentType` (e.g. VISA, MSCD) to pre-select a card scheme. */
    paymentType?: string;
    /**
     * Absolute URL Worldpay returns the shopper to (`successURL`).
     * Defaults to `config.notificationUrl`, prefixed with `extras.origin` when relative.
     */
    returnUrl?: string;
    /**
     * Absolute URL for the server-to-server Payment Response (`MC_callback`). Defaults to the return URL.
     */
    callbackUrl?: string;
    /** Absolute URL for the "cancel" link on the payment page. Defaults to the `CancelUrl` setting + orderId. */
    cancelUrl?: string;
}

/**
 * An auto-submitting form the browser must POST to the Worldpay Hosted Payment Page.
 */
export interface IWorldpayHostedPaymentForm extends IHostedPaymentForm {
}

/**
 * How a Worldpay response was authenticated (`mac2`, `mac`, `callbackPW` or `none`).
 */
export type WorldpayVerificationMethod = VerificationMethod;

/**
 * Normalised result of {@link WorldpayPayment.getOrderDetails} (a Worldpay return/notification).
 */
export interface IWorldpayPaymentResult {
    /** Mapped BetterCommerce payment status (PAID, DECLINED, CANCELLED or PENDING). */
    status: PaymentStatus;
    /** Raw Worldpay status (`paymentStatus` or `transStatus`). */
    gatewayStatus: string;
    /** BetterCommerce order id (GUID), if present in the return URL. */
    orderId: string;
    orderNo: string;
    paymentId: string;
    /** Amount reported by Worldpay, in major units (0 when absent). */
    amount: number;
    currency: string;
    /** Worldpay transaction / order reference (`transId` from Worldpay or `orderKey`). */
    gatewayReference: string;
    authCode: string;
    cardType: string;
    /** True when the response was authenticated with a configured response secret. */
    isVerified: boolean;
    verificationMethod: WorldpayVerificationMethod;
    message: string;
}
