const { CheckoutEnvironment, Payment } = require("../../dist");

CheckoutEnvironment.initServer("ack_ikrzccuhjple7dmn7aozgoaeki", "kybvHsoZwlEBSNbR7Id0FyOKyUrggHBFLdDX2gZZ5E6BESRGHtKBN9zN9AG4U-BODolfLDYBXo-voy0-VMBykA", "pc_ptat6wn535wetjzlnbsmuims7m");

new Payment().getDetails("pay_pnrjrwewym6edlf7wiojsgsg7i")
    .then(response => {
        console.log(JSON.stringify(response))
    });