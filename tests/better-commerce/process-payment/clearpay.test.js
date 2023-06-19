const { BCEnvironment, BetterCommerceOperation } = require("../../../dist");

const config = {
    systemName: "ClearPay",
    settings: [{
        "key": "AccountCode",
        "value": "400124147"
    }, {
        "key": "Signature",
        "value": "dd3d92ae8ccee3b9e3f15e3876d7a11fa255a9985b22ba2ec9848bb1e59b1159046152fe5c16b97b61adb01e5157e0ed13b9285380f521ef0ab05133f0808242"
    }, {
        "key": "UseSandbox",
        "value": "True"
    }]
};
BCEnvironment.init("12C2E62B-33B1-4D9B-9782-7F3BB1EDB951", "o6obMjODUNK7QEEK8x4Ir3NfxJaUa5qGDs34SBKhsKo=", config);
const params = {
    isCOD: false,
    orderId: 'f4f4fcb7-7c0e-ee11-b1c3-000d3a211cf7',
    txnOrderId: '50061-1124791',
    extras: {
        token: '003.qq0c8nu3eh7je7sqijc1hrf6hpafcjaqns290qe1mvth6ria',
        orderId: '400248043538',
        payerId: '',
        gateway: 'clearpay',
        isCancelled: false,
        cookies: {
            Currency: 'GBP',
            Language: 'en',
            deviceId: '749f76b4-b7c7-4b8b-9d21-0c928af47d7b',
            accept_cookies: 'accepted',
            __stripe_mid: 'ef826757-f7a1-490c-9d0d-6c4fb4b99ffe7c885d',
            __stripe_sid: '12e6530d-410a-4da1-ae41-50828c26e9c28c1a2a',
            defaultSession: 'c9e3e10e-10af-407a-a8dc-adbb83eb1d8f',
            orderId: 'd7adaff0-7a0e-ee11-b1c3-000d3a211cf7',
            sessionId: '314085ba-f39b-4cf2-91f0-74c13d67a8fc',
            basketId: 'cb693fb5-0f5e-449a-99a4-2936cadd3996'
        }
    }
};

new BetterCommerceOperation().processPayment(params)
    .then(response => {
        console.log(response);
    });