const { BCEnvironment, PaymentOperation, } = require("../../../dist");

const config = {
    systemName: "Juspay",
    notificationUrl: "/payment-notification/gateway",
    settings: [{
        "key": "AccountCode",
        "value": "damensch"
    }, {
        "key": "Signature",
        "value": "713ED52588D405C8D1A75E97424CA6"
    }, {
        "key": "UseSandbox",
        "value": "False"
    }, {
        "key": "ProductionUrl",
        "value": "https://api.juspay.in"
    }, {
        "key": "TestUrl",
        "value": "https://sandbox.juspay.in"
    }]
};  
BCEnvironment.init("2a5e0a5d-6241-4c28-827d-f9f18b9e180b", "vADhSOUMF6zf0pFzrNACoYnck5ZfniiCsju/jufOLys=", config);
new PaymentOperation().getPaymentMethods({ outage: false})
    .then(response => {
        console.log(JSON.stringify(response));
    });