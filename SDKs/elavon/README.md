# BetterCommerce Elavon NodeJS SDK

BetterCommerce's Elavon NodeJS SDK enables BC client applications to integrate with Elavon merchant API system. It publishes an interface to interact with [Elavon API](https://developer.elavon.com/products/checkout-js/v1/api-reference/) endpoints.

Use below command for package installation:

```
npm install @better-commerce/bc-elavon-sdk
```

## Architecture Diagram

![Architecture Diagram](/assets/app-architecture.png)

## SDK Initialization

**Use following snippet to initialize the SDK:**

### Server-to-server Authentication

Uses the access secret or OAuth for server-to-server communication.

```
ElavonEnvironment.initServer("<merchantId>", "<merchantUserId>", "<merchantPIN>", "<vendorId>", [useSandbox: boolean]);
```
