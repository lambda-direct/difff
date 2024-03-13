<script lang="ts">
    import { browser } from "$app/environment";
    import { json } from "@codemirror/lang-json";
    import { LanguageSupport, StreamLanguage } from "@codemirror/language";
    import * as xmlMode from "@codemirror/legacy-modes/mode/xml";
    import * as yamlMode from "@codemirror/legacy-modes/mode/yaml";
    import type { SelectionRange } from "@codemirror/state";
    import { EditorView, placeholder as placeholderSet } from "@codemirror/view";
    import { onDestroy, onMount } from "svelte";
    import {
        createEditorState,
        stateExtensions,
        updateCodemirror
    } from "~/lib/components/codemirror/codemirror";
    import Header from "~/lib/components/codemirror/components/Header.svelte";
    import ErrorModal from "~/lib/components/shared/ErrorModal.svelte";
    import SettingsModal from "~/lib/components/shared/SettingsModal.svelte";
    import { isSettingsOpen, showError } from "~/lib/storages";
    import JSONFormatter from "~/utils/JSONFormatter";
    import XMLFormatter from "~/utils/XMLFormatter";
    import YamlFormatter from "~/utils/YamlFormatter";
    import Footer from "./components/Footer.svelte";
    import { themeExtensionsJson, themeExtensionsXML, themeExtensionsYaml } from "./themes/theme";

    export let format: "json" | "yaml" | "xml";
    export let placeholder: string;

    const fieldFormat: LanguageSupport | StreamLanguage<unknown> =
        format === "json"
            ? json()
            : format === "yaml"
              ? StreamLanguage.define(yamlMode.yaml)
              : StreamLanguage.define(xmlMode.xml);

    let themeExtension =
        format === "json"
            ? themeExtensionsJson
            : format === "yaml"
              ? themeExtensionsYaml
              : themeExtensionsXML;
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

    let storage: Storage | null = null;
    $: useTabs = storage?.tab || false;
    $: indentationLevel = storage?.spaces || format === "json" ? 4 : 2;
    let cursorPosition: { line: number; col: number } = { line: 0, col: 0 };

    $: onChange = handleChange;

    const createEditorView = () => {
        view = new EditorView({
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
    };

    const handleChange = async (): Promise<void> => {
        const new_value = view.state.doc.toString();
        if (new_value === value) return;
        if (format === "json") {
            JSONFormatter.validateJSON(new_value, view);
        }
        if (format === "yaml") {
            YamlFormatter.validateYAML(new_value, view);
        }
        if (format === "xml") {
            XMLFormatter.validateXML(new_value, view);
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

    const onPaste = async () => {
        if (format === "json") {
            await JSONFormatter.prettierFormatJSON(value, view, {
                tabWidth: storage?.spaces || 4,
                useTabs: storage?.tab || false
            });
        }
        if (format === "yaml") {
            YamlFormatter.formatYAML(value, view, { indent: storage?.spaces || 2 });
        }
        if (format === "xml") {
            XMLFormatter.formatXML(value, view, storage?.spaces || 2);
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
                        tabWidth: storage?.spaces || 4,
                        useTabs: storage?.tab || false
                    });
                }
                if (format === "yaml") {
                    YamlFormatter.formatYAML(droppedData, view, {
                        indent: storage?.spaces || 2
                    });
                }
                if (format === "xml") {
                    XMLFormatter.formatXML(value, view, storage?.spaces || 2);
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
        createEditorView();
        if (browser) {
            // storage = getTypedStorageItem(format);

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
        if (browser) {
            document.removeEventListener("paste", onPaste);
            document.removeEventListener("drop", onDrop);
        }
    });
</script>

<Header bind:value bind:view {format} />
<div class="field_wrapper">
    <div class="codemirror-wrapper" bind:this={element} />

    {#if $isSettingsOpen}
        <SettingsModal bind:useTabs bind:indentationLevel />
    {/if}
    {#if $showError}
        <ErrorModal />
    {/if}
</div>
<Footer
    {value}
    {format}
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
