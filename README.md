# BetterCommerce Payments NodeJS SDK

BetterCommerce's Payments NodeJS SDK is a complete solution for storefront clients that integrate payments. bc-payments-sdk is a single point interface for storefront clients for interacting with payment gateways. 

# Supported Payment Providers

It integrates SDK APIs for the following providers:

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
| bc-checkout-sdk | TBP                                                             | NPM package for interaction with Checkout APIs          |

## ClearPay

| Name            | Reference | Description                                    |
| :-------------- | :-------- | :--------------------------------------------- |
| API Collection  |           |                                                |
| API SDK         |           |                                                |
| bc-clearpay-sdk | TBP       | NPM package for interaction with Checkout APIs |

## Klarna

| Name           | Reference                                                                           | Description                                    |
| :------------- | :---------------------------------------------------------------------------------- | :--------------------------------------------- |
| API Collection | https://developers.clearpay.co.uk/clearpay-online/reference/api-environments        |                                                |
| API SDK        | https://developers.clearpay.co.uk/clearpay-online/reference/get-payment-by-order-id |                                                |
| bc-klarna-sdk  | TBP                                                                                 | NPM package for interaction with Checkout APIs |

Use below command for package installation:

```
npm install @better-commerce/bc-payments-sdk
```

## Architecture Diagram

![Architecture Diagram](/assets/app-architecture.png)

## SDK Initialization

**Use following snippet to initialize the SDK:**

```
const config = {
    systemName: "Paypal"
    [{
        "key": "AccountCode",
        "value": "<AccountCode>"
    },
    {
        "key": "Signature",
        "value": "<Signature>"
    },
    {
        "key": "UseSandbox",
        "value": "True"
    }]
};
BCEnvironment.init(config);
BCEnvironment.withCredentials("<bc_client_id>", "<bc_shared_secret>", [useSandbox: boolean]);
```

## Usage Example

### Get PayPal Order Details

```
const result = await new PaymentOperation()("<order_id>");
```
