const { KlarnaEnvironment, Payment } = require("../dist");

KlarnaEnvironment.init("PK73987_e7a735db38e5", "h9CzUwm0pBhEhLOl");
new Payment().getDetails("ae5648c8-0cb1-460d-8886-3b88a34d24b7")
    .then(response => {
        console.log(JSON.stringify(response, null, 4))
    });