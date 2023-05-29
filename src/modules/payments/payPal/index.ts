// Package Imports
import { PayPalEnvironment, Order } from "bc-paypal-sdk";

// Other Imports
import { Defaults } from "../../../constants/constants";
import { stringToBoolean } from "../../../utils/parse-util";
import { IPaymentProvider } from "../../../base/contracts/IPaymentProvider";

export class PayPalPayment implements IPaymentProvider {
    async getOrderDetails(data: any, config: any): Promise<any> {
        try {

            if (config?.settings?.length) {
                const clientId = config?.settings?.find((x: any) => x.key === "AccountCode")?.value || Defaults.String.Value;
                const appSecret = config?.settings?.find((x: any) => x.key === "Signature")?.value || Defaults.String.Value;
                const useSandbox = config?.settings?.find((x: any) => x.key === "UseSandbox")?.value || Defaults.String.Value;

                // Init Env
                PayPalEnvironment.init(clientId, appSecret, useSandbox ? stringToBoolean(useSandbox) : false);
                const order = new Order();
                const orderResult = await order.get(data);
                return orderResult;
            }
            return null;
        }
        catch (error: any) {
            return { hasError: true, error: error?.message };
        }
    }
}