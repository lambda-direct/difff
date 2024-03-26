<script lang="ts">
    import { browser } from "$app/environment";
    import { onDestroy, onMount } from "svelte";
    import Header from "~/lib/shared/Codemirror/components/Header.svelte";
    import ErrorModal from "~/lib/shared/Codemirror/components/ErrorModal.svelte";
    import SettingsModal from "~/lib/shared/Codemirror/components/SettingsModal.svelte";
    import { errorMessage, isSettingsOpen, showError, storageSettings } from "~/storage/store";
    import Footer from "~/lib/shared/Codemirror/components/Footer.svelte";
    import LocalStorage from "~/storage/LocalStorage";
    import type { LocaleStorageResponce } from "~/storage/types";
    import Editor from "~/lib/shared/Codemirror/Editor";
    import type { CursorPosition, UploadEvent } from "~/types";
    import Formatter from "~/utils/Formatter";
    import Converter from "~/utils/Converter";

    export let format: "json" | "yaml" | "xml";
    export let placeholder: string;
    export let label: string;

    let codemirror: Editor;
    let value: string = "";
    let element: HTMLDivElement;
    let isDownloadClicked: boolean = false;
    let isCopyClicked: boolean = false;
    let isMinifyClicked: boolean = false;
    let storage: LocaleStorageResponce;
    let cursorPosition: CursorPosition = { line: 0, col: 0 };
    let openSettings: () => void;
    let closeSettings: () => void;
    let useTabs: boolean;
    let indentationLevel: number;

    const formatter = new Formatter(format);

    $: useTabs = $storageSettings[format].tab || false;
    $: indentationLevel = $storageSettings[format].spaces;
    $: {
        if (value === "") {
            $showError = false;
            $errorMessage = "";
        }
    }

    const handleMinifyClick = () => {
        isMinifyClicked = true;
        setTimeout(() => {
            isMinifyClicked = false;
        }, 1000);
        const minifiedData = Converter.minifyJSON(value);
        codemirror.updateCodemirrorValue(minifiedData);
    };
    const handleFormatClick = async () => {
        const formattedData = await formatter.formatInput(value, useTabs, indentationLevel);
        codemirror.setFormattingResult(formattedData);
    };

    const handlePaste = async () => {
        const input = await Converter.urlToJson(value);
        const formattedData = await formatter.formatInput(input, useTabs, indentationLevel);
        codemirror.setFormattingResult(formattedData);
    };

    const handleDrop = (event: DragEvent) => {
        event.preventDefault();
        if (event.dataTransfer && event.dataTransfer.files.length > 0) {
            const oldValue = value;
            const file = event.dataTransfer.files[0];
            const reader = new FileReader();
            reader.onload = async (e: ProgressEvent<FileReader>) => {
                let droppedData = e.target?.result as string;
                droppedData = await Converter.urlToJson(droppedData);
                codemirror.updateCodemirrorValue(droppedData);
                const formattedData = await formatter.formatInput(
                    droppedData,
                    useTabs,
                    indentationLevel
                );
                codemirror.setFormattingResult(formattedData);
            };
            if (value !== oldValue) codemirror.scrollToTop();
            reader.readAsText(file);
        }
    };

    const handleFileChange = (event: UploadEvent) => {
        event.preventDefault();
        if (
            event.currentTarget &&
            event.currentTarget.files &&
            event.currentTarget.files.length > 0
        ) {
            const file = event.currentTarget.files[0];
            const reader = new FileReader();
            reader.onload = async (e: ProgressEvent<FileReader>) => {
                let droppedData = e.target?.result as string;
                droppedData = await Converter.urlToJson(droppedData);
                codemirror.updateCodemirrorValue(droppedData);
                setTimeout(async () => {
                    const formattedData = await formatter.formatInput(
                        droppedData,
                        useTabs,
                        indentationLevel
                    );
                    codemirror.setFormattingResult(formattedData);
                }, 10); // REDO
            };
            reader.readAsText(file);
        }
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
        codemirror = new Editor({
            element,
            outerValueChange: (newValue: string, newCursorPos) => {
                value = newValue;
                cursorPosition = newCursorPos;
            },
            placeholder,
            label,
            format,
            readOnly: false
        });
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
    formats={[format]}
    {handleFileChange}
    tool="formatter"
    handleClick={handleFormatClick}
/>
<div class="field_wrapper">
    <div class="codemirror-wrapper" bind:this={element} />
    {#if $isSettingsOpen}
        <SettingsModal formats={[format]} />
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
    {handleMinifyClick}
    {isCopyClicked}
    {cursorPosition}
    {isDownloadClicked}
    {isMinifyClicked}
    {format}
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
