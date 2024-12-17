/**
 * It makes sense to use this function when 0 is a valid value and defaultValue is not 0.
 * Otherwise you can just use ||.
 */
export function getWithDefault(value: number|undefined, defaultValue: number): number {
    if (typeof value === "number") {
        if (Number.isNaN(value)) {
            return defaultValue
        } else {
            return value
        }
    } else {
        return defaultValue
    }
}
