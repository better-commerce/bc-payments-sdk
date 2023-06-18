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
BCEnvironment.init("505c82a3-3493-493b-b359-a881b8414bf5", "wHfsCPUlgUX/I8d0xJbAaz9Fy67BN2Vh8k6T4AFqrUw=", config);
const params = {
    isCOD: false,
    orderId: "59fd2003-960d-ee11-b1c3-000d3a211cf7",
    txnOrderId: "318301-1124297",
    extras: {
        token: "003.k86ja38ep9b1om6c2mefu0ij24lovrnh1e32gvkc3ar6fb48",
        orderId: "400248042590",
        payerId: "",
        gateway: "clearpay",
        isCancelled: false,
        cookies: {
            deviceId: '094c22aa-e6c6-407c-8e1c-d422b445bee7',
            accept_cookies: 'accepted',
            __stripe_mid: 'c85d55a9-1162-45b2-a704-b9c7e8db2cf3fb0bee',
            Currency: 'GBP',
            Language: 'en',
            Country: 'GB',
            __stripe_sid: 'bea589ae-0a8d-4d9a-9d7e-1cf6ed17ef0875a8e7',
            sessionId: 'ddc08bcc-835e-47da-8018-c4364513f9cb',
            basketId: '44ac0457-fef3-411b-aef5-01a6f8376f18',
            defaultSession: 'd59b696c-ca0a-4fcc-a07e-476d50b7b0cf',
            orderId: '59fd2003-960d-ee11-b1c3-000d3a211cf7'
        }
    }
};

new BetterCommerceOperation().processPayment(params)
    .then(response => {
        console.log(response);
    });