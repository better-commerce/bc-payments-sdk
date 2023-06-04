const { BCEnvironment, PaymentOperation, } = require("../../../dist");

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
        "type": "token",
        "token": "tok_d6q7assbaqeeho5v2m4bc5y4ny"
    },
    "amount": 20.99,
    "currency": "GBP",
    "payment_type": "Regular",
    "reference": "317920-1106878",
    "description": "Items for Order: 4e16dddb-9800-ee11-b1c2-000d3a211cf7; Basket: ce364f26-3d06-45b8-9cbe-ec1813f7c1fa",
    "capture": true,
    "capture_on": "2023-06-01T16:59:39.759Z",
    "customer": {
        "email": "guest142@gmail.com",
        "name": "guest142@gmail.com"
    },
    "shipping": {
        "address": {
            "address_line1": "20/13 St. Peters Place",
            "address_line2": "address 2",
            "city": "Edinburgh",
            "state": "",
            "zip": "EH3 9PQ",
            "country": "GB"
        },
        "phone": {
            "country_code": "44",
            "number": "012485744451"
        }
    },
    "processing_channel_id": "",
    "metadata": {
        "udf1": "4e16dddb-9800-ee11-b1c2-000d3a211cf7",
        "udf2": "ce364f26-3d06-45b8-9cbe-ec1813f7c1fa",
        "udf3": "00000000-0000-0000-0000-000000000000",
        "udf4": "317920-1106878",
        "udf5": ""
    }
};
new PaymentOperation().requestPayment(data).then(response => {
    console.log(JSON.stringify(response));
});