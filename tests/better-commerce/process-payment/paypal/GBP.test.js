const { BCEnvironment, BetterCommerceOperation } = require("../../../../dist");

const config = { id: 2, systemName: "Paypal", displayName: "Pay by Paypal", slug: null, isOnsite: false, enabled: true, isBillingAddressRequired: false, displayOrder: 0, iconCssClass: "Apps-paypal.png", description: "Configure Paypal standard and help customers reach paypals secured site to complete paymen", enableImmediateCapture: false, forSubscription: false, inputType: 15, notificationUrl: "/payment-notification/paypal", settings: [{ key: "AccountCode", value: "AT3ftGisLykS3-fzXAPXuT6QKBbOS8HLPuv9Xo6GVEGMGnNSrjORUcAhou1sfrF-_189ISIRyO7pWQok" }, { key: "Signature", value: "EE7JVUNBFA0rS5iqyNxHlIzJ07wpunxF7uYGr4WjChaWC2mWkyi3kjdLxLBVz43OB-sjWQdgdmVK--CD" }, { key: "MotoUserName", value: null }, { key: "MotoPassword", value: null }, { key: "MotoSignature", value: null }, { key: "MotoAccountCode", value: null }, { key: "TestUrl", value: "https://www.sandbox.paypal.com/cgi-bin/webscr?cmd=_express-checkout&token=" }, { key: "ProductionUrl", value: "https://www.paypal.com/cgi-bin/webscr?cmd=_express-checkout&token=" }, { key: "CancelUrl", value: "/payment-notification/paypal/canceled" }, { key: "Version", value: "82.0" }, { key: "UseSandbox", value: "True" }, { key: "EnablePayInInstallment", value: "False" }, { key: "InstallmentDisplayText", value: null }, { key: "AdditionalServiceCharge", value: "0.0" }], basicSettings: [{ key: "Version", value: "82.0" }, { key: "OrderTypes", value: "[\"Standard\",\"GiftCardVirtual\",\"Replacement\"]" }], message: null };

// BetterStore
BCEnvironment.init("12C2E62B-33B1-4D9B-9782-7F3BB1EDB951", "o6obMjODUNK7QEEK8x4Ir3NfxJaUa5qGDs34SBKhsKo=", config);
BCEnvironment.addExtras({
    country: "GB",
    currency: "GBP",
    language: "en",
})

const params = {
    isCOD: false,
    orderId: 'bb4ef462-a2ff-ed11-b1c2-000d3a211cf7',
    txnOrderId: '317881-1106237',
    extras: {
        token: '54L78330GM898672D',
        orderId: '4JR32441S51811424',
        payerId: 'QEMBQNW9LT4YJ',
        gateway: 'paypal',
        isCancelled: false,
        cookies: {
            defaultSession: '37fb65e6-0325-48a4-b9b1-3d42e58894e6',
            deviceId: 'fbdd197c-74b3-4cb8-9e88-fadd370e47b6',
            Currency: 'GBP',
            Language: 'en',
            Country: 'GB',
            accept_cookies: 'accepted',
            __stripe_mid: '21ef8abe-52f3-435c-969d-1baf280280cc9f28bd',
            __stripe_sid: '8c33f8cb-75e4-4f86-9c09-f23737d8097be71f0d',
            sessionId: '9702cd68-ce1d-4ec2-8404-449bba87b570',
            basketId: 'ce364f26-3d06-45b8-9cbe-ec1813f7c1fa'
        }
    }
};

new BetterCommerceOperation().processPayment(params)
    .then(response => {
        console.log(response);
    });