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
    CreditRequestID: '98683',
    'Identification[RetailerUniqueRef]': '{\\"orderId\\":\\"10576-4290698\\",\\"id\\":\\"6050dbd2-6b82-f011-92dd-a2542373ea8d\\"}',
    Status: 'COMPLETE',
    'Finance[Code]': 'ONIB12-14.90-5697',
    'Finance[Deposit]': '250.00',
    'Goods[0][Description]': '1010075H(1)',
    'Goods[0][Price]': '749.00',
    'Consumer[Title]': 'Mr',
    'Consumer[Forename]': 'Abhishek',
    'Consumer[Surname]': 'Pundir',
    'Consumer[PhoneNumber]': '0123456789',
    'Consumer[MobileNumber]': '07123456789',
    'Consumer[EmailAddress]': 'abhishek.new@testpc.com',
    'Consumer[HouseNumber]': '2',
    'Consumer[HouseName]': '315 Chiswick High Road',
    'Consumer[Flat]': '',
    'Consumer[Street]': '',
    'Consumer[Town]': 'London',
    'Consumer[Postcode]': 'W4 4HH',
    api_key: '518KkIqSzw nXlalicf4S29/97Y',
    InstallationID: '4641',
    BrokerReference: '',
    LoanApplicationId: 'b49152db-14b7-4448-aff4-47d4bb7e0ac8',
    Info: 'N/A',
    cookies: {}
  }
}

new BetterCommerceOperation().processPaymentHook(paymentHookData).then(paymentResponseResult => {
    console.log(' --- paymentResponseResult ---', paymentResponseResult)
})