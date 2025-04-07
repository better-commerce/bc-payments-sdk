const { KlarnaEnvironment, Payment } = require("../dist");

KlarnaEnvironment.init("PK73987_e7a735db38e5", "h9CzUwm0pBhEhLOl");

/*
{
    tax: 1.8333,
    withTax: 20.99,
    withoutTax: 19.1567,
}
*/
const data = {
    "intent": "buy",
    "purchase_country": "GB",
    "purchase_currency": "EUR",
    "locale": "en",
    "order_amount": 205.98,
    "order_tax_amount": 0,
    "order_lines": [
        {
            "type": "physical",
            "reference": "Order 5922d53b-ffbf-ee11-b1c9-000d3a211cf7 for basket 1121541e-f17e-45e0-be72-cfeb71b6a8bd OrderPaymentId 10018-1202714",
            "name": "HE0537EKRS(1)",
            "quantity": 1,
            "unit_price": 205.98,
            "tax_rate": 0,
            "total_amount": 205.98,
            "total_discount_amount": 0,
            "total_tax_amount": 0,
            "image_url": "http://localhost:3000/product/products/ridill-he0537ekrs",
            "product_url": "http://localhost:3000/product/products/ridill-he0537ekrs"
        }
    ]
};
new Payment().initIntent(data)
    .then(response => {
        console.log(JSON.stringify(response))
    });