import type { LocaleStorageSchema } from "~/types";

export const formattedDate = (inputDate: string) => {
    const [day, month, year] = inputDate.split("-");
    return new Date(`${month}/${day}/${year}`).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
    });
};

export const setTypedStorageItem = <T extends keyof LocaleStorageSchema>(
    key: T,
    value: LocaleStorageSchema[T]
): void => {
    localStorage.setItem(key, JSON.stringify(value));
};

export const getTypedStorageItem = <T extends keyof LocaleStorageSchema>(
    key: T
): LocaleStorageSchema[T] | null => {
    const value = localStorage.getItem(key);
    if (!value) return null;
    try {
        return JSON.parse(value) as LocaleStorageSchema[T];
    } catch (err) {
        return null;
    }
};
