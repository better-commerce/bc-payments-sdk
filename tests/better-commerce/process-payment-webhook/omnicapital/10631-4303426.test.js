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
        "CreditRequestID": "98731",
        "Identification[RetailerUniqueRef]": "{\"orderId\":\"10631-4303426\",\"id\":\"39464fef-298a-f011-92dd-a2542373ea8d\"}",
        "Status": "AWAITING FULFILMENT",
        "Finance[Code]": "ONIB12-14.90-5697",
        "Finance[Deposit]": "250.00",
        "Goods[0][Description]": "7016512K(1), 7016512T(1), 7240794T(1)",
        "Goods[0][Price]": "1813.99",
        "Consumer[Title]": "Mr",
        "Consumer[Forename]": "AMit",
        "Consumer[Surname]": "Kumar",
        "Consumer[PhoneNumber]": "01777777777",
        "Consumer[MobileNumber]": "",
        "Consumer[EmailAddress]": "sanjay1@bettercommerce.io",
        "Consumer[HouseNumber]": "123123213",
        "Consumer[HouseName]": "Address 1",
        "Consumer[Flat]": "",
        "Consumer[Street]": "",
        "Consumer[Town]": "city",
        "Consumer[Postcode]": "201422",
        "api_key": "518KkIqSzw+nXlalicf4S29/97Y",
        "InstallationID": "4641",
        "BrokerReference": "",
        "LoanApplicationId": "01cbc501-f9df-4fee-8231-172f51598b05",
        "Info": "N/A",
        cookies: {},
    }
}

new BetterCommerceOperation().processPaymentHook(paymentHookData).then(paymentResponseResult => {
    console.log(' --- paymentResponseResult ---', paymentResponseResult)
})