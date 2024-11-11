const nullabilityChecks = {
    /**
     * @param value
     * @returns True if the value is null or undefined, false otherwise
     */
    isNullOrUndefined: (value: unknown): value is null | undefined => {
        return value === null || value === undefined;
    },
    /**
     * Empty values include null, undefined, empty string, zero, NaN, or false
     * @param value
     * @returns True if the value is empty, false otherwise
     */
    isEmpty: (value: unknown): boolean => {
        return (
            value === null ||
            value === undefined ||
            value === '' ||
            value === 0 ||
            Number.isNaN(value) ||
            value === false
        )
    },
    /**
     * @param value
     * @returns True if empty, false otherwise
     */
    isObjectOrArrayEmpty: (value: unknown): boolean => {
        if (Array.isArray(value)) {
            return value.length === 0;
        } else if (typeof value === 'object' && value !== null) {
            return Object.keys(value).length === 0;
        }
        return false;
    },
    /**
     * Checks if value is null, undefined or "empty"
     * For strings, checks if empty string
     * For object, checks if has no own properties
     * For arrays, checks if has no elements
     * @param value
     * @returns True if null, undefined, or empty, false otherwise
     */
    isNullOrEmpty: (value: unknown): boolean => {
        return nullabilityChecks.isNullOrUndefined(value) || nullabilityChecks.isEmpty(value) || nullabilityChecks.isObjectOrArrayEmpty(value);
    }
}

export default nullabilityChecks;