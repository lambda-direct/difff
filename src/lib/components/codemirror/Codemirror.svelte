<script lang="ts">
    import { browser } from "$app/environment";
    import { EditorView } from "@codemirror/view";
    import { onDestroy, onMount } from "svelte";
    import Header from "~/lib/components/codemirror/components/Header.svelte";
    import ErrorModal from "~/lib/components/shared/ErrorModal.svelte";
    import SettingsModal from "~/lib/components/shared/SettingsModal.svelte";
    import { errorMessage, isSettingsOpen, showError } from "~/lib/storages";
    import Footer from "~/lib/components/codemirror/components/Footer.svelte";
    import LocalStorage from "~/storage/LocalStorage";
    import type { LocaleStorageResponce } from "~/storage/types";
    import Redactor from "~/lib/components/codemirror/Redactor";
    import type { CursorPosition, UploadEvent } from "~/types";

    export let format: "json" | "yaml" | "xml";
    export let placeholder: string;
    $: console.log(value);

    let codemirror: Redactor;
    let value: string = "";
    let view: EditorView;
    let element: HTMLDivElement;
    let isDownloadClicked: boolean = false;
    let isCopyClicked: boolean = false;
    let storage: LocaleStorageResponce;
    let cursorPosition: CursorPosition = { line: 0, col: 0 };

    $: useTabs = storage && "tab" in storage ? storage.tab : false;
    $: indentationLevel = storage?.spaces || format === "json" ? 4 : 2;
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
        codemirror = new Redactor(
            element,
            (newValue: string, newCursorPos) => {
                value = newValue;
                cursorPosition = newCursorPos;
            },
            placeholder,
            format
        );
        storage = LocalStorage.get(format);
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

{#if codemirror}
    <Header
        bind:open={codemirror.open}
        bind:close={codemirror.close}
        {format}
        {handleFileChange}
        {handleFormatClick}
    />
{/if}
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
    {handleCopyClick}
    {handleDownloadClick}
    {useTabs}
    {isCopyClicked}
    {cursorPosition}
    {indentationLevel}
    {isDownloadClicked}
/>

<style lang="scss">
    .codemirror-wrapper {
        height: 60vh;
        background: var(--editor-background, #030711);
    }

    .field_wrapper {
        position: relative;
    }
</style>
