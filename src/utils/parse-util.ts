export default class ParseUtil {
    /**
     * Compares two strings for equality.
     * 
     * @param input1 - The first string to compare.
     * @param input2 - The second string to compare.
     * @param ignoreCase - Optional boolean to indicate if the comparison should ignore case differences. Defaults to false.
     * @returns A boolean indicating whether the two strings are equal. Returns false if either string is null or undefined.
     */
    static matchStrings(input1: string, input2: string, ignoreCase = false) {
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
    static stringToBoolean(stringValue: string | undefined): boolean {
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

    /**
     * Attempts to parse a JSON string and returns the resulting object.
     * 
     * @param json - The JSON string to parse.
     * @returns The parsed object if successful, otherwise null if the input is invalid or parsing fails.
     */
    static tryParseJson(json: any) {
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

    /**
     * Executes a regular expression on a string and returns the match results.
     * 
     * @param input - The string to search for matches.
     * @param regExp - The regular expression to execute.
     * @returns The match results as an array, or null if no match was found.
     */
    static groupMatch(input: string, regExp: RegExp) {
        const matches = regExp.exec(input);
        return matches;
    }
}