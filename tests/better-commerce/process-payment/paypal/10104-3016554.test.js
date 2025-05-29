const { BCEnvironment, BetterCommerceOperation } = require("../../../../dist");

const config = {
    "id": 2,
    "systemName": "Paypal",
    "displayName": "Pay by Paypal",
    "slug": null,
    "isOnsite": false,
    "enabled": true,
    "isBillingAddressRequired": false,
    "displayOrder": 0,
    "iconCssClass": "Apps-paypal.png",
    "description": "Configure Paypal standard and help customers reach paypals secured site to complete paymen",
    "enableImmediateCapture": true,
    "forSubscription": false,
    "inputType": 15,
    "notificationUrl": "/payment-notification/paypal",
    "settings": [
        {
            "key": "AccountCode",
            "value": "AT3ftGisLykS3-fzXAPXuT6QKBbOS8HLPuv9Xo6GVEGMGnNSrjORUcAhou1sfrF-_189ISIRyO7pWQok"
        },
        {
            "key": "Signature",
            "value": "EE7JVUNBFA0rS5iqyNxHlIzJ07wpunxF7uYGr4WjChaWC2mWkyi3kjdLxLBVz43OB-sjWQdgdmVK--CD"
        },
        {
            "key": "MotoUserName",
            "value": null
        },
        {
            "key": "MotoPassword",
            "value": null
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
            "value": "https://www.sandbox.paypal.com/cgi-bin/webscr?cmd=_express-checkout&token="
        },
        {
            "key": "ProductionUrl",
            "value": "https://www.paypal.com/cgi-bin/webscr?cmd=_express-checkout&token="
        },
        {
            "key": "CancelUrl",
            "value": "/payment-notification/paypal/canceled"
        },
        {
            "key": "Version",
            "value": "82.0"
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
            "value": "82.0"
        },
        {
            "key": "OrderTypes",
            "value": "[\"Standard\"]"
        }
    ],
    "message": null
};

BCEnvironment.init("f6f142a0-caec-4379-9f49-031dcb133360", "lUpL2QJ9yO/PvoUhOUWDkannmXorikEyCrMmS0AlWbg=", config, "https://auth.dev-omnicx.com", "https://api20.dev-omnicx.com"); //DEV
const params = {
    isCOD: false,
    orderId: "4a075dd7-4b3c-f011-881f-000d3a25433a",
    txnOrderId: "10104-3016554",
    extras: {
        token: "8HR98851XN501205N",
        orderId: "3J535499N6186481Y",
        payerId: "QEMBQNW9LT4YJ",
        gateway: "paypal",
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
            ut: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoia3VtYXIubmV3QHBhcmsuY29tIiwiVXNlcklkIjoiNDI2NWE2MmQtMzMxOS1mMDExLTg3ZGEtMDAwZDNhMjU0MzNhIiwiVXNlck5hbWUiOiJrdW1hci5uZXdAcGFyay5jb20iLCJFbWFpbCI6Imt1bWFyLm5ld0BwYXJrLmNvbSIsIlNlY3VyaXR5U3RhbXAiOiIzNjE1YzRhYi1hOWZlLTRlMDQtYTdmOC1lOTM5ODUwYWM4ZDUiLCJUb2tlblR5cGUiOiJVc2VyVG9rZW4iLCJBdXRoVHlwZSI6IlBhc3N3b3JkIiwiTG9naW5UeXBlIjoiTG9naW4iLCJTZXNzaW9uSWQiOiI2ODFjNWJmZS0wYjVmLTQ0YjctOGE5MS1iNDNmNjgyY2EzOWQiLCJuYmYiOjE3NDg0NTUyMDcsImV4cCI6MTc0ODU0MTYwNywiaXNzIjoiYXV0aC5iZXR0ZXJjb21tZXJjZS5pbyIsImF1ZCI6ImFwcC5iZXR0ZXJjb21tZXJjZS5pbyJ9.QCESQT1qLABzKbC9InoaFYDRR9uNUnLRTS2ZW_BXaAk",
            suid: "4265a62d-3319-f011-87da-000d3a25433a",
            suhm: "false",
            CompanyId: "00000000-0000-0000-0000-000000000000",
            __stripe_mid: "fb3d78a7-ec35-4700-9959-fc82140a4f4158c586",
            sessionId: "f902a022-ab43-446d-8e08-eda24cb5c586",
            basketId: "fad6fea0-0b1b-4060-a77e-aa80c2283266",
            gedc: "{\"Ip\":\"14.97.210.226\",\"Country\":\"India\",\"CountryCode\":\"IN\",\"City\":\"Nāngloi Jāt\",\"CityCode\":\"DL\",\"DetailJson\":null,\"Message\":null,\"IsValid\":false}",
            __stripe_sid: "08ab895b-a106-4c6b-909f-30e55e8b7b85d70f3b",
            defaultSession: "c5e161cc-a07b-4343-af07-0b678bd8c99a"
        }
    }
};

new BetterCommerceOperation().processPayment(params)
    .then(response => {
        console.log(response);
    });