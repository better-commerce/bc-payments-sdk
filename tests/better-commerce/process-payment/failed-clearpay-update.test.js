const { BCEnvironment, BetterCommerceOperation } = require("../../../dist");

const config = {
    "id": 29,
    "systemName": "Clearpay",
    "displayName": "Clearpay",
    "slug": null,
    "isOnsite": false,
    "enabled": true,
    "isBillingAddressRequired": true,
    "displayOrder": 0,
    "iconCssClass": "Apps-Clearpay.png",
    "description": "Configure the most widely used payment app to expand payment options.",
    "enableImmediateCapture": false,
    "forSubscription": false,
    "inputType": 15,
    "notificationUrl": "/payment-notification/clearpay",
    "settings": [
        {
            "key": "AccountCode",
            "value": "400140419"
        },
        {
            "key": "Signature",
            "value": "949355ac3a40d869c14a7e48d4e819135c0e9ed5bef882c3cea5c245bb1a15daa0351226cfcc3c76e4ce4fd11609d2498465da36d183376d510dacf0ef15e503"
        },
        {
            "key": "MotoUserName",
            "value": null
        },
        {
            "key": "MotoPassword",
            "value": null
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
            "value": "https://portal.sandbox.afterpay.com"
        },
        {
            "key": "ProductionUrl",
            "value": "https://portal.afterpay.com"
        },
        {
            "key": "CancelUrl",
            "value": "/payment-notification/clearpay/canceled"
        },
        {
            "key": "Version",
            "value": null
        },
        {
            "key": "UseSandbox",
            "value": "False"
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
        }
    ],
    "basicSettings": [
        {
            "key": "Version",
            "value": null
        },
        {
            "key": "OrderTypes",
            "value": "[\"Standard\",\"Replacement\"]"
        }
    ],
    "message": null
};

// FFX
BCEnvironment.init("12c2e62b-33b1-4d9b-9782-7f3bb1edb951", "uQGiyIjmc2/FQDA27lIhx90M7PoK8byMItbQnYdfm7M=", config, "https://auth.bettercommerce.uk", "https://api.bettercommerce.uk");

const params =

    { "isCOD": false, "orderId": "abe027e6-2a9c-ee11-b907-6045bdd08d83", "txnOrderId": "5002098-11842", "extras": { "token": "003.2pfku08e2b6qpt5f68ikmrs2segelt6m18nf63s1k5jis8h9", "orderId": "400344842137", "payerId": "", "gateway": "clearpay", "isCancelled": false } }

new BetterCommerceOperation().processPayment(params)
    .then(response => {
        console.log(response);
    });

