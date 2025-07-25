import {EffectCallback, useEffect} from "react";

export function useOnce(effect: EffectCallback) {
    useEffect(effect, [])
}
