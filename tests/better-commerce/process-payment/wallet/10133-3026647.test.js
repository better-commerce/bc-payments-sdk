const { BCEnvironment, BetterCommerceOperation } = require("../../../../dist");

const config = {
    "id": 46,
    "systemName": "Wallet",
    "displayName": "Wallet",
    "slug": null,
    "isOnsite": false,
    "enabled": true,
    "isBillingAddressRequired": true,
    "displayOrder": 0,
    "iconCssClass": "Apps-wallet.png",
    "description": "For BetterTradeIn orders.",
    "enableImmediateCapture": false,
    "forSubscription": false,
    "inputType": 15,
    "notificationUrl": "/payment-notification/wallet",
    "settings": [
        { "key": "AccountCode", "value": null },
        { "key": "Signature", "value": null },
        { "key": "MotoUserName", "value": null },
        { "key": "MotoPassword", "value": null },
        { "key": "MotoSignature", "value": null },
        { "key": "MotoAccountCode", "value": null },
        { "key": "TestUrl", "value": null },
        { "key": "ProductionUrl", "value": "https://walletapi.dev-omnicx.com/api/wallet/credit" },
        { "key": "CancelUrl", "value": "/payment-notification/wallet/canceled" },
        { "key": "Version", "value": null },
        { "key": "UseSandbox", "value": "False" },
        { "key": "EnablePayInInstallment", "value": "False" },
        { "key": "InstallmentDisplayText", "value": null },
        { "key": "AdditionalServiceCharge", "value": "0.0" },
        { "key": "EnableSplitPayment", "value": "False" },
        { "key": "PrepaidValueType", "value": "Price" },
        { "key": "MinimumPrepaidValue", "value": "0.0" },
        { "key": "EnableImmediateCapture", "value": "False" },
        { "key": "WalletBalance", "value": "857.14" },
        { "key": "WalletCurrency", "value": "GBP" }
    ],
    "basicSettings": [
        { "key": "Version", "value": null },
        { "key": "OrderTypes", "value": "[\"Standard\",\"Replacement\"]" }
    ],
    "message": null
};
BCEnvironment.init("f6f142a0-caec-4379-9f49-031dcb133360", "lUpL2QJ9yO/PvoUhOUWDkannmXorikEyCrMmS0AlWbg=", config, "https://auth.dev-omnicx.com", "https://api20.dev-omnicx.com"); //DEV
const params = {
    isCOD: false,
    orderId: "e192ec4a-303d-f011-8821-000d3a25433a",
    txnOrderId: "10133-3026647",
    extras: {
        token: "",
        orderId: "",
        payerId: "",
        gateway: "Wallet",
        isCancelled: false,
        paymentType: "full",
        partialAmount: 0,
        cookies: {
            deviceId: "eb14b2f9-4079-4c37-8920-f539b7dbf1c6",
            Currency: "GBP",
            CurrencySymbol: "£",
            Language: "en-GB",
            Country: "GB",
            ClientIP: "::1",
            selection: "{\"analytics\":true,\"advertisement\":true}",
            __stripe_mid: "fb3d78a7-ec35-4700-9959-fc82140a4f4158c586",
            __stripe_sid: "84f91fb1-4f85-4c9e-9f89-6105311e9122ec4938",
            ut: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiZ2FnYW5AdGVzdHBjLmNvbSIsIlVzZXJJZCI6IjYzM2MxNGNkLTI4M2QtZjAxMS04ODIxLTAwMGQzYTI1NDMzYSIsIlVzZXJOYW1lIjoiZ2FnYW5AdGVzdHBjLmNvbSIsIkVtYWlsIjoiZ2FnYW5AdGVzdHBjLmNvbSIsIlNlY3VyaXR5U3RhbXAiOiI1NDhkZGFjMy03Y2UzLTQ1ZmYtOTIxNS1kMWZlNGMzYzc0OGIiLCJUb2tlblR5cGUiOiJVc2VyVG9rZW4iLCJBdXRoVHlwZSI6IlBhc3N3b3JkIiwiTG9naW5UeXBlIjoiTG9naW4iLCJTZXNzaW9uSWQiOiI0MzE5YzJiNi1mMDE4LTQ1YzEtYWNhNy1lZWZjM2M5ZjcxNDQiLCJuYmYiOjE3NDg1OTA5NzEsImV4cCI6MTc0ODY3NzM3MSwiaXNzIjoiYXV0aC5iZXR0ZXJjb21tZXJjZS5pbyIsImF1ZCI6ImFwcC5iZXR0ZXJjb21tZXJjZS5pbyJ9.HwtFpCV9pFtMbz-L2aAyUuz7mi21VNe7hMdW3TX2GEw",
            suid: "633c14cd-283d-f011-8821-000d3a25433a",
            suhm: "false",
            CompanyId: "00000000-0000-0000-0000-000000000000",
            defaultSession: "16acf519-5ad7-4fab-a9b7-d9882da89c35",
            sessionId: "be02985e-053b-43a8-ae3d-c324060650d5",
            basketId: "03cfcbc9-e220-4051-b699-d46113d9e417",
            orderId: "e192ec4a-303d-f011-8821-000d3a25433a",
            gedc: "{\"Ip\":\"14.97.210.226\",\"Country\":\"India\",\"CountryCode\":\"IN\",\"City\":\"Nāngloi Jāt\",\"CityCode\":\"DL\",\"DetailJson\":null,\"Message\":null,\"IsValid\":false}"
        }
    }
};

new BetterCommerceOperation().processPayment(params)
    .then(response => {
        console.log(response);
    });