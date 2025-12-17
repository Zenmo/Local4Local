import {useState} from "react"

/**
 * This function assumes the promise is cheap to execute
 * and the value can be compared for equality.
 */
export function usePromiseValue<T>(promise: Promise<T>, defaultValue: T): T {
    const [value, setValue] = useState<T>(defaultValue)

    promise.then(setValue).catch(e => {
        console.error(e)
        setValue(defaultValue)
    })

    return value
}
