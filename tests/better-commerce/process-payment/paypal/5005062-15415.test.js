const { BCEnvironment, BetterCommerceOperation } = require("../../../../dist");

const config = {
    "id": 2,
    "systemName": "Paypal",
    "displayName": "Pay by Paypal",
    "slug": null,
    "isOnsite": false,
    "enabled": true,
    "isBillingAddressRequired": false,
    "displayOrder": 0,
    "iconCssClass": "Apps-paypal.png",
    "description": "Configure Paypal standard and help customers reach paypals secured site to complete paymen",
    "enableImmediateCapture": false,
    "forSubscription": false,
    "inputType": 15,
    "notificationUrl": "/payment-notification/paypal",
    "settings": [
        {
            "key": "AccountCode",
            "value": "Abmm0QobMHZ177_hLxPwcoA37YmZ_nRviQsaakTLKFxDwIfYDdVIxLJ7FyTynqnUHDaqgkvCXJc42OHi"
        },
        {
            "key": "Signature",
            "value": "EESdeU6fvYaxeoj_KSf3pTMLdBX6T3ecE7LjK_ADnykHZes2iiFettVLTBoutmjgOovHu2QKJwgDGsjO"
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
            "value": "https://www.sandbox.paypal.com/cgi-bin/webscr?cmd=_express-checkout&token="
        },
        {
            "key": "ProductionUrl",
            "value": "https://www.paypal.com/cgi-bin/webscr?cmd=_express-checkout&token="
        },
        {
            "key": "CancelUrl",
            "value": "/payment-notification/paypal/canceled"
        },
        {
            "key": "Version",
            "value": "82.0"
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
            "value": "82.0"
        },
        {
            "key": "OrderTypes",
            "value": "[\"Standard\",\"GiftCardVirtual\",\"Replacement\",\"\"]"
        }
    ],
    "message": null
};

// FFX
BCEnvironment.init("12c2e62b-33b1-4d9b-9782-7f3bb1edb951", "uQGiyIjmc2/FQDA27lIhx90M7PoK8byMItbQnYdfm7M=", config, "https://auth.bettercommerce.uk", "https://api.bettercommerce.uk");

const params = {
    "isCOD": false,
    "orderId": "107d9c94-df9f-ee11-b907-6045bdd08d83",
    "txnOrderId": "5005062-15415",
    "extras": {
      "token": "1G439053HT366211L",
      "orderId": "8CS877131G9740701",
      "payerId": "97HS2LBDL5N9J",
      "gateway": "paypal",
      "isCancelled": false
    }
  }

new BetterCommerceOperation().processPayment(params)
    .then(response => {
        console.log(response);
    });