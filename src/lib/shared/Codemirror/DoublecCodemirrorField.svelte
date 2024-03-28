<script lang="ts">
    import { browser } from "$app/environment";
    import { onDestroy, onMount } from "svelte";
    import Header from "~/lib/shared/Codemirror/components/Header.svelte";
    import ErrorModal from "~/lib/shared/Codemirror/components/ErrorModal.svelte";
    import SettingsModal from "~/lib/shared/Codemirror/components/SettingsModal.svelte";
    import {
        errorMessage,
        isSearchOpen,
        isSettingsOpen,
        showError,
        storageSettings
    } from "~/storage/store";
    import DoubleFooter from "~/lib/shared/Codemirror/components/DoubleFooter.svelte";
    import LocalStorage from "~/storage/LocalStorage";
    import ChangeConvertors from "~/lib/icons/ChangeConvertors.svelte";
    import type { CursorPosition, Formats, SearchData, UploadEvent } from "~/types";
    import type { LocaleStorageResponce } from "~/storage/types";
    import Editor from "~/lib/shared/Codemirror/Editor";
    import Formatter from "~/utils/Formatter";
    import Converter from "~/utils/Converter";
    import { goto } from "$app/navigation";
    import SearchField from "~/lib/shared/Codemirror/components/SearchField.svelte";

    export let formatLeft: Formats;
    export let formatRight: Formats;
    export let placeholderLeft: string;
    export let placeholderRight: string;
    export let convertFunction: (input: string) => string;
    export let labelLeft: string;
    export let labelRight: string;

    let elementLeft: HTMLDivElement;
    let valueLeft: string = "";
    let codemirrorLeft: Editor;
    let cursorPositionLeft: CursorPosition = { line: 0, col: 0 };
    let useTabsLeft: boolean;
    let indentationLevelLeft: number;
    let storageLeft: LocaleStorageResponce;

    const formatterLeft = new Formatter(formatLeft);

    let elementRight: HTMLDivElement;
    let valueRight: string = "";
    let codemirrorRight: Editor;
    let cursorPositionRight: CursorPosition = { line: 0, col: 0 };
    let useTabsRight: boolean;
    let indentationLevelRight: number;
    let storageRight: LocaleStorageResponce;
    const formatterRight = new Formatter(formatRight);

    let dividerPos = 50;
    let isDownloadClicked: boolean = false;
    let isCopyClicked: boolean = false;
    let isFormatClicked: boolean = false;
    let isClearClicked: boolean = false;
    let performSearch: (searchData: SearchData) => void;
    let nextSearchValue: () => void;
    let previousSearchValue: () => void;
    let selectAllMatches: () => void;
    let replaceNext: () => void;
    let replaceAll: () => void;
    let closeSearch: () => void;

    $: useTabsLeft = $storageSettings[formatLeft].tab || false;
    $: indentationLevelLeft = $storageSettings[formatLeft].spaces;
    $: useTabsRight = $storageSettings[formatRight].tab || false;
    $: indentationLevelRight = $storageSettings[formatRight].spaces;
    $: {
        if (valueLeft === "") {
            $showError = false;
            $errorMessage = "";
        }
    }

    const handleMainClick = async () => {
        const converted = convertFunction(valueLeft);
        const formattedResult = await formatterRight.formatInput(
            converted,
            useTabsRight,
            indentationLevelRight
        );
        codemirrorRight.setFormattingResult(formattedResult);
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

    const handleDividerMove = (event: MouseEvent) => {
        const wrapperRect = document
            .querySelector(".double_field_wrapper")
            ?.getBoundingClientRect();
        if (wrapperRect) {
            const newX = ((event.clientX - wrapperRect.left) / wrapperRect.width) * 100;
            dividerPos = Math.max(20, Math.min(newX, 82));
        }
    };

    const handleMouseUp = () => {
        window.removeEventListener("mousemove", handleDividerMove);
        window.removeEventListener("mouseup", handleMouseUp);
        if (browser) document.body.style.cursor = "";
    };

    const handleMouseDown = () => {
        window.addEventListener("mousemove", handleDividerMove);
        window.addEventListener("mouseup", handleMouseUp);
        if (browser) document.body.style.cursor = "ew-resize";
    };

    onMount(() => {
        codemirrorLeft = new Editor({
            element: elementLeft,
            outerValueChange: (newValue: string, newCursorPos) => {
                valueLeft = newValue;
                cursorPositionLeft = newCursorPos;
            },
            placeholder: placeholderLeft,
            label: labelLeft,
            format: formatLeft,
            readOnly: false
        });
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
            label: labelRight,
            format: formatRight,
            readOnly: true
        });

        performSearch = codemirrorLeft.performSearch;
        nextSearchValue = codemirrorLeft.nextSearchValue;
        previousSearchValue = codemirrorLeft.previousSearchValue;
        selectAllMatches = codemirrorLeft.selectAllMatches;
        replaceNext = codemirrorLeft.replace;
        replaceAll = codemirrorLeft.replaceAll;
        closeSearch = codemirrorLeft.closeSearch;

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
    formats={[formatLeft, formatRight]}
    {handleFileChange}
    tool="converter"
    handleClick={handleMainClick}
    {closeSearch}
/>
<div class="double_field_wrapper" style={`--pos: ${dividerPos}%;`}>
    <div class="field_wrapper">
        <div class="codemirror-wrapper" bind:this={elementLeft} />
        {#if $isSearchOpen}
            <SearchField
                {performSearch}
                {nextSearchValue}
                {previousSearchValue}
                {selectAllMatches}
                {replaceNext}
                {replaceAll}
                {closeSearch}
            />
        {/if}
        {#if $showError}
            <ErrorModal />
        {/if}
    </div>
    <div class="divider" role="button" tabindex="0" on:mousedown={handleMouseDown}>
        <button
            aria-labelledby="SwitchLanguages"
            aria-label="SwitchLanguages"
            class="icon-button"
            on:click|stopPropagation={() => {
                goto(`/converter/${formatRight}-to-${formatLeft}`);
            }}
        >
            <ChangeConvertors />
        </button>
    </div>
    <div class="field_wrapper">
        {#if $isSettingsOpen}
            <SettingsModal formats={[formatLeft, formatRight]} />
        {/if}
        <div class="codemirror-wrapper" bind:this={elementRight} />
    </div>
</div>

<DoubleFooter
    {dividerPos}
    {formatLeft}
    {cursorPositionLeft}
    {formatRight}
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
        width: 100%;
        height: 100%;
        overflow: auto;
        position: relative;
    }

    .divider {
        position: absolute;
        z-index: 5;
        display: flex;
        justify-content: center;
        align-items: center;
        left: var(--pos);
        width: 1px;
        height: 100%;
        background: #313345;
        cursor: ew-resize;
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

    .double_field_wrapper {
        position: relative;
        display: grid;
        grid-template-columns: var(--pos) 1fr;
    }
</style>
