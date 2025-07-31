const { BCEnvironment, PaymentOperation, } = require("../../../dist");

const config = {
    "id": 1,
    "systemName": "OmniCapital",
    "displayName": "OmniCapital",
    "slug": null,
    "isOnsite": false,
    "enabled": true,
    "isBillingAddressRequired": false,
    "displayOrder": 0,
    "iconCssClass": "Apps-omniCapital.png",
    "description": "Use the OmniCapital payment gateway",
    "enableImmediateCapture": false,
    "forSubscription": false,
    "inputType": 15,
    "notificationUrl": "",
    "settings": [
        {
            "key": "AccountCode",
            "value": "4641"
        },
        {
            "key": "Signature",
            "value": "518KkIqSzw+nXlalicf4S29/97Y"
        },
        {
            "key": "MotoUserName",
            "value": "Sanjay_pc"
        },
        {
            "key": "MotoPassword",
            "value": "OmniCapital*2025@"
        },
        {
            "key": "MotoSignature",
            "value": null
        },
        {
            "key": "MotoAccountCode",
            "value": null
        },
        {
            "key": "TestUrl",
            "value": "https://omniporttest.ocrf.co.uk/OnlineFormIntegration/Index"
        },
        {
            "key": "ProductionUrl",
            "value": "https://omniporttest.ocrf.co.uk/OnlineFormIntegration/Index"
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
            "value": "False"
        }
    ],
    "basicSettings": [
        {
            "key": "Version",
            "value": null
        },
        {
            "key": "OrderTypes",
            "value": "[\"Standard\",\"\"]"
        }
    ],
    "message": null
};
const data = {
    Identification: {
        api_key: "",
        RetailerUniqueRef: "10507-4252947",
        InstallationID: "",
        FirstName: "Amit",
        LastName: "Kumar",
        HouseNumber: "111",
        HouseName: "Conduit House",
        Town: "London",
        Postcode: "W4 4HH"
    },
    Goods: [
        {
            Description: "G242335E(1)",
            Price: "769.00"
        }
    ],
    Finance: {
        Code: "ONIB12-14.90-5697",
        Deposit: 250
    }
}
const clientId = "f148f128-1c3d-47a0-a9e2-45506c080971"
const sharedSecret = "f7M2iEM0BBokUtsUDuQ6Hz7nASHnsowojOadmDj1QFY=";
BCEnvironment.init(clientId, sharedSecret, config);

new PaymentOperation().initPaymentIntent(data).then(response => {
    console.log(JSON.stringify(response));
});