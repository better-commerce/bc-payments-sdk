
/**
 * Parses boolean from string.
 * @param stringValue 
 * @returns 
 */
export const stringToBoolean = (stringValue: string | undefined): boolean => {
    if (stringValue) {
        switch (stringValue.toLowerCase()) {
            case "true":
            case "1":
            case "on":
            case "yes":
                return true;
            default:
                return false;
        }
    }
    return false;
};

export const tryParseJson = (json: any) => {
    if (json) {
        let parsed = {};
        try {
            parsed = JSON.parse(json);
            return parsed;
        } catch (e: any) {
        }
    }
    return null;
};

