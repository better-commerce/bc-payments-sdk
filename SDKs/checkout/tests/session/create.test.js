const { CheckoutEnvironment, Session } = require("../../dist");

CheckoutEnvironment.initServer("ack_ikrzccuhjple7dmn7aozgoaeki", "kybvHsoZwlEBSNbR7Id0FyOKyUrggHBFLdDX2gZZ5E6BESRGHtKBN9zN9AG4U-BODolfLDYBXo-voy0-VMBykA", "pc_ptat6wn535wetjzlnbsmuims7m");
const data = {
    purchase_country: "GB",
    currency: "GBP",
    locale: "en-GB",
    amount: 1000,
    tax_amount: 1,
    products: [
        {
            name: "Brown leather belt",
            quantity: 1,
            unit_price: 1000,
            tax_rate: 0,
            total_amount: 1000,
            total_tax_amount: 0
        }
    ],
    //custom_payment_method_ids: ["6m_149APR"]
    secretKey: "sk_sbox_sfqi22eviwtbdki3itilxrkgmuc",
};

new Session().create(data)
    .then(response => {
        console.log(JSON.stringify(response))
    });