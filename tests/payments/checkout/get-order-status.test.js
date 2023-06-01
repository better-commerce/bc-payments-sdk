const { BCEnvironment, PaymentOperation, } = require("../../../dist");

const config = {
    systemName: "Checkout",
    notificationUrl: "/payment-notification/checkout",
    settings: [{
        "key": "AccountCode",
        "value": "pk_sbox_dzxjkk5cfnepqvn2wfqnz732oej"
    }, {
        "key": "Signature",
        "value": "sk_sbox_sfqi22eviwtbdki3itilxrkgmuc"
    }, {
        "key": "MotoAccountCode",
        "value": "ack_ikrzccuhjple7dmn7aozgoaeki"
    }, {
        "key": "MotoSignature",
        "value": "kybvHsoZwlEBSNbR7Id0FyOKyUrggHBFLdDX2gZZ5E6BESRGHtKBN9zN9AG4U-BODolfLDYBXo-voy0-VMBykA"
    }, {
        "key": "MotoUserName",
        "value": "pc_ptat6wn535wetjzlnbsmuims7m"
    }, {
        "key": "UseSandbox",
        "value": "True"
    }, {
        "key": "CancelUrl",
        "value": "/payment-notification/checkout/canceled"
    }]
};
BCEnvironment.init(config);
BCEnvironment.withCredentials("ack_ikrzccuhjple7dmn7aozgoaeki", "kybvHsoZwlEBSNbR7Id0FyOKyUrggHBFLdDX2gZZ5E6BESRGHtKBN9zN9AG4U-BODolfLDYBXo-voy0-VMBykA");
new PaymentOperation().getOrderDetails("pay_pnrjrwewym6edlf7wiojsgsg7i").then(response => {
    console.log(JSON.stringify(response));
});