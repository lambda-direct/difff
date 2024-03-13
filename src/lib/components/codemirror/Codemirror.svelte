<script lang="ts">
    import { browser } from "$app/environment";
    import { isSettingsOpen, showError } from "~/lib/storages";
    import { EditorView, placeholder as placeholderSet } from "@codemirror/view";
    import { onDestroy, onMount } from "svelte";
    import CopyIcon from "~/lib/icons/CopyIcon.svelte";
    import SuccessIcon from "~/lib/icons/SuccessIcon.svelte";
    import DownLoadIcon from "~/lib/icons/DownloadIcon.svelte";
    import ErrorModal from "~/lib/components/shared/ErrorModal.svelte";
    import Header from "~/lib/components/codemirror/CodemirrorHeader.svelte";
    import {
        createEditorState,
        stateExtensions,
        updateCodemirror
    } from "~/lib/components/codemirror/codemirror";
    import YamlFormatter from "~/utils/YamlFormatter";
    import JSONFormatter from "~/utils/JSONFormatter";
    import type { SelectionRange } from "@codemirror/state";
    import { json } from "@codemirror/lang-json";
    import * as yamlMode from "@codemirror/legacy-modes/mode/yaml";
    import { StreamLanguage } from "@codemirror/language";
    import { getTypedStorageItem } from "~/utils/helpers";
    export let format: "json" | "yaml";
    export let placeholder: string;
    import { themeExtensionsJson, themeExtensionsYaml } from "./themes/theme";
    import SettingsModal from "~/lib/components/shared/SettingsModal.svelte";

    let fieldFormat = format === "json" ? json() : StreamLanguage.define(yamlMode.yaml);
    let themeExtension = format === "json" ? themeExtensionsJson : themeExtensionsYaml;
    let value: string = "";
    let view: EditorView;
    const extensions = [
        ...stateExtensions,
        themeExtension,
        placeholderSet(placeholder),
        fieldFormat
    ];

    let element: HTMLDivElement;
    let isDownloadClicked: boolean = false;
    let isCopyClicked: boolean = false;

    let storage = getTypedStorageItem(format);
    let useTabs: boolean = storage && "tab" in storage ? storage.tab : false;
    let indentationLevel: number = storage ? storage.spaces : format === "json" ? 4 : 2;
    let cursorPosition: { line: number; col: number } = { line: 0, col: 0 };

    $: onChange = handleChange;

    const createEditorView = (): EditorView => {
        const codemirror = new EditorView({
            parent: element,
            state: createEditorState(value, extensions),
            dispatch(transaction) {
                view.update([transaction]);
                if (transaction.selection || transaction.docChanged) {
                    trackCursorPosition(view);
                    onChange();
                }
            },
            extensions: [extensions]
        });

        return codemirror;
    };

    const handleChange = async (): Promise<void> => {
        const new_value = view.state.doc.toString();
        if (new_value === value) return;
        if (format === "json") {
            JSONFormatter.validateJSON(new_value, view);
        } else if (format === "yaml") {
            YamlFormatter.validateYAML(new_value, view);
        }
        value = new_value;
    };

    const trackCursorPosition = (editorView: EditorView) => {
        const { doc, selection } = editorView.state;
        const mainRange: SelectionRange = selection.main;

        const lineInfo = doc.lineAt(mainRange.head);
        const line = lineInfo.number;
        const col = mainRange.head - lineInfo.from;

        cursorPosition = { line, col };
    };

    const downloadClick = () => {
        isDownloadClicked = true;
        setTimeout(() => {
            isDownloadClicked = false;
        }, 1000);
        const blob = new Blob([value], { type: "application/json" });
        const url = URL.createObjectURL(blob);

        const aTag = document.createElement("a");
        aTag.href = url;
        aTag.download = `data.${format}`;
        document.body.appendChild(aTag);
        aTag.click();
        document.body.removeChild(aTag);
        URL.revokeObjectURL(url);
    };

    const copyClick = async () => {
        isCopyClicked = true;
        setTimeout(() => {
            isCopyClicked = false;
        }, 1000);
        await navigator.clipboard.writeText(value);
    };

    const onPaste = async () => {
        if (format === "json") {
            await JSONFormatter.prettierFormatJSON(value, view, {
                tabWidth: storage ? storage.spaces : 4,
                useTabs: storage && "tab" in storage ? storage.tab : false
            });
        } else if (format === "yaml") {
            YamlFormatter.formatYAML(value, view, { indent: storage ? storage.spaces : 2 });
        }
    };

    const onDrop = (event: DragEvent) => {
        event.preventDefault();
        if (event.dataTransfer && event.dataTransfer.files.length > 0) {
            const oldValue = value;
            const file = event.dataTransfer.files[0];
            const reader = new FileReader();
            reader.onload = async (e: ProgressEvent<FileReader>) => {
                const droppedData = e.target?.result as string;
                updateCodemirror(view, droppedData);
                if (format === "json") {
                    await JSONFormatter.prettierFormatJSON(droppedData, view, {
                        tabWidth: storage ? storage.spaces : 4,
                        useTabs: storage && "tab" in storage ? storage.tab : false
                    });
                } else if (format === "yaml") {
                    YamlFormatter.formatYAML(droppedData, view, {
                        indent: storage ? storage.spaces : 2
                    });
                }
            };
            if (value !== oldValue) {
                view.dispatch({
                    effects: [EditorView.scrollIntoView(1, { y: "nearest" })]
                });
            }
            reader.readAsText(file);
        }
    };

    onMount(() => {
        view = createEditorView();
        if (browser) {
            document.addEventListener("paste", onPaste);
            document.addEventListener("drop", onDrop);
            const cmDiv = document.getElementsByClassName("cm-content");
            if (cmDiv.length > 0) {
                cmDiv[0].setAttribute("aria-label", "JSON input");
                cmDiv[0].setAttribute("aria-labelledby", "JSON input");
            }
        }
    });

    onDestroy(() => {
        view?.destroy();
        document.removeEventListener("paste", onPaste);
        document.removeEventListener("drop", onDrop);
    });
</script>

<Header bind:value bind:view {format} />
<section class="field_wrapper">
    <div class="codemirror-wrapper" bind:this={element} />
    <footer class="footer">
        <div>
            <span class="cursor-position"
                >Ln {cursorPosition.line === 0 ? 1 : cursorPosition.line}, Col {cursorPosition.col ===
                0
                    ? 1
                    : cursorPosition.col}
            </span>
            <button
                on:click={() => {}}
                title="settings"
                aria-label="settings"
                aria-labelledby="settings"
                name="settings-btn"
                class="cursor-position"
            >
                {useTabs ? "Tab Size" : "Spaces"}: {indentationLevel}
            </button>
        </div>
        <div class="icon-btn-wrap">
            <button
                on:click={downloadClick}
                title="download"
                aria-label="download"
                aria-labelledby="download"
                name="download"
                class="icon-button"
            >
                {#if isDownloadClicked}
                    <SuccessIcon />
                {:else}
                    <DownLoadIcon />
                {/if}
                <span class="btn_title">Download</span>
            </button>
            <button
                on:click={copyClick}
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
    </footer>
    {#if $isSettingsOpen}
        <SettingsModal bind:useTabs bind:indentationLevel />
    {/if}
    {#if $showError}
        <ErrorModal />
    {/if}
</section>

<style lang="scss">
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

    .field_wrapper {
        position: relative;
    }

    .btn_title {
        @media (max-width: 420px) {
            display: none;
        }
    }
</style>
