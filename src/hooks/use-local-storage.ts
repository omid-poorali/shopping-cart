import { useCallback, useEffect, useState } from "react";
import * as Utils from "utils";

export const useLocalStorage = <T>(key: string, initialValue: T) => {

    const syncValueWithStorage = useCallback(() => {
        if (!Utils.Dom.isBrowser) {
            return initialValue;
        }
        try {
            // Get from local storage by key
            const item = window.localStorage.getItem(key);
            // Parse stored json or if none return initialValue
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            // If error also return initialValue
            console.log(error);
            return initialValue;
        }
    }, [key, initialValue]);

    // State to store our value
    // Pass initial state function to useState so logic is only executed once
    const [storedValue, setStoredValue] = useState<T>(syncValueWithStorage);

    useEffect(() => {
        try {
            // Save to local storage
            if (Utils.Dom.isBrowser) {
                window.localStorage.setItem(key, JSON.stringify(storedValue));
            }
        } catch (error) {
            // A more advanced implementation would handle the error case
            console.log(error);
        }
    }, [key, storedValue])

    useEffect(() => {

        const visibilityChangeListener = () => {
            if (!document.hidden) {
                setStoredValue(syncValueWithStorage)
            }
        }

        if (Utils.Dom.isBrowser) {
            document.addEventListener("visibilitychange", visibilityChangeListener);
        }

        return () => {
            if (Utils.Dom.isBrowser) {
                document.removeEventListener("visibilityChange", visibilityChangeListener);
            }
        }
    }, [syncValueWithStorage, setStoredValue])

    return [storedValue, setStoredValue] as const;
}