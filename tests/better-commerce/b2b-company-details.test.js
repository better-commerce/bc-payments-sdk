const { BCEnvironment, BetterCommerceOperation } = require("../../dist");

BCEnvironment.init("12C2E62B-33B1-4D9B-9782-7F3BB1EDB951", "o6obMjODUNK7QEEK8x4Ir3NfxJaUa5qGDs34SBKhsKo=");
const headers = {
    Currency: 'GBP',
    Language: 'en',
    Country: 'GB',
    DeviceId: 'db462e8b-d7a6-4f6d-91e2-b4a86b8e0fa9',
    SessionId: '0660a258-c504-483a-886d-83d360a474c6',
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
        sessionId: '0660a258-c504-483a-886d-83d360a474c6',
        ClientIP: '::1',
    };
const params = {
    userId: "2e116966-0c17-ee11-b1c3-000d3a211cf7", ...{ extras: { headers, cookies } }
};
new BetterCommerceOperation().getCompanyDetails(params)
    .then(response => {
        console.log(JSON.stringify(response));
    });