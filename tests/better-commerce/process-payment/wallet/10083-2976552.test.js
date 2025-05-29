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
    orderId: "15d71841-f53a-f011-881a-000d3a25433a",
    txnOrderId: "10083-2976552",
    extras: {
        token: "",
        orderId: "",
        payerId: "",
        gateway: "Wallet",
        isCancelled: false,
        paymentType: "partial",
        partialAmount: 11.99,
        cookies: {
            deviceId: "aac64740-b079-4f88-8c0f-bed927b8ab11",
            Currency: "GBP",
            CurrencySymbol: "£",
            Language: "en-GB",
            Country: "GB",
            ClientIP: "::1",
            selection: "{\"analytics\":true,\"advertisement\":true}",
            __stripe_mid: "ced7868c-ab6e-4cec-9a72-386a037d51362a9ccb",
            orderId: "fa692309-f43a-f011-881a-000d3a25433a",
            __stripe_sid: "1791940a-ec35-4a22-b478-d383cb67db851690e6",
            sessionId: "f4a8ba62-34ee-446d-830e-b72b2b56af70",
            ut: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoia3VtYXIubmV3QHBhcmsuY29tIiwiVXNlcklkIjoiNDI2NWE2MmQtMzMxOS1mMDExLTg3ZGEtMDAwZDNhMjU0MzNhIiwiVXNlck5hbWUiOiJrdW1hci5uZXdAcGFyay5jb20iLCJFbWFpbCI6Imt1bWFyLm5ld0BwYXJrLmNvbSIsIlNlY3VyaXR5U3RhbXAiOiIzNjE1YzRhYi1hOWZlLTRlMDQtYTdmOC1lOTM5ODUwYWM4ZDUiLCJUb2tlblR5cGUiOiJVc2VyVG9rZW4iLCJBdXRoVHlwZSI6IlBhc3N3b3JkIiwiTG9naW5UeXBlIjoiTG9naW4iLCJTZXNzaW9uSWQiOiJmNGE4YmE2Mi0zNGVlLTQ0NmQtODMwZS1iNzJiMmI1NmFmNzAiLCJuYmYiOjE3NDgzNTIzNzksImV4cCI6MTc0ODQzODc3OSwiaXNzIjoiYXV0aC5iZXR0ZXJjb21tZXJjZS5pbyIsImF1ZCI6ImFwcC5iZXR0ZXJjb21tZXJjZS5pbyJ9.k1P-hUx6nf7kwQim6Nmg6q2jSw561C9Qlwv14Tlr8Mg",
            basketId: "9593b19f-6b86-4769-b0c5-ad2208544857",
            suid: "4265a62d-3319-f011-87da-000d3a25433a",
            suhm: "false",
            CompanyId: "00000000-0000-0000-0000-000000000000",
            defaultSession: "66aa1484-0ff6-4dad-b6ef-687f345b9c8f",
            gedc: "{\"Ip\":\"14.97.210.226\",\"Country\":\"India\",\"CountryCode\":\"IN\",\"City\":\"Nāngloi Jāt\",\"CityCode\":\"DL\",\"DetailJson\":null,\"Message\":null,\"IsValid\":false}"
        }
    }
};

new BetterCommerceOperation().processPayment(params)
    .then(response => {
        console.log(response);
    });