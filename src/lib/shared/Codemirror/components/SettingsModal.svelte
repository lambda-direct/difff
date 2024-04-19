<script lang="ts">
    import { isSettingsOpen, storageSettings } from "~/storage/store";
    import type { Formats } from "~/types";
    import type { ChosenSetting, LocaleStorageSchema } from "~/storage/types";
    import { browser } from "$app/environment";
    import { onMount } from "svelte";

    export let formats: Formats[];

    const handleMenuClose = (event: MouseEvent) => {
        const target = event.target as HTMLElement;

        const isSettingsButton =
            target.closest("[name=settings]") !== null ||
            target.closest("[name=settings] svg") !== null;

        const isInsideModal = target.closest(".settings") === null;

        if (!isSettingsButton && isInsideModal) {
            $isSettingsOpen = false;
            if (browser) document.body.removeEventListener("click", handleMenuClose);
        }
    };

    const handleSettingChange = (
        format: Formats,
        chosenSetting: ChosenSetting,
        value: number | boolean
    ) => {
        storageSettings.update((storageSettings) => {
            const newSettings: LocaleStorageSchema = { ...storageSettings };

            if (newSettings[format]) {
                const settings = newSettings[format];
                if ("tab" in settings && chosenSetting === "tab") settings.tab = value as boolean;
                if (chosenSetting === "spaces") settings.spaces = value as number;
            }

            return newSettings;
        });
    };

    const handleCheckboxChange = (format: Formats, setting: ChosenSetting, event: Event) => {
        const checkbox = event.target as HTMLInputElement;
        handleSettingChange(format, setting, checkbox.checked);
    };

    const handleSelectChange = (format: Formats, setting: ChosenSetting, event: Event) => {
        const select = event.target as HTMLSelectElement;
        handleSettingChange(format, setting, parseInt(select.value));
    };

    onMount(() => {
        document.addEventListener("click", handleMenuClose);
    });
</script>

{#if $isSettingsOpen}
    <div class="settings">
        {#each formats as format}
            <span>{format.toUpperCase()}</span>
            {#if format === "json" || format === "js" || format === "sql"}
                <div class="setting_option">
                    <p class="option_label">Tabs:</p>
                    <div class="switch">
                        <input
                            checked={$storageSettings[format].tab}
                            class="switch-checkbox"
                            id="toggler"
                            type="checkbox"
                            on:change={(event) => handleCheckboxChange(format, "tab", event)}
                        />
                        <label
                            class="toggler-inner"
                            for="toggler"
                            style="background: {$storageSettings[format].tab
                                ? '#e1e1e1'
                                : '#F5F5f014'}"
                        >
                            <span class="toggler-switcher" />
                        </label>
                    </div>
                </div>
            {/if}

            <div class="setting_option">
                <p class="option_label">Indentation-level:</p>
                <select
                    value={$storageSettings[format].spaces}
                    on:change={(event) => handleSelectChange(format, "spaces", event)}
                    name="indentationLevel"
                    class="indentation_select"
                >
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                    <option value={6}>6</option>
                    <option value={7}>7</option>
                    <option value={8}>8</option>
                </select>
            </div>
        {/each}
    </div>
{/if}

<style>
    .settings {
        user-select: none;
        display: flex;
        align-items: flex-start;
        flex-direction: column;
        padding: 4px 12px;
        background: #040b1a;
        border: 1px solid #313345;
        border-radius: 6px;
        box-shadow: 0px 1px 10px #000;
        color: #b1b1b1;
        top: 6px;
        position: absolute;
        right: 24px;
        z-index: 5;
        animation: floatIn 0.2s ease-in-out 0s forwards;
    }

    @keyframes floatIn {
        to {
            top: 12px;
        }
    }

    .setting_option {
        height: 36px;
        justify-content: right;
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .option_label {
        margin: 0;
        padding: 0 10px 0 0;
        display: flex;
        align-items: center;
        font-family: inherit;
        font-size: 16px;
        color: #949494;
    }

    .switch {
        width: 36px;
        height: 14px;
        display: inline-block;
        position: relative;
    }

    .indentation_select {
        height: 22px;
        text-align: center;
        background: #040b1a;
        border: 1px solid #313345;
        border-radius: 4px;
        color: #e1e1e1;
        cursor: pointer;
        font-size: 14px;
        &:focus-visible {
            outline: none;
        }
    }

    input {
        opacity: 0;
        &:disabled {
            cursor: default;
        }
    }

    .switch-checkbox {
        height: 0;
        width: 0;
        user-select: none;
        visibility: hidden;
        display: none;
    }

    .toggler-inner {
        display: flex;
        align-items: center;
        justify-content: space-between;
        cursor: pointer;
        width: 32px;
        height: 18px;
        border-radius: 100px;
        position: relative;
        transition:
            background-color 0.3s,
            padding 0.3s;
    }

    .toggler-inner .toggler-switcher {
        content: "";
        position: absolute;
        width: 14px;
        height: 14px;
        margin-left: 2px;
        border-radius: 100%;
        transition:
            left 0.2s,
            background-color 0.3s;
        background: #040b1a;
    }

    .switch-checkbox:checked + .toggler-inner .toggler-switcher {
        left: calc(100% - 3.5px);

        transform: translateX(-100%);
    }
</style>
