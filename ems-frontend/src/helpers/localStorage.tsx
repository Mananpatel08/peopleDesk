import { useState, useEffect } from "react";

export function usePersistentStep(key = "currentStep", apiStep?: number) {
    const [step, setStep] = useState<number>(apiStep || 1);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedStep = localStorage.getItem(key);
            if (storedStep) {
                setStep(Number(storedStep));
            } else if (apiStep) {
                localStorage.setItem(key, String(apiStep));
            }
        }
    }, [key, apiStep]);

    useEffect(() => {
        if (typeof window !== "undefined") {
            localStorage.setItem(key, String(step));
        }
    }, [step, key, apiStep]);

    return [step, setStep] as const;
}
