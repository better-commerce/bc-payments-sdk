const { BCEnvironment, Logger } = require("../../../dist");

BCEnvironment.init("12C2E62B-33B1-4D9B-9782-7F3BB1EDB951", "o6obMjODUNK7QEEK8x4Ir3NfxJaUa5qGDs34SBKhsKo=");
const data = "test"
Logger.logPayment({
    data,
    message: "Test",
}, {})