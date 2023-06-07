# BetterCommerce Payments NodeJS SDK

BetterCommerce's Payments NodeJS SDK is a complete solution for storefront clients that integrate payments. `bc-payments-sdk` is a single point interface for storefront clients for interacting with payment gateways. 

# Supported Payment Providers

It integrates SDK APIs for the following providers:

| Payment Gateway           | Implementation Approach              |
| :------------- | :------------------------------------------------------- |
| PayPal           | Client-side **Modal Widget**              |
| Checkout         | Client-side **Frame Widget**              |
| Stripe           | Client-side **Frame Widget**              |
| ClearPay           |               |
| Klarna           | Client-side **Modal Widget**              |

## PayPal

| Name           | Reference                                                | Description                                                                   |
| :------------- | :------------------------------------------------------- | :---------------------------------------------------------------------------- |
| API Collection | https://developer.paypal.com/api/rest/current-resources/ | Create and manage your site's payment functions using PayPal API collections. |
| API v2 SDK     | https://developer.paypal.com/docs/api/orders/v2/         |                                                                               |
| bc-paypal-sdk  | https://github.com/better-commerce/bc-paypal-sdk         | NPM package for interaction with PayPal APIs                                  |

## Checkout

| Name            | Reference                                                       | Description                                             |
| :-------------- | :-------------------------------------------------------------- | :------------------------------------------------------ |
| API Collection  | https://www.checkout.com/docs/payments                          | Integrate with Checkout.com's various payment services. |
| API SDK         | https://api-reference.checkout.com/#operation/getPaymentDetails |                                                         |
| bc-checkout-sdk | https://github.com/better-commerce/bc-checkout-sdk      | NPM package for interaction with Checkout APIs          |

## Stripe

| Name            | Reference                                                       | Description                                             |
| :-------------- | :-------------------------------------------------------------- | :------------------------------------------------------ |
| Widget Integration  | https://stripe.com/docs/payments/accept-a-payment                          | Integrate with Stripe's various payment services. |
| API SDK         | https://stripe.com/docs/api |                                                         |
| bc-checkout-sdk | https://github.com/better-commerce/bc-stripe-sdk      | NPM package for interaction with Stripe APIs          |

## ClearPay

| Name            | Reference | Description                                    |
| :-------------- | :-------- | :--------------------------------------------- |
| API Collection  | https://developers.clearpay.co.uk/clearpay-online/reference/api-environments          |                                                |
| API SDK         | https://developers.clearpay.co.uk/clearpay-online/reference/get-payment-by-order-id          |                                                |
| bc-clearpay-sdk | TBP       | NPM package for interaction with ClearPay APIs |

## Klarna

| Name           | Reference      | Description                                |
| :------------- | :------------- | :----------------------------------------- |
| Widget Integration |  https://docs.klarna.com/klarna-payments/integrate-with-klarna-payments/       |                                                |
| API SDK        | https://docs.klarna.com/api |                                                |
| bc-klarna-sdk  | https://github.com/better-commerce/bc-klarna-sdk         | NPM package for interaction with Klarna APIs |

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
