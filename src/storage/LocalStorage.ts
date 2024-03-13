import type { LocaleStorageSchema } from "./types";

class LocalStorage {
    set = <T extends keyof LocaleStorageSchema>(key: T, value: LocaleStorageSchema[T]): void => {
        localStorage.setItem(key, JSON.stringify(value));
    };
    get = <T extends keyof LocaleStorageSchema>(key: T): LocaleStorageSchema[T] | null => {
        const value = localStorage.getItem(key);
        if (!value) return null;
        try {
            return JSON.parse(value) as LocaleStorageSchema[T];
        } catch (err) {
            return null;
        }
    };
}
export default new LocalStorage();
