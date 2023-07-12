import { Api } from "./api";
import { RequestMethod } from "../../constants/enums/RequestMethod";

/**
 * Class {B2B}
 */
export class B2B {

    /**
     * Get the company details by UserId.
     * API Reference - https://api20.bettercommerce.io/swagger/ui/index#!/B2B/B2BGetCompanyDetailByUserId
     * @param data 
     */
    static async getCompanyDetailsByUserId(data: any, { headers, cookies }: any): Promise<any> {
        const companyDetailsResult = await Api.call(`api/v2/commerce/b2b/${data?.userId}/company`, RequestMethod.GET, null, headers, cookies);
        return companyDetailsResult;
    }

}