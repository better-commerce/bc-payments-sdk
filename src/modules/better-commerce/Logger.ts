import { v4 as uuid } from 'uuid'
import { Api } from "./api";
import { RequestMethod } from "../../constants/enums/RequestMethod";
import { ILogRequestParams } from "../../base/contracts/ILogRequestParams";

export class Logger {
    
    /**
     * Logs activity.
     * @param data 
     * @param param1 
     * @returns 
     */
    static async logActivity(data: any, { headers, cookies }: any): Promise<any> {
        const { data: requestData = {}, pageUrl, objectId = "", userId = "", userName = "", ipAddress = "", message = "", } = data
        const logData: ILogRequestParams = {
            ipAddress: ipAddress || "",
            logLevelId: 20,
            objectId: objectId ?? uuid(),
            pageUrl: pageUrl,
            requestData: JSON.stringify(requestData),
            shortMessage: message,
            fullMessage: JSON.stringify(headers),
            additionalinfo1: JSON.stringify(cookies),
            userId: userId || "",
            userName: userName || "",
        }
        const logResult = await Api.call(`api/v2/infra/log/create`, RequestMethod.POST, logData, headers, cookies);
        return logResult;
    }

    /**
     * Logs payment.
     * @param data 
     * @param param1 
     * @returns 
     */
    static async logPayment(data: any, { headers = {}, cookies = {} }: any): Promise<any> {
        const { data: requestData = {}, pageUrl = "", objectId = "", userId = "", userName = "", ipAddress = "", message = "", } = data
        const logData: ILogRequestParams = {
            ipAddress: ipAddress || "",
            logLevelId: 20,
            objectId: objectId ?? uuid(),
            pageUrl: pageUrl,
            requestData: JSON.stringify(requestData),
            shortMessage: message,
            fullMessage: JSON.stringify(headers),
            additionalinfo1: JSON.stringify(cookies),
            userId: userId || "",
            userName: userName || "",
        }
        const logResult = await Api.call(`api/v2/infra/log/payment-log`, RequestMethod.POST, logData, headers, cookies);
        return logResult;
    }
}