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
| Juspay          | Client-side **Custom Widget + Redirect** |
| Elavon        | Client-side **Modal Widget + Redirect** |
| Nuvei        | Client-side **Modal Widget + Redirect** |
| Worldpay     | **Hosted Payment Page** (form POST + Redirect) |

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
| Widget Integration | https://www.checkout.com/docs/payments/accept-payments/accept-a-payment-on-your-website/frames-reference                         | Integrate with Checkout.com's frames.                           |
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

## Checkout ApplePay

| Name                   | Reference                                                                                                               | Description                                                                   |
| :--------------------- | :---------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------- |
| Setting Up Your Server | https://developer.apple.com/documentation/apple_pay_on_the_web/setting_up_your_server                                   | Set up your server for secure communications with Apple Pay.                  |
| Widget Integration     | https://developer.apple.com/documentation/apple_pay_on_the_web/apple_pay_js_api                                         |                                                                               |
| API SDK                | https://developer.apple.com/documentation/apple_pay_on_the_web/apple_pay_js_api/requesting_an_apple_pay_payment_session |                                                                               |
| NPM Package            | https://github.com/better-commerce/bc-apple-pay-sdk                                                                     | Node.js SDK for interaction with ApplePay - @better-commerce/bc-apple-pay-sdk |
| Sandbox Url               | https://sandbox.apple-pay-gateway.apple.com/                                                                            |                                                                               |
| Live Url                  | https://apple-pay-gateway.apple.com/                                                                                    |                                                                               |
| Setting Up Sandbox     | https://developer.apple.com/apple-pay/sandbox-testing/                                                                  |                                                                               |

## Juspay

| Name           | Reference                                                                                     | Description                                                                   |
| :------------- | :-------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------- |
| API Collection | https://docs.juspay.io/api-reference/docs/express-checkout/postman-collection                                      | A Postman collection with the tools you’ll need to test the server-side component of your integration. |
| Express Checkout SDK     | https://docs.juspay.io/api-reference/docs/express-checkout/introduction                                              |                                                                               |
| NPM Package    | https://github.com/better-commerce/bc-juspay-sdk                                              | Node.js SDK for interaction with Juspay APIs - @better-commerce/bc-juspay-sdk |
| Dashboard - Sandbox        | https://sandbox.portal.juspay.in/ |                                                                               |
| Dashboard - Live           | https://portal.juspay.in/                               |                                                                               |

## Elavon

| Name           | Reference                                                                                     | Description                                                                   |
| :------------- | :-------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------- |
| API Collection | https://developer.elavon.com/products/checkout-js/v1/api-reference                                      | An API reference you’ll need to test the server-side component of your integration. |
| Checkout.js Transaction Request     | https://developer.elavon.com/products/checkout-js/v1/api-reference#tag/Checkout.js-Transaction-Request                                             |                                                                               |
| NPM Package    | https://github.com/better-commerce/bc-elavon-sdk                                              | Node.js SDK for interaction with Elavon APIs - @better-commerce/bc-elavon-sdk |
| Dashboard - Sandbox        | https://reporting.sandbox.elavonpaymentgateway.com/#/login |                                                                               |
| Dashboard - Live           | https://reporting.elavonpaymentgateway.com/#/login                               |                                                                               |

## Nuvei

| Name           | Reference                                                                                     | Description                                                                   |
| :------------- | :-------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------- |
| API Collection | https://docs.nuvei.com/api/main/indexMain_v1_0.html?json#Introduction                                      | An API reference you’ll need to test the server-side component of your integration. |
| GooglePay WebSDK Integration     | https://docs.nuvei.com/documentation/global-guides/google-pay/google-pay-integration/google-pay-guide-web-sdk/                                            |                                                                               |
| ApplePay WebSDK Integration     | https://docs.nuvei.com/documentation/global-guides/apple-pay-guides/implementation/static-apple-pay-button-using-web-sdk/                                             |                                                                               |
| NPM Package    | https://github.com/better-commerce/bc-nuvei-sdk                                              | Node.js SDK for interaction with Nuvei APIs - @better-commerce/bc-nuvei-sdk |
| Dashboard - Sandbox        | https://sandbox.nuvei.com/login |                                                                               |
| Dashboard - Live           | https://nuvei.com/login                               |                                                                               |

## Worldpay

| Name           | Reference                                                                                     | Description                                                                   |
| :------------- | :-------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------- |
| HTML Redirect (Hosted Payment Page) | https://developerengine.fisglobal.com/apis/bg-total/html-redirect                | Order fields posted to `/wcc/purchase`; no server-to-server API call.          |
| NPM Package    | https://github.com/better-commerce/bc-worldpay-sdk                                            | Node.js SDK for the Worldpay Hosted Payment Page - bc-worldpay-sdk            |
| Dashboard - Sandbox        | https://secure-test.worldpay.com/sso/public/auth/login.html |                                                                               |
| Dashboard - Live           | https://secure.worldpay.com/sso/public/auth/login.html                               |                                                                               |

The purchase signature is the same as the legacy BetterCommerce (Omnicx) Worldpay plugin, so existing Worldpay installations work unchanged.

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

### Worldpay

```
const worldpayConfig = {
    systemName: "Worldpay",
    notificationUrl: "<Return_Url>",
    settings: [{
        "key": "UserName",          // Installation id (instId). Falls back to MotoUserName.
        "value": "<Installation_Id>"
    }, {
        "key": "AccountCode",       // Merchant code (accId1)
        "value": "<Merchant_Code>"
    }, {
        "key": "Signature",         // MD5 secret (Worldpay "MD5 secret for transactions"). Empty = legacy default "test1234".
        "value": "<MD5_Secret>"
    }, {
        "key": "MotoSignature",     // Optional: MAC secret (mac2/mac) or Payment Response password (callbackPW)
        "value": "<Response_Secret>"
    }, {
        "key": "UseSandbox",
        "value": "True"
    }, {
        "key": "TestUrl",
        "value": "https://secure-test.worldpay.com/wcc/purchase"
    }, {
        "key": "ProductionUrl",
        "value": "https://secure.worldpay.com/wcc/purchase"
    }]
};

// Optional extras: origin (for a relative notificationUrl), worldpayInstallationId,
// worldpayResponseSecret, worldpayRequireVerifiedResponse, worldpayUseSandbox (overrides UseSandbox).
BCEnvironment.addExtras({ origin: "https://www.example.com", worldpayRequireVerifiedResponse: true });
```

### Initialization

```
BCEnvironment.init(paypalConfig || checkoutConfig || stripeConfig || klarnaConfig || worldpayConfig);
BCEnvironment.withCredentials("<bc_client_id>", "<bc_shared_secret>", [useSandbox: boolean]);
```

## Usage Example

### Get PayPal Order Details

```
const result = await new PaymentOperation().getOrderDetails("<order_id>");
```

### Worldpay Hosted Payment Page

```
// 1. After converting the basket to an order, build the form and POST it from the browser.
const form = await new PaymentOperation().initPaymentIntent({
    orderId: order.id,
    orderNo: order.orderNo,
    paymentId: order.payment.id,
    amount: order.payment.orderAmount,
    currency: order.currencyCode,
    email,
    billingAddress,
    returnUrl: "https://www.example.com/payment/worldpay/return",
    cancelUrl: "https://www.example.com/checkout",
});
// => { action: "https://secure.worldpay.com/wcc/purchase", method: "POST", fields: { instId, cartId, amount, ..., signature } }

// 2. On the return / Payment Response, parse and authenticate the Worldpay parameters.
const result = await new PaymentOperation().getOrderDetails({ ...queryParams, ...formFields });
// => { outcome: WorldpayTransactionOutcome.AUTHORISED | PENDING | CANCELLED | REFUSED, orderId, orderNo, paymentId, amount, currency, isVerified, ... }
// Always check result.amount/currency against the order before recording the payment.
```
