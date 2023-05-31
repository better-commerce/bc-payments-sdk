const { BCEnvironment, BCOperation } = require("../../dist");
const { IPaymentProcessingData } = require("../../dist/modules/models/IPaymentProcessingData");

const config = { id: 2, systemName: "Paypal", displayName: "Pay by Paypal", slug: null, isOnsite: false, enabled: true, isBillingAddressRequired: false, displayOrder: 0, iconCssClass: "Apps-paypal.png", description: "Configure Paypal standard and help customers reach paypals secured site to complete paymen", enableImmediateCapture: false, forSubscription: false, inputType: 15, notificationUrl: "/payment-notification/paypal", settings: [{ key: "AccountCode", value: "AT3ftGisLykS3-fzXAPXuT6QKBbOS8HLPuv9Xo6GVEGMGnNSrjORUcAhou1sfrF-_189ISIRyO7pWQok" }, { key: "Signature", value: "EE7JVUNBFA0rS5iqyNxHlIzJ07wpunxF7uYGr4WjChaWC2mWkyi3kjdLxLBVz43OB-sjWQdgdmVK--CD" }, { key: "MotoUserName", value: null }, { key: "MotoPassword", value: null }, { key: "MotoSignature", value: null }, { key: "MotoAccountCode", value: null }, { key: "TestUrl", value: "https://www.sandbox.paypal.com/cgi-bin/webscr?cmd=_express-checkout&token=" }, { key: "ProductionUrl", value: "https://www.paypal.com/cgi-bin/webscr?cmd=_express-checkout&token=" }, { key: "CancelUrl", value: "/payment-notification/paypal/canceled" }, { key: "Version", value: "82.0" }, { key: "UseSandbox", value: "True" }, { key: "EnablePayInInstallment", value: "False" }, { key: "InstallmentDisplayText", value: null }, { key: "AdditionalServiceCharge", value: "0.0" }], basicSettings: [{ key: "Version", value: "82.0" }, { key: "OrderTypes", value: "[\"Standard\",\"GiftCardVirtual\",\"Replacement\"]" }], message: null };
BCEnvironment.init(config);
BCEnvironment.withCredentials("505c82a3-3493-493b-b359-a881b8414bf5", "wHfsCPUlgUX/I8d0xJbAaz9Fy67BN2Vh8k6T4AFqrUw=");
const params = {
    isCOD: false,
    orderId: "00877573-71ff-ed11-b1c2-000d3a211cf7",
    txnOrderId: "317876-1106070",
    bankOfferDetails: undefined,
    extras: {
        token: '23N626665G223010B',
        orderId: '07J570909N610742V',
        payerId: 'QEMBQNW9LT4YJ',
        gateway: 'paypal',
        isCancelled: false,
        headers: {
            Currency: 'GBP',
            Language: 'en',
            Country: 'GB',
            DeviceId: 'db462e8b-d7a6-4f6d-91e2-b4a86b8e0fa9',
            SessionId: '0660a258-c504-483a-886d-83d360a474c6'
        },
        cookies: {
            basketId: 'd7b434f0-8812-4bda-b1c7-b60953058714',
            deviceId: 'db462e8b-d7a6-4f6d-91e2-b4a86b8e0fa9',
            Currency: 'GBP',
            Language: 'en',
            Country: 'GB',
            accept_cookies: 'accepted',
            __stripe_mid: '60540aa8-92ec-448c-9c50-92ac4170268e19af4b',
            defaultSession: '167602a5-4cef-4e81-b8f7-bb16af38d46d',
            sessionId: '0660a258-c504-483a-886d-83d360a474c6'
        }
    },
};

new BCOperation().processPayment(params)
    .then(response => {
        console.log(response);
    });