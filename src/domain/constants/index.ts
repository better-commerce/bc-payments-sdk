/**
 * Namespace {@link Defaults} contains default values for various types.
 * @namespace Defaults
 *
 * @typedef {Object} Defaults
 * @property {number} Int.Value - Default value for integers. Defaults to 0.
 * @property {string} String.Value - Default value for strings. Defaults to an empty string.
 * @property {string} Guid.Value - Default value for GUIDs. Defaults to 00000000-0000-0000-0000-000000000000.
 * @property {Object} Object.Value - Default value for objects. Defaults to an empty object.
 * @property {boolean} Boolean.Value - Default value for booleans. Defaults to false.
 * @property {null} Null.Value - Default value for null. Defaults to null.
 * @property {undefined} Undefined.Value - Default value for undefined. Defaults to undefined.
 * @property {Array} Array.Value - Default value for arrays. Defaults to an empty array.
 * @property {string} Time.Value - Default value for time. Defaults to "00:00:00".
 */
export declare namespace Defaults {
    namespace Int {
        const Value = 0;
    }
    namespace String {
        const Value = "";
    }
    namespace Guid {
        const Value = "00000000-0000-0000-0000-000000000000";
    }
    namespace Object {
        const Value: {};
    }
    namespace Boolean {
        const Value = false;
    }
    namespace Null {
        const Value: any;
    }
    namespace Undefined {
        const Value: any;
    }
    namespace Array {
        const Value: any[];
    }
    namespace Time {
        const Value = "00:00:00";
    }
}