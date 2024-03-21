<script lang="ts">
    import CopyIcon from "~/lib/icons/CopyIcon.svelte";
    import DownloadIcon from "~/lib/icons/DownloadScon.svelte";
    import ClearIcon from "~/lib/icons/ClearIcon.svelte";
    import MagicWandIcon from "~/lib/icons/MagicWandIcon.svelte";
    import SuccessIcon from "~/lib/icons/SuccessIcon.svelte";
    import { getColumn, getLine } from "~/lib/shared/Codemirror/components/utils";

    export let cursorPositionLeft: { line: number; col: number };
    export let useTabsLeft: boolean;
    export let indentationLevelLeft: number;
    export let isFormatClicked: boolean;
    export let isClearClicked: boolean;
    export let handleFormatClick: () => void;
    export let handleClearClick: () => void;

    export let cursorPositionRight: { line: number; col: number };
    export let useTabsRight: boolean;
    export let indentationLevelRight: number;
    export let isDownloadClicked: boolean;
    export let isCopyClicked: boolean;
    export let handleCopyClick: () => void;
    export let handleDownloadClick: () => void;

    $: lineLeft = getLine(cursorPositionLeft.line);
    $: columnLeft = getColumn(cursorPositionLeft.col);
    $: lineRight = getLine(cursorPositionRight.line);
    $: columnRight = getColumn(cursorPositionRight.col);
</script>

<div class="footer_wrapper">
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
                <span class="btn_title">Format</span>
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
                <span class="btn_title">Clear</span>
            </button>
        </div>
    </div>
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
                <span class="btn_title">Download</span>
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
                <span class="btn_title">Copy</span>
            </button>
        </div>
    </div>
</div>

<style lang="scss">
    .footer_wrapper {
        display: flex;
        gap: 12px;
        padding: 0 12px;
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

    .btn_title {
        @media (max-width: 420px) {
            display: none;
        }
    }

    .footer {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
    }
</style>
