const { BCEnvironment, BetterCommerceOperation } = require("../../../dist");

const config = {
    id: 10,
    systemName: "COD",
    displayName: "COD",
    slug: null,
    isOnsite: false,
    enabled: true,
    isBillingAddressRequired: false,
    displayOrder: 0,
    iconCssClass: "Apps-cod.png",
    description: "Use Cash on Delivery payment gateway and provide liberty to customers of not paying online.",
    enableImmediateCapture: false,
    forSubscription: false,
    inputType: 15,
    notificationUrl: "",
    settings: [
        {
            key: "AccountCode",
            value: null,
        },
        {
            key: "Signature",
            value: null,
        },
        {
            key: "MotoUserName",
            value: null,
        },
        {
            key: "MotoPassword",
            value: null,
        },
        {
            key: "MotoSignature",
            value: null,
        },
        {
            key: "MotoAccountCode",
            value: null,
        },
        {
            key: "TestUrl",
            value: null,
        },
        {
            key: "ProductionUrl",
            value: null,
        },
        {
            key: "CancelUrl",
            value: null,
        },
        {
            key: "Version",
            value: null,
        },
        {
            key: "UseSandbox",
            value: "False",
        },
        {
            key: "EnablePayInInstallment",
            value: "False",
        },
        {
            key: "InstallmentDisplayText",
            value: null,
        },
        {
            key: "AdditionalServiceCharge",
            value: "0.0",
        },
        {
            key: "EnableSplitPayment",
            value: "False",
        },
        {
            key: "PrepaidValueType",
            value: "Price",
        },
        {
            key: "MinimumPrepaidValue",
            value: "22.0",
        },
        {
            key: "EnableImmediateCapture",
            value: "False",
        },
    ],
    basicSettings: [
        {
            key: "Version",
            value: null,
        },
        {
            key: "OrderTypes",
            value: "[\"\"]",
        },
    ],
    message: null,
}

const apiToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJhcHAuYmV0dGVyY29tbWVyY2UuaW8iLCJpc3MiOiJhdXRoLmJldHRlcmNvbW1lcmNlLmlvIiwiZXhwIjoxNzUwMjUyMDE5LCJzdWIiOiI4N0Q1RkY0Ny1BMjI5LTRBOUEtQjFDOC05NDA0REY0OUVGNkQiLCJlbWFpbCI6ImdhZ2FuZGVlcC5zaW5naEBiZXR0ZXJjb21tZXJjZS5pbyIsIlVzZXJJZCI6Ijg3RDVGRjQ3LUEyMjktNEE5QS1CMUM4LTk0MDRERjQ5RUY2RCIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6WyJTdXBlciBBZG1pbiIsIlNhbGVzIE1hbmFnZXIiLCJTYWxlcyBVc2VyIiwiU3VwZXJBZG1pbiJdLCJwZXJtaXNzaW9uIjpbImFjY291bnQ6dXNlcjp2aWV3IiwiYWNjb3VudDp1c2VyOmNyZWF0ZSIsInRyYWRlaW46cXVvdGU6Y3JlYXRlIiwiYWNjb3VudDp1c2VyOmRlbGV0ZSIsImFjY291bnQ6dXNlcjpyZXNldFBhc3N3b3JkIiwiYWNjb3VudDp1c2VyOmxvY2siLCJhY2NvdW50OnVzZXI6YXNzaWduUm9sZSIsImFjY291bnQ6dXNlcjp1cGRhdGUiLCJhY2NvdW50OnVzZXI6ZGVsZXRlUm9sZSIsImFjY291bnQ6dXNlcjp1bmxvY2siLCJ0cmFkZWluOnF1b3RlOmxpc3QiLCJ0cmFkZWluOnF1b3RlOmNhbmNlbCIsInRyYWRlaW46cXVvdGU6dmlldyIsInRyYWRlaW46cXVvdGU6YWNjZXB0UHJpY2UiLCJ0cmFkZWluOnF1b3RlOnJlamVjdFByaWNlIiwidHJhZGVpbjpxdW90ZTpjbG9uZSIsInRyYWRlaW46cXVvdGVsaW5lOmFkZCIsInRyYWRlaW46cXVvdGVsaW5lOnJlbW92ZSIsInRyYWRlaW46YXNzZXNzbWVudDppbml0aWF0ZSIsInRyYWRlaW46YXNzZXNzbWVudDphbWVuZCIsInRyYWRlaW46YXNzZXNzbWVudDp2aWV3U2VyaWFsIiwidHJhZGVpbjphc3Nlc3NtZW50OnZhbGlkYXRlUGFyZW50UHJvZHVjdCIsInRyYWRlaW46YXNzZXNzbWVudDp1cGRhdGVDaGVja2xpc3QiLCJ0cmFkZWluOmFzc2Vzc21lbnQ6dXBkYXRlUHJpY2UiLCJ0cmFkZWluOmFzc2Vzc21lbnQ6ZXhpdCIsInRyYWRlaW46YXNzZXNzbWVudDppbnB1dFNlcmlhbCIsInRyYWRlaW46YXNzZXNzbWVudDp1cGRhdGVDb25kaXRpb24iLCJ0cmFkZWluOmFzc2Vzc21lbnQ6dXBkYXRlQWNjZXNzb3JpZXMiLCJ0cmFkZWluOmFzc2Vzc21lbnQ6dmlld0NoZWNrbGlzdCIsInRyYWRlaW46YXNzZXNzbWVudDphZGRCb251cyIsInRyYWRlaW46YXNzZXNzbWVudDpmaW5pc2giLCJ0cmFkZWluOmFzc2Vzc21lbnQ6dXBkYXRlU2VyaWFsIiwidHJhZGVpbjphc3Nlc3NtZW50OnZpZXdDb25kaXRpb24iLCJ0cmFkZWluOmFzc2Vzc21lbnQ6dmlld0FjY2Vzc29yaWVzIiwidHJhZGVpbjphc3Nlc3NtZW50OnZpZXdQcmljZUJyZWFrZG93biIsInRyYWRlaW46YXNzZXNzbWVudDp2aWV3Qm9udXMiLCJ0cmFkZWluOmFzc2Vzc21lbnQ6YWNjZXB0QXNzZXNzZWRRdW90ZSIsInRyYWRlaW46YXNzZXNzbWVudDpyZWplY3RBc3Nlc3NlZFF1b3RlIiwidHJhZGVpbjphc3Nlc3NtZW50Om1vZGlmeUJvbnVzIiwidHJhZGVpbjphZ3JlZW1lbnQ6dmlldyIsInRyYWRlaW46bm90ZTphZGQiLCJ0cmFkZWluOmFncmVlbWVudDpwcmludCIsInRyYWRlaW46bm90ZTp2aWV3IiwidHJhZGVpbjp3YWxsZXQ6aW5pdGlhdGVUcmFuc2ZlciIsInRyYWRlaW46d2FsbGV0OnZpZXdUcmFuc2ZlckRldGFpbCIsInRyYWRlaW46cmV0dXJuOmluaXRpYXRlIiwidHJhZGVpbjp3YWxsZXQ6YWRkQmFua0RldGFpbCIsInRyYWRlaW46d2FsbGV0OmluaXRpYXRlQmFua1RyYW5zZmVyIiwidHJhZGVpbjpyZXR1cm46dXBkYXRlU3RhdHVzIiwiY21zOnBhZ2U6dmlldyIsImNtczpwYWdlOmNyZWF0ZSIsImNtczpwYWdlOnVwZGF0ZSIsImNtczpwYWdlOmRlbGV0ZSIsImNvbW1lcmNlOm9yZGVyOnZpZXciLCJjb21tZXJjZTpvcmRlcjpjcmVhdGUiLCJjb21tZXJjZTpvcmRlcjp1cGRhdGUiLCJjb21tZXJjZTpvcmRlcjpkZWxldGUiLCJkYXNoYm9hcmQ6d2lkZ2V0OnZpZXciLCJlbmdhZ2U6Y2FtcGFpZ246dmlldyIsImVuZ2FnZTpjYW1wYWlnbjp1cGRhdGUiLCJlbmdhZ2U6Y2FtcGFpZ246Y3JlYXRlIiwiZW5nYWdlOmNhbXBhaWduOmRlbGV0ZSIsIm9tczpvcmRlcjp2aWV3Iiwib21zOm9yZGVyOmNyZWF0ZSIsIm9tczpvcmRlcjp1cGRhdGUiLCJvbXM6b3JkZXI6ZGVsZXRlIiwicGltMjpwcm9kdWN0OnZpZXciLCJwaW0yOnByb2R1Y3Q6Y3JlYXRlIiwicGltMjpwcm9kdWN0OnVwZGF0ZSIsInBpbTI6cHJvZHVjdDpkZWxldGUiLCJwaW1saXRlOnByb2R1Y3Q6dmlldyIsInBpbWxpdGU6cHJvZHVjdDpjcmVhdGUiLCJwaW1saXRlOnByb2R1Y3Q6dXBkYXRlIiwicGltbGl0ZTpwcm9kdWN0OmRlbGV0ZSIsInJlcG9ydHM6cmVwb3J0OnZpZXciLCJ0cmFkZWluOnByb2R1Y3Q6Z2VuZXJhdGUiXSwiT3JnSWQiOiJiMGQwMWQ0OS05Y2U0LTQwNzYtODU3Zi1mZmU5NmVlMWE3NTgiLCJEb21haW5JZCI6ImU1ODIwZDI0LTNhZTItNGQ5ZS05OWI0LTQ1Y2YzZWYyNjVkZCIsIk9yZ0NvZGUiOiJQQy1EZXYiLCJPcmdOYW1lIjoiUEMtRGV2IiwiVXNlck5hbWUiOiJnYWdhbmRlZXAuc2luZ2hAYmV0dGVyY29tbWVyY2UuaW8iLCJFbWFpbCI6ImdhZ2FuZGVlcC5zaW5naEBiZXR0ZXJjb21tZXJjZS5pbyIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJnYWdhbmRlZXAuc2luZ2hAYmV0dGVyY29tbWVyY2UuaW8iLCJDaGFubmVsIjoiV2ViIiwiRG9tYWlucyI6Ilt7XCJSZWNvcmRJZFwiOlwiZTU4MjBkMjQtM2FlMi00ZDllLTk5YjQtNDVjZjNlZjI2NWRkXCIsXCJCcmFuY2hJZFwiOlwiMDAwMDAwMDAtMDAwMC0wMDAwLTAwMDAtMDAwMDAwMDAwMDAwXCIsXCJOYW1lXCI6XCJQQy1EZXZcIixcIkRlZmF1bHRDdWx0dXJlXCI6XCJlbi1HQlwiLFwiRGVmYXVsdEN1cnJlbmN5XCI6XCJHQlBcIixcIklzRGVmYXVsdFwiOnRydWUsXCJNb2R1bGVDb2RlQ3N2XCI6bnVsbH1dIiwiQ3VycmVuY3kiOiJHQlAiLCJMYW5nQ3VsdHVyZSI6ImVuLUdCIiwiaWF0IjoxNzUwMjUwMjE5LCJuYmYiOjE3NTAyNTAyMTl9.dcH8xvAaFHHxlxmYlRfbrbY50BksJKhcWPtc0nqkAkk"
const refreshToken = "Zf4DeN3KIE5yTf/Qs0ncDcZm5l6GzvojNg+FJJFtRtk="
BCEnvironment.initSession(apiToken, refreshToken, config, "https://auth2.dev-omnicx.com", "https://api20.dev-omnicx.com")
const params = {
    isCOD: true,
    orderId: "",
    txnOrderId: "",
    extras: {
        token: "",
        orderId: "",
        payerId: "",
        gateway: "COD",
        isCancelled: false,
        paymentType: "full",
        partialAmount: 0,
        cookies: {
            sessionId: "87D5FF47-A229-4A9A-B1C8-9404DF49EF6D",
        },
    },
}

new BetterCommerceOperation().processPayment(params)
    .then(response => {
        console.log(response);
    });