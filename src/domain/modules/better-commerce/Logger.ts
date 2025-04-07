import { v4 as uuid } from 'uuid'
import Api from "./api";
import { ILogRequestParams } from "../../contracts/ILogRequestParams";
import { RequestMethod } from '../../enums';

/**
 * Class {Logger} provides methods for logging specific activities to an external
 * service. The activities that can be logged include payment related activity,
 * such as payment status changes, or any other type of activity.
 */
export class Logger {
    
    /**
     * Logs activity details to the infrastructure logging service.
     *
     * This method captures various details such as user information, page URL,
     * and request data, then sends these details to an external logging API.
     *
     * @param data - The log activity data containing details of the activity.
     *    - requestData: The request data associated with the activity.
     *    - pageUrl: The URL of the page where the activity occurred.
     *    - objectId: The unique identifier for the logged object.
     *    - userId: The unique identifier of the user performing the activity.
     *    - userName: The name of the user performing the activity.
     *    - ipAddress: The IP address of the user.
     *    - message: A short message describing the activity.
     * @param {object} headers - The headers to include in the logging request.
     * @param {object} cookies - The cookies to include in the logging request.
     * @returns {Promise<any>} A promise that resolves to the result of the logging operation.
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
     * Logs payment related activity to the infrastructure logging service.
     *
     * This method captures various payment related details such as payment method,
     * payment status, transaction ID, and request data, then sends these details
     * to an external logging API.
     *
     * @param data - The log payment data containing details of the payment.
     *    - paymentMethod: The payment method used for the payment.
     *    - paymentStatus: The payment status associated with the payment.
     *    - transactionId: The unique identifier for the payment transaction.
     *    - requestData: The request data associated with the payment.
     * @param {object} headers - The headers to include in the logging request.
     * @param {object} cookies - The cookies to include in the logging request.
     * @returns {Promise<any>} A promise that resolves to the result of the logging operation.
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