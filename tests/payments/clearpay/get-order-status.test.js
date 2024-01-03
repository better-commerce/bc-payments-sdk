const { BCEnvironment, PaymentOperation, } = require("../../../dist");

const config = {
    systemName: "ClearPay",
    settings: [{
        "key": "AccountCode",
        "value": "400140419"
    }, {
        "key": "Signature",
        "value": "949355ac3a40d869c14a7e48d4e819135c0e9ed5bef882c3cea5c245bb1a15daa0351226cfcc3c76e4ce4fd11609d2498465da36d183376d510dacf0ef15e503"
    }, {
        "key": "UseSandbox",
        "value": "False"
    }]
};
BCEnvironment.init("12c2e62b-33b1-4d9b-9782-7f3bb1edb951", "uQGiyIjmc2/FQDA27lIhx90M7PoK8byMItbQnYdfm7M=", config);
new PaymentOperation().getOrderDetails("400344842137")
    .then(response => {
        console.log(JSON.stringify(response));
    });