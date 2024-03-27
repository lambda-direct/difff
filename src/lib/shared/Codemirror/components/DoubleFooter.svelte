<script lang="ts">
    import CopyIcon from "~/lib/icons/CopyIcon.svelte";
    import DownloadIcon from "~/lib/icons/DownloadScon.svelte";
    import ClearIcon from "~/lib/icons/ClearIcon.svelte";
    import MagicWandIcon from "~/lib/icons/MagicWandIcon.svelte";
    import SuccessIcon from "~/lib/icons/SuccessIcon.svelte";
    import { getColumn, getLine } from "~/lib/shared/Codemirror/components/utils";
    import { storageSettings } from "~/storage/store";
    import type { Formats } from "~/types";

    export let dividerPos: number;

    export let formatLeft: Formats;
    export let cursorPositionLeft: { line: number; col: number };
    export let isFormatClicked: boolean;
    export let isClearClicked: boolean;
    export let handleFormatClick: () => void;
    export let handleClearClick: () => void;

    export let formatRight: Formats;
    export let cursorPositionRight: { line: number; col: number };
    export let isDownloadClicked: boolean;
    export let isCopyClicked: boolean;
    export let handleCopyClick: () => void;
    export let handleDownloadClick: () => void;

    let useTabsLeft: boolean;
    let indentationLevelLeft: number;
    let useTabsRight: boolean;
    let indentationLevelRight: number;

    $: useTabsLeft = $storageSettings[formatLeft].tab || false;
    $: indentationLevelLeft = $storageSettings[formatLeft].spaces;
    $: useTabsRight = $storageSettings[formatRight].tab || false;
    $: indentationLevelRight = $storageSettings[formatRight].spaces;

    $: lineLeft = getLine(cursorPositionLeft.line);
    $: columnLeft = getColumn(cursorPositionLeft.col);
    $: lineRight = getLine(cursorPositionRight.line);
    $: columnRight = getColumn(cursorPositionRight.col);
</script>

<div class="footer_wrapper" style={`--pos: ${dividerPos}%;`}>
    <div class="footer">
        <div>
            <span class="cursor-position">
                Ln {lineLeft}, Col {columnLeft}
            </span>
            <span class="cursor-position">
                {useTabsLeft ? "Tab Size" : "Spaces"}: {indentationLevelLeft}
            </span>
        </div>
        <div class="icon-btn-wrap">
            <button
                on:click={handleFormatClick}
                title="download"
                aria-label="download"
                aria-labelledby="download"
                name="download"
                class="icon-button"
            >
                {#if isFormatClicked}
                    <SuccessIcon />
                {:else}
                    <MagicWandIcon />
                {/if}
            </button>
            <button
                on:click={handleClearClick}
                title="copy"
                aria-label="copy"
                aria-labelledby="copy"
                name="copy"
                class="icon-button"
            >
                {#if isClearClicked}
                    <SuccessIcon />
                {:else}
                    <ClearIcon />
                {/if}
            </button>
        </div>
    </div>
    <div class="divider" />
    <div class="footer">
        <div>
            <span class="cursor-position">
                Ln {lineRight}, Col {columnRight}
            </span>
            <span class="cursor-position">
                {useTabsRight ? "Tab Size" : "Spaces"}: {indentationLevelRight}
            </span>
        </div>
        <div class="icon-btn-wrap">
            <button
                on:click={handleDownloadClick}
                title="download"
                aria-label="download"
                aria-labelledby="download"
                name="download"
                class="icon-button"
            >
                {#if isDownloadClicked}
                    <SuccessIcon />
                {:else}
                    <DownloadIcon />
                {/if}
            </button>
            <button
                on:click={handleCopyClick}
                title="copy"
                aria-label="copy"
                aria-labelledby="copy"
                name="copy"
                class="icon-button"
            >
                {#if isCopyClicked}
                    <SuccessIcon />
                {:else}
                    <CopyIcon />
                {/if}
            </button>
        </div>
    </div>
</div>

<style lang="scss">
    .footer_wrapper {
        position: relative;
        display: grid;
        grid-template-columns: var(--pos) 1fr;
        height: 54px;
        background: #030711;
        border-top: 1px solid #313345;
        border-bottom-left-radius: 8px;
        border-bottom-right-radius: 8px;
    }

    .icon-btn-wrap {
        display: flex;
        gap: 8px;
    }

    .icon-button {
        display: flex;
        align-items: center;
        height: 36px;
        gap: 4px;
        padding: 0 8px;
        background: #030711;
        border: 1px solid #313345;
        border-radius: 8px;
        color: #7d8799;
        transition: all 0.2s;
        &:hover {
            background: #040f1e;
            color: #e1e1e1;
        }
    }

    .cursor-position {
        font-family: "NotoSans-Regular", sans-serif;
        font-size: 12px;
        color: #7d8799;
        background: transparent;
        border: none;
    }

    .divider {
        position: absolute;
        left: var(--pos);
        width: 1px;
        height: 100%;
        background-color: #313345;
        z-index: 5;
    }

    .footer {
        display: flex;
        align-items: center;
        padding: 0 12px;
        justify-content: space-between;
        width: 100%;
    }
</style>
