const { BCEnvironment } = require("../../dist");
const { PaymentMethod } = require("../../dist/modules/better-commerce/PaymentMethod");

BCEnvironment.init();
BCEnvironment.withCredentials("505c82a3-3493-493b-b359-a881b8414bf5", "wHfsCPUlgUX/I8d0xJbAaz9Fy67BN2Vh8k6T4AFqrUw=");
const params = {
    countryCode: "GB",
    currencyCode: "GBP",
    basketId: "00000000-0000-0000-0000-000000000000"
};

const headers = {
    Currency: 'GBP',
    Language: 'en',
    Country: 'GB',
    DeviceId: 'db462e8b-d7a6-4f6d-91e2-b4a86b8e0fa9',
    SessionId: '0660a258-c504-483a-886d-83d360a474c6'
},
    cookies = {
        basketId: 'd7b434f0-8812-4bda-b1c7-b60953058714',
        deviceId: 'db462e8b-d7a6-4f6d-91e2-b4a86b8e0fa9',
        Currency: 'GBP',
        Language: 'en',
        Country: 'GB',
        accept_cookies: 'accepted',
        __stripe_mid: '60540aa8-92ec-448c-9c50-92ac4170268e19af4b',
        defaultSession: '167602a5-4cef-4e81-b8f7-bb16af38d46d',
        sessionId: '0660a258-c504-483a-886d-83d360a474c6'
    };

PaymentMethod.getAll(params, { headers, cookies })
    .then(response => {
        console.log(response);
    });