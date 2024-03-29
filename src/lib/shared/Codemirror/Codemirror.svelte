<script lang="ts">
    import Formatter from "~/utils/Formatter";
    import Converter from "~/utils/Converter";
    import { browser } from "$app/environment";
    import { onDestroy, onMount } from "svelte";
    import LocalStorage from "~/storage/LocalStorage";
    import Editor from "~/lib/shared/Codemirror/Editor";
    import Header from "~/lib/shared/Codemirror/components/Header.svelte";
    import Footer from "~/lib/shared/Codemirror/components/Footer.svelte";
    import ErrorModal from "~/lib/shared/Codemirror/components/ErrorModal.svelte";
    import SearchField from "~/lib/shared/Codemirror/components/SearchField.svelte";
    import SettingsModal from "~/lib/shared/Codemirror/components/SettingsModal.svelte";
    import { errorMessage, showError, storageSettings } from "~/storage/store";
    import type { LocaleStorageResponce } from "~/storage/types";
    import type { CursorPosition, Formats, SearchData, Tools, UploadEvent } from "~/types";

    export let format: Formats;
    export let placeholder: string;
    export let label: string;
    export let tool: Tools;

    let codemirror: Editor;
    let value: string = "";
    let element: HTMLDivElement;
    let isDownloadClicked: boolean = false;
    let isCopyClicked: boolean = false;
    let storage: LocaleStorageResponce;
    let cursorPosition: CursorPosition = { line: 0, col: 0 };
    let useTabs: boolean;
    let indentationLevel: number;
    let performSearch: (searchData: SearchData) => void;
    let nextSearchValue: () => void;
    let previousSearchValue: () => void;
    let selectAllMatches: () => void;
    let replaceNext: () => void;
    let replaceAll: () => void;
    let closeSearch: () => void;

    const formatter = new Formatter(format);

    $: useTabs = $storageSettings[format].tab || false;
    $: indentationLevel = $storageSettings[format].spaces;
    $: {
        if (value === "") {
            $showError = false;
            $errorMessage = "";
        }
    }

    const handleMainClick = async () => {
        if (tool === "formatter") {
            const formattedData = await formatter.formatInput(value, useTabs, indentationLevel);
            codemirror.setFormattingResult(formattedData);
        }
        if (tool === "minifier") {
            const minify = Converter.minify(format);
            if (minify) {
                const minifiedData = minify(value);
                codemirror.updateCodemirrorValue(minifiedData);
            }
        }
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

        performSearch = codemirror.performSearch;
        nextSearchValue = codemirror.nextSearchValue;
        previousSearchValue = codemirror.previousSearchValue;
        selectAllMatches = codemirror.selectAllMatches;
        replaceNext = codemirror.replace;
        replaceAll = codemirror.replaceAll;
        closeSearch = codemirror.closeSearch;

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

<Header formats={[format]} {handleFileChange} {tool} {handleMainClick} {closeSearch} />
<div class="field_wrapper">
    <div class="codemirror-wrapper" bind:this={element} />
    <SearchField
        {performSearch}
        {nextSearchValue}
        {previousSearchValue}
        {selectAllMatches}
        {replaceNext}
        {replaceAll}
        {closeSearch}
    />
    <SettingsModal formats={[format]} />
    <ErrorModal />
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
        height: 60vh;
        background: var(--editor-background, #030711);
    }

    .field_wrapper {
        position: relative;
    }
</style>
