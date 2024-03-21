<script lang="ts">
    import { browser } from "$app/environment";
    import { onDestroy, onMount } from "svelte";
    import Header from "~/lib/shared/Codemirror/components/Header.svelte";
    import ErrorModal from "~/lib/shared/Codemirror/components/ErrorModal.svelte";
    import SettingsModal from "~/lib/shared/Codemirror/components/SettingsModal.svelte";
    import { errorMessage, isSettingsOpen, showError } from "~/storage/store";
    import DoubleFooter from "~/lib/shared/Codemirror/components/DoubleFooter.svelte";
    import LocalStorage from "~/storage/LocalStorage";
    import type { LocaleStorageResponce } from "~/storage/types";
    import Editor from "~/lib/shared/Codemirror/Editor";
    import type { CursorPosition, UploadEvent } from "~/types";
    import Formatter from "~/utils/Formatter";
    import Converter from "~/utils/Converter";

    export let formatLeft: "json" | "yaml" | "xml";
    export let formatRight: "json" | "yaml" | "xml";
    export let placeholderLeft: string;
    export let placeholderRight: string;

    let elementLeft: HTMLDivElement;
    let valueLeft: string = "";
    let codemirrorLeft: Editor;
    let cursorPositionLeft: CursorPosition = { line: 0, col: 0 };
    let useTabsLeft: boolean = false;
    let indentationLevelLeft: number = formatLeft === "json" ? 4 : 2;
    let storageLeft: LocaleStorageResponce;
    const formatterLeft = new Formatter(formatLeft);

    let elementRight: HTMLDivElement;
    let valueRight: string = "";
    let codemirrorRight: Editor;
    let cursorPositionRight: CursorPosition = { line: 0, col: 0 };
    let useTabsRight: boolean = false;
    let indentationLevelRight: number = formatRight === "json" ? 4 : 2;
    let storageRight: LocaleStorageResponce;
    const formatterRight = new Formatter(formatRight);

    let isDownloadClicked: boolean = false;
    let isCopyClicked: boolean = false;
    let isFormatClicked: boolean = false;
    let isClearClicked: boolean = false;
    let openSettings: () => void;
    let closeSettings: () => void;

    $: {
        if (valueLeft === "") {
            $showError = false;
            $errorMessage = "";
        }
    }

    const handleMainClick = async () => {
        const xml = Converter.jsonToXml(valueLeft);
        const formattedXML = await formatterRight.formatInput(
            xml,
            useTabsRight,
            indentationLevelRight
        );
        codemirrorRight.setFormattingResult(formattedXML);
    };

    const handleFormatClick = async () => {
        isFormatClicked = true;
        setTimeout(() => {
            isFormatClicked = false;
        }, 1000);
        const formattedData = await formatterLeft.formatInput(
            valueLeft,
            useTabsLeft,
            indentationLevelLeft
        );
        codemirrorLeft.setFormattingResult(formattedData);
    };

    const handleClearClick = async () => {
        codemirrorLeft.updateCodemirrorValue("");
        isClearClicked = true;
        codemirrorRight.updateCodemirrorValue("");
        setTimeout(() => {
            isClearClicked = false;
        }, 1000);
    };

    const handlePaste = async () => {
        const input = await Converter.urlToJson(valueLeft);
        const formattedData = await formatterLeft.formatInput(
            input,
            useTabsLeft,
            indentationLevelLeft
        );
        codemirrorLeft.setFormattingResult(formattedData);
    };

    const handleDrop = (event: DragEvent) => {
        event.preventDefault();
        if (event.dataTransfer && event.dataTransfer.files.length > 0) {
            const oldValue = valueLeft;
            const file = event.dataTransfer.files[0];
            const reader = new FileReader();
            reader.onload = async (e: ProgressEvent<FileReader>) => {
                let droppedData = e.target?.result as string;
                droppedData = await Converter.urlToJson(droppedData);
                codemirrorLeft.updateCodemirrorValue(droppedData);
                const formattedData = await formatterLeft.formatInput(
                    droppedData,
                    useTabsLeft,
                    indentationLevelLeft
                );
                codemirrorLeft.setFormattingResult(formattedData);
            };
            if (valueLeft !== oldValue) {
                codemirrorLeft.scrollToTop();
            }
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
                codemirrorLeft.updateCodemirrorValue(droppedData);
                setTimeout(async () => {
                    const formattedData = await formatterLeft.formatInput(
                        droppedData,
                        useTabsLeft,
                        indentationLevelLeft
                    );
                    codemirrorLeft.setFormattingResult(formattedData);
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
        await navigator.clipboard.writeText(valueRight);
    };

    const handleDownloadClick = () => {
        isDownloadClicked = true;
        setTimeout(() => {
            isDownloadClicked = false;
        }, 1000);
        codemirrorRight.downloadFile(valueRight);
    };

    onMount(() => {
        codemirrorLeft = new Editor({
            element: elementLeft,
            outerValueChange: (newValue: string, newCursorPos) => {
                valueLeft = newValue;
                cursorPositionLeft = newCursorPos;
            },
            placeholder: placeholderLeft,
            format: formatLeft,
            readOnly: false
        });
        openSettings = codemirrorLeft.open;
        closeSettings = codemirrorLeft.close;
        storageLeft = LocalStorage.get(formatLeft);
        useTabsLeft = storageLeft?.tab || useTabsLeft;
        indentationLevelLeft = storageLeft?.spaces || indentationLevelLeft;

        codemirrorRight = new Editor({
            element: elementRight,
            outerValueChange: (newValue: string, newCursorPos) => {
                valueRight = newValue;
                cursorPositionRight = newCursorPos;
            },
            placeholder: placeholderRight,
            format: formatRight,
            readOnly: true
        });
        storageRight = LocalStorage.get(formatRight);
        useTabsRight = storageRight?.tab || useTabsRight;
        indentationLevelRight = storageRight?.spaces || indentationLevelRight;
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
        codemirrorLeft?.destroy();
        codemirrorRight?.destroy();
        if (browser) {
            document.removeEventListener("paste", handlePaste);
            document.removeEventListener("drop", handleDrop);
        }
    });
</script>

<Header
    bind:open={openSettings}
    bind:close={closeSettings}
    formats={[formatLeft, formatRight]}
    {handleFileChange}
    tool="converter"
    handleClick={handleMainClick}
/>
<div class="double_field_wrapper">
    <div class="field_wrapper">
        <div class="codemirror-wrapper" bind:this={elementLeft} />
        {#if $showError}
            <ErrorModal />
        {/if}
    </div>
    <div class="field_wrapper">
        <!-- {#if $isSettingsOpen}
        <SettingsModal bind:useTabs bind:indentationLevel format={formatLeft} />
    {/if} -->
        <div class="codemirror-wrapper" bind:this={elementRight} />
    </div>
</div>

<DoubleFooter
    bind:useTabsLeft
    bind:indentationLevelLeft
    {cursorPositionLeft}
    bind:useTabsRight
    bind:indentationLevelRight
    {cursorPositionRight}
    {handleFormatClick}
    {handleCopyClick}
    {handleDownloadClick}
    {handleClearClick}
    {isCopyClicked}
    {isDownloadClicked}
    {isFormatClicked}
    {isClearClicked}
/>

<style lang="scss">
    .codemirror-wrapper {
        height: 60vh;
        background: var(--editor-background, #030711);
    }

    .field_wrapper {
        position: relative;
        width: 100%;
    }

    .double_field_wrapper {
        display: flex;
    }
</style>
