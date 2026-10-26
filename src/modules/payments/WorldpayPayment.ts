// Package Imports
import { createHash, createHmac, timingSafeEqual } from "crypto";

// Other Imports
import { IPaymentProvider } from "../../base/contracts/IPaymentProvider";
import { BasePaymentProvider } from "../../base/entity/BasePaymentProvider";
import { BCEnvironment } from "../../base/config/BCEnvironment";
import { Defaults } from "../../constants/constants";
import { PaymentStatus, Worldpay } from "../../constants/enums/PaymentStatus";
import { stringToBoolean } from "../../utils/parse-util";
import { IWorldpayHostedPaymentForm, IWorldpayPaymentRequest, IWorldpayPaymentResult, WorldpayVerificationMethod } from "../../models/payments/IWorldpay";

/**
 * MD5 secret used by the legacy BetterCommerce (Omnicx) Worldpay plugin when the `Signature`
 * setting is empty. Kept so signatures match installations configured against that plugin.
 */
const LEGACY_DEFAULT_MD5_SECRET = "test1234";

/** Query params added to the return URL so the response can be matched to the BetterCommerce order. */
const RETURN_PARAM_ORDER_ID = "bcOrderId";
const RETURN_PARAM_PAYMENT_REF = "bcPaymentRef";

const GUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/**
 * Class {WorldpayPayment} is a concrete implementation of the Worldpay Hosted Payment Page
 * (HTML redirect, `/wcc/purchase`) payment provider.
 *
 * Unlike the other providers there is no server-to-server API call: the storefront POSTs an
 * auto-submitting form to Worldpay, the shopper pays on the Worldpay page and is returned (and/or a
 * Payment Response is posted) to the configured notification URL.
 *
 * Settings (BetterCommerce payment method `Worldpay`):
 * - `UserName` (falls back to `MotoUserName`): Worldpay installation id (`instId`).
 * - `AccountCode`: Worldpay merchant code (`accId1`).
 * - `Signature`: MD5 secret for the purchase signature (`secret:currency:amount:testMode:instId`).
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
     * Builds the Hosted Payment Page form for an order.
     *
     * ________
     * WORLDPAY
     * ‾‾‾‾‾‾‾‾
     * API Reference - https://developerengine.fisglobal.com/apis/bg-total/html-redirect
     *
     * @param data - {@link IWorldpayPaymentRequest}
     * @returns A promise resolving to an {@link IWorldpayHostedPaymentForm} to POST from the browser,
     *          null when the SDK is not configured for Worldpay, or an object with error details.
     */
    async initPaymentIntent(data: IWorldpayPaymentRequest): Promise<IWorldpayHostedPaymentForm | any> {
        try {
            if (!super.initSDK()) {
                return null;
            }
            const settings = this.getSettings();
            const amount = Number(data?.amount);
            if (!settings.installationId) {
                throw new Error("Worldpay installation id (UserName setting) is not configured.");
            }
            if (!settings.paymentPageUrl) {
                throw new Error(`Worldpay ${settings.isSandbox ? "TestUrl" : "ProductionUrl"} setting is not configured.`);
            }
            if (!data?.orderId || !data?.orderNo || !data?.paymentId || !data?.currency || !Number.isFinite(amount) || amount <= 0) {
                throw new Error("orderId, orderNo, paymentId, currency and a positive amount are required.");
            }

            const formattedAmount = amount.toFixed(2);
            const testMode = String(settings.isSandbox ? Worldpay.TestMode.TEST : Worldpay.TestMode.LIVE);
            const signature = md5(`${settings.md5Secret}:${data.currency}:${formattedAmount}:${testMode}:${settings.installationId}`);
            const returnUrl = this.buildReturnUrl(data, data.returnUrl);
            const callbackUrl = data.callbackUrl ? this.buildReturnUrl(data, data.callbackUrl) : returnUrl;
            const billing = data.billingAddress || {};

            const fields: Record<string, string> = {
                instId: settings.installationId,
                cartId: String(data.orderNo),
                amount: formattedAmount,
                currency: data.currency,
                testMode,
                desc: data.description || Defaults.String.Value,
                authMode: Worldpay.AuthMode.FULL_AUTH,
                accId1: settings.merchantCode,
                name: [billing.firstName, billing.lastName].filter(Boolean).join(" "),
                email: data.email || Defaults.String.Value,
                address1: billing.address1 || Defaults.String.Value,
                address2: billing.address2 || Defaults.String.Value,
                address3: billing.address3 || Defaults.String.Value,
                town: billing.city || Defaults.String.Value,
                postcode: billing.postCode || Defaults.String.Value,
                country: billing.countryCode || Defaults.String.Value,
                tel: billing.phoneNo || Defaults.String.Value,
                signature,
                successURL: returnUrl,
                MC_callback: callbackUrl,
            };
            if (data.paymentType) {
                fields.paymentType = data.paymentType;
            }
            const cancelUrl = data.cancelUrl || (isAbsoluteUrl(settings.cancelUrl) ? `${settings.cancelUrl}${data.orderId}` : Defaults.String.Value);
            if (cancelUrl) {
                fields.returnURL = cancelUrl;
            }

            return { action: settings.paymentPageUrl, method: "POST", fields } as IWorldpayHostedPaymentForm;
        }
        catch (error: any) {
            return { hasError: true, error: error?.message };
        }
    }

    requestPayment(data: any) {
        throw new Error("Method not implemented.");
    }

    /**
     * Parses and authenticates a Worldpay return / Payment Response.
     *
     * Supports the HTML redirect result URL (`orderKey`, `paymentStatus`, `paymentAmount`,
     * `paymentCurrency`, `mac2`/`mac`) and the Business Gateway Payment Response (`transStatus`,
     * `transId`, `authAmount`, `callbackPW`).
     *
     * When a response secret is configured, a response that fails verification is reported as
     * DECLINED. When none is configured the result has `isVerified: false`; it is then reported as
     * DECLINED only if `worldpayRequireVerifiedResponse` is set. Callers must still check the amount
     * and currency against the order before recording the payment.
     *
     * @param data - Query string and form fields of the request Worldpay made or redirected to.
     * @returns A promise resolving to an {@link IWorldpayPaymentResult}, null when the SDK is not
     *          configured for Worldpay, or an object with error details.
     */
    async getOrderDetails(data: Record<string, string>): Promise<IWorldpayPaymentResult | any> {
        try {
            if (!super.initSDK()) {
                return null;
            }
            const settings = this.getSettings();
            const params = data || {};

            const paymentStatus = params.paymentStatus?.toUpperCase() || Defaults.String.Value;
            const transStatus = params.transStatus?.toUpperCase() || Defaults.String.Value;
            let status = paymentStatus ? mapPaymentStatus(paymentStatus) : mapTransStatus(transStatus);
            let message = Defaults.String.Value;

            const verificationMethod = verify(params, settings.responseSecret);
            const isVerified = verificationMethod !== "none";
            if (settings.responseSecret && !isVerified) {
                status = PaymentStatus.DECLINED;
                message = "Worldpay response verification failed.";
            } else if (!isVerified && settings.requireVerifiedResponse) {
                status = PaymentStatus.DECLINED;
                message = "Worldpay response is not signed and verified responses are required.";
            }

            // Legacy return URLs used `transId` (order GUID) and `orderId` (`orderNo-paymentId`).
            const legacyOrderId = GUID_REGEX.test(params.transId || Defaults.String.Value) ? params.transId : Defaults.String.Value;
            const paymentRef = params[RETURN_PARAM_PAYMENT_REF] || (/^\d+-.+$/.test(params.orderId || Defaults.String.Value) ? params.orderId : Defaults.String.Value);
            const [refOrderNo, ...refPaymentId] = (paymentRef || Defaults.String.Value).split("-");

            const amount = params.paymentAmount
                ? Number(params.paymentAmount) / 100
                : Number(params.authAmount || params.amount || Defaults.Int.Value);

            const result: IWorldpayPaymentResult = {
                status,
                gatewayStatus: paymentStatus || transStatus,
                orderId: params[RETURN_PARAM_ORDER_ID] || legacyOrderId,
                orderNo: refOrderNo || params.cartId || Defaults.String.Value,
                paymentId: refPaymentId.join("-"),
                amount: Number.isFinite(amount) ? amount : Defaults.Int.Value,
                currency: params.paymentCurrency || params.authCurrency || params.currency || Defaults.String.Value,
                gatewayReference: params.orderKey || (legacyOrderId ? Defaults.String.Value : params.transId) || Defaults.String.Value,
                authCode: params.rawAuthCode || params.authCode || Defaults.String.Value,
                cardType: params.cardType || Defaults.String.Value,
                isVerified,
                verificationMethod,
                message,
            };
            return result;
        }
        catch (error: any) {
            return { hasError: true, error: error?.message };
        }
    }

    /**
     * Reads the Worldpay settings from the configured payment method and extras.
     */
    private getSettings() {
        const config: any = BCEnvironment.getConfig();
        const extras: any = BCEnvironment.getExtras() || {};
        const setting = (key: string) => config?.settings?.find((x: any) => x.key === key)?.value || Defaults.String.Value;
        const isSandbox = extras?.worldpayUseSandbox !== undefined && extras?.worldpayUseSandbox !== ""
            ? stringToBoolean(String(extras.worldpayUseSandbox))
            : stringToBoolean(setting("UseSandbox") || "false");

        return {
            isSandbox,
            installationId: String(extras?.worldpayInstallationId || setting("UserName") || setting("MotoUserName")).trim(),
            merchantCode: setting("AccountCode"),
            md5Secret: setting("Signature") || LEGACY_DEFAULT_MD5_SECRET,
            responseSecret: String(extras?.worldpayResponseSecret || setting("MotoSignature")),
            requireVerifiedResponse: stringToBoolean(String(extras?.worldpayRequireVerifiedResponse ?? "false")),
            paymentPageUrl: isSandbox ? setting("TestUrl") : setting("ProductionUrl"),
            cancelUrl: setting("CancelUrl"),
            notificationUrl: config?.notificationUrl || Defaults.String.Value,
            origin: extras?.origin || Defaults.String.Value,
        };
    }

    /**
     * Builds the URL Worldpay returns the shopper / posts the Payment Response to, tagged with the
     * BetterCommerce order id and `orderNo-paymentId` reference.
     */
    private buildReturnUrl(data: IWorldpayPaymentRequest, url?: string): string {
        const settings = this.getSettings();
        const base = url || (isAbsoluteUrl(settings.notificationUrl) ? settings.notificationUrl : `${settings.origin}${settings.notificationUrl}`);
        if (!isAbsoluteUrl(base)) {
            throw new Error("An absolute Worldpay return URL is required (returnUrl, notificationUrl or extras.origin).");
        }
        const result = new URL(base);
        result.searchParams.set(RETURN_PARAM_ORDER_ID, data.orderId);
        result.searchParams.set(RETURN_PARAM_PAYMENT_REF, `${data.orderNo}-${data.paymentId}`);
        return result.toString();
    }
}

/**
 * Maps a Hosted Payment Page `paymentStatus` to a BetterCommerce {@link PaymentStatus}.
 */
const mapPaymentStatus = (paymentStatus: string): PaymentStatus => {
    switch (paymentStatus) {
        case Worldpay.PaymentStatus.AUTHORISED:
        case Worldpay.PaymentStatus.CAPTURED:
        case Worldpay.PaymentStatus.SETTLED:
            return PaymentStatus.PAID;
        case Worldpay.PaymentStatus.SENT_FOR_AUTHORISATION:
            return PaymentStatus.PENDING;
        case Worldpay.PaymentStatus.CANCELLED:
        case Worldpay.PaymentStatus.SHOPPER_CANCELLED:
            return PaymentStatus.CANCELLED;
        default:
            return PaymentStatus.DECLINED;
    }
}

/**
 * Maps a Payment Response `transStatus` to a BetterCommerce {@link PaymentStatus}.
 */
const mapTransStatus = (transStatus: string): PaymentStatus => {
    if (transStatus === Worldpay.TransStatus.SUCCESS) {
        return PaymentStatus.PAID;
    } else if (transStatus === Worldpay.TransStatus.CANCELLED) {
        return PaymentStatus.CANCELLED;
    }
    return PaymentStatus.DECLINED;
}

/**
 * Authenticates a Worldpay response with the configured response secret.
 *
 * - `mac2`: HMAC-SHA256(secret, `orderKey:paymentAmount:paymentCurrency:paymentStatus`), hex.
 * - `mac`: MD5(`orderKey` + `paymentAmount` + `paymentCurrency` + `paymentStatus` + secret), hex.
 * - `callbackPW`: equals the secret.
 *
 * @returns The method that authenticated the response, or `none`.
 */
const verify = (params: Record<string, string>, secret: string): WorldpayVerificationMethod => {
    if (!secret) {
        return "none";
    }
    const macFields = [params.orderKey, params.paymentAmount, params.paymentCurrency, params.paymentStatus].filter((x) => x !== undefined);
    if (params.mac2 && safeEqual(params.mac2.toLowerCase(), createHmac("sha256", secret).update(macFields.join(":")).digest("hex"))) {
        return "mac2";
    }
    if (params.mac && safeEqual(params.mac.toLowerCase(), md5(`${macFields.join("")}${secret}`))) {
        return "mac";
    }
    if (params.callbackPW && safeEqual(params.callbackPW, secret)) {
        return "callbackPW";
    }
    return "none";
}

const md5 = (value: string): string => createHash("md5").update(value, "utf8").digest("hex");

const safeEqual = (a: string, b: string): boolean => {
    const left = Buffer.from(a);
    const right = Buffer.from(b);
    return left.length === right.length && timingSafeEqual(left, right);
}

const isAbsoluteUrl = (value: string): boolean => /^https?:\/\//i.test(value || Defaults.String.Value);
