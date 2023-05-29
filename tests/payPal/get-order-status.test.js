const { BCEnvironment, BCPayment, } = require("../../dist");

BCEnvironment.init();
BCEnvironment.withCredentials("505c82a3-3493-493b-b359-a881b8414bf5", "wHfsCPUlgUX/I8d0xJbAaz9Fy67BN2Vh8k6T4AFqrUw=");
const paypal = new BCPayment.PayPal();
paypal.getOrderDetails("30Y2289006605445H", {
    settings: [{
        "key": "AccountCode",
        "value": "AT3ftGisLykS3-fzXAPXuT6QKBbOS8HLPuv9Xo6GVEGMGnNSrjORUcAhou1sfrF-_189ISIRyO7pWQok"
    },
    {
        "key": "Signature",
        "value": "EE7JVUNBFA0rS5iqyNxHlIzJ07wpunxF7uYGr4WjChaWC2mWkyi3kjdLxLBVz43OB-sjWQdgdmVK--CD"
    },
    {
        "key": "UseSandbox",
        "value": "True"
    }]
}).then(response => {
    console.log(response);
});