const { BCEnvironment, BetterCommerceOperation } = require("../../../../dist");

const config = {
    "id": 1,
    "systemName": "Nuvei",
    "displayName": "Nuvei",
    "slug": null,
    "isOnsite": false,
    "enabled": true,
    "isBillingAddressRequired": false,
    "displayOrder": 0,
    "iconCssClass": "Apps-nuvei.jpg",
    "description": "A global payments platform with hosted checkout (“Payment Page/Cashier”), Web SDK, and server-to-server REST 2.0 APIs for pay-ins and payouts.",
    "enableImmediateCapture": true,
    "forSubscription": false,
    "inputType": 15,
    "notificationUrl": null,
    "settings": [
        {
            "key": "AccountCode",
            "value": "7791190954169088226"
        },
        {
            "key": "Signature",
            "value": "1195117"
        },
        {
            "key": "MotoUserName",
            "value": ""
        },
        {
            "key": "MotoPassword",
            "value": null
        },
        {
            "key": "MotoSignature",
            "value": "5ziJ8r5W3cv7pZOf10AJ3v5AEJRZc2T11cz1L3sfyjEeJKNQNdaoGAX8JyxQ2EWT"
        },
        {
            "key": "MotoAccountCode",
            "value": null
        },
        {
            "key": "TestUrl",
            "value": null
        },
        {
            "key": "ProductionUrl",
            "value": null
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
            "value": "True"
        }
    ],
    "basicSettings": [
        {
            "key": "Version",
            "value": null
        },
        {
            "key": "OrderTypes",
            "value": "[\"Standard\"]"
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
    "orderId": "ea129c9e-6295-f011-98e4-8ed106c21c1f",
    "txnOrderId": "10797-4321217",
    "extras": {
        "token": "7110000000017214495",
        "orderId": "10797-4321217",
        "payerId": "",
        "gateway": "nuvei",
        "isCancelled": false,
        "paymentType": "full",
        "partialAmount": 0,
        "cookies": {
            "deviceId": "d3f0eacb-d3df-49c9-82cb-ce8a13e2e30b",
            "Currency": "GBP",
            "CurrencySymbol": "£",
            "Language": "en-GB",
            "Country": "GB",
            "selection": "{\"analytics\":true,\"advertisement\":true}",
            "__Secure-next-auth.callback-url": "http://localhost:3000",
            "ClientIP": "::1",
            "__stripe_mid": "053ead52-e7bd-4cad-91e5-f53788a5c0723d7fa5",
            "ut": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoic2FuamF5QGxvb2tiYWNrc2Vzc2lvbi5jb20iLCJVc2VySWQiOiI2NTY3YTlmZi0wMTQ1LWYwMTEtODFhMS1hN2U0MWE1ZjU1NTQiLCJVc2VyTmFtZSI6InNhbmpheUBsb29rYmFja3Nlc3Npb24uY29tIiwiRW1haWwiOiJzYW5qYXlAbG9va2JhY2tzZXNzaW9uLmNvbSIsIlNlY3VyaXR5U3RhbXAiOiJmZGRjYWZmNi0xYWZjLTQ1YTAtOWIwZS0zMWRiNDE4OTY0ZTAiLCJUb2tlblR5cGUiOiJVc2VyVG9rZW4iLCJBdXRoVHlwZSI6IlBhc3N3b3JkIiwiTG9naW5UeXBlIjoiTG9naW4iLCJTZXNzaW9uSWQiOiI5ZTRkOTUyYy1hZjBjLTQ5ZDQtYjQ0OC01YTlhMGE3MGU5NjgiLCJuYmYiOjE3NTgyODE3MjQsImV4cCI6MTc1ODM2ODEyNCwiaXNzIjoiYXV0aC5iZXR0ZXJjb21tZXJjZS5pbyIsImF1ZCI6ImFwcC5iZXR0ZXJjb21tZXJjZS5pbyJ9.U1FnY20gzV9p_OVg5ihGsxmJbxeCM8Ek59j9jKDGAM4",
            "basketId": "df9f389e-e986-4e23-a2a0-0aea6d9e4c81",
            "suuid": "6567a9ff-0145-f011-81a1-a7e41a5f5554",
            "suhm": "false",
            "CompanyId": "00000000-0000-0000-0000-000000000000",
            "__stripe_sid": "f9b06520-fd09-403c-a460-ec190b4ca3e8aad69d",
            "defaultSession": "9d590ba3-cfa4-4fb1-8f90-60ba28fca06c",
            "sessionId": "89cb6771-520a-4024-9d31-ccf16373001d",
            "gedc": "{\"Ip\":\"122.161.50.146\",\"Country\":\"India\",\"CountryCode\":\"IN\",\"City\":\"Noida\",\"CityCode\":\"UP\",\"DetailJson\":null,\"Message\":null,\"IsValid\":false}"
        }
    }
};

new BetterCommerceOperation().processPayment(params)
    .then(response => {
        console.log(response);
    });