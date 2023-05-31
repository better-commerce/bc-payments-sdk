const { BCEnvironment } = require("../../dist");
const { Order } = require("../../dist/modules/better-commerce/Order");

BCEnvironment.init();
BCEnvironment.withCredentials("505c82a3-3493-493b-b359-a881b8414bf5", "wHfsCPUlgUX/I8d0xJbAaz9Fy67BN2Vh8k6T4AFqrUw=");
const params = "331d0aea-1cfe-ed11-b1c2-000d3a211cf7";
Order.get(params)
    .then(response => {
        console.log(JSON.stringify(response));
    });