<script lang="ts">
    import CopyIcon from "~/lib/icons/CopyIcon.svelte";
    import DownloadIcon from "~/lib/icons/DownloadScon.svelte";
    import SuccessIcon from "~/lib/icons/SuccessIcon.svelte";
    import { getColumn, getLine } from "~/lib/components/codemirror/components/utils";

    export let cursorPosition: { line: number; col: number };
    export let useTabs: boolean;
    export let indentationLevel: number;
    export let isDownloadClicked: boolean;
    export let isCopyClicked: boolean;
    export let handleCopyClick: () => void;
    export let handleDownloadClick: () => void;

    $: line = getLine(cursorPosition.line);
    $: column = getColumn(cursorPosition.col);
</script>

<div class="footer">
    <div>
        <span class="cursor-position">
            Ln {line}, Col {column}
        </span>
        <span class="cursor-position">
            {useTabs ? "Tab Size" : "Spaces"}: {indentationLevel}
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

<style lang="scss">
    .icon-btn-wrap {
        display: flex;
        gap: 8px;
    }

    .icon-button {
        display: flex;
        align-items: center;
        height: 36px;
        padding: 0 7px;
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
        padding: 0 12px;
        height: 54px;
        background: #030711;
        border-top: 1px solid #313345;
        border-bottom-left-radius: 8px;
        border-bottom-right-radius: 8px;
    }
</style>
