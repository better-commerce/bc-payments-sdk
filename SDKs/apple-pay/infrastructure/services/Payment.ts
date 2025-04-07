// Package Imports
import https from 'https'

// Other Imports
import { Infra } from "../../../../src";
import { SDKs } from '../../../../SDKs/lib';
import { Domain } from '../../../../src';

const api = Infra.API.default

/**
 * Class {Payment} interacts with Apple Pay API.
 * 
 * @implements {IPayment}
 */
export default class Payment implements SDKs.ApplePay.Domain.Contracts.IPayment {

    /**
     * Validates the payment session.
     * 
     * API Reference - https://developer.apple.com/documentation/apple_pay_on_the_web/apple_pay_js_api/providing_merchant_validation
     * 
     * @param data 
     * @returns 
     */
    async validateSession(data: any): Promise<any> {
        const { validationUrl } = data
        try {
            const httpsAgent = new https.Agent({
                //rejectUnauthorized: false,
                cert: SDKs.ApplePay.Config.ApplePayEnvironment.getPEMCert(),
                key: SDKs.ApplePay.Config.ApplePayEnvironment.getKeyCert(),
            })
            const config = {
                url: validationUrl,
                method: Domain.Enums.RequestMethod.POST,
                data: {
                    merchantIdentifier: SDKs.ApplePay.Config.ApplePayEnvironment.getMerchantId(),
                    displayName: SDKs.ApplePay.Config.ApplePayEnvironment.getDisplayName(),
                    initiative: "web",
                    initiativeContext: SDKs.ApplePay.Config.ApplePayEnvironment.getDomainName(),
                },
                httpsAgent: httpsAgent,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            }
            const { data: validateSessionResult } = await api(config)
            return validateSessionResult
        } catch (error) {
            return { hasError: true, error: error };
        }
    }
}