const { BCEnvironment, PaymentOperation, } = require("../../../dist");

const config = {
    "id": 1,
    "systemName": "NuveiGooglePay",
    "displayName": "NuveiGooglePay",
    "slug": null,
    "isOnsite": false,
    "enabled": true,
    "isBillingAddressRequired": false,
    "displayOrder": 0,
    "iconCssClass": "Apps-nuvei.jpg",
    "description": "A global payments platform with hosted checkout (“Payment Page/Cashier”), Web SDK, and server-to-server REST 2.0 APIs for pay-ins and payouts.",
    "enableImmediateCapture": true,
    "forSubscription": false,
    "inputType": 15,
    "notificationUrl": null,
    "settings": [
        {
            "key": "AccountCode",
            "value": "7791190954169088226"
        },
        {
            "key": "Signature",
            "value": "1195117"
        },
        {
            "key": "MotoUserName",
            "value": ""
        },
        {
            "key": "MotoPassword",
            "value": null
        },
        {
            "key": "MotoSignature",
            "value": "5ziJ8r5W3cv7pZOf10AJ3v5AEJRZc2T11cz1L3sfyjEeJKNQNdaoGAX8JyxQ2EWT"
        },
        {
            "key": "MotoAccountCode",
            "value": null
        },
        {
            "key": "TestUrl",
            "value": null
        },
        {
            "key": "ProductionUrl",
            "value": null
        },
        {
            "key": "CancelUrl",
            "value": null
        },
        {
            "key": "Version",
            "value": null
        },
        {
            "key": "UseSandbox",
            "value": "True"
        },
        {
            "key": "EnablePayInInstallment",
            "value": "False"
        },
        {
            "key": "InstallmentDisplayText",
            "value": null
        },
        {
            "key": "AdditionalServiceCharge",
            "value": "0.0"
        },
        {
            "key": "EnableSplitPayment",
            "value": "False"
        },
        {
            "key": "PrepaidValueType",
            "value": "Price"
        },
        {
            "key": "MinimumPrepaidValue",
            "value": "0.0"
        },
        {
            "key": "EnableImmediateCapture",
            "value": "True"
        }
    ],
    "basicSettings": [
        {
            "key": "Version",
            "value": null
        },
        {
            "key": "OrderTypes",
            "value": "[\"Standard\"]"
        }
    ],
    "message": null
};
const data = { domainNames: [ "localhost:3000" ], }
const clientId = "f148f128-1c3d-47a0-a9e2-45506c080971"
const sharedSecret = "f7M2iEM0BBokUtsUDuQ6Hz7nASHnsowojOadmDj1QFY=";
BCEnvironment.init(clientId, sharedSecret, config);

new PaymentOperation().getRegisteredDomains(data).then(response => {
    console.log(JSON.stringify(response));
});