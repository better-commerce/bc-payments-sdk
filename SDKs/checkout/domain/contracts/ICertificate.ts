export default interface ICertificate {

    /**
     * Generate a certificate signing request.
     */
    generateCSR(): any;

    /**
     * Upload a payment processing certificate. This will allow you to start processing payments via Apple Pay.
     * @param data 
     */
    uploadApplePayCertificate(data: any): any;
}