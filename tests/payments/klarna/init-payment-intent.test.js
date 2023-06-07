const { BCEnvironment, PaymentOperation, } = require("../../../dist");

const config = {
  systemName: 'Klarna',
  notificationUrl: '/payment-notification/klarna',
  settings: [
    { key: 'AccountCode', value: 'PK73987_e7a735db38e5' },
    { key: 'Signature', value: 'h9CzUwm0pBhEhLOl' },
    {
      "key": "UseSandbox",
      "value": "True"
    },
    {
      key: 'CancelUrl',
      value: '/payment-notification/klarna/canceled'
    },
  ],
};
BCEnvironment.init("505c82a3-3493-493b-b359-a881b8414bf5", "wHfsCPUlgUX/I8d0xJbAaz9Fy67BN2Vh8k6T4AFqrUw=", config);
const data = {
    "intent": "buy",
    "purchase_country": "GB",
    "purchase_currency": "GBP",
    "locale": "en-GB",
    "order_amount": 10,
    "order_tax_amount": 0,
    "order_lines": [{
        "type": "physical",
        "reference": "19-402",
        "name": "Battery Power Pack",
        "quantity": 1,
        "unit_price": 10,
        "tax_rate": 0,
        "total_amount": 10,
        "total_discount_amount": 0,
        "total_tax_amount": 0,
        "image_url": "https://www.exampleobjects.com/logo.png",
        "product_url": "https://www.estore.com/products/f2a8d7e34"
    }]
};
new PaymentOperation().initPaymentIntent(data)
    .then(response => {
        console.log(JSON.stringify(response))
    });