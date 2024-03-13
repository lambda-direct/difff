<script lang="ts">
    import { page } from "$app/stores";
    import { onMount } from "svelte";
    import { isSettingsOpen } from "~/lib/storages";
    import { browser } from "$app/environment";
    import { setTypedStorageItem } from "~/utils/helpers";

    export let useTabs: boolean;
    export let indentationLevel: number;

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

    $: {
        if ($page.url.pathname.includes("yaml")) {
            setTypedStorageItem("yaml", { spaces: indentationLevel });
        }
        if ($page.url.pathname.includes("xml")) {
            setTypedStorageItem("xml", { spaces: indentationLevel });
        }
        if (!$page.url.pathname.includes("yaml") && !$page.url.pathname.includes("xml")) {
            setTypedStorageItem("json", {
                tab: useTabs,
                spaces: indentationLevel
            });
        }
    }
    onMount(() => {
        document.addEventListener("click", handleMenuClose);
    });
</script>

<div class="settings">
    {#if !$page.url.pathname.includes("yaml") && !$page.url.pathname.includes("xml")}
        <div class="setting_option">
            <p class="option_label">Tabs:</p>
            <div class="switch">
                <input
                    bind:checked={useTabs}
                    class="switch-checkbox"
                    id="toggler"
                    type="checkbox"
                />
                <label
                    class="toggler-inner"
                    for="toggler"
                    style="background: {useTabs ? '#e1e1e1' : '#F5F5f014'}"
                >
                    <span class="toggler-switcher" />
                </label>
            </div>
        </div>
    {/if}
    <div class="setting_option">
        <p class="option_label">Indentation-level:</p>
        <select bind:value={indentationLevel} name="indentationLevel" class="indentation_select">
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
</div>

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
