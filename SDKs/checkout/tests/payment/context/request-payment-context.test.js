const { CheckoutEnvironment, PaymentContext, PaymentType } = require("../../../dist");

CheckoutEnvironment.initServer("ack_urnw6g2bmmvehmvnlg37copkhe", "8NjqH1tpGAAL0YVOb26-wSq5q0Q0RzG4tkXLnQW4jf9E5oVTFLEq_BFOYEzIBGyWm5JM_vEOzcOR9C_UNrOhdw", "pc_vpjtxbgcap5elpq65wtxtr3gg4");
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
    "processing_channel_id": "pc_vpjtxbgcap5elpq65wtxtr3gg4",
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

new PaymentContext().request(data)
    .then(response => {
        console.log(JSON.stringify(response))
    });