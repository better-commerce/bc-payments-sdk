import { Api } from "./api";
import { RequestMethod } from "../../constants/enums/RequestMethod";

/**
 * Class {Config} contains methods that can be used to interact with the Config 
 * module on the CommerceHub platform.
 */
export class Config {

    
    /**
     * Gets plugin config.
     * API Reference - https://api20.bettercommerce.io/swagger/ui/index#!/Config/PluginCode
     * @param {Object} options - The options object that contains headers and cookies
     * @returns The order details response from the CommerceHub platform
     */
    static async getPluginConfig(data, { headers, cookies }: any): Promise<any> {
        console.log("pluginConfigInput", { ...{ headers, cookies } });
        const pluginConfigResult = await Api.call(`api/v2/infra/config/plugin`, RequestMethod.GET, { pluginCode: data?.pluginCode }, headers, cookies);
        console.log("pluginConfigResult", pluginConfigResult);
        return pluginConfigResult;
    }
}