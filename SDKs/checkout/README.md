# BetterCommerce Checkout NodeJS SDK

BetterCommerce's Checkout NodeJS SDK enables BC client applications to integrate with Checkout merchant API system. It publishes an interface to interact with [Checkout API](https://api-reference.checkout.com/#operation/getPaymentDetails/) endpoints.

Use below command for package installation:

```
npm install @better-commerce/bc-checkout-sdk
```

## Architecture Diagram

![Architecture Diagram](/assets/app-architecture.png)

## SDK Initialization

**Use following snippet to initialize the SDK:**

### Client-side Authentication

Uses the public key for client-side authentication.

```
CheckoutEnvironment.initClient("<public_key>", "<secret_key>");
```

### Server-to-server Authentication

Uses the access secret or OAuth for server-to-server communication.

```
CheckoutEnvironment.initServer("<client_id>", "<access_secret>", "<processing_channel_id>", [useSandbox: boolean]);
```

## Usage Example

### Request Payment on tokenized card

```
const data = {
    source: {
        type: "token",
        token: "<token_id>",
    },
    amount: 20.99,
    currency: '<currency_code>',
    payment_type: PaymentType.Regular, // Regular | Recurring | MOTO | Installment | Unscheduled
    reference: '<reference>',
    description: '<description>',
    capture: true,
    capture_on: new Date(),
    customer: {
        email: '<email>',
        name: '<full_name>',
    },
    shipping: {
        address: {
            address_line1: '<address_line1>',
            address_line2: '<address_line2>',
            city: '<city>',
            state: '<state>',
            zip: '<zip>',
            country: '<country_code>',
        },
        phone: {
            country_code: '<country_code>',
            number: '<phone_number>',
        },
    },
    processing_channel_id: '<processing_channel_id>',
    metadata: {
        udf1: "",
        udf2: "",
        udf3: "",
        udf4: "",
        udf5: "",
    },
}
const result = await new Payment().request(data);
```

#### Response

```
{
    "id":"pay_pnrjrwewym6edlf7wiojsgsg7i",
    "action_id":"act_ss5v42ehgr3uhnugmtm2fb7cfi",
    "amount":2099,
    "currency":"GBP",
    "approved":true,
    "status":"Authorized",
    "auth_code":"231754",
    "response_code":"10000",
    "response_summary":"Approved",
    "balances":{
        "total_authorized":2099,
        "total_voided":0,
        "available_to_void":2099,
        "total_captured":0,
        "available_to_capture":2099,
        "total_refunded":0,
        "available_to_refund":0
    },
    "risk":{
        "flagged":false,
        "score":0
    },
    "source":{
        "id":"src_qov4l2pirlkuzi3w3i75zwz5eu",
        "type":"card",
        "phone":{

        },
        "expiry_month":10,
        "expiry_year":2023,
        "scheme":"Visa",
        "last4":"4242",
        "fingerprint":"C555164354AF9344A0DC916908C6C478778C46EB496BA9773C857D599F3FE6E5",
        "bin":"424242",
        "card_type":"CREDIT",
        "card_category":"CONSUMER",
        "issuer_country":"GB",
        "product_id":"F",
        "product_type":"Visa Classic",
        "avs_check":"G",
        "cvv_check":"Y",
        "payment_account_reference":"V001353581489756700"
    },
    "customer":{
        "id":"cus_z6jbrwv6rs2ezdljdmxzzkg7yq",
        "email":"new_user@email.com",
        "name":"John Smith"
    },
    "processed_on":"2023-06-01T10:16:54.1811385Z",
    "reference":"ORDER 1234",
    "scheme_id":"809075301971190",
    "processing":{
        "acquirer_transaction_id":"748402123613263045857",
        "retrieval_reference_number":"438387425759",
        "merchant_category_code":"5815",
        "scheme_merchant_id":"77386",
        "aft":false
    },
    "expires_on":"2023-07-01T10:16:54.1811385Z",
    "_links":{
        "self":{
            "href":"https://api.sandbox.checkout.com/payments/pay_pnrjrwewym6edlf7wiojsgsg7i"
        },
        "actions":{
            "href":"https://api.sandbox.checkout.com/payments/pay_pnrjrwewym6edlf7wiojsgsg7i/actions"
        },
        "capture":{
            "href":"https://api.sandbox.checkout.com/payments/pay_pnrjrwewym6edlf7wiojsgsg7i/captures"
        },
        "void":{
            "href":"https://api.sandbox.checkout.com/payments/pay_pnrjrwewym6edlf7wiojsgsg7i/voids"
        }
    }
}
```

### Get Payment Details

```
const result = await new Payment().getDetails("<payment_id>");
```

#### Response

```
{
    "id":"pay_pnrjrwewym6edlf7wiojsgsg7i",
    "requested_on":"2023-06-01T10:16:54.032019Z",
    "source":{
        "id":"src_qov4l2pirlkuzi3w3i75zwz5eu",
        "type":"card",
        "phone":{
            
        },
        "expiry_month":10,
        "expiry_year":2023,
        "scheme":"Visa",
        "last4":"4242",
        "fingerprint":"C555164354AF9344A0DC916908C6C478778C46EB496BA9773C857D599F3FE6E5",
        "bin":"424242",
        "card_type":"CREDIT",
        "card_category":"CONSUMER",
        "issuer_country":"GB",
        "product_id":"F",
        "product_type":"Visa Classic",
        "avs_check":"G",
        "cvv_check":"Y",
        "payment_account_reference":"V001353581489756700"
    },
    "expires_on":"2023-07-01T10:16:54.1811385Z",
    "amount":2099,
    "currency":"GBP",
    "payment_type":"Regular",
    "reference":"ORDER 1234",
    "description":"Mint Tea",
    "status":"Captured",
    "approved":true,
    "balances":{
        "total_authorized":2099,
        "total_voided":0,
        "available_to_void":0,
        "total_captured":2099,
        "available_to_capture":0,
        "total_refunded":0,
        "available_to_refund":2099
    },
    "risk":{
        "flagged":false,
        "score":0
    },
    "customer":{
        "id":"cus_z6jbrwv6rs2ezdljdmxzzkg7yq",
        "email":"new_user@email.com",
        "name":"John Smith"
    },
    "shipping":{
        "address":{
            "address_line1":"Wall Street",
            "address_line2":"Dollar Avenue",
            "city":"London",
            "state":"London",
            "zip":"W1W W1W",
            "country":"GB"
        },
        "phone":{
            "country_code":"44",
            "number":"7123456789"
        }
    },
    "metadata":{
        
    },
    "processing":{
        "acquirer_transaction_id":"748402123613263045857",
        "retrieval_reference_number":"438387425759",
        "merchant_category_code":"5815",
        "scheme_merchant_id":"77386",
        "aft":false
    },
    "scheme_id":"809075301971190",
    "_links":{
        "self":{
            "href":"https://api.sandbox.checkout.com/payments/pay_pnrjrwewym6edlf7wiojsgsg7i"
        },
        "actions":{
            "href":"https://api.sandbox.checkout.com/payments/pay_pnrjrwewym6edlf7wiojsgsg7i/actions"
        },
        "refund":{
            "href":"https://api.sandbox.checkout.com/payments/pay_pnrjrwewym6edlf7wiojsgsg7i/refunds"
        }
    }
}
```
