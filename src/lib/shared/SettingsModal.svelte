<script lang="ts">
    import { onDestroy, onMount } from "svelte";
    import { isSettingsOpen } from "../storages";
    import { page } from "$app/stores";

    export let useTabs: boolean;
    export let indentationLevel: number;
    $: console.log("indentationLevel:", typeof indentationLevel);

    const handleBodyClick = (event: MouseEvent) => {
        const modal = document.querySelector(".settings");
        if (
            modal &&
            !modal.contains(event.target as Node) &&
            event.target &&
            (event.target as HTMLInputElement).name !== "settings-btn"
        ) {
            isSettingsOpen.set(false);
        }
    };
    onMount(() => {
        document.body.addEventListener("click", handleBodyClick);

        return () => {
            document.body.removeEventListener("click", handleBodyClick);
        };
    });

    onDestroy(() => {
        document.body.removeEventListener("click", handleBodyClick);
    });
</script>

<div class="settings">
    {#if !$page.url.pathname.includes("yaml")}
        <div class="setting_option">
            <p class="option_label">Tabs</p>
            <div class="switch">
                <label>
                    <input type="checkbox" bind:checked={useTabs} />
                    <span class="slider"></span>
                </label>
            </div>
        </div>
    {/if}
    <div class="setting_option">
        <p class="option_label">Indentation-level:</p>
        <select bind:value={indentationLevel} name="indentationLevel" class="indentation_select">
            <option hidden disabled value="" selected>{indentationLevel}</option>
            <option class="potion" value={1}>1</option>
            <option class="potion" value={2}>2</option>
            <option class="potion" value={3}>3</option>
            <option class="potion" value={4}>4</option>
            <option class="potion" value={5}>5</option>
            <option class="potion" value={6}>6</option>
            <option class="potion" value={8}>8</option>
            <option class="potion" value={10}>10</option>
        </select>
    </div>
</div>

<style lang="scss">
    .potion {
        border-radius: 4px;
    }
    .settings {
        display: flex;
        align-items: flex-start;
        flex-direction: column;
        padding: 4px 12px;
        background: #040b1a;
        border: 1px solid #313345;
        border-radius: 6px;
        box-shadow: 0px 1px 10px #000;
        color: #b1b1b1;
        bottom: 60px;
        position: absolute;
        left: 12px;
        z-index: 5;
        animation: floatIn 0.2s ease-in-out 0s forwards;
    }

    @keyframes floatIn {
        to {
            bottom: 66px;
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
        width: 35px;
        height: 10px;
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

    .slider {
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: #424242;
        border-radius: 34px;
        cursor: pointer;
        position: absolute;
        transition: 0.4s;
        &::before {
            height: 20px;
            width: 20px;
            left: -1px;
            top: -5px;
            content: "";
            position: absolute;
            background: #737373;
            border-radius: 50%;
            outline: none;
            transition: 0.4s;
        }
    }

    input {
        opacity: 0;
    }

    input:checked + .slider {
        background-color: #296928;
    }

    input:checked + .slider:before {
        transform: translateX(17px);
    }
</style>
