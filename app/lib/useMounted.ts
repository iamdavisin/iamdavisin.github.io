"use client";
import { useSyncExternalStore } from "react";

const noop = () => () => { };

/* true en el cliente tras la hidratación, false durante el render estático */
export function useMounted() {
    return useSyncExternalStore(noop, () => true, () => false);
}
