# BetterCommerce Stripe NodeJS SDK

BetterCommerce's Stripe NodeJS SDK enables BC client applications to integrate with Stripe merchant API system. It publishes an interface to interact with [Stripe API v1](https://stripe.com/docs/api) endpoints.

Use below command for package installation:

```
npm install @better-commerce/bc-stripe-sdk
```

## Architecture Diagram

![Architecture Diagram](/assets/app-architecture.png)

## SDK Initialization

**Use following snippet to initialize the SDK:**

```
StripeEnvironment.init("<public_key>", "<secret_key>");
```

## Usage Example

### Create Payment Intent

```
const data = {
    amount: <amount>,
    currency: "<currency_code>",
    receipt_email: "<receipt_email>",
    description: "<description>"
};
const result = await new Payment.initIntent(data);
```

### Response

```
{
  "id":"pi_3NFEwJJfqoPrHJKR0flGB6qG",
  "object":"payment_intent",
  "amount":10101,
  "amount_capturable":0,
  "amount_details":{
      "tip":{
      }
  },
  "amount_received":0,
  "capture_method":"automatic",
  "confirmation_method":"automatic",
  "created":1685877459,
  "currency":"gbp",
  "customer":null,
  "description":"",
  "invoice":null,
  "metadata":{
  },
  "payment_method_options":{
      "card":{
          "installments":null,
          "mandate_options":null,
          "network":null,
          "request_three_d_secure":"automatic"
      }
  },
  "payment_method_types":[
      "card"
  ],
  "receipt_email":"test@gmail.com",
  ...
  ...
  ...
}
```

### Retrieve Payment Intent / Get Payment Details

```
const result = await new Payment.getDetails("pi_3NFWWaJfqoPrHJKR02VlCGgh");
```

### Response

```
{
    "id":"pi_3NFWWaJfqoPrHJKR02VlCGgh",
    "object":"payment_intent",
    "amount":11100,
    "amount_capturable":0,
    "amount_details":{
        "tip":{
        }
    },
    "amount_received":11100,
    "application":null,
    "application_fee_amount":null,
    "automatic_payment_methods":null,
    "canceled_at":null,
    "cancellation_reason":null,
    "capture_method":"automatic",
    "client_secret":"pi_3NFWWaJfqoPrHJKR02VlCGgh_secret_L5km8kntCOLxJb5uicbXNZLLj",
    "confirmation_method":"automatic",
    "created":1685945056,
    "currency":"gbp",
    "customer":null,
    "description":"Order 7effe5bc-6603-ee11-b1c2-000d3a211cf7 for basket null",
    "invoice":null,
    "last_payment_error":null,
    "latest_charge":"ch_3NFWWaJfqoPrHJKR0f6NEzpD",
    "livemode":false,
    "metadata":{
    },
    "next_action":null,
    "on_behalf_of":null,
    "payment_method":"pm_1NFWWtJfqoPrHJKRuodOgi5m",
    "payment_method_options":{
        "card":{
            "installments":null,
            "mandate_options":null,
            "network":null,
            "request_three_d_secure":"automatic"
        }
    },
    "payment_method_types":[
        "card"
    ],
    "processing":null,
    "receipt_email":"test@gmail.com",
  ...
  ...
  ...
}
```