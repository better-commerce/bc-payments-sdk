// Package Imports
import { IPaymentResult, Transaction, TransactionOutcome, WorldpayEnvironment } from "bc-worldpay-sdk";

// Other Imports
import { IPaymentProvider } from "../../base/contracts/IPaymentProvider";
import { BasePaymentProvider } from "../../base/entity/BasePaymentProvider";
import { Defaults } from "../../constants/constants";
import { PaymentStatus } from "../../constants/enums/PaymentStatus";
import { IWorldpayHostedPaymentForm, IWorldpayPaymentRequest, IWorldpayPaymentResult } from "../../models/payments/IWorldpay";

/** Query params added to the return URLs so the response can be matched to the BetterCommerce order. */
const RETURN_PARAM_ORDER_ID = "bcOrderId";
const RETURN_PARAM_PAYMENT_REF = "bcPaymentRef";

const GUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/**
 * Class {WorldpayPayment} is a concrete implementation of a payment provider.
 * It provides a set of methods that can be used to interact with the Worldpay Hosted Payment Page
 * (HTML redirect) via `bc-worldpay-sdk`.
 *
 * Settings (BetterCommerce payment method `Worldpay`), mapped in {@link BasePaymentProvider.initSDK}:
 * - `UserName` (falls back to `MotoUserName`): installation id (`instId`).
 * - `AccountCode`: merchant code (`accId1`).
 * - `Signature`: MD5 secret for the purchase signature.
 * - `MotoSignature`: optional response secret, the MAC secret (`mac2`/`mac`) or Payment Response password (`callbackPW`).
 * - `UseSandbox`, `TestUrl`, `ProductionUrl`, `CancelUrl`.
 *
 * Extras (`BCEnvironment.addExtras`): `origin`, `worldpayInstallationId`, `worldpayResponseSecret`,
 * `worldpayRequireVerifiedResponse`, `worldpayUseSandbox` override or extend the settings above.
 *
 * @class WorldpayPayment
 * @extends {BasePaymentProvider}
 * @implements {IPaymentProvider}
 */
export class WorldpayPayment extends BasePaymentProvider implements IPaymentProvider {

    /**
     * Builds the Hosted Payment Page form for a BetterCommerce order. The return URLs are tagged with
     * the order id and the `orderNo-paymentId` reference.
     *
     * @param data - {@link IWorldpayPaymentRequest}
     * @returns A promise resolving to an {@link IWorldpayHostedPaymentForm} to POST from the browser,
     *          null when the SDK is not configured for Worldpay, or an object with error details.
     */
    async initPaymentIntent(data: IWorldpayPaymentRequest): Promise<IWorldpayHostedPaymentForm | any> {
        try {
            if (super.initSDK()) {
                if (!data?.orderId || !data?.orderNo || !data?.paymentId) {
                    throw new Error("orderId, orderNo and paymentId are required.");
                }
                const extras = WorldpayEnvironment.getExtras() || {};
                const successUrl = tagReturnUrl(data, data.returnUrl || extras.returnUrl);
                const callbackUrl = data.callbackUrl ? tagReturnUrl(data, data.callbackUrl) : successUrl;
                // Legacy behaviour: the `CancelUrl` setting is suffixed with the order id.
                const cancelUrl = data.cancelUrl || (/^https?:\/\//i.test(extras.cancelUrl || Defaults.String.Value) ? `${extras.cancelUrl}${data.orderId}` : Defaults.String.Value);

                const intentResult = await new Transaction().request({
                    cartId: data.orderNo,
                    amount: data.amount,
                    currency: data.currency,
                    description: data.description,
                    email: data.email,
                    billingAddress: data.billingAddress,
                    paymentType: data.paymentType,
                    successUrl,
                    callbackUrl,
                    cancelUrl,
                });
                return intentResult;
            }
            return null;
        }
        catch (error: any) {
            return { hasError: true, error: error?.message };
        }
    }

    requestPayment(data: any) {
        throw new Error("Method not implemented.");
    }

    /**
     * Parses and authenticates a Worldpay return / Payment Response and maps it to the BetterCommerce
     * order and payment status. Callers must still check the amount and currency against the order
     * before recording the payment.
     *
     * @param data - Query string and form fields of the request Worldpay made or redirected to.
     * @returns A promise resolving to an {@link IWorldpayPaymentResult}, null when the SDK is not
     *          configured for Worldpay, or an object with error details.
     */
    async getOrderDetails(data: Record<string, string>): Promise<IWorldpayPaymentResult | any> {
        try {
            if (super.initSDK()) {
                const params = data || {};
                const details: IPaymentResult & { hasError?: boolean } = await new Transaction().getDetails(params);
                if (details?.hasError) {
                    return details;
                }

                // Legacy return URLs used `transId` (order GUID) and `orderId` (`orderNo-paymentId`).
                const legacyOrderId = GUID_REGEX.test(params.transId || Defaults.String.Value) ? params.transId : Defaults.String.Value;
                const paymentRef = params[RETURN_PARAM_PAYMENT_REF] || (/^\d+-.+$/.test(params.orderId || Defaults.String.Value) ? params.orderId : Defaults.String.Value);
                const [refOrderNo, ...refPaymentId] = (paymentRef || Defaults.String.Value).split("-");

                const result: IWorldpayPaymentResult = {
                    status: toPaymentStatus(details.outcome),
                    gatewayStatus: details.gatewayStatus,
                    orderId: params[RETURN_PARAM_ORDER_ID] || legacyOrderId,
                    orderNo: refOrderNo || details.cartId,
                    paymentId: refPaymentId.join("-"),
                    amount: details.amount,
                    currency: details.currency,
                    gatewayReference: details.orderKey || (legacyOrderId ? Defaults.String.Value : details.transId),
                    authCode: details.authCode,
                    cardType: details.cardType,
                    isVerified: details.isVerified,
                    verificationMethod: details.verificationMethod,
                    message: details.message,
                };
                return result;
            }
            return null;
        }
        catch (error: any) {
            return { hasError: true, error: error?.message };
        }
    }
}

/**
 * Adds the BetterCommerce order id and `orderNo-paymentId` reference to a return URL.
 */
const tagReturnUrl = (data: IWorldpayPaymentRequest, url?: string): string => {
    if (!/^https?:\/\//i.test(url || Defaults.String.Value)) {
        throw new Error("An absolute Worldpay return URL is required (returnUrl, notificationUrl or extras.origin).");
    }
    const result = new URL(url!);
    result.searchParams.set(RETURN_PARAM_ORDER_ID, data.orderId);
    result.searchParams.set(RETURN_PARAM_PAYMENT_REF, `${data.orderNo}-${data.paymentId}`);
    return result.toString();
}

/**
 * Maps a `bc-worldpay-sdk` {@link TransactionOutcome} to a BetterCommerce {@link PaymentStatus}.
 */
const toPaymentStatus = (outcome: TransactionOutcome): PaymentStatus => {
    switch (outcome) {
        case TransactionOutcome.AUTHORISED:
            return PaymentStatus.PAID;
        case TransactionOutcome.PENDING:
            return PaymentStatus.PENDING;
        case TransactionOutcome.CANCELLED:
            return PaymentStatus.CANCELLED;
        default:
            return PaymentStatus.DECLINED;
    }
}
