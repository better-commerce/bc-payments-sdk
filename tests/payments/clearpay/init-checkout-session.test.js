const { BCEnvironment, PaymentOperation, } = require("../../../dist");

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
const data = {
    amount: {
        amount: 20.99,
        currency: "GBP"
    },
    consumer: {
        givenNames: "Joe",
        surname: "Consumer",
        email: "test@example.com"
    },
    billing: {
        name: "Joe Consumer",
        line1: "123 Fake Street",
        postcode: "AA99 9AA",
        countryCode: "GB"
    },
    shipping: {
        name: "Joe Consumer",
        line1: "123 Fake Street",
        postcode: "AA99 9AA",
        countryCode: "GB"
    },
    merchant: {
        redirectConfirmUrl: "https://example.com/checkout/confirm",
        redirectCancelUrl: "https://example.com/checkout/cancel",
        popupOriginUrl: "https://example.com/cart"
    },
    taxAmount: {
        amount: 1.83,
        currency: "GBP"
    },
    shippingAmount: {
        amount: 0.00,
        currency: "GBP"
    }
};
new PaymentOperation().initPaymentIntent(data)
    .then(response => {
        console.log(JSON.stringify(response));
    });