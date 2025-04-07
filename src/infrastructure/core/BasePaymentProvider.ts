// Package Imports
import { JuspayEnv } from "bc-juspay-sdk";

// Other Imports
import { Defaults } from "../../domain/constants/constants";
import { BCEnvironment } from "../../domain/config/BCEnvironment";
import { PaymentMethodType } from "../../domain/enums/PaymentMethodType";
import { Logger } from "../../domain/modules/better-commerce/Logger";
import { Utils } from "../..";
import { SDKs } from "../../../SDKs/lib"

/**
 * Abstract class {BasePaymentProvider} is the base class for all payment providers.
 *
 * Payment providers are responsible for providing the concrete implementation of the
 * payment provider methods.
 *
 * This class provides the following methods that can be overridden by the concrete
 * implementation classes:
 *
 * - {initSDK}: Initializes the SDK for the payment provider.
 * - {initPaymentIntent}: Initializes the payment intent for the payment provider.
 * - {requestToken}: Requests a token from the payment provider.
 * - {requestPayment}: Requests a payment from the payment provider.
 *
 * @abstract
 * @category Payment Provider
 */
export abstract class BasePaymentProvider {

    /**
     * Initializes the SDK for the given payment provider.
     *
     * @protected
     * @return {boolean} True if the SDK was initialized successfully, false otherwise.
     */
    protected initSDK() {

        /**
         * Logs the payment activity to the logging service, if enabled.
         *
         * @param {boolean} providerLoggingEnabled - True if logging is enabled for the provider.
         * @param {Object} data - The data associated with the payment.
         * @param {string} logMessage - The message to log.
         */
        const logActivity = (providerLoggingEnabled: boolean, data: any, logMessage: string) => {

            if (providerLoggingEnabled) {
                Logger.logPayment({
                    data,
                    message: logMessage,
                }, {});
            }
        }

        const providerLoggingEnabled = BCEnvironment.getEnableProviderLogging();
        const config: any = BCEnvironment.getConfig();
        if (config?.systemName && config?.settings?.length) {

            const useSandbox = config?.settings?.find((x: any) => x.key === "UseSandbox")?.value || Defaults.String.Value;
            const isSandbox = useSandbox ? Utils.ParseUtil.stringToBoolean(useSandbox) : false;

            if (config?.systemName?.toLowerCase() === PaymentMethodType.PAYPAL.toLowerCase()) {

                const clientId = config?.settings?.find((x: any) => x.key === "AccountCode")?.value || Defaults.String.Value;
                const appSecret = config?.settings?.find((x: any) => x.key === "Signature")?.value || Defaults.String.Value;

                // Init Env
                SDKs.Paypal.Config.PayPalEnvironment.init(clientId, appSecret, isSandbox);

                //const logData = { data: `PayPalEnvironment.init(${clientId}, ${appSecret}, ${isSandbox})` };
                //logActivity(providerLoggingEnabled, logData, `${config?.systemName} | InitProviderPayment`);

                return true;
            } else if (config?.systemName?.toLowerCase() === PaymentMethodType.CHECKOUT.toLowerCase()) {

                const clientId = config?.settings?.find((x: any) => x.key === "MotoAccountCode")?.value || Defaults.String.Value;
                const accessSecret = config?.settings?.find((x: any) => x.key === "MotoSignature")?.value || Defaults.String.Value;
                const processingChannelId = config?.settings?.find((x: any) => x.key === "MotoUserName")?.value || Defaults.String.Value;

                // Init Env
                SDKs.Checkout.Config.CheckoutEnvironment.initServer(clientId, accessSecret, processingChannelId, isSandbox, {
                    logActivity: (data: any) => {
                        if (providerLoggingEnabled) {
                            Logger.logPayment(data, {});
                        }
                    }
                });

                //const logData = { data: `CheckoutEnvironment.initServer(${clientId}, ${accessSecret}, ${processingChannelId}, ${isSandbox})` };
                //logActivity(providerLoggingEnabled, logData, `${config?.systemName} | InitProviderPayment`);

                return true;
            } else if (config?.systemName?.toLowerCase() === PaymentMethodType.STRIPE.toLowerCase()) {

                const publicKey = config?.settings?.find((x: any) => x.key === "AccountCode")?.value || Defaults.String.Value;
                const privateKey = config?.settings?.find((x: any) => x.key === "Signature")?.value || Defaults.String.Value;

                // Init Env
                SDKs.Stripe.Config.StripeEnvironment.init(publicKey, privateKey);

                //const logData = { data: `StripeEnvironment.init(${publicKey}, ${privateKey})` };
                //logActivity(providerLoggingEnabled, logData, `${config?.systemName} | InitProviderPayment`);

                return true;
            } else if (config?.systemName?.toLowerCase() === PaymentMethodType.KLARNA.toLowerCase()) {

                const apiUserName = config?.settings?.find((x: any) => x.key === "AccountCode")?.value || Defaults.String.Value;
                const apiPassword = config?.settings?.find((x: any) => x.key === "Signature")?.value || Defaults.String.Value;

                // Init Env
                SDKs.Klarna.Config.KlarnaEnvironment.init(apiUserName, apiPassword, isSandbox);

                //const logData = { data: `KlarnaEnvironment.init(${apiUserName}, ${apiPassword}, ${isSandbox})` };
                //logActivity(providerLoggingEnabled, logData, `${config?.systemName} | InitProviderPayment`);

                return true;
            } else if (config?.systemName?.toLowerCase() === PaymentMethodType.CLEAR_PAY.toLowerCase()) {

                const apiUserName = config?.settings?.find((x: any) => x.key === "AccountCode")?.value || Defaults.String.Value;
                const apiPassword = config?.settings?.find((x: any) => x.key === "Signature")?.value || Defaults.String.Value;

                // Init Env
                SDKs.Clearpay.Config.ClearPayEnvironment.init(apiUserName, apiPassword, isSandbox);

                //const logData = { data: `ClearPayEnvironment.init(${apiUserName}, ${apiPassword}, ${isSandbox})` };
                //logActivity(providerLoggingEnabled, logData, `${config?.systemName} | InitProviderPayment`);

                return true;
            } else if (config?.systemName?.toLowerCase() === PaymentMethodType.CHECKOUT_APPLE_PAY.toLowerCase()) {

                const merchantId = config?.settings?.find((x: any) => x.key === "AccountCode")?.value || Defaults.String.Value;
                const domainName = config?.settings?.find((x: any) => x.key === "MotoUserName")?.value || Defaults.String.Value;
                const displayName = config?.settings?.find((x: any) => x.key === "MotoPassword")?.value || Defaults.String.Value;
                const extras: any = BCEnvironment.getExtras();
                const pemCert = extras?.pemCert;
                const keyCert = extras?.keyCert;

                // Init Env
                SDKs.ApplePay.Config.ApplePayEnvironment.init(merchantId, domainName, displayName, pemCert, keyCert, isSandbox);

                //const logData = { data: `ApplePayEnvironment.init(${merchantId}, ${domainName}, ${displayName}, ${pemCert}, ${keyCert}, ${isSandbox})` };
                //logActivity(providerLoggingEnabled, logData, `${config?.systemName} | InitProviderPayment`);

                return true;
            } else if (config?.systemName?.toLowerCase() === PaymentMethodType.JUSPAY.toLowerCase()) {
                const merchantId = config?.settings?.find((x: any) => x.key === "AccountCode")?.value || Defaults.String.Value;
                const apiKey = config?.settings?.find((x: any) => x.key === "Signature")?.value || Defaults.String.Value;
                const sandboxUrl = config?.settings?.find((x: any) => x.key === "TestUrl")?.value || Defaults.String.Value;
                const liveUrl = config?.settings?.find((x: any) => x.key === "ProductionUrl")?.value || Defaults.String.Value;
                const useSandbox = config?.settings?.find((x: any) => x.key === "UseSandbox")?.value || Defaults.String.Value;
                const baseUrl = Utils.ParseUtil.stringToBoolean(useSandbox) ? sandboxUrl : liveUrl;
                let extras: any = BCEnvironment.getExtras();
                const returnUrl = `${extras?.origin}${config?.notificationUrl}`;

                // Init Env
                extras = { ...extras, returnUrl, };
                JuspayEnv.init();
                JuspayEnv.withCredentials(merchantId, apiKey, baseUrl, undefined, undefined, extras);
                return true;
            } else if (config?.systemName?.toLowerCase() === PaymentMethodType.ELAVON.toLowerCase()) {

                const merchantId = config?.settings?.find((x: any) => x.key === "AccountCode")?.value || Defaults.String.Value;
                const merchantUserId = config?.settings?.find((x: any) => x.key === "Signature")?.value || Defaults.String.Value;
                const merchantPIN = config?.settings?.find((x: any) => x.key === "MotoAccountCode")?.value || Defaults.String.Value;
                const vendorId = config?.settings?.find((x: any) => x.key === "MotoSignature")?.value || Defaults.String.Value;

                // Init Env
                SDKs.Elavon.Config.ElavonEnvironment.initServer(merchantId, merchantUserId, merchantPIN, vendorId, isSandbox, {
                    logActivity: (data: any) => {
                        if (providerLoggingEnabled) {
                            Logger.logPayment(data, {});
                        }
                    }
                });

                //const logData = { data: `CheckoutEnvironment.initServer(${clientId}, ${accessSecret}, ${processingChannelId}, ${isSandbox})` };
                //logActivity(providerLoggingEnabled, logData, `${config?.systemName} | InitProviderPayment`);

                return true;
            } else if (config?.systemName?.toLowerCase() === PaymentMethodType.OPAYO.toLowerCase()) {

                const vendorName = config?.settings?.find((x: any) => x.key === "AccountCode")?.value || Defaults.String.Value;
                const integrationKey = config?.settings?.find((x: any) => x.key === "Signature")?.value || Defaults.String.Value;
                const integrationPassword = config?.settings?.find((x: any) => x.key === "MotoAccountCode")?.value || Defaults.String.Value;
                let extras: any = BCEnvironment.getExtras();
                const returnUrl = `${extras?.origin}${config?.notificationUrl}`;
                extras = { ...extras, returnUrl, };

                // Init Env
                SDKs.Opayo.Config.OpayoEnvironment.init(vendorName, integrationKey, integrationPassword, isSandbox, { ...extras,
                    logActivity: (data: any) => {
                        if (providerLoggingEnabled) {
                            Logger.logPayment(data, {});
                        }
                    }
                });
                return true;
            }
        }

        return false;
    }
}