import { browser } from "$app/environment";
import { writable } from "svelte/store";
import LocalStorage from "~/storage/LocalStorage";
import type { Formats } from "./types";

export const showError = writable(false);

export const errorMessage = writable("");

export const isSettingsOpen = writable(false);

export const storageSettings = writable({
    json: (browser && LocalStorage.get("json")) || {
        spaces: 4,
        tab: false
    },
    yaml: (browser && LocalStorage.get("yaml")) || {
        spaces: 2
    },
    xml: (browser && LocalStorage.get("xml")) || {
        spaces: 2
    }
});

storageSettings.subscribe((val) => {
    if (browser) {
        Object.entries(val).forEach(([format, value]) => {
            LocalStorage.set(format as Formats, value);
        });
    }
});
