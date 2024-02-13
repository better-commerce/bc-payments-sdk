const { BCEnvironment, PaymentOperation, } = require("../../../../dist");

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
    purchase_country: "GB",
    currency: "GBP",
    locale: "en-GB",
    amount: 1000,
    tax_amount: 1,
    products: [
        {
            name: "Brown leather belt",
            quantity: 1,
            unit_price: 1000,
            tax_rate: 0,
            total_amount: 1000,
            total_tax_amount: 0
        }
    ],
    //custom_payment_method_ids: ["6m_149APR"]
    secretKey: "sk_sbox_sfqi22eviwtbdki3itilxrkgmuc",
};
new PaymentOperation().createSession(data).then(response => {
    console.log(JSON.stringify(response));
});