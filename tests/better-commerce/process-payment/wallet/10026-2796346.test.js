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
      {"key": "AccountCode", "value": null},
      {"key": "Signature", "value": null},
      {"key": "MotoUserName", "value": null},
      {"key": "MotoPassword", "value": null},
      {"key": "MotoSignature", "value": null},
      {"key": "MotoAccountCode", "value": null},
      {"key": "TestUrl", "value": null},
      {"key": "ProductionUrl", "value": "https://walletapi.dev-omnicx.com/api/wallet/credit"},
      {"key": "CancelUrl", "value": "/payment-notification/wallet/canceled"},
      {"key": "Version", "value": null},
      {"key": "UseSandbox", "value": "False"},
      {"key": "EnablePayInInstallment", "value": "False"},
      {"key": "InstallmentDisplayText", "value": null},
      {"key": "AdditionalServiceCharge", "value": "0.0"},
      {"key": "EnableSplitPayment", "value": "False"},
      {"key": "PrepaidValueType", "value": "Price"},
      {"key": "MinimumPrepaidValue", "value": "0.0"},
      {"key": "EnableImmediateCapture", "value": "False"},
      {"key": "WalletBalance", "value": "857.14"},
      {"key": "WalletCurrency", "value": "GBP"}
    ],
    "basicSettings": [
      {"key": "Version", "value": null},
      {"key": "OrderTypes", "value": "[\"Standard\",\"Replacement\"]"}
    ],
    "message": null
  };
BCEnvironment.init("f6f142a0-caec-4379-9f49-031dcb133360", "lUpL2QJ9yO/PvoUhOUWDkannmXorikEyCrMmS0AlWbg=", config, "https://auth.dev-omnicx.com", "https://api20.dev-omnicx.com"); //DEV
const params = {
    isCOD: false,
    orderId: '232dca1d-4114-f011-87d2-000d3a25433a',
    txnOrderId: '10026-2796346',
    extras: {
      token: '',
      orderId: '',
      payerId: '',
      gateway: 'Wallet',
      isCancelled: false,
      cookies: {
        deviceId: '871b7cd5-0de9-4bf3-b2c8-faadd859a382',
        _gcl_au: '1.1.1125336222.1740429505',
        _ga: 'GA1.1.941134693.1740429505',
        _fbp: 'fb.0.1740429507590.465612585707337641',
        __hstc: '181257784.7f61dd3b3a0408170f40cf26a98c0a46.1740429509030.1740429509030.1740429509030.1',
        hubspotutk: '7f61dd3b3a0408170f40cf26a98c0a46',
        messagesUtk: 'e8ae9e0e4088442f9bbfa4390b198a29',
        cookie_consent_user_consent_token: 'Y3lBWKZMkVBQ',
        cookie_consent_user_accepted: 'true',
        cookie_consent_level: '{"strictly-necessary":true,"functionality":true,"tracking":true,"targeting":true}',
        _ga_2KRXK6GYV0: 'GS1.1.1740429505.1.0.1740429578.60.0.406296791',
        ch_cookie: '{"hostname":"localhost","user_id":"2ecccb37-3e45-4485-862d-90835ffa87bb","session_id":"eac80ab0-e75f-488c-aceb-50094a33064a","created_at":"2025-03-20T13:21:03.079Z","updated_at":"2025-03-20T13:21:33.324Z"}',
        Currency: 'GBP',
        CurrencySymbol: '£',
        Language: 'en-GB',
        Country: 'GB',
        'next-auth.csrf-token': 'a75cc0ca733dfd9e6b531ad323e688e7dfeeaf249b83a6db3fedc92579979620|a9bdc493f194e5ed214302711d5a33cc7c3464808b5c74dc74eddbf212b7ea94',
        selection: '{"analytics":true,"advertisement":true}',
        ClientIP: '::1',
        __stripe_mid: '63f88e4b-f092-42cb-b4b8-682cef372708db9666',
        ut: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiYW1pdDFAcGFyay5jb20iLCJVc2VySWQiOiJjODQyZDA2ZS0xZjA2LWYwMTEtODdiOC0wMDBkM2EyNTQzM2EiLCJVc2VyTmFtZSI6ImFtaXQxQHBhcmsuY29tIiwiRW1haWwiOiJhbWl0MUBwYXJrLmNvbSIsIlNlY3VyaXR5U3RhbXAiOiIzZWNlNDQzYi04ODlhLTQ0YzYtYWU3NC0xOTY5NGJhOTExZmUiLCJUb2tlblR5cGUiOiJVc2VyVG9rZW4iLCJBdXRoVHlwZSI6IlBhc3N3b3JkIiwiTG9naW5UeXBlIjoiTG9naW4iLCJTZXNzaW9uSWQiOiJhNjA4MGMzMy02NmI5LTRlMGQtYmM0Ni1kOWNlZTBmZjg0NmQiLCJuYmYiOjE3NDQwMzQ0ODUsImV4cCI6MTc0NDEyMDg4NSwiaXNzIjoiYXV0aC5iZXR0ZXJjb21tZXJjZS5pbyIsImF1ZCI6ImFwcC5iZXR0ZXJjb21tZXJjZS5pbyJ9.d3r4Yppf9RYYe1kOfR0mnKYKqOkzZA86561a16ZcMMg',
        CompanyId: '00000000-0000-0000-0000-000000000000',
        basketId: '1f9c8f71-3e4d-420e-be09-5cda597307ba',
        __stripe_sid: '58e00641-55ed-4f46-97c3-1e429563e1271f4a88',
        defaultSession: '760bc9d1-32d4-4755-aaed-75651b3d9611',
        sessionId: 'ec02a083-6745-4960-8c59-7b9f4eb574dd',
        gedc: '{"Ip":"14.97.210.226","Country":"India","CountryCode":"IN","City":"Nāngloi Jāt","CityCode":"DL","DetailJson":null,"Message":null,"IsValid":false}'
      }
    }
};

new BetterCommerceOperation().processPayment(params)
    .then(response => {
        console.log(response);
    });