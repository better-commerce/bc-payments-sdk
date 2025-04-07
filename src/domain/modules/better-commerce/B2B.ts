import { RequestMethod } from "../../enums";
import Api from "./api";

/**
 * Class {B2B} includes methods for interacting with the B2B API.
 * 
 * The B2B API allows retrieval of company details associated with a specific user ID.
 */

export class B2B {

    /**
     * Retrieves the company details by user id.
     * 
     * @param data - The data which contains the user id
     * @param {headers, cookies} - The headers and cookies to pass to the request
     * @returns The company details
     * 
     * API Reference - https://api20.bettercommerce.io/swagger/ui/index#!/B2B/B2BGetCompanyDetailByUserId
     */
    static async getCompanyDetailsByUserId(data: any, { headers, cookies }: any): Promise<any> {
        const companyDetailsResult = await Api.call(`api/v2/commerce/b2b/${data?.userId}/company`, RequestMethod.GET, null, headers, cookies);
        return companyDetailsResult;
    }

}