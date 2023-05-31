const { BCEnvironment, CommerceOperation } = require("../../dist");
const { IPaymentProcessingData } = require("../../dist/modules/models/IPaymentProcessingData");

const config = { id: 2, systemName: "Paypal", displayName: "Pay by Paypal", slug: null, isOnsite: false, enabled: true, isBillingAddressRequired: false, displayOrder: 0, iconCssClass: "Apps-paypal.png", description: "Configure Paypal standard and help customers reach paypals secured site to complete paymen", enableImmediateCapture: false, forSubscription: false, inputType: 15, notificationUrl: "/payment-notification/paypal", settings: [{ key: "AccountCode", value: "AT3ftGisLykS3-fzXAPXuT6QKBbOS8HLPuv9Xo6GVEGMGnNSrjORUcAhou1sfrF-_189ISIRyO7pWQok" }, { key: "Signature", value: "EE7JVUNBFA0rS5iqyNxHlIzJ07wpunxF7uYGr4WjChaWC2mWkyi3kjdLxLBVz43OB-sjWQdgdmVK--CD" }, { key: "MotoUserName", value: null }, { key: "MotoPassword", value: null }, { key: "MotoSignature", value: null }, { key: "MotoAccountCode", value: null }, { key: "TestUrl", value: "https://www.sandbox.paypal.com/cgi-bin/webscr?cmd=_express-checkout&token=" }, { key: "ProductionUrl", value: "https://www.paypal.com/cgi-bin/webscr?cmd=_express-checkout&token=" }, { key: "CancelUrl", value: "/payment-notification/paypal/canceled" }, { key: "Version", value: "82.0" }, { key: "UseSandbox", value: "True" }, { key: "EnablePayInInstallment", value: "False" }, { key: "InstallmentDisplayText", value: null }, { key: "AdditionalServiceCharge", value: "0.0" }], basicSettings: [{ key: "Version", value: "82.0" }, { key: "OrderTypes", value: "[\"Standard\",\"GiftCardVirtual\",\"Replacement\"]" }], message: null };
BCEnvironment.init(config);
BCEnvironment.withCredentials("505c82a3-3493-493b-b359-a881b8414bf5", "wHfsCPUlgUX/I8d0xJbAaz9Fy67BN2Vh8k6T4AFqrUw=");
const params = {
    isCOD: false,
    orderId: 'acd9f716-8dff-ed11-b1c2-000d3a211cf7',
    txnOrderId: '317877-1106099',
    extras: {
        token: '1FM328623C5807122',
        orderId: '9E389901E63799519',
        payerId: 'QEMBQNW9LT4YJ',
        gateway: 'paypal',
        isCancelled: false,
        cookies: {
            basketId: '96c89611-35bf-4926-b080-8f79304a84f3',
            defaultSession: '62ad4551-f431-465f-9eca-670479d8c701',
            sessionId: '6f7a2565-9d37-48ff-8eaa-ef348daefee5',
            deviceId: '1c123236-177e-460f-aac7-5b38cb10f102',
            Currency: 'GBP',
            Language: 'en',
            Country: 'GB',
            accept_cookies: 'accepted',
            __stripe_mid: '2fc2827c-33d9-4c7d-8dea-8a1c6f4f64779a2739',
            __stripe_sid: '4a8e8812-93ec-465b-9d5d-2fbdd13b10b4a0d5dc'
        },
    },
};

new CommerceOperation().processPayment(params)
    .then(response => {
        console.log(response);
    });