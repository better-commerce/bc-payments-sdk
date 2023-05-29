import { BCEnvironment } from "../config/BCEnvironment";

export class RequestOptions {

    parseError: boolean;

    /**
     * Returns a RequestOptions object with default values
     * from BCEnvironment object.
     *
     * @return RequestOptions
    */
    static createDefault() {
        BCEnvironment.init();
        return new RequestOptions();
    }
}