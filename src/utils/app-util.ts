export default class AppUtil {

    /**
     * Calculates the number of decimal places in a given number.
     *
     * @param {number} value - The number whose decimal places are to be counted.
     * @returns {number} - The count of decimal places in the number. If the number is an integer, returns 0.
     */
    static countDecimals(value: number): number {
        if (Math.floor(value.valueOf()) === value.valueOf()) return 0; {
            return value.toString().split(".")[1].length || 0;
        }
    }

    /**
     * Sanitizes a given amount for use in payment processing.
     *
     * This function takes a number, and if it has more than 2 decimal places, rounds it
     * to 2 decimal places before multiplying by 100. If the number has 0 or 1 decimal
     * place, it is simply multiplied by 100. This is to accommodate certain payment
     * gateways that do not accept decimal values.
     *
     * @param {number} value - The amount to be sanitized.
     * @returns {number} - The sanitized amount.
     */
    static sanitizeAmount(value: number): number {
        let amount = 0;
        if (value) {
            const decimals = AppUtil.countDecimals(value);
            if (decimals > 2) {
                amount = Number.parseFloat(value.toFixed(2)) * 100;
            } else {
                if (decimals == 0) {
                    amount = value * 100;
                } else {
                    amount = parseInt((value * 100).toFixed(0));
                }
            }
        }
        return amount;
    }
}