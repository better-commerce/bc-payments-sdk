const { ClearPayEnvironment, Payment } = require("../dist");

ClearPayEnvironment.init("400124147", "dd3d92ae8ccee3b9e3f15e3876d7a11fa255a9985b22ba2ec9848bb1e59b1159046152fe5c16b97b61adb01e5157e0ed13b9285380f521ef0ab05133f0808242");

const data = {
    "purchaseCountry": "GB",
    "description": "Order 5922d53b-ffbf-ee11-b1c9-000d3a211cf7 for basket 1121541e-f17e-45e0-be72-cfeb71b6a8bd OrderPaymentId 10018-1202710",
    "amount": {
        "amount": 205.98,
        "currency": "EUR"
    },
    "taxAmount": {
        "amount": 33.33,
        "currency": "EUR"
    },
    "shippingAmount": {
        "amount": 0,
        "currency": "EUR"
    },
    "items": [
        {
            "name": "HE0537EKRS(1)",
            "sku": "HE0537EKRS",
            "quantity": 1,
            "price": {
                "amount": 205.98,
                "currency": "EUR"
            },
            "imageUrl": "http://localhost:3000/product/products/ridill-he0537ekrs",
            "pageUrl": "http://localhost:3000/product/products/ridill-he0537ekrs"
        }
    ],
    "consumer": {
        "givenNames": "Gagandeep",
        "surname": "Singh",
        "email": "gagandeep.singh@bettercommerce.io",
        "phoneNumber": "7777777777"
    },
    "billing": {
        "area1": "London",
        "area2": "",
        "countryCode": "GB",
        "line1": "34, Grandway Fort, Luke St",
        "line2": "",
        "name": "Gagandeep Singh",
        "phoneNumber": "7777777777",
        "postcode": "W4 4HH"
    },
    "shipping": {
        "area1": "London",
        "area2": "",
        "countryCode": "GB",
        "line1": "34, Grandway Fort, Luke St",
        "line2": "",
        "name": "Gagandeep Singh",
        "phoneNumber": "7777777777",
        "postcode": "W4 4HH"
    },
    "merchant": {
        "redirectConfirmUrl": "http://localhost:3000//payment-notification/clearpay",
        "redirectCancelUrl": "http://localhost:3000//payment-notification/clearpay/canceled",
        "popupOriginUrl": "http://localhost:3000/checkout"
    }
};
new Payment().initIntent(data)
    .then(response => {
        console.log(JSON.stringify(response))
    });