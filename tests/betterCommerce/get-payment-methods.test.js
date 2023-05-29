const { BCEnvironment, BCPayment, Api } = require("../../dist");

BCEnvironment.init();
BCEnvironment.withCredentials("505c82a3-3493-493b-b359-a881b8414bf5", "wHfsCPUlgUX/I8d0xJbAaz9Fy67BN2Vh8k6T4AFqrUw=");
Api.call(`api/v2/commerce/checkout/payment-methods`, "GET", { country: "GB", currency: "GBP", basketId: "00000000-0000-0000-0000-000000000000" }).then(response => {
    console.log(response);
});