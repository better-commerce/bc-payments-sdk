# BetterCommerce Klarna NodeJS SDK

BetterCommerce's Klarna NodeJS SDK enables BC client applications to integrate with Klarna merchant API system. It publishes an interface to interact with [Klarna API v1](https://docs.klarna.com/api) endpoints.

Use below command for package installation:

```
npm install @better-commerce/bc-klarna-sdk
```

## Architecture Diagram

![Architecture Diagram](/assets/app-architecture.png)

## SDK Initialization

**Use following snippet to initialize the SDK:**

```
KlarnaEnvironment.init("<userId>", "<password>");
```

## Usage Example

### Create Payment Intent

```
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
const result = await new Payment().initIntent(data);
```

### Response

```
{
  "client_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ewogICJzZXNzaW9uX2lkIiA6ICIw",
  "payment_method_categories": [
    {
      "asset_urls": {
        "descriptive": "https://x.klarnacdn.net/payment-method/assets/badges/generic/klarna.svg",
        "standard": "https://x.klarnacdn.net/payment-method/assets/badges/generic/klarna.svg"
      },
      "identifier": "klarna",
      "name": "Pay with Klarna"
    }
  ],
  "session_id": "0b1d9815-165e-42e2-8867-35bc03789e00"
}
```

### Get Order Details

```
const orderId = "f20da212-79ca-460f-b490-9958c7acfd52";
const result = await new Payment().getDetails(orderId);
```

### Response

```
{
    "order_id":"f20da212-79ca-460f-b490-9958c7acfd52",
    "status":"AUTHORIZED",
    "fraud_status":"ACCEPTED",
    "order_amount":19,
    "original_order_amount":19,
    "captured_amount":0,
    "refunded_amount":0,
    "remaining_authorized_amount":19,
    "purchase_currency":"GBP",
    "locale":"en-GB",
    "order_lines":[
        {
            "reference":"Order 4ffc7381-6904-ee11-b1c2-000d3a211cf7 for basket 77b02355-41ed-4b14-9e0f-0476e6b38fb6 OrderPaymentId 318039-1109030",
            "type":"physical",
            "quantity":1,
            "quantity_unit":"",
            "name":"123-KARM-I-NATURLIG-BOK-POLERAD-ALUMINIUM(1)",
            "total_amount":20,
            "unit_price":19,
            "total_discount_amount":0,
            "tax_rate":8,
            "total_tax_amount":1,
            "product_url":"http://localhost:3000/product/products/kallemo-alumunium1-123-1-123-karm-i-naturlig-bok-polerad-aluminium",
            "image_url":"http://localhost:3000/product/products/kallemo-alumunium1-123-1-123-karm-i-naturlig-bok-polerad-aluminium"
        }
    ],
    "klarna_reference":"RFXSDRBN",
    "customer":{
        "date_of_birth":"1985-12-07",
        "type":"person"
    },
    "billing_address":{
        "given_name":"Zornitsa",
        "family_name":"Valkova",
        "title":"",
        "street_address":"Cottage 1",
        "street_address2":"Lornshill Farm",
        "postal_code":"FK10 2EP",
        "city":"Alloa",
        "region":"",
        "country":"GB",
        "email":"z.valkova+0321@astoundcommerce.com",
        "phone":"+447777777777"
    },
    "shipping_address":{
        "given_name":"Test",
        "family_name":"UserUk",
        "title":"Mr",
        "street_address":"address 1",
        "street_address2":"address 2",
        "postal_code":"W44HR",
        "city":"city",
        "region":"",
        "country":"GB",
        "email":"guest142@gmail.com",
        "phone":"07903046111"
    },
    "created_at":"2023-06-06T13:34:41.149Z",
    "purchase_country":"GB",
    "expires_at":"2023-07-04T00:00:00.000Z",
    "captures":[
        
    ],
    "refunds":[
        
    ],
    "initial_payment_method":{
        "type":"PAY_BY_CARD",
        "description":"Pay by card"
    },
    "shipping_info":[
        
    ]
}
```