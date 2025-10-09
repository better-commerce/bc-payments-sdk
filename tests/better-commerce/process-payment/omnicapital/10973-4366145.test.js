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
    "orderId": "7862dc97-4fa4-f011-b412-894931eace0a",
    "txnOrderId": "10973-4366145",
    "extras": {
        "token": "10973-4366145",
        "orderId": "57d28d94-9202-49be-9de3-56476bc76480",
        "payerId": "RF98908",
        "gateway": "omnicapital",
        "isCancelled": false,
        "paymentType": "full",
        "partialAmount": 0,
        "cookies": {
            "deviceId": "d3f0eacb-d3df-49c9-82cb-ce8a13e2e30b",
            "__stripe_mid": "053ead52-e7bd-4cad-91e5-f53788a5c0723d7fa5",
            "CurrencySymbol": "£",
            "Country": "GB",
            "__Secure-next-auth.callback-url": "http://localhost:3000",
            "selection": "{\"analytics\":true,\"advertisement\":true}",
            "ClientIP": "::1",
            "_gcl_au": "1.1.1165192387.1759841018",
            "PR_SourceMed": "",
            "_ga": "GA1.1.1612452221.1759841018",
            "tkClid": "undefined",
            "rtb-global": "f40f37b3-5d97-46c0-b070-5007d663febb",
            "dspcdn": "1c420a1b-ed23-48ee-9d98-359e8dbd2eff",
            "neo_sc": "NeotagEncrypt:U2FsdGVkX19u4KdLS6N5ALfXLg94ujEuJa5siR9noFk=",
            "nt_page_init_referrer": "NeotagEncrypt:U2FsdGVkX19YgYLusOE7zGJiEyMuw1tgT/01X6ML0jk=",
            "nt_page_init_referring_domain": "NeotagEncrypt:U2FsdGVkX1+fHbmPa1KgkDVqwsx3C4zR6gCuxA7H2WU=",
            "_scid": "Zmv2ACvvK-QHDcOHPIt0-1lwsoHm32PW",
            "afUserId": "29ce53a4-6453-4f1a-972d-c0a5d54401c5-p",
            "AF_SYNC": "1759841023516",
            "SP_DUID": "ad14be4f-6ec7-4a52-8fb3-131bc4bf6482",
            "_clck": "1kiek5y^2^fzy^1^2106",
            "kp_user_id": "01997670-b6ec-7143-86c6-ae928312a048",
            "_sctr": "1|1759775400000",
            "nt_user_id": "NeotagEncrypt:U2FsdGVkX187zR5Gx+crRRgpS4vA9AnaVgGxsYNC330=",
            "nt_trait": "NeotagEncrypt:U2FsdGVkX19cYYP0ZYzKRadaT9O5ozT0xq16rKda2Jc=",
            "nt_group_id": "NeotagEncrypt:U2FsdGVkX1+u5lDlRDounFy+R3xohmjl23jATfA6t74=",
            "nt_group_trait": "NeotagEncrypt:U2FsdGVkX19l+lLUkuiTPWwujQm7h38JQbxT3Ib3MdI=",
            "nt_anonymous_id": "NeotagEncrypt:U2FsdGVkX1+8CcSFz32t9GU0QqGDHL1k5UonwGLGk6oi5joijRSZnkVOFbgoXUWIegKHdpV/kng3K/eXUOncqA==",
            "cto_bundle": "0BytW19VaUhpcDU1SFB5azdRZkNRblZBTWRHRmlhTkhtUnhDcU8lMkZRQXpiUEJROVFZbFNmRzJXUzVMVTlQWEg4YjBnbld1b2RSQ2lDeE1WRG9mQTZxWnoxaDBvVVlVU0QlMkZsNDRhRUNzdlB3VnVUcUZoRE1OVURiQmVTOVRZU3J3cTkybGQwTEw5dDdCMTFDejZjQTFjemFQQjBRJTNEJTNE",
            "_scid_r": "YOv2ACvvK-QHDcOHPIt0-1lwsoHm32PW93OBOw",
            "isOffSTR": "false",
            "isUserAlreadyExist": "true",
            "neo_session": "NeotagEncrypt:U2FsdGVkX1+0/pL/UpB86Et5FossZ2OdQct72R6jAR65vbwQksO/gdqn6NvaJcr8P4COf9abnkDBKeYvOUvWsq0A3XsXlqkKRjPWJwNbsrBBDDs18BMeNmZgF4kTuuzxizSdIyNbLl5zZ3qfdbSkiQ==",
            "utm": "{\"utc\":\"2025-10-07T12:48:54.220Z\",\"utm_medium\":\"Direct\",\"utm_source\":\"Direct\",\"utm_campaign\":\"Direct\",\"redirect\":false}",
            "moe_uuid": "5b6b423d-f567-49f6-9de0-93ec53a725a8",
            "isKpReady": "false",
            "Currency": "GBP",
            "Language": "en-GB",
            "_sp_id.1fff": "ad14be4f-6ec7-4a52-8fb3-131bc4bf6482.1759841024.2.1759843234.1759841334.e8b6eb14-97cd-4571-a836-7b1a23b44338.ac816f19-ffb7-41d8-a925-64d02b44feb1...0",
            "_ga_BBLYJRQTTH": "GS2.1.s1759841018$o1$g1$t1759843235$j60$l0$h0",
            "_ga_7J76WGQ4S7": "GS2.1.s1759841023$o1$g1$t1759843235$j60$l0$h0",
            "defaultSession": "d01d7dc3-9248-46c2-8ca0-b5a081b333b1",
            "ut": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoic2FuamF5QGxvb2tiYWNrc2Vzc2lvbi5jb20iLCJVc2VySWQiOiI2NTY3YTlmZi0wMTQ1LWYwMTEtODFhMS1hN2U0MWE1ZjU1NTQiLCJVc2VyTmFtZSI6InNhbmpheUBsb29rYmFja3Nlc3Npb24uY29tIiwiRW1haWwiOiJzYW5qYXlAbG9va2JhY2tzZXNzaW9uLmNvbSIsIlNlY3VyaXR5U3RhbXAiOiJmZGRjYWZmNi0xYWZjLTQ1YTAtOWIwZS0zMWRiNDE4OTY0ZTAiLCJUb2tlblR5cGUiOiJVc2VyVG9rZW4iLCJBdXRoVHlwZSI6IlBhc3N3b3JkIiwiTG9naW5UeXBlIjoiTG9naW4iLCJTZXNzaW9uSWQiOiIxY2IzMGQ2Ny1mOTUzLTQyNjgtODlhNy1mMjc0Mzk3MTU0Y2EiLCJuYmYiOjE3NTk5MzEyMDYsImV4cCI6MTc2MDAxNzYwNiwiaXNzIjoiYXV0aC5iZXR0ZXJjb21tZXJjZS5pbyIsImF1ZCI6ImFwcC5iZXR0ZXJjb21tZXJjZS5pbyJ9.uayAP5DT80WGegkCSnYVC3LehqYvxXPjGGQn1p6z0TQ",
            "suuid": "6567a9ff-0145-f011-81a1-a7e41a5f5554",
            "suhm": "false",
            "CompanyId": "00000000-0000-0000-0000-000000000000",
            "__stripe_sid": "ddcb192c-3a80-43c7-9075-d2e3e83a067f2a823c",
            "sessionId": "cbcd9284-b81a-4e58-a1b1-59297eb64971",
            "basketId": "696daea5-4aa7-4f28-94cd-99ebf2defc4b",
            "orderId": "ceec8b76-4da4-f011-b412-894931eace0a"
        }
    }
};

new BetterCommerceOperation().processPayment(params)
    .then(response => {
        console.log(response);
    });