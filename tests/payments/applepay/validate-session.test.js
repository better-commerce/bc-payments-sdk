const fs = require('fs')
const path = require('path')
const { BCEnvironment, PaymentOperation, } = require("../../../dist");

const config = {
    id: 25,
    systemName: "CheckoutApplePay",
    displayName: "Checkout ApplePay",
    slug: null,
    isOnsite: false,
    enabled: true,
    isBillingAddressRequired: false,
    displayOrder: 0,
    iconCssClass: "Apps-ApplePay.png",
    description: "Our Payment Gateway will let you as a online business accept payments on your website smoothly and securely.",
    enableImmediateCapture: false,
    forSubscription: false,
    inputType: 15,
    notificationUrl: "/payment-notification/checkoutapplepay",
    settings: [
        {
            key: "AccountCode",
            value: "merchant.com.commerce.ffx"
        },
        {
            key: "Signature",
            value: null
        },
        {
            key: "MotoUserName",
            value: "ffx.bettercommerce.tech"
        },
        {
            key: "MotoPassword",
            value: "FFX"
        },
        {
            key: "MotoSignature",
            value: null
        },
        {
            key: "MotoAccountCode",
            value: null
        },
        {
            key: "TestUrl",
            value: null
        },
        {
            key: "ProductionUrl",
            value: null
        },
        {
            key: "CancelUrl",
            value: "/payment-notification/checkout/canceled"
        },
        {
            key: "Version",
            value: null
        },
        {
            key: "UseSandbox",
            value: "False"
        },
        {
            key: "EnablePayInInstallment",
            value: "False"
        },
        {
            key: "InstallmentDisplayText",
            value: null
        },
        {
            key: "AdditionalServiceCharge",
            value: "0.0"
        },
        {
            key: "EnableSplitPayment",
            value: "False"
        }
    ],
    basicSettings: [
        {
            key: "Version",
            value: null
        },
        {
            key: "OrderTypes",
            value: "[\"Standard\",\"Replacement\"]"
        }
    ],
    message: null
}

const pemCert = fs.readFileSync(
    path.join(__dirname, '/certificates/ApplePayMerchant.pem')
)
const keyCert = fs.readFileSync(
    path.join(__dirname, '/certificates/ApplePayMerchant.key')
)

BCEnvironment.init("", "", config)
BCEnvironment.addExtras({
    pemCert,
    keyCert,
})

const data = {
    validationUrl: "https://apple-pay-gateway-cert.apple.com/paymentservices/startSession",
}
new PaymentOperation().validatePaymentSession(data).then(response => {
    console.log(JSON.stringify(response));
});