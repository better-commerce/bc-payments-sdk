const { BCEnvironment, BCPayment, PaymentMethod } = require("../../dist");

BCEnvironment.init();
BCEnvironment.withCredentials("505c82a3-3493-493b-b359-a881b8414bf5", "wHfsCPUlgUX/I8d0xJbAaz9Fy67BN2Vh8k6T4AFqrUw=");
const params = {
    country: "GB",
    currency: "GBP",
    basketId: "00000000-0000-0000-0000-000000000000"
};

PaymentMethod.getAll(params)
    .then(response => {
        console.log(response);
    });