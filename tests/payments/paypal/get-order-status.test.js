const { BCEnvironment, PaymentOperation, } = require("../../../dist");

const config = {
    systemName: "Paypal",
    settings: [{
        "key": "AccountCode",
        "value": "Abmm0QobMHZ177_hLxPwcoA37YmZ_nRviQsaakTLKFxDwIfYDdVIxLJ7FyTynqnUHDaqgkvCXJc42OHi"
    }, {
        "key": "Signature",
        "value": "EESdeU6fvYaxeoj_KSf3pTMLdBX6T3ecE7LjK_ADnykHZes2iiFettVLTBoutmjgOovHu2QKJwgDGsjO"
    }, {
        "key": "UseSandbox",
        "value": "False"
    }]
};
BCEnvironment.init("12c2e62b-33b1-4d9b-9782-7f3bb1edb951", "uQGiyIjmc2/FQDA27lIhx90M7PoK8byMItbQnYdfm7M=", config);
new PaymentOperation().getOrderDetails("8JK79652MS4471922").then(response => {
    console.log(JSON.stringify(response));
});