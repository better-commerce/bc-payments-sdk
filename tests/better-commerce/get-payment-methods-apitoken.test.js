const { BCEnvironment } = require("../../dist");
const { PaymentMethod } = require("../../dist/modules/better-commerce/PaymentMethod");

const apiToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJhcHAuYmV0dGVyY29tbWVyY2UuaW8iLCJpc3MiOiJhdXRoLmJldHRlcmNvbW1lcmNlLmlvIiwiZXhwIjoxNzQ5OTA4MTU0LCJzdWIiOiI5QzYuY29tIiwiVXNlcklkIjoiOUMwRUIwRTctNjg5Mi00N0M0LUFEREItRThFNTU3MjZFQURCIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjpbIlNhbGVzIE1hbmFnZXI0OnVzZXI6Y3JlYXRlIiwidHJhZGVpbjpxdW90ZWxpbmU6YWRkIiwidHJhZGVpbjpxdW90ZTpjcmVhdGUiLCJhY2NvdW50OnVzZXI";
const refreshToken = "aFT+RsaABvRAY1DjWkVn6P9o+fG0FJBnZW7OZB5nMkM="
BCEnvironment.initSession(apiToken, refreshToken, null, "https://auth2.dev-omnicx.com", "https://api20.dev-omnicx.com")
const params = {
    countryCode: "GB",
    currencyCode: "GBP",
    basketId: "00000000-0000-0000-0000-000000000000"
};

const headers = {
    Currency: 'GBP',
    Language: 'en-GB',
    Country: 'GB',
},
    cookies = {
        Currency: 'GBP',
        Language: 'en',
        Country: 'GB',
        accept_cookies: 'accepted',
        __stripe_mid: '60540aa8-92ec-448c-9c50-92ac4170268e19af4b',
        defaultSession: '167602a5-4cef-4e81-b8f7-bb16af38d46d',
    };

PaymentMethod.getAll(params, { headers, cookies })
    .then(response => {
        console.log(response);
    });