
export const matchStrings = (
    input1: string,
    input2: string,
    ignoreCase = false
) => {
    if (input1 && input2) {
        if (ignoreCase) {
            return input1.toLowerCase() === input2.toLowerCase()
        }
        return input1 === input2
    }
    return false
}

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

export const groupMatch = (input: string, regExp: RegExp) => {
    const matches = regExp.exec(input);
    return matches;
}