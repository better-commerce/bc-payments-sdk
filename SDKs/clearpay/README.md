# BetterCommerce ClearPay NodeJS SDK

BetterCommerce's ClearPay NodeJS SDK enables BC client applications to integrate with ClearPay merchant API system. It publishes an interface to interact with [ClearPay API v2](https://developers.clearpay.co.uk/clearpay-online/reference) endpoints.

Use below command for package installation:

```
npm install @better-commerce/bc-clearpay-sdk
```

## Architecture Diagram

![Architecture Diagram](/assets/app-architecture.png)

## SDK Initialization

**Use following snippet to initialize the SDK:**

```
ClearPayEnvironment.init("<api_userId>", "<api_password>");
```

## Usage Example

### Create Checkout Session / Payment Intent

```
const data = {
    purchaseCountry: "GB",
    description: "Order c519a711-a406-ee11-b1c2-000d3a211cf7 for basket 42695bdd-5188-4e6b-8595-8d373a91d6fe OrderPaymentId 318096-1110599",
    amount: {
        amount: 79.99,
        currency: "GBP"
    },
    taxAmount: {
        amount: 13.33,
        currency: "GBP"
    },
    shippingAmount: {
        amount: 0,
        currency: "GBP"
    },
    items: [
        {
            name: "BS21316-MAGENTA / FUCHSIA-16(1)",
            sku: "BS21316-MAGENTA / FUCHSIA-16",
            quantity: 1,
            price: {
                amount: 79.99,
                currency: "GBP"
            },
            imageUrl: "http://localhost:3000/product/products/my-brand-pink-jacquard-tie-waist-midi-dress-bs21316-magenta-fuchsia-16",
            pageUrl: "http://localhost:3000/product/products/my-brand-pink-jacquard-tie-waist-midi-dress-bs21316-magenta-fuchsia-16",
        }
    ],
    consumer: {
        givenNames: "Test",
        surname: "User",
        email: "guest142@gmail.com",
        phoneNumber: "012485744451"
    },
    billing: {
        area1: "Edinburgh",
        area2: "",
        countryCode: "GB",
        line1: "20/13 St. Peters Place",
        line2: "address 2",
        name: "Test User",
        phoneNumber: "012485744451",
        postcode: "EH3 9PQ"
    },
    shipping: {
        area1: "Edinburgh",
        area2: "",
        countryCode: "GB",
        line1: "20/13 St. Peters Place",
        line2: "address 2",
        name: "Test User",
        phoneNumber: "012485744451",
        postcode: "EH3 9PQ"
    },
    merchant: {
        redirectConfirmUrl: "http://localhost:3000//payment-notification/clearpay",
        redirectCancelUrl: "http://localhost:3000//payment-notification/clearpay/canceled",
        popupOriginUrl: "http://localhost:3000/checkout",
    }
};
const result = await new Payment().initIntent(data);
```

### Response

```
{
    "token":"003.l8k5frtvq1nqi231ktol2n177rgheed3j34lgb3sui7cjpnj",
    "expires":"2023-06-09T07:24:39.721Z",
    "redirectCheckoutUrl":"https://portal.sandbox.clearpay.co.uk/uk/checkout/?token=003.l8k5frtvq1nqi231ktol2n177rgheed3j34lgb3sui7cjpnj"
}
```

### Capture Payment

```
const data = {
    token: "003.b63tm5vhpf3lofthu48g4nemnb1pl5isi5atipqktqnl54f1",
};
const result = await new Payment().requestPayment(data);
```

### Response

```
{
    "id":"400248040765",
    "token":"003.b63tm5vhpf3lofthu48g4nemnb1pl5isi5atipqktqnl54f1",
    "status":"APPROVED",
    "created":"2023-06-09T09:07:23.276Z",
    "originalAmount":{
        "amount":"79.99",
        "currency":"GBP"
    },
    "openToCaptureAmount":{
        "amount":"0.00",
        "currency":"GBP"
    },
    "paymentState":"CAPTURED",
    "refunds":[

    ],
    "orderDetails":{
        "consumer":{
            "phoneNumber":"012485744451",
            "givenNames":"Test",
            "surname":"User",
            "email":"guest142@gmail.com"
        },
        "billing":{
            "name":"Test User",
            "line1":"20/13 St. Peters Place",
            "line2":"address 2",
            "area1":"Edinburgh",
            "postcode":"EH39PQ",
            "countryCode":"GB",
            "phoneNumber":"012485744451"
        },
        "shipping":{
            "name":"Test User",
            "line1":"20/13 St. Peters Place",
            "line2":"address 2",
            "area1":"Edinburgh",
            "postcode":"EH39PQ",
            "countryCode":"GB",
            "phoneNumber":"012485744451"
        },
        "courier":{

        },
        "items":[
            {
                "name":"BS21316-MAGENTA / FUCHSIA-16(1)",
                "sku":"BS21316-MAGENTA / FUCHSIA-16",
                "quantity":1,
                "price":{
                    "amount":"79.99",
                    "currency":"GBP"
                },
                "pageUrl":"http://localhost:3000/product/products/my-brand-pink-jacquard-tie-waist-midi-dress-bs21316-magenta-fuchsia-16",
                "imageUrl":"http://localhost:3000/product/products/my-brand-pink-jacquard-tie-waist-midi-dress-bs21316-magenta-fuchsia-16"
            }
        ],
        "discounts":[

        ],
        "shippingAmount":{
            "amount":"0.00",
            "currency":"GBP"
        },
        "taxAmount":{
            "amount":"13.33",
            "currency":"GBP"
        }
    },
    "events":[
        {
            "id":"2Qxl2GquYAK4kIJXOx55Z1WX4Hi",
            "created":"2023-06-09T09:28:24.850Z",
            "expires":null,
            "type":"CAPTURED",
            "amount":{
                "amount":"79.99",
                "currency":"GBP"
            },
            "paymentEventMerchantReference":null
        }
    ]
}
```

### Get Order Details

```
const orderId = "400248040765";
const result = await new Payment().getDetails(orderId);
```

### Response

```
{
    "id":"400248040765",
    "token":"003.b63tm5vhpf3lofthu48g4nemnb1pl5isi5atipqktqnl54f1",
    "status":"APPROVED",
    "created":"2023-06-09T09:07:23.276Z",
    "originalAmount":{
        "amount":"79.99",
        "currency":"GBP"
    },
    "openToCaptureAmount":{
        "amount":"0.00",
        "currency":"GBP"
    },
    "paymentState":"CAPTURED",
    "refunds":[

    ],
    "orderDetails":{
        "consumer":{
            "phoneNumber":"012485744451",
            "givenNames":"Test",
            "surname":"User",
            "email":"guest142@gmail.com"
        },
        "billing":{
            "name":"Test User",
            "line1":"20/13 St. Peters Place",
            "line2":"address 2",
            "area1":"Edinburgh",
            "area2":"",
            "postcode":"EH3 9PQ",
            "countryCode":"GB",
            "phoneNumber":"012485744451"
        },
        "shipping":{
            "name":"Test User",
            "line1":"20/13 St. Peters Place",
            "line2":"address 2",
            "area1":"Edinburgh",
            "area2":"",
            "postcode":"EH3 9PQ",
            "countryCode":"GB",
            "phoneNumber":"012485744451"
        },
        "courier":{

        },
        "items":[
            {
                "name":"BS21316-MAGENTA / FUCHSIA-16(1)",
                "sku":"BS21316-MAGENTA / FUCHSIA-16",
                "quantity":1,
                "price":{
                    "amount":"79.99",
                    "currency":"GBP"
                },
                "pageUrl":"http://localhost:3000/product/products/my-brand-pink-jacquard-tie-waist-midi-dress-bs21316-magenta-fuchsia-16",
                "imageUrl":"http://localhost:3000/product/products/my-brand-pink-jacquard-tie-waist-midi-dress-bs21316-magenta-fuchsia-16",
                "categories":[

                ]
            }
        ],
        "discounts":[

        ],
        "shippingAmount":{
            "amount":"0.00",
            "currency":"GBP"
        },
        "taxAmount":{
            "amount":"13.33",
            "currency":"GBP"
        }
    },
    "events":[
        {
            "id":"2Qxl2GquYAK4kIJXOx55Z1WX4Hi",
            "created":"2023-06-09T09:28:24.880Z",
            "expires":null,
            "type":"CAPTURED",
            "amount":{
                "amount":"79.99",
                "currency":"GBP"
            },
            "paymentEventMerchantReference":null
        }
    ]
}
```
