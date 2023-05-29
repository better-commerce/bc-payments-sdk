import { BCException } from "./BCException";

export class InvalidRequestException extends BCException {
    constructor(httpResponseCode = undefined, status = undefined, errorCode = undefined, errorMessage = undefined) {
        if (httpResponseCode == undefined) {
            super(400, "invalid_request", "invalid_request", "Please pass valid arguments.");
        } else {
            super(httpResponseCode, status, errorCode, errorMessage);
        }
    }

};

