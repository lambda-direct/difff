<script lang="ts">
    import { browser } from "$app/environment";
    import { onDestroy, onMount } from "svelte";
    import Header from "~/lib/shared/Codemirror/components/Header.svelte";
    import ErrorModal from "~/lib/shared/Codemirror/components/ErrorModal.svelte";
    import SettingsModal from "~/lib/shared/Codemirror/components/SettingsModal.svelte";
    import { errorMessage, isSettingsOpen, showError } from "~/storage/store";
    import Footer from "~/lib/shared/Codemirror/components/Footer.svelte";
    import LocalStorage from "~/storage/LocalStorage";
    import type { LocaleStorageResponce } from "~/storage/types";
    import Editor from "~/lib/shared/Codemirror/Editor";
    import type { CursorPosition, UploadEvent } from "~/types";

    export let format: "json" | "yaml" | "xml";
    export let placeholder: string;

    let codemirror: Editor;
    let value: string = "";
    let element: HTMLDivElement;
    let isDownloadClicked: boolean = false;
    let isCopyClicked: boolean = false;
    let storage: LocaleStorageResponce;
    let cursorPosition: CursorPosition = { line: 0, col: 0 };
    let openSettings: () => void;
    let closeSettings: () => void;
    let useTabs: boolean = false;
    let indentationLevel: number = format === "json" ? 4 : 2;

    $: {
        if (value === "") {
            $showError = false;
            $errorMessage = "";
        }
    }

    const handleFormatClick = async () => {
        await codemirror.formatInput(value);
    };

    const handlePaste = async () => {
        await codemirror.formatInput(value);
    };

    const handleDrop = (event: DragEvent) => {
        event.preventDefault();
        codemirror.dragAndDropFile(event, value);
    };

    const handleFileChange = (event: UploadEvent) => {
        event.preventDefault();
        codemirror.uploadFile(event);
    };

    const handleCopyClick = async () => {
        isCopyClicked = true;
        setTimeout(() => {
            isCopyClicked = false;
        }, 1000);
        await navigator.clipboard.writeText(value);
    };

    const handleDownloadClick = () => {
        isDownloadClicked = true;
        setTimeout(() => {
            isDownloadClicked = false;
        }, 1000);
        codemirror.downloadFile(value);
    };

    onMount(() => {
        codemirror = new Editor(
            element,
            (newValue: string, newCursorPos) => {
                value = newValue;
                cursorPosition = newCursorPos;
            },
            placeholder,
            format
        );
        openSettings = codemirror.open;
        closeSettings = codemirror.close;
        storage = LocalStorage.get(format);
        useTabs = storage?.tab || useTabs;
        indentationLevel = storage?.spaces || indentationLevel;
        if (browser) {
            document.addEventListener("paste", handlePaste);
            document.addEventListener("drop", handleDrop);
            const cmDiv = document.getElementsByClassName("cm-content");
            if (cmDiv.length > 0) {
                cmDiv[0].setAttribute("aria-label", "JSON input");
                cmDiv[0].setAttribute("aria-labelledby", "JSON input");
            }
        }
    });

    onDestroy(() => {
        codemirror?.destroy();
        if (browser) {
            document.removeEventListener("paste", handlePaste);
            document.removeEventListener("drop", handleDrop);
        }
    });
</script>

<Header
    bind:open={openSettings}
    bind:close={closeSettings}
    {format}
    {handleFileChange}
    {handleFormatClick}
/>
<div class="field_wrapper">
    <div class="codemirror-wrapper" bind:this={element} />
    {#if $isSettingsOpen}
        <SettingsModal bind:useTabs bind:indentationLevel {format} />
    {/if}
    {#if $showError}
        <ErrorModal />
    {/if}
</div>
<Footer
    bind:useTabs
    bind:indentationLevel
    {handleCopyClick}
    {handleDownloadClick}
    {isCopyClicked}
    {cursorPosition}
    {isDownloadClicked}
/>

<style lang="scss">
    .codemirror-wrapper {
        height: calc(60vh + 54px);
        background: var(--editor-background, #030711);
    }

    .field_wrapper {
        position: relative;
    }
</style>
