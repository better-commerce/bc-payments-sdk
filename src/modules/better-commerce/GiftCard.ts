import { Api } from "./api";
import { RequestMethod } from "../../constants/enums/RequestMethod";
import { Endpoints } from "../../constants/Endpoints";

export class GiftCard {
    /**
     * Redeems a gift card after successful payment
     * @param orderId - The order ID
     * @param data - Gift card information
     * @returns Promise with redemption result
     */
    static async redeem(data: any, { headers, cookies }: any): Promise<any> {
        const redeemResult = await Api.call(`giftcard/gift-cards/redeem`, RequestMethod.POST, data, headers, cookies, true, Endpoints.Base.APIS_URL);
        return redeemResult;
    }
}