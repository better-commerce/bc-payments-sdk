// Package Imports
import { PayPalEnvironment } from "bc-paypal-sdk";
import { CheckoutEnvironment } from "bc-checkout-sdk";
import { StripeEnvironment } from "bc-stripe-sdk";

// Other Imports
import { Defaults } from "../../constants/constants";
import { BCEnvironment } from "../config/BCEnvironment";
import { stringToBoolean } from "../../utils/parse-util";
import { PaymentGateway } from "../../constants/enums/PaymentGateway";

export abstract class BasePayment {

    protected initSDK() {
        //PaymentGateway

        const config: any = BCEnvironment.getConfig();
        if (config?.systemName) {
            if (config?.systemName?.toLowerCase() === PaymentGateway.PAYPAL.toLowerCase()) {
                if (config?.settings?.length) {
                    const clientId = config?.settings?.find((x: any) => x.key === "AccountCode")?.value || Defaults.String.Value;
                    const appSecret = config?.settings?.find((x: any) => x.key === "Signature")?.value || Defaults.String.Value;
                    const useSandbox = config?.settings?.find((x: any) => x.key === "UseSandbox")?.value || Defaults.String.Value;
                    const isSandbox = useSandbox ? stringToBoolean(useSandbox) : false;

                    // Init Env
                    PayPalEnvironment.init(clientId, appSecret, isSandbox);
                    return true;
                }
            } else if (config?.systemName?.toLowerCase() === PaymentGateway.CHECKOUT.toLowerCase()) {
                if (config?.settings?.length) {

                    const clientId = config?.settings?.find((x: any) => x.key === "MotoAccountCode")?.value || Defaults.String.Value;
                    const accessSecret = config?.settings?.find((x: any) => x.key === "MotoSignature")?.value || Defaults.String.Value;
                    const processingChannelId = config?.settings?.find((x: any) => x.key === "MotoUserName")?.value || Defaults.String.Value;
                    const useSandbox = config?.settings?.find((x: any) => x.key === "UseSandbox")?.value || Defaults.String.Value;
                    const isSandbox = useSandbox ? stringToBoolean(useSandbox) : false;

                    // Init Env
                    CheckoutEnvironment.initServer(clientId, accessSecret, processingChannelId, isSandbox);
                    return true;
                }
            } else if (config?.systemName?.toLowerCase() === PaymentGateway.STRIPE.toLowerCase()) {
                if (config?.settings?.length) {
                    const publicKey = config?.settings?.find((x: any) => x.key === "AccountCode")?.value || Defaults.String.Value;
                    const privateKey = config?.settings?.find((x: any) => x.key === "Signature")?.value || Defaults.String.Value;

                    // Init Env
                    StripeEnvironment.init(publicKey, privateKey);
                    return true;
                }
            }
        }

        return false;
    }
}