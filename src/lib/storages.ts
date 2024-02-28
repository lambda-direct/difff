import { writable } from "svelte/store";

export const showError = writable(false);

export const errorMessage = writable("");
