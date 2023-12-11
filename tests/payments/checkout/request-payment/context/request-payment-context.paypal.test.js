const { BCEnvironment, PaymentOperation, } = require("../../../../../dist");

const config = {
    "id": 20,
    "systemName": "Checkout",
    "displayName": "Checkout",
    "slug": null,
    "isOnsite": false,
    "enabled": true,
    "isBillingAddressRequired": true,
    "displayOrder": 0,
    "iconCssClass": "Apps-checkout.png",
    "description": "Our Payment Gateway will let you as a online business accept payments on your website smoothly and securely. We have configured our gateway with all leading shopping carts and are 3D secured to reduce fraudulent transactions",
    "enableImmediateCapture": false,
    "forSubscription": false,
    "inputType": 15,
    "notificationUrl": "/payment-notification/checkout",
    "settings": [
        {
            "key": "AccountCode",
            "value": "pk_sbox_dzxjkk5cfnepqvn2wfqnz732oej"
        },
        {
            "key": "Signature",
            "value": "sk_sbox_sfqi22eviwtbdki3itilxrkgmuc"
        },
        {
            "key": "MotoUserName",
            "value": "pc_ptat6wn535wetjzlnbsmuims7m"
        },
        {
            "key": "MotoPassword",
            "value": null
        },
        {
            "key": "MotoSignature",
            "value": "kybvHsoZwlEBSNbR7Id0FyOKyUrggHBFLdDX2gZZ5E6BESRGHtKBN9zN9AG4U-BODolfLDYBXo-voy0-VMBykA"
        },
        {
            "key": "MotoAccountCode",
            "value": "ack_ikrzccuhjple7dmn7aozgoaeki"
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
            "value": "/payment-notification/checkout/canceled"
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
BCEnvironment.init("ack_ikrzccuhjple7dmn7aozgoaeki", "kybvHsoZwlEBSNbR7Id0FyOKyUrggHBFLdDX2gZZ5E6BESRGHtKBN9zN9AG4U-BODolfLDYBXo-voy0-VMBykA", config);

const data = {
    "source": {
        "type": "paypal",
    },
    "amount": "1044",
    "currency": "GBP",
    "payment_type": "Regular",
    "reference": "51419-213",
    "description": "Items for Order: cf47bdb2-5097-ee11-b907-6045bdd08d83; Basket: cdfe6969-a2e7-40c6-8efe-21695d552f68",
    "capture": true,
    "capture_on": "2023-12-10T11:40:03.342Z",
    "shipping": {
        "address": {
            "address_line1": "9 Conduit House",
            "address_line2": "315 Chiswick High Road",
            "city": "London",
            "state": "Greater London",
            "zip": "W4 4HH",
            "country": "GB"
        },
        "phone": {
            "country_code": "44",
            "number": "6575675677"
        }
    },
    "processing_channel_id": "pc_ptat6wn535wetjzlnbsmuims7m",
    "metadata": {
        "udf1": "cf47bdb2-5097-ee11-b907-6045bdd08d83",
        "udf2": "cdfe6969-a2e7-40c6-8efe-21695d552f68",
        "udf3": "55e9cb5d-5097-ee11-b907-6045bdd08d83",
        "udf4": "51419-213",
        "udf5": ""
    },
    "success_url": "https://ffx.bettercommerce.tech/payment-notification/checkout",
    "failure_url": "https://ffx.bettercommerce.tech/payment-notification/checkout/canceled",
    "items": [
        {
            "name": "Test item",
            "quantity": 1,
            "unit_price": 1044,
            //"reference": "858818ac",
            "total_amount": 1044,
            "tax_amount": 0,
            "discount_amount": 0,
            "url": "https://google.com",
            "image_url": "https://google.com"
        }
    ]
};
new PaymentOperation().createPaymentContext(data).then(response => {
    console.log(JSON.stringify(response));
});