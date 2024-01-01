import { useCallback, useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, fallbackValue: T) {
    const [value, setValue] = useState(fallbackValue);

    const setValueWrapper = useCallback((newValue: T) => {
        setValue(newValue)
        localStorage.setItem(key, JSON.stringify(newValue));
    }, [setValue, key]);

    useEffect(() => {
        const stored = localStorage.getItem(key);
        setValueWrapper(stored ? JSON.parse(stored) : fallbackValue);
    }, [fallbackValue, key, setValueWrapper]);

    return [value, setValueWrapper] as const;
}