const { BCEnvironment, PaymentOperation, } = require("../../../dist");

const config = {
    systemName: "Checkout",
    notificationUrl: "/payment-notification/checkout",
    settings: [{
        "key": "AccountCode",
        "value": "pk_sbox_cedcpciwvkyqgd5v7mg5ltw4tak"
    }, {
        "key": "Signature",
        "value": "sk_sbox_rwcsxwmwji27nhutttyhefv2tqf"
    }, {
        "key": "MotoAccountCode",
        "value": "ack_urnw6g2bmmvehmvnlg37copkhe"
    }, {
        "key": "MotoSignature",
        "value": "8NjqH1tpGAAL0YVOb26-wSq5q0Q0RzG4tkXLnQW4jf9E5oVTFLEq_BFOYEzIBGyWm5JM_vEOzcOR9C_UNrOhdw"
    }, {
        "key": "MotoUserName",
        "value": "pc_vpjtxbgcap5elpq65wtxtr3gg4"
    }, {
        "key": "UseSandbox",
        "value": "True"
    }, {
        "key": "CancelUrl",
        "value": "/payment-notification/checkout/canceled"
    }]
};
BCEnvironment.init("ack_urnw6g2bmmvehmvnlg37copkhe", "8NjqH1tpGAAL0YVOb26-wSq5q0Q0RzG4tkXLnQW4jf9E5oVTFLEq_BFOYEzIBGyWm5JM_vEOzcOR9C_UNrOhdw", config);
new PaymentOperation().getOrderDetails("pay_v7v462x5nwuujlleqvx4rx62dy").then(response => {
    console.log(JSON.stringify(response));
});