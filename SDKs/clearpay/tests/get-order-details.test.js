const { ClearPayEnvironment, Payment } = require("../dist");

ClearPayEnvironment.init("400124147", "dd3d92ae8ccee3b9e3f15e3876d7a11fa255a9985b22ba2ec9848bb1e59b1159046152fe5c16b97b61adb01e5157e0ed13b9285380f521ef0ab05133f0808242");

new Payment().getDetails("400248152939")
    .then(response => {
        console.log(JSON.stringify(response))
    });