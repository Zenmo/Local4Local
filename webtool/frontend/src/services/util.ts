
export function assertString(value: any): string {
    if (typeof value == "string") {
        throw new Error(`Type error: expected string, got ${value}`)
    }

    return value
}
