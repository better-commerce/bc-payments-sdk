const { PaymentMethodType, PaymentMethodTypeId } = require('../../../../dist/constants')
const { BCEnvironment, BetterCommerceOperation, getGatewayId, } = require("../../../../dist");

const webhookData = {
    "id": "evt_423ovon5o2rehcw2sifdvjc4zm",
    "type": "payment_captured",
    "version": "1.0.34",
    "created_on": "2023-12-31T22:19:00.2952138Z",
    "data": {
        "id": "pay_tjnpdh7w6qgutife3luncv77vu",
        "action_id": "act_nqhghj2fb5oujlca53uls6wham",
        "reference": "5011164-22990",
        "amount": 58869,
        "processed_on": "2023-12-31T22:18:57.3564134Z",
        "response_code": "10000",
        "response_summary": "Approved",
        "balances": {
            "total_authorized": 58869,
            "total_voided": 0,
            "available_to_void": 0,
            "total_captured": 58869,
            "available_to_capture": 0,
            "total_refunded": 0,
            "available_to_refund": 58869
        },
        "metadata": {
            "udf1": "381bf275-2aa8-ee11-b907-6045bdd08d83",
            "udf2": "0b7553ba-724c-49c8-a166-8a4b9c7479d1",
            "udf3": "27690639-2aa8-ee11-b907-6045bdd08d83",
            "udf4": "5011164-22990",
            "udf5": ""
        },
        "currency": "GBP",
        "processing": {
            "acquirer_transaction_id": "00711582547",
            "acquirer_reference_number": "24021213365007115825471"
        },
        "event_links": {
            "payment": "https://api.checkout.com/payments/pay_tjnpdh7w6qgutife3luncv77vu",
            "payment_actions": "https://api.checkout.com/payments/pay_tjnpdh7w6qgutife3luncv77vu/actions",
            "refund": "https://api.checkout.com/payments/pay_tjnpdh7w6qgutife3luncv77vu/refunds"
        }
    },
    "_links": {
        "self": {
            "href": "https://api.checkout.com/workflows/events/evt_423ovon5o2rehcw2sifdvjc4zm"
        },
        "subject": {
            "href": "https://api.checkout.com/workflows/events/subject/pay_tjnpdh7w6qgutife3luncv77vu"
        },
        "payment": {
            "href": "https://api.checkout.com/payments/pay_tjnpdh7w6qgutife3luncv77vu"
        },
        "payment_actions": {
            "href": "https://api.checkout.com/payments/pay_tjnpdh7w6qgutife3luncv77vu/actions"
        },
        "refund": {
            "href": "https://api.checkout.com/payments/pay_tjnpdh7w6qgutife3luncv77vu/refunds"
        }
    }
}

const config = {
    systemName: "Checkout",
    notificationUrl: "/payment-notification/checkout",
    settings: [{
        "key": "AccountCode",
        "value": "pk_c2vsamjenluvfafxv7jjoszupyy"
    }, {
        "key": "Signature",
        "value": "sk_wgoctir5vrwn4fmm6rj2tdncuqn"
    }, {
        "key": "MotoAccountCode",
        "value": "ack_7mkkdxsyhg3elmkawjud6dbmxq"
    }, {
        "key": "MotoSignature",
        "value": "tOAcqp_-uFY3mPR0UKeoOoqn9G7m69gADlr0OXDzuPDl6VgY93xTHMLPGe0MTH8zWm0kZUcpYd4i88Mmo3ufRQ"
    }, {
        "key": "MotoUserName",
        "value": "pc_vm7pn2asex7urng3savuszcypu"
    }, {
        "key": "UseSandbox",
        "value": "False"
    }, {
        "key": "CancelUrl",
        "value": "/payment-notification/checkout/canceled"
    }]
};

// FFX
const clientId = "12c2e62b-33b1-4d9b-9782-7f3bb1edb951"
const sharedSecret = "uQGiyIjmc2/FQDA27lIhx90M7PoK8byMItbQnYdfm7M="
const authUrl = "https://auth.bettercommerce.uk"
const baseUrl = "https://api.bettercommerce.uk"
BCEnvironment.init(clientId, sharedSecret, config, authUrl, baseUrl);
BCEnvironment.addExtras({
    country: "GB",
    currency: "GBP",
    language: "en",
})

const paymentHookData = {
    "paymentMethodTypeId": 3,
    "paymentMethodType": "Checkout",
    "data": {
        "id": "evt_423ovon5o2rehcw2sifdvjc4zm",
        "type": "payment_captured",
        "version": "1.0.34",
        "created_on": "2023-12-31T22:19:00.2952138Z",
        "data": {
            "id": "pay_tjnpdh7w6qgutife3luncv77vu",
            "action_id": "act_nqhghj2fb5oujlca53uls6wham",
            "reference": "5011164-22990",
            "amount": 58869,
            "processed_on": "2023-12-31T22:18:57.3564134Z",
            "response_code": "10000",
            "response_summary": "Approved",
            "balances": {
                "total_authorized": 58869,
                "total_voided": 0,
                "available_to_void": 0,
                "total_captured": 58869,
                "available_to_capture": 0,
                "total_refunded": 0,
                "available_to_refund": 58869
            },
            "metadata": {
                "udf1": "381bf275-2aa8-ee11-b907-6045bdd08d83",
                "udf2": "0b7553ba-724c-49c8-a166-8a4b9c7479d1",
                "udf3": "27690639-2aa8-ee11-b907-6045bdd08d83",
                "udf4": "5011164-22990",
                "udf5": ""
            },
            "currency": "GBP",
            "processing": {
                "acquirer_transaction_id": "00711582547",
                "acquirer_reference_number": "24021213365007115825471"
            },
            "event_links": {
                "payment": "https://api.checkout.com/payments/pay_tjnpdh7w6qgutife3luncv77vu",
                "payment_actions": "https://api.checkout.com/payments/pay_tjnpdh7w6qgutife3luncv77vu/actions",
                "refund": "https://api.checkout.com/payments/pay_tjnpdh7w6qgutife3luncv77vu/refunds"
            }
        },
        "_links": {
            "self": {
                "href": "https://api.checkout.com/workflows/events/evt_423ovon5o2rehcw2sifdvjc4zm"
            },
            "subject": {
                "href": "https://api.checkout.com/workflows/events/subject/pay_tjnpdh7w6qgutife3luncv77vu"
            },
            "payment": {
                "href": "https://api.checkout.com/payments/pay_tjnpdh7w6qgutife3luncv77vu"
            },
            "payment_actions": {
                "href": "https://api.checkout.com/payments/pay_tjnpdh7w6qgutife3luncv77vu/actions"
            },
            "refund": {
                "href": "https://api.checkout.com/payments/pay_tjnpdh7w6qgutife3luncv77vu/refunds"
            }
        },
        "paymentMethodTypeId": 3,
        "cookies": {
            "_gcl_au": "1.1.415883349.1704253224",
            "basketId": "8cd6c02a-e4cc-4feb-bae9-b98d61e76127",
            "_ALGOLIA": "anonymous-25763326-b7b2-4ee2-b602-7942ef0d0774",
            "_ga": "GA1.1.555741710.1704253229",
            "_uetsid": "d7be3a90a9e911eeb62733ee24c06f63",
            "_uetvid": "d7bf8010a9e911eea1030d625c7e002e",
            "ClientIP": "::1",
            "Currency": "GBP",
            "Language": "en",
            "defaultSession": "4764e43b-4ec3-4afd-8d35-f2a061c3c214",
            "sessionId": "bb370765-ddd1-405e-8e96-0bab89157cec",
            "deviceId": "49a15065-5f53-4f1b-b039-a89ee05b860d",
            "gedc": "{\"Ip\":\"122.161.50.61\",\"Country\":\"India\",\"CountryCode\":\"IN\",\"City\":\"Noida\",\"CityCode\":\"UP\",\"DetailJson\":\"{\\\"ip\\\": \\\"122.161.50.61\\\", \\\"type\\\": \\\"ipv4\\\", \\\"continent_code\\\": \\\"AS\\\", \\\"continent_name\\\": \\\"Asia\\\", \\\"country_code\\\": \\\"IN\\\",  \\\"country_name\\\": \\\"India\\\", \\\"region_code\\\": \\\"UP\\\", \\\"region_name\\\": \\\"Uttar Pradesh\\\", \\\"city\\\": \\\"Noida\\\", \\\"zip\\\": \\\"110096\\\", \\\"latitude\\\": 28.628999710083008, \\\"longitude\\\": 77.32099914550781, \\\"location\\\": {\\\"geoname_id\\\": 7279746, \\\"capital\\\": \\\"New Delhi\\\", \\\"languages\\\": [{\\\"code\\\": \\\"hi\\\", \\\"name\\\": \\\"Hindi\\\", \\\"native\\\": \\\"\\\\u0939\\\\u093f\\\\u0928\\\\u094d\\\\u0926\\\\u0940\\\"}, {\\\"code\\\": \\\"en\\\", \\\"name\\\": \\\"English\\\", \\\"native\\\": \\\"English\\\"}], \\\"country_flag\\\": \\\"https://assets.ipstack.com/flags/in.svg\\\", \\\"country_flag_emoji\\\": \\\"\\\\ud83c\\\\uddee\\\\ud83c\\\\uddf3\\\", \\\"country_flag_emoji_unicode\\\": \\\"U+1F1EE U+1F1F3\\\", \\\"calling_code\\\": \\\"91\\\", \\\"is_eu\\\": false}, \\\"time_zone\\\": {\\\"id\\\": \\\"Asia/Kolkata\\\", \\\"current_time\\\": \\\"2024-01-03T09:14:25+05:30\\\", \\\"gmt_offset\\\": 19800, \\\"code\\\": \\\"IST\\\", \\\"is_daylight_saving\\\": false}, \\\"currency\\\": {\\\"code\\\": \\\"INR\\\", \\\"name\\\": \\\"Indian Rupee\\\", \\\"plural\\\": \\\"Indian rupees\\\", \\\"symbol\\\": \\\"Rs\\\", \\\"symbol_native\\\": \\\"\\\\u099f\\\\u0995\\\\u09be\\\"}, \\\"connection\\\": {\\\"asn\\\": 24560, \\\"isp\\\": \\\"Bharti Airtel Ltd.\\\"}}\",\"Message\":null,\"IsValid\":true}",
            "selection": "{\"analytics\":true,\"advertisement\":true}",
            "analytics": "true",
            "advertisement": "true",
            "next-auth.csrf-token": "511bba35ab861a57992b61b0edd5b64b16ca875ec1589e0370c720b18bb9d227|a5664bb18231835250c0412fe1337c319cf42fa0a541d7368a1476fd6b79e00c",
            "nedc": "true",
            "_ga_ZSE443B440": "GS1.1.1704253229.1.1.1704253510.60.0.0",
            "__kla_id": "eyJjaWQiOiJOemt6Wm1GaE1tWXRaR014WkMwME5qbGpMV0pqTm1JdFpETmlObUV5T0RWalkyTTUiLCIkcmVmZXJyZXIiOnsidHMiOjE3MDQyNTMyMzEsInZhbHVlIjoiIiwiZmlyc3RfcGFnZSI6Imh0dHA6Ly9sb2NhbGhvc3Q6MzAwMC8ifSwiJGxhc3RfcmVmZXJyZXIiOnsidHMiOjE3MDQyNTM1MTEsInZhbHVlIjoiIiwiZmlyc3RfcGFnZSI6Imh0dHA6Ly9sb2NhbGhvc3Q6MzAwMC8ifX0="
        },
        "extras": {
            "clientId": "12c2e62b-33b1-4d9b-9782-7f3bb1edb951",
            "sharedSecret": "uQGiyIjmc2/FQDA27lIhx90M7PoK8byMItbQnYdfm7M=",
            "config": {
                "id": 20,
                "systemName": "Checkout",
                "displayName": "Checkout",
                "slug": null,
                "isOnsite": false,
                "enabled": true,
                "isBillingAddressRequired": true,
                "displayOrder": 0,
                "iconCssClass": "Apps-checkout.png",
                "description": "Our Payment Gateway will let you as a online business accept payments on your website smoothly and securely. We have configured our gateway with all leading shopping carts and are 3D secured to reduce fraudulent transactions",
                "enableImmediateCapture": false,
                "forSubscription": false,
                "inputType": 15,
                "notificationUrl": "/payment-notification/checkout",
                "settings": [
                    {
                        "key": "AccountCode",
                        "value": "pk_c2vsamjenluvfafxv7jjoszupyy"
                    },
                    {
                        "key": "Signature",
                        "value": "sk_wgoctir5vrwn4fmm6rj2tdncuqn"
                    },
                    {
                        "key": "MotoUserName",
                        "value": "pc_vm7pn2asex7urng3savuszcypu"
                    },
                    {
                        "key": "MotoPassword",
                        "value": ""
                    },
                    {
                        "key": "MotoSignature",
                        "value": "tOAcqp_-uFY3mPR0UKeoOoqn9G7m69gADlr0OXDzuPDl6VgY93xTHMLPGe0MTH8zWm0kZUcpYd4i88Mmo3ufRQ"
                    },
                    {
                        "key": "MotoAccountCode",
                        "value": "ack_7mkkdxsyhg3elmkawjud6dbmxq"
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
                        "value": "/payment-notification/checkout/canceled"
                    },
                    {
                        "key": "Version",
                        "value": null
                    },
                    {
                        "key": "UseSandbox",
                        "value": "False"
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
            },
            "authUrl": "https://auth.bettercommerce.uk",
            "baseUrl": "https://bc-live-commerce-api-alpha.azurewebsites.net"
        }
    }
}

/*const paymentHookData = {
    paymentMethodTypeId: getGatewayId(config?.systemName),
    paymentMethodType: config?.systemName,
    data: { ...webhookData, extras: { clientId, sharedSecret, config, authUrl, baseUrl } },
}*/
new BetterCommerceOperation().processPaymentHook(paymentHookData).then(paymentResponseResult => {
    console.log(' --- paymentResponseResult ---', paymentResponseResult)
})