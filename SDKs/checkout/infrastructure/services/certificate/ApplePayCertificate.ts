// Other Imports
import { SDKs } from "../../../../../SDKs/lib";
import { Domain } from "../../../../../src";

export default class ApplePayCertificate implements SDKs.Checkout.Domain.Contracts.ICertificate {

    /**
     * Generate a certificate signing request. This will allow you to generate a certificate.
     * 
     * API Reference - https://api-reference.checkout.com/#operation/generateApplePaySigningRequest
     * 
     * @returns The result of the request. If the request was successful the result will contain the certificate signing request.
     *          If the request failed, it will contain an error message.
     */
    async generateCSR() {
        try {
            const generateCSRResult = await SDKs.Checkout.Infra.Core.API.call(`applepay/signing-requests`, Domain.Enums.RequestMethod.POST);
            return generateCSRResult;
        } catch (error) {
            return { hasError: true, error: error };
        }
    }

    /**
     * Upload an Apple Pay payment processing certificate. This method allows you to start processing payments via Apple Pay.
     * 
     * API Reference - https://api-reference.checkout.com/#operation/uploadApplePayCertificate
     * 
     * @param data {any} The certificate data to upload.
     * @returns The result of the upload request. If the request was successful, the result will contain the details of the uploaded certificate.
     *          If the request failed, it will return an object containing an error message.
     */
    async uploadApplePayCertificate(data: any) {
        try {
            const certificateUploadResult = await SDKs.Checkout.Infra.Core.API.call(`applepay/certificates`, Domain.Enums.RequestMethod.POST, { content: data });
            return certificateUploadResult;
        } catch (error) {
            return { hasError: true, error: error };
        }
    }
}