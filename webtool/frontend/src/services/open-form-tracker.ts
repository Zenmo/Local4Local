import {useState} from "react"

interface OpenFormTracker {
    isOpen: boolean
    formId: string
    setFormId: (id: string) => void
    clearFormId: () => void
}

export function useOpenFormTracker(): OpenFormTracker {
    const [formId, setFormId] = useState("")
    const clearFormId = () => setFormId("")

    return {
        isOpen: formId !== "",
        formId,
        setFormId,
        clearFormId,
    }
}
