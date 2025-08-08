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
        "CreditRequestID": "98591",
        "Identification[RetailerUniqueRef]": "{\"orderId\":\"10527-4262749\",\"id\":\"5bd31bd6-7273-f011-92dd-fdd6de2c23e7\"}",
        "Status": "COMPLETE",
        "Finance[Code]": "ONIB12-14.90-5697",
        "Finance[Deposit]": "250.00",
        "Goods[0][Description]": "UP-1242595-2449423(1)",
        "Goods[0][Price]": "1839.00",
        "Consumer[Title]": "Mr",
        "Consumer[Forename]": "Test",
        "Consumer[Surname]": "Test",
        "Consumer[PhoneNumber]": "01777777777",
        "Consumer[MobileNumber]": "07777777777",
        "Consumer[EmailAddress]": "sanjay@bettercommerce.io",
        "Consumer[HouseNumber]": "",
        "Consumer[HouseName]": "Address 1",
        "Consumer[Flat]": "",
        "Consumer[Street]": "",
        "Consumer[Town]": "London",
        "Consumer[Postcode]": "W44HH",
        "api_key": "518KkIqSzw nXlalicf4S29/97Y",
        "InstallationID": "4641",
        "BrokerReference": "",
        "LoanApplicationId": "95efeaf1-dea8-4ecf-80c9-1541bccbaf62",
        "Info": "N/A"
    }
}

new BetterCommerceOperation().processPaymentHook(paymentHookData).then(paymentResponseResult => {
    console.log(' --- paymentResponseResult ---', paymentResponseResult)
})