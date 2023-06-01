const { BCEnvironment, CommerceOperation } = require("../../../dist");

const config = { id: 20, systemName: "Checkout", displayName: "Checkout", slug: null, isOnsite: false, "enabled": true, isBillingAddressRequired: true, "displayOrder": 0, iconCssClass: "Apps-checkout.png", description: "Our Payment Gateway will let you as a online business accept payments on your website smoothly and securely. We have configured our gateway with all leading shopping carts and are 3D secured to reduce fraudulent transactions", enableImmediateCapture: false, "forSubscription": false, inputType: 15, notificationUrl: "/payment-notification/checkout", settings: [{ key: "AccountCode", value: "pk_sbox_dzxjkk5cfnepqvn2wfqnz732oej" }, { key: "Signature", value: "sk_sbox_sfqi22eviwtbdki3itilxrkgmuc" }, { key: "MotoUserName", value: "pc_ptat6wn535wetjzlnbsmuims7m" }, { key: "MotoPassword", value: null }, { key: "MotoSignature", value: "kybvHsoZwlEBSNbR7Id0FyOKyUrggHBFLdDX2gZZ5E6BESRGHtKBN9zN9AG4U-BODolfLDYBXo-voy0-VMBykA" }, { key: "MotoAccountCode", value: "ack_ikrzccuhjple7dmn7aozgoaeki" }, { key: "TestUrl", value: null }, { key: "ProductionUrl", value: null }, { key: "CancelUrl", value: "/payment-notification/paypal/canceled" }, { key: "Version", value: null }, { key: "UseSandbox", value: "True" }, { key: "EnablePayInInstallment", value: "False" }, { key: "InstallmentDisplayText", value: null }, { key: "AdditionalServiceCharge", value: "0.0" }], "basicSettings": [{ key: "Version", value: null }, { key: "OrderTypes", value: "[\"Standard\",\"\"]" }], "message": null };
BCEnvironment.init(config);
BCEnvironment.withCredentials("505c82a3-3493-493b-b359-a881b8414bf5", "wHfsCPUlgUX/I8d0xJbAaz9Fy67BN2Vh8k6T4AFqrUw=");
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

new CommerceOperation().processPayment(params)
    .then(response => {
        console.log(response);
    });