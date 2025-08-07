const { PaymentMethodType, PaymentMethodTypeId } = require('../../../../dist/constants')
const { BCEnvironment, BetterCommerceOperation, getGatewayId, } = require("../../../../dist");

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
BCEnvironment.addExtras({
    country: "GB",
    currency: "GBP",
    language: "en",
})

const paymentHookData = {
  paymentMethodTypeId: 15,
  paymentMethodType: 'OmniCapital',
  data: {
    CreditRequestID: '98591',
    'Identification[RetailerUniqueRef]': '{"orderId":"10527-4262749","id":"5bd31bd6-7273-f011-92dd-fdd6de2c23e7"}',
    Status: 'AWAITING FULFILMENT',
    'Finance[Code]': 'ONIB12-14.90-5697',
    'Finance[Deposit]': '250.00',
    'Goods[0][Description]': 'UP-1242595-2449423(1)',
    'Goods[0][Price]': '1839.00',
    'Consumer[Title]': 'Mr',
    'Consumer[Forename]': 'Test',
    'Consumer[Surname]': 'Test',
    'Consumer[PhoneNumber]': '01777777777',
    'Consumer[MobileNumber]': '07777777777',
    'Consumer[EmailAddress]': 'sanjay@bettercommerce.io',
    'Consumer[HouseNumber]': '',
    'Consumer[HouseName]': 'Address 1',
    'Consumer[Flat]': '',
    'Consumer[Street]': '',
    'Consumer[Town]': 'London',
    'Consumer[Postcode]': 'W44HH',
    api_key: '518KkIqSzw nXlalicf4S29/97Y',
    InstallationID: '4641',
    BrokerReference: '',
    LoanApplicationId: '95efeaf1-dea8-4ecf-80c9-1541bccbaf62',
    Info: 'N/A',
    cookies: {
      deviceId: 'a214f21a-04f3-486f-a95f-66127c1ffbbd',
      Currency: 'GBP',
      CurrencySymbol: '£',
      Language: 'en-GB',
      Country: 'GB',
      ClientIP: '::1',
      'next-auth.csrf-token': 'bdf8846590ffed4f5af5c7afa2a1bb9398e11d8a2f4a1d31903b376ba09b6068|424675e8d796f26969dc5325d806695511b978caa254923adf8d92b9019679a4',
      '__Secure-next-auth.callback-url': 'http://localhost:3000',
      selection: '{"analytics":true,"advertisement":true}',
      __stripe_mid: '65770f8e-13fb-4d4c-baa0-9092e58bca41bb7a6d',
      orderId: '261d11fc-b96e-f011-9fa6-85e380d133ac',
      userId: '9871766375',
      __next_hmr_refresh_hash__: '77',
      ut: 'd17e3c281cbf77f44bf8bb34e1cde718542e651eaa0c80957568784cb4625ad9ded4b64271e5955e35bbabf7ab5528302752770f72027d8e816a47cc5ccece41abe4e8cb74bba95a9c2e63246c513ae82fc04af9fb997394f8f03318ca169e72e0dacdba623801378b5e6849ef0dc7ca0d76ddba7af50331392c4170663949b44f1903bb1856291ec96b1a6fc830de2e933754ccfa222b95deaedaa22f73c0b6f6eca09696e9d21d691e2024748f2c18443748c378b08f08022c726fdc5e0e50621474ef45811af11c284c9fbd0917a92e19494bf021bb8d415a5b3fbdf0d491a5dcf69f6782249fe7128ace27c51c8b1dd190c0fdce588db4b7f344c9108e7fec411908e38a6b1c6247905909787207f2031ca1e2fb72b17b90824413ad282f790ca332efebe979ae5fa1bab81c036917bb0201cc973353cc2aae88b198eca63fa2565c8c1bc8deb184a5b34ef5839769a490e1e8a49b6c963b9c63d060ab07a34e19d28ae2e21e9f183e0986484ad72450f7012b184ca02c245a512268ba890ccceffd96aad74c7665121aa7835ed738ba71ce1f228d50bda6b75da3fd7b8afdb4e8c0f63ff4111c7c71a87e83d879e5c5564545ecd98eb7ca1cef121190560839e07455277476ab957669b6960b31fa7ab7d027c8c14ee9a3fddef12e7ca15141381bcf6fcdf8e774296af4d062c0b583b7facd433da62bd8fb084fbd2b6c24d3f6e9f0cd1bb65dd42e6bf35341b8ea683018e1dfaf0e8a1d90d9dd2f00bf64e9ff1c0b148d0431f7b6315344227e2b363bece68b89ca9d0f2a34c59f9be35780a7107d114ef756a4d674634a5de2fa4da89174833674fc1b4d42788d0b8c21673be352218af0f849d350c54eb049a9be0c4b63c11f209b34fea38e5d331f0525ba8e685dc19c9e8aad3f8871932cc14453bd5ea33a7bd83648f10d6de34f4e03c9e305924c7e40967ed43aa45055dd4b0c02b44e620566b143d48d2420463bb32dfa5cce4709a9cdb4c4f9bcf796',
      suuid: '06bd4da1-b83a-f011-81a1-ed62fb29f776',
      suhm: 'false',
      CompanyId: '00000000-0000-0000-0000-000000000000',
      basketId: '2af3d0ff-6f85-4e90-ac21-33f7e11da60a'
    }
  }
}

new BetterCommerceOperation().processPaymentHook(paymentHookData).then(paymentResponseResult => {
    console.log(' --- paymentResponseResult ---', paymentResponseResult)
})