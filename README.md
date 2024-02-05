# BetterCommerce Payments NodeJS SDK

BetterCommerce's Payments NodeJS SDK is a complete solution for storefront clients that integrate payments. `bc-payments-sdk` is a single point interface for storefront clients for interacting with payment gateways.

# Supported Payment Providers

It integrates SDK APIs for the following providers:

| Payment Gateway | Implementation Approach                 |
| :-------------- | :-------------------------------------- |
| PayPal          | Client-side **Modal Widget**            |
| Checkout        | Client-side **Frame Widget**            |
| Stripe          | Client-side **Frame Widget**            |
| ClearPay        | Client-side **Modal Widget + Redirect** |
| Klarna          | Client-side **Modal Widget**            |
| ApplePay        | Client-side **Modal Widget + Redirect** |

## PayPal

| Name           | Reference                                                                                     | Description                                                                   |
| :------------- | :-------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------- |
| API Collection | https://developer.paypal.com/api/rest/current-resources/                                      | Create and manage your site's payment functions using PayPal API collections. |
| API v2 SDK     | https://developer.paypal.com/docs/api/orders/v2/                                              |                                                                               |
| NPM Package    | https://github.com/better-commerce/bc-paypal-sdk                                              | Node.js SDK for interaction with PayPal APIs - @better-commerce/bc-paypal-sdk |
| Dashboard - Sandbox        | https://www.sandbox.paypal.com/signin?returnUri=https%3A%2F%2Fwww.sandbox.paypal.com%2Fmep%2F |                                                                               |
| Dashboard - Live           | https://www.paypal.com/signin?returnUri=%2Fshopping%2Fdashboard                               |                                                                               |

## Checkout

| Name           | Reference                                                       | Description                                                                       |
| :------------- | :-------------------------------------------------------------- | :-------------------------------------------------------------------------------- |
| Widget Integration | [https://www.checkout.com/docs/payments](https://www.checkout.com/docs/payments/accept-payments/accept-a-payment-on-your-website/frames-reference)                          | Integrate with Checkout.com's frames.                           |
| API SDK        | https://api-reference.checkout.com/#operation/getPaymentDetails |                                                                                   |
| NPM Package    | https://github.com/better-commerce/bc-checkout-sdk              | Node.js SDK for interaction with Checkout APIs - @better-commerce/bc-checkout-sdk |
| Dashboard - Sandbox        | https://dashboard.sandbox.checkout.com/                         |                                                                                   |
| Dashboard - Live           | https://dashboard.checkout.com/                                 |                                                                                   |

## Stripe

| Name               | Reference                                         | Description                                                                     |
| :----------------- | :------------------------------------------------ | :------------------------------------------------------------------------------ |
| Widget Integration | https://stripe.com/docs/payments/accept-a-payment | Integrate with Stripe's various payment services.                               |
| API SDK            | https://stripe.com/docs/api                       |                                                                                 |
| NPM Package        | https://github.com/better-commerce/bc-stripe-sdk  | Node.js SDK for interaction with Stripe APIs - @better-commerce/bc-checkout-sdk |
| Dashboard - Sandbox            | https://dashboard.stripe.com/login                |                                                                                 |
| Dashboard - Live               | https://dashboard.stripe.com/login                |                                                                                 |

## ClearPay

| Name               | Reference                                                                                  | Description                                                                       |
| :----------------- | :----------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------- |
| Widget Integration | https://developers.clearpay.co.uk/clearpay-online/reference/standard-checkout#popup-method |                                                                                   |
| API SDK            | https://developers.clearpay.co.uk/clearpay-online/reference/api-environments               |                                                                                   |
| NPM Package        | https://github.com/better-commerce/bc-clearpay-sdk                                         | Node.js SDK for interaction with ClearPay APIs - @better-commerce/bc-clearpay-sdk |
| Dashboard - Sandbox            | https://portal.sandbox.clearpay.co.uk/uk/login-email                                       |                                                                                   |
| Dashboard - Live               | https://portal.clearpay.co.uk/uk/login-email                                               |                                                                                   |

## Klarna

| Name               | Reference                                                               | Description                                                                   |
| :----------------- | :---------------------------------------------------------------------- | :---------------------------------------------------------------------------- |
| Widget Integration | https://docs.klarna.com/klarna-payments/integrate-with-klarna-payments/ |                                                                               |
| API SDK            | https://docs.klarna.com/api                                             |                                                                               |
| NPM Package        | https://github.com/better-commerce/bc-klarna-sdk                        | Node.js SDK for interaction with Klarna APIs - @better-commerce/bc-klarna-sdk |
| Dashboard - Sandbox            | https://portal.playground.klarna.com/                                   |                                                                               |
| Dashboard - Live               | https://portal.klarna.com/                                              |                                                                               |

## ApplePay

| Name                   | Reference                                                                                                               | Description                                                                   |
| :--------------------- | :---------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------- |
| Setting Up Your Server | https://developer.apple.com/documentation/apple_pay_on_the_web/setting_up_your_server                                   | Set up your server for secure communications with Apple Pay.                  |
| Widget Integration     | https://developer.apple.com/documentation/apple_pay_on_the_web/apple_pay_js_api                                         |                                                                               |
| API SDK                | https://developer.apple.com/documentation/apple_pay_on_the_web/apple_pay_js_api/requesting_an_apple_pay_payment_session |                                                                               |
| NPM Package            | https://github.com/better-commerce/bc-apple-pay-sdk                                                                     | Node.js SDK for interaction with ApplePay - @better-commerce/bc-apple-pay-sdk |
| Sandbox Url               | https://sandbox.apple-pay-gateway.apple.com/                                                                            |                                                                               |
| Live Url                  | https://apple-pay-gateway.apple.com/                                                                                    |                                                                               |
| Setting Up Sandbox     | https://developer.apple.com/apple-pay/sandbox-testing/                                                                  |                                                                               |

## Installation

Use below command for package installation:

```
npm install @better-commerce/bc-payments-sdk
```

## Architecture Diagram

![Architecture Diagram](/assets/app-architecture.png)

## SDK Initialization

**Use following snippet to initialize the SDK:**

### PayPal

```
const paypalConfig = {
    systemName: "Paypal",
    notificationUrl: "<Return_Url>",
    settings: [{
        "key": "AccountCode",
        "value": "<Client_Id>"
    },
    {
        "key": "Signature",
        "value": "<Secret_Key>"
    },
    {
        "key": "UseSandbox",
        "value": "True"
    },
    {
        "key": "CancelUrl",
        "value": "<Cancel_Url>"
    }]
};
```

### Checkout

```
const checkoutConfig = {
    systemName: "Checkout",
    notificationUrl: "<Return_Url>",
    settings: [{
        "key": "AccountCode",
        "value": "<Public_Key>"
    },
    {
        "key": "Signature",
        "value": "<Secret_Key>"
    },
    {
        "key": "MotoAccountCode",
        "value": "<Client_Id>"
    },
    {
        "key": "MotoSignature",
        "value": "<Access_Secret>"
    },
    {
        "key": "MotoUserName",
        "value": "<Processing_Channel_Id>"
    },
    {
        "key": "UseSandbox",
        "value": "True"
    },
    {
        "key": "CancelUrl",
        "value": "<Cancel_Url>"
    }]
};
```

### Stripe

```
const stripeConfig = {
    systemName: "Stripe",
    notificationUrl: "<Return_Url>",
    settings: [{
        "key": "AccountCode",
        "value": "<Public_Key>"
    },
    {
        "key": "Signature",
        "value": "<Secret_Key>"
    },
    {
        "key": "UseSandbox",
        "value": "True"
    },
    {
        "key": "CancelUrl",
        "value": "<Cancel_Url>"
    }]
};
```

### Klarna

```
const klarnaConfig = {
    systemName: "Klarna",
    notificationUrl: "<Return_Url>",
    settings: [{
        "key": "AccountCode",
        "value": "<API_User_Id>"
    },
    {
        "key": "Signature",
        "value": "<API_Password>"
    },
    {
        "key": "UseSandbox",
        "value": "True"
    },
    {
        "key": "CancelUrl",
        "value": "<Cancel_Url>"
    }]
};
```

### ApplePay

```
const applePayConfig = {
    systemName: "CheckoutApplePay",
    notificationUrl: "<Return_Url>",
    settings: [{
        key: "AccountCode",
        value: "merchant.com.commerce.ffx"
    }, {
        "key": "Signature",
        "value": "<Secret_Key>"
    }, {
        "key": "UseSandbox",
        "value": "True"
    }, {
        key: "CancelUrl",
        value: "/payment-notification/checkoutapplepay/canceled"
    }]
};
```

### Initialization

```
BCEnvironment.init(paypalConfig || checkoutConfig || stripeConfig || klarnaConfig);
BCEnvironment.withCredentials("<bc_client_id>", "<bc_shared_secret>", [useSandbox: boolean]);
```

## Usage Example

### Get PayPal Order Details

```
const result = await new PaymentOperation().getOrderDetails("<order_id>");
```
