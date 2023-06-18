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
new PaymentOperation().getOrderDetails("400248042590")
    .then(response => {
        console.log(JSON.stringify(response));
    });