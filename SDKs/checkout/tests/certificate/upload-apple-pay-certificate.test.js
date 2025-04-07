const fs = require("fs");
const { CheckoutEnvironment, ApplePayCertificate } = require("../../dist");

CheckoutEnvironment.initServer("ack_urnw6g2bmmvehmvnlg37copkhe", "8NjqH1tpGAAL0YVOb26-wSq5q0Q0RzG4tkXLnQW4jf9E5oVTFLEq_BFOYEzIBGyWm5JM_vEOzcOR9C_UNrOhdw", "pc_vpjtxbgcap5elpq65wtxtr3gg4");

const certFilePath = __dirname + '/certs/ffx/base64_converted_apple_pay_checkout.cer'
const contents = fs.readFileSync(certFilePath)
//console.log(contents.toString())
const certContents = contents.toString()
const data = `MIIEfjCCBCSgAwIBAgIIIx9pEUGd+FMwCgYIKoZIzj0EAwIwgYAxNDAyBgNVBAMM
K0FwcGxlIFdvcmxkd2lkZSBEZXZlbG9wZXIgUmVsYXRpb25zIENBIC0gRzIxJjAk
BgNVBAsMHUFwcGxlIENlcnRpZmljYXRpb24gQXV0aG9yaXR5MRMwEQYDVQQKDApB
cHBsZSBJbmMuMQswCQYDVQQGEwJVUzAeFw0yMzA5MjcxMjEzMjlaFw0yNTEwMjYx
MjEzMjhaMIGvMSkwJwYKCZImiZPyLGQBAQwZbWVyY2hhbnQuY29tLmNvbW1lcmNl
LmZmeDE/MD0GA1UEAww2QXBwbGUgUGF5IFBheW1lbnQgUHJvY2Vzc2luZzptZXJj
aGFudC5jb20uY29tbWVyY2UuZmZ4MRMwEQYDVQQLDAozSjM1MjU5UTg3MR8wHQYD
VQQKDBZPbW5pY3ggRGlnaXRhbCBMaW1pdGVkMQswCQYDVQQGEwJVUzBZMBMGByqG
SM49AgEGCCqGSM49AwEHA0IABA1XkOZdb9LTbwRP4MbsXsrFFNzpLtsjwZiRLJYW
5rwkDsmN49KlK4A/ry9bk08TFgUGZal0HhIRwefA1K21lH6jggJVMIICUTAMBgNV
HRMBAf8EAjAAMB8GA1UdIwQYMBaAFIS2hMw6hmJyFlmU6BqjvUjfOt8LMEcGCCsG
AQUFBwEBBDswOTA3BggrBgEFBQcwAYYraHR0cDovL29jc3AuYXBwbGUuY29tL29j
c3AwNC1hcHBsZXd3ZHJjYTIwMTCCAR0GA1UdIASCARQwggEQMIIBDAYJKoZIhvdj
ZAUBMIH+MIHDBggrBgEFBQcCAjCBtgyBs1JlbGlhbmNlIG9uIHRoaXMgY2VydGlm
aWNhdGUgYnkgYW55IHBhcnR5IGFzc3VtZXMgYWNjZXB0YW5jZSBvZiB0aGUgdGhl
biBhcHBsaWNhYmxlIHN0YW5kYXJkIHRlcm1zIGFuZCBjb25kaXRpb25zIG9mIHVz
ZSwgY2VydGlmaWNhdGUgcG9saWN5IGFuZCBjZXJ0aWZpY2F0aW9uIHByYWN0aWNl
IHN0YXRlbWVudHMuMDYGCCsGAQUFBwIBFipodHRwOi8vd3d3LmFwcGxlLmNvbS9j
ZXJ0aWZpY2F0ZWF1dGhvcml0eS8wNgYDVR0fBC8wLTAroCmgJ4YlaHR0cDovL2Ny
bC5hcHBsZS5jb20vYXBwbGV3d2RyY2EyLmNybDAdBgNVHQ4EFgQUXzS6kXlgbuVr
0FHijWuFdWx/4JYwDgYDVR0PAQH/BAQDAgMoME8GCSqGSIb3Y2QGIARCDEA3Qzcx
NjlDMUIzMzQ3NzI5NTBFNjBBMUNCMDk0NUI3QkYzNjc3MTg1MkU5MzBBQTkxQkFG
RTYzNkM4MjlFQjc3MAoGCCqGSM49BAMCA0gAMEUCID04ujyP1SL1FfogGaq5mQ3M
+Edp3HfkBhKpuxoWbvAvAiEAhb4BMztQ0zNJU/aWb6bwjr2Rl4u5OfOQ0GAJGBdt
06c=`
new ApplePayCertificate().uploadApplePayCertificate(data)
    .then(response => {
        console.log(JSON.stringify(response))
    });

/*
========
Response
========
{"id":"aplc_eujoorb3ftsupbfv2hkc3dqse4","public_key_hash":"Ci5FUFs0AX8Y8IgeYlQCoTKWlwJ7/ifszjC7dAyUhuE=","valid_from":"2023-09-07T10:39:59Z","valid_until":"2025-10-06T10:39:58Z"}

==============
Response (FFX)
==============
{"id":"aplc_iirymyvxvsaerjs67fewc4g2e4","public_key_hash":"ALcv2bLyE3Z83GDuWW2W4uOnF3YJtqsdD4yANYAXqE8=","valid_from":"2023-09-27T12:13:29Z","valid_until":"2025-10-26T12:13:28Z"}
*/