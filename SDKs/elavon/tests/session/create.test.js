const { ElavonEnvironment, Session, TransactionType } = require("../../dist");

ElavonEnvironment.initServer("<merchantId>", "<merchantUserId>", "<merchantPIN>", "<vendorId>", false);
const data = {
    ssl_transaction_type: TransactionType.CREDIT_CARD_SALE,
    ssl_amount: 1.00,
    ssl_add_token: "Y",
    ssl_get_token: "Y",
};

new Session().create(data)
    .then(response => {
        console.log(JSON.stringify(response))
    });