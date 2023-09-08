// Package Imports
import { PayPalEnvironment } from "bc-paypal-sdk";
import { CheckoutEnvironment } from "bc-checkout-sdk";
import { StripeEnvironment } from "bc-stripe-sdk";
import { ClearPayEnvironment } from "bc-clearpay-sdk";
import { KlarnaEnvironment } from "bc-klarna-sdk";
import { ApplePayEnvironment } from "bc-apple-pay-sdk";

// Other Imports
import { Defaults } from "../../constants/constants";
import { BCEnvironment } from "../config/BCEnvironment";
import { stringToBoolean } from "../../utils/parse-util";
import { PaymentMethodType } from "../../constants/enums/PaymentMethodType";

export abstract class BasePaymentProvider {

    protected initSDK() {

        const config: any = BCEnvironment.getConfig();
        if (config?.systemName && config?.settings?.length) {

            const useSandbox = config?.settings?.find((x: any) => x.key === "UseSandbox")?.value || Defaults.String.Value;
            const isSandbox = useSandbox ? stringToBoolean(useSandbox) : false;

            if (config?.systemName?.toLowerCase() === PaymentMethodType.PAYPAL.toLowerCase()) {

                const clientId = config?.settings?.find((x: any) => x.key === "AccountCode")?.value || Defaults.String.Value;
                const appSecret = config?.settings?.find((x: any) => x.key === "Signature")?.value || Defaults.String.Value;

                // Init Env
                PayPalEnvironment.init(clientId, appSecret, isSandbox);
                return true;
            } else if (config?.systemName?.toLowerCase() === PaymentMethodType.CHECKOUT.toLowerCase()) {

                const clientId = config?.settings?.find((x: any) => x.key === "MotoAccountCode")?.value || Defaults.String.Value;
                const accessSecret = config?.settings?.find((x: any) => x.key === "MotoSignature")?.value || Defaults.String.Value;
                const processingChannelId = config?.settings?.find((x: any) => x.key === "MotoUserName")?.value || Defaults.String.Value;

                // Init Env
                CheckoutEnvironment.initServer(clientId, accessSecret, processingChannelId, isSandbox);
                return true;
            } else if (config?.systemName?.toLowerCase() === PaymentMethodType.STRIPE.toLowerCase()) {

                const publicKey = config?.settings?.find((x: any) => x.key === "AccountCode")?.value || Defaults.String.Value;
                const privateKey = config?.settings?.find((x: any) => x.key === "Signature")?.value || Defaults.String.Value;

                // Init Env
                StripeEnvironment.init(publicKey, privateKey);
                return true;
            } else if (config?.systemName?.toLowerCase() === PaymentMethodType.KLARNA.toLowerCase()) {

                const apiUserName = config?.settings?.find((x: any) => x.key === "AccountCode")?.value || Defaults.String.Value;
                const apiPassword = config?.settings?.find((x: any) => x.key === "Signature")?.value || Defaults.String.Value;

                // Init Env
                KlarnaEnvironment.init(apiUserName, apiPassword, isSandbox);
                return true;
            } else if (config?.systemName?.toLowerCase() === PaymentMethodType.CLEAR_PAY.toLowerCase()) {

                const apiUserName = config?.settings?.find((x: any) => x.key === "AccountCode")?.value || Defaults.String.Value;
                const apiPassword = config?.settings?.find((x: any) => x.key === "Signature")?.value || Defaults.String.Value;

                // Init Env
                ClearPayEnvironment.init(apiUserName, apiPassword, isSandbox);
                return true;
            } else if (config?.systemName?.toLowerCase() === PaymentMethodType.CHECKOUT_APPLE_PAY.toLowerCase()) {

                const merchantId = config?.settings?.find((x: any) => x.key === "AccountCode")?.value || Defaults.String.Value;
                const domainName = config?.settings?.find((x: any) => x.key === "MotoUserName")?.value || Defaults.String.Value;
                const displayName = config?.settings?.find((x: any) => x.key === "MotoPassword")?.value || Defaults.String.Value;
                const extras: any = BCEnvironment.getExtras();
                const pemCert = extras?.pemCert;
                const keyCert = extras?.keyCert;

                // Init Env
                ApplePayEnvironment.init(merchantId, domainName, displayName, pemCert, keyCert, isSandbox)
                return true;
            }
        }

        return false;
    }
}