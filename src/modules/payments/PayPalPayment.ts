// Package Imports
import { PayPalEnvironment, Order } from "bc-paypal-sdk";

// Other Imports
import { Defaults } from "../../constants/constants";
import { stringToBoolean } from "../../utils/parse-util";
import { IPaymentProvider } from "../../base/contracts/IPaymentProvider";
import { BCEnvironment } from "../../base/config/BCEnvironment";

export class PayPalPayment implements IPaymentProvider {
    async getOrderDetails(data: any): Promise<any> {
        const config: any = BCEnvironment.getConfig();
        
        try {

            if (config?.settings?.length) {
                const clientId = config?.settings?.find((x: any) => x.key === "AccountCode")?.value || Defaults.String.Value;
                const appSecret = config?.settings?.find((x: any) => x.key === "Signature")?.value || Defaults.String.Value;
                const useSandbox = config?.settings?.find((x: any) => x.key === "UseSandbox")?.value || Defaults.String.Value;
                const isSandbox = useSandbox ? stringToBoolean(useSandbox) : false;

                // Init Env
                PayPalEnvironment.init(clientId, appSecret, isSandbox);
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