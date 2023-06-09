// Package Imports
import { PayPalEnvironment } from "bc-paypal-sdk";
import { CheckoutEnvironment } from "bc-checkout-sdk";
import { StripeEnvironment } from "bc-stripe-sdk";
import { ClearPayEnvironment } from "bc-clearpay-sdk";

// Other Imports
import { Defaults } from "../../constants/constants";
import { BCEnvironment } from "../config/BCEnvironment";
import { stringToBoolean } from "../../utils/parse-util";
import { PaymentGateway } from "../../constants/enums/PaymentGateway";
import { KlarnaEnvironment } from "bc-klarna-sdk";

export abstract class BasePaymentProvider {

    protected initSDK() {

        const config: any = BCEnvironment.getConfig();
        if (config?.systemName && config?.settings?.length) {

            const useSandbox = config?.settings?.find((x: any) => x.key === "UseSandbox")?.value || Defaults.String.Value;
            const isSandbox = useSandbox ? stringToBoolean(useSandbox) : false;

            if (config?.systemName?.toLowerCase() === PaymentGateway.PAYPAL.toLowerCase()) {

                const clientId = config?.settings?.find((x: any) => x.key === "AccountCode")?.value || Defaults.String.Value;
                const appSecret = config?.settings?.find((x: any) => x.key === "Signature")?.value || Defaults.String.Value;

                // Init Env
                PayPalEnvironment.init(clientId, appSecret, isSandbox);
                return true;
            } else if (config?.systemName?.toLowerCase() === PaymentGateway.CHECKOUT.toLowerCase()) {

                const clientId = config?.settings?.find((x: any) => x.key === "MotoAccountCode")?.value || Defaults.String.Value;
                const accessSecret = config?.settings?.find((x: any) => x.key === "MotoSignature")?.value || Defaults.String.Value;
                const processingChannelId = config?.settings?.find((x: any) => x.key === "MotoUserName")?.value || Defaults.String.Value;

                // Init Env
                CheckoutEnvironment.initServer(clientId, accessSecret, processingChannelId, isSandbox);
                return true;
            } else if (config?.systemName?.toLowerCase() === PaymentGateway.STRIPE.toLowerCase()) {

                const publicKey = config?.settings?.find((x: any) => x.key === "AccountCode")?.value || Defaults.String.Value;
                const privateKey = config?.settings?.find((x: any) => x.key === "Signature")?.value || Defaults.String.Value;

                // Init Env
                StripeEnvironment.init(publicKey, privateKey);
                return true;
            } else if (config?.systemName?.toLowerCase() === PaymentGateway.KLARNA.toLowerCase()) {

                const apiUserName = config?.settings?.find((x: any) => x.key === "AccountCode")?.value || Defaults.String.Value;
                const apiPassword = config?.settings?.find((x: any) => x.key === "Signature")?.value || Defaults.String.Value;

                // Init Env
                KlarnaEnvironment.init(apiUserName, apiPassword, isSandbox);
                return true;
            } else if (config?.systemName?.toLowerCase() === PaymentGateway.CLEAR_PAY.toLowerCase()) {

                const apiUserName = config?.settings?.find((x: any) => x.key === "AccountCode")?.value || Defaults.String.Value;
                const apiPassword = config?.settings?.find((x: any) => x.key === "Signature")?.value || Defaults.String.Value;

                // Init Env
                ClearPayEnvironment.init(apiUserName, apiPassword, isSandbox);
                return true;
            }
        }

        return false;
    }
}