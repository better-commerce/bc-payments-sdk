const { CheckoutEnvironment, Payment, PaymentType } = require("../../dist");

CheckoutEnvironment.initServer("ack_ikrzccuhjple7dmn7aozgoaeki", "kybvHsoZwlEBSNbR7Id0FyOKyUrggHBFLdDX2gZZ5E6BESRGHtKBN9zN9AG4U-BODolfLDYBXo-voy0-VMBykA", "pc_ptat6wn535wetjzlnbsmuims7m");
const data = {
    source: {
        type: "token",
        token: "tok_ne5tdmfuyurelfzoqsauxtsx4e",
    },
    amount: 20.99,
    currency: 'GBP',
    payment_type: PaymentType.Regular,
    reference: 'ORDER 1234',
    description: 'Mint Tea',
    capture: true,
    capture_on: new Date(),
    customer: {
        email: 'new_user@email.com',
        name: 'John Smith',
    },
    shipping: {
        address: {
            address_line1: 'Wall Street',
            address_line2: 'Dollar Avenue',
            city: 'London',
            state: 'London',
            zip: 'W1W W1W',
            country: 'GB',
        },
        phone: {
            country_code: '44',
            number: '7123456789',
        },
    },
    processing_channel_id: 'pc_ptat6wn535wetjzlnbsmuims7m',
    metadata: {
        udf1: "",
        udf2: "",
        udf3: "",
        udf4: "",
        udf5: "",
    },
};

new Payment().request(data)
    .then(response => {
        console.log(JSON.stringify(response))
    });