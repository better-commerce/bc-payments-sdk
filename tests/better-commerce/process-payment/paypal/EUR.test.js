const { BCEnvironment, BetterCommerceOperation } = require("../../../../dist");

const config = { id: 2, systemName: "Paypal", displayName: "Pay by Paypal", slug: null, isOnsite: false, enabled: true, isBillingAddressRequired: false, displayOrder: 0, iconCssClass: "Apps-paypal.png", description: "Configure Paypal standard and help customers reach paypals secured site to complete paymen", enableImmediateCapture: false, forSubscription: false, inputType: 15, notificationUrl: "/payment-notification/paypal", settings: [{ key: "AccountCode", value: "AT3ftGisLykS3-fzXAPXuT6QKBbOS8HLPuv9Xo6GVEGMGnNSrjORUcAhou1sfrF-_189ISIRyO7pWQok" }, { key: "Signature", value: "EE7JVUNBFA0rS5iqyNxHlIzJ07wpunxF7uYGr4WjChaWC2mWkyi3kjdLxLBVz43OB-sjWQdgdmVK--CD" }, { key: "MotoUserName", value: null }, { key: "MotoPassword", value: null }, { key: "MotoSignature", value: null }, { key: "MotoAccountCode", value: null }, { key: "TestUrl", value: "https://www.sandbox.paypal.com/cgi-bin/webscr?cmd=_express-checkout&token=" }, { key: "ProductionUrl", value: "https://www.paypal.com/cgi-bin/webscr?cmd=_express-checkout&token=" }, { key: "CancelUrl", value: "/payment-notification/paypal/canceled" }, { key: "Version", value: "82.0" }, { key: "UseSandbox", value: "True" }, { key: "EnablePayInInstallment", value: "False" }, { key: "InstallmentDisplayText", value: null }, { key: "AdditionalServiceCharge", value: "0.0" }], basicSettings: [{ key: "Version", value: "82.0" }, { key: "OrderTypes", value: "[\"Standard\",\"GiftCardVirtual\",\"Replacement\"]" }], message: null };

// FFX
BCEnvironment.init("12C2E62B-33B1-4D9B-9782-7F3BB1EDB951", "o6obMjODUNK7QEEK8x4Ir3NfxJaUa5qGDs34SBKhsKo=", config);
BCEnvironment.addExtras({
    country: "IE",
    currency: "EUR",
    language: "en",
})
const params = {
    isCOD: false,
    orderId: "15009506-d057-ee11-b1c4-000d3a211cf7",
    txnOrderId: "50668-1170903",
    extras: {
        token: "0KV11327MD3864205",
        orderId: "14K88377JM632334P",
        payerId: "QEMBQNW9LT4YJ",
        gateway: "paypal",
        isCancelled: false,
        cookies: {
            ClientIP: '::1',
            Language: 'en',
            deviceId: 'aa421c2a-b12c-40b4-9cb4-aa2a5b74d53d',
            'next-auth.csrf-token': 'f8a04005927c3ab6c1c3594e928debda94a36ca20e888fa3e64ce8628ad61217|588feb913d5d46dad35fe7b448ec180ce1049609fcca4006da154b38f2eb84bd',
            selection: '{"analytics":true,"advertisement":true}',
            analytics: 'true',
            advertisement: 'true',
            __stripe_mid: 'f03e559c-6b99-421c-a1cf-2b2c347ae4c00b6416',
            basketId: '54f20746-c0bd-45bd-b006-262daf0fb711',
            orderId: '5b625156-9957-ee11-b1c4-000d3a211cf7',
            Currency: 'EUR',
            __stripe_sid: '8ce5663e-9f89-4048-bc40-8966a11ba6b4b64a41',
            defaultSession: '5671529d-002e-4dcd-9640-c0b8e60fdd1c',
            sessionId: 'bbb8fb01-3d40-4f6d-af54-9e7462fa82ea'
        }
    },
}

new BetterCommerceOperation().processPayment(params)
    .then(response => {
        console.log(response);
    });