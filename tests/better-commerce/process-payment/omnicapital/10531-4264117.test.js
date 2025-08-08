const { BCEnvironment, BetterCommerceOperation } = require("../../../../dist");

const config = {
    "id": 1,
    "systemName": "OmniCapital",
    "displayName": "OmniCapital",
    "slug": null,
    "isOnsite": false,
    "enabled": true,
    "isBillingAddressRequired": false,
    "displayOrder": 0,
    "iconCssClass": "Apps-omniCapital.png",
    "description": "Use the OmniCapital payment gateway",
    "enableImmediateCapture": false,
    "forSubscription": false,
    "inputType": 15,
    "notificationUrl": "",
    "settings": [
        {
            "key": "AccountCode",
            "value": "4641"
        },
        {
            "key": "Signature",
            "value": "518KkIqSzw+nXlalicf4S29/97Y"
        },
        {
            "key": "MotoUserName",
            "value": "Sanjay_pc"
        },
        {
            "key": "MotoPassword",
            "value": "OmniCapital*2025@"
        },
        {
            "key": "MotoSignature",
            "value": null
        },
        {
            "key": "MotoAccountCode",
            "value": null
        },
        {
            "key": "TestUrl",
            "value": "https://omniporttest.ocrf.co.uk/OnlineFormIntegration/Index"
        },
        {
            "key": "ProductionUrl",
            "value": "https://omniporttest.ocrf.co.uk/OnlineFormIntegration/Index"
        },
        {
            "key": "CancelUrl",
            "value": null
        },
        {
            "key": "Version",
            "value": null
        },
        {
            "key": "UseSandbox",
            "value": "True"
        },
        {
            "key": "EnablePayInInstallment",
            "value": "False"
        },
        {
            "key": "InstallmentDisplayText",
            "value": null
        },
        {
            "key": "AdditionalServiceCharge",
            "value": "0.0"
        },
        {
            "key": "EnableSplitPayment",
            "value": "False"
        },
        {
            "key": "PrepaidValueType",
            "value": "Price"
        },
        {
            "key": "MinimumPrepaidValue",
            "value": "0.0"
        },
        {
            "key": "EnableImmediateCapture",
            "value": "False"
        }
    ],
    "basicSettings": [
        {
            "key": "Version",
            "value": null
        },
        {
            "key": "OrderTypes",
            "value": "[\"Standard\",\"\"]"
        }
    ],
    "message": null
};

const clientId = "f148f128-1c3d-47a0-a9e2-45506c080971"
const sharedSecret = "f7M2iEM0BBokUtsUDuQ6Hz7nASHnsowojOadmDj1QFY=";
const authUrl = "https://auth.bettercommerce.io"
const baseUrl = "https://api20.bettercommerce.io"
BCEnvironment.init(clientId, sharedSecret, config, authUrl, baseUrl);

const params = {
    "isCOD": false,
    "txnOrderId": "10531-4264117",
    "orderId": "4da8340e-3e74-f011-92dd-fdd6de2c23e7",
    "extras": {
        "token": "10531-4264117",
        "orderId": "c31624b6-154d-4235-a2bc-05905185550d",
        "payerId": "RF98605",
        "gateway": "omnicapital",
        "isCancelled": false,
        "paymentType": "full",
        "partialAmount": 0,
        "cookies": {
            "selection": "{\"analytics\":true,\"advertisement\":true}",
            "deviceId": "9644af5b-fa1b-4144-9eec-1ccd240ecab1",
            "__Secure-next-auth.callback-url": "http://localhost:3000",
            "ClientIP": "::1",
            "ut": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiZGFyb3MyQGRhcm9zLmNvbSIsIlVzZXJJZCI6IjUwMmI4YzVhLTIxNjktZjAxMS04ODdkLTAwMGQzYTI1NDMzYSIsIlVzZXJOYW1lIjoiZGFyb3MyQGRhcm9zLmNvbSIsIkVtYWlsIjoiZGFyb3MyQGRhcm9zLmNvbSIsIlNlY3VyaXR5U3RhbXAiOiJkYmZhZTg0ZS1hMDU5LTQ2NDEtODIyMi1hMjcyZTQ2ZjJjYjQiLCJUb2tlblR5cGUiOiJVc2VyVG9rZW4iLCJBdXRoVHlwZSI6IlBhc3N3b3JkIiwiTG9naW5UeXBlIjoiTG9naW4iLCJTZXNzaW9uSWQiOiJiYmUxM2IwMC1lYWU1LTRkMTItOGFmYy03ODM2ZGUyYmEzYjkiLCJuYmYiOjE3NTQ2NTA5MzQsImV4cCI6MTc1NDczNzMzNCwiaXNzIjoiYXV0aC5iZXR0ZXJjb21tZXJjZS5pbyIsImF1ZCI6ImFwcC5iZXR0ZXJjb21tZXJjZS5pbyJ9.s1DyYGNMOO5_XElLMvda6oxCBrvVLC4gF31Ur5YQppE",
            "basketId": "3b8a8ffc-d172-4cfd-8dea-75f272bd9f73",
            "suuid": "502b8c5a-2169-f011-887d-000d3a25433a",
            "suhm": "false",
            "CompanyId": "b2cacaf4-2069-f011-887d-000d3a25433a",
            "Currency": "GBP",
            "CurrencySymbol": "£",
            "Language": "en-GB",
            "Country": "GB",
            "CurCurrency": "GBP",
            "defaultSession": "06674418-d32b-4191-9057-7f7a5e67b3c1",
            "sessionId": "bdb19ae7-7bcc-4755-9547-1751cd657da9",
            "gedc": "{\"Ip\":\"14.97.210.226\",\"Country\":\"India\",\"CountryCode\":\"IN\",\"City\":\"Nāngloi Jāt\",\"CityCode\":\"DL\",\"DetailJson\":null,\"Message\":null,\"IsValid\":false}"
        }
    }
};

new BetterCommerceOperation().processPayment(params)
    .then(response => {
        console.log(response);
    });