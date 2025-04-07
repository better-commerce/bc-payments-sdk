const { OpayoEnvironment, TransactionType, EntryMethodType, Apply3DSecureType, Transaction, } = require("../../dist");

OpayoEnvironment.init("parkcameras", "6Be0fJ5F729HwdiytkKD9bAavjNMqeWaygH1KKP0MJjRdT3kks", "WdQQITsKe0sH1tFx2tcYeK4MoFXE5nLEVQeesViFUcgdmgZHMJS4nPSMqhqRpqzhE", true);
const amount = 10
const req = {}
const screen = {}
const data = {
    "transactionType": "Payment",
    "vendorTxCode": "TX-1706789123456",
    "amount": 1000,
    "currency": "GBP",
    "description": "Test Transaction",
    "apply3DSecure": "UseMSPSetting",
    "entryMethod": "Ecommerce",
    "paymentMethod": {
        "paymentMethodType": "HostedPayment",
        "integrationType": "Redirect",
        "action": "AUTHORISE",
        "vendorName": "parkcameras"
    },
    "strongCustomerAuthentication": {
        "returnUrl": "http://localhost:3000/payment-notification/opayo",
        "notificationURL": "http://localhost:3000/webhook",
        "browserIP": "127.0.0.1",
        "browserLanguage": "en-GB",
        "browserAcceptHeader": "*/*",
        "browserUserAgent": "Mozilla/5.0",
        "browserJavascriptEnabled": true,
        "browserJavaEnabled": false,
        "browserTZ": -60,
        "challengeWindowSize": "Medium",
        "browserColorDepth": 24,
        "browserScreenHeight": 1080,
        "browserScreenWidth": 1920
    },
}

new Transaction().request(data)
    .then(response => {
        console.log(response)
    });