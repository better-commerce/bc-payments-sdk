const fs = require("fs");
const { CheckoutEnvironment, ApplePayCertificate } = require("../../dist");

CheckoutEnvironment.initServer("ack_urnw6g2bmmvehmvnlg37copkhe", "8NjqH1tpGAAL0YVOb26-wSq5q0Q0RzG4tkXLnQW4jf9E5oVTFLEq_BFOYEzIBGyWm5JM_vEOzcOR9C_UNrOhdw", "pc_vpjtxbgcap5elpq65wtxtr3gg4");

new ApplePayCertificate().generateCSR()
    .then(response => {
        console.log(JSON.stringify(response))
    });