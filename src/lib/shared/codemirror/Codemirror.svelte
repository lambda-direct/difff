<script lang="ts">
    import { basicSetup } from "codemirror";
    // import { browser } from "$app/environment";
    import JSONDataOperations, { isFormatError } from "~/utils/index";
    import { showError } from "$lib/storages";
    import { json } from "@codemirror/lang-json";
    import { EditorState } from "@codemirror/state";
    import { themeExtensions } from "./themes/theme";
    import {
        addHighlightedLine,
        lineHighlightField,
        removeHighlightedLines
    } from "./errorHighLight";
    import ErrorModal from "$lib/shared/ErrorModal.svelte";
    import { createEventDispatcher, onDestroy, onMount } from "svelte";
    import { EditorView, placeholder as placeholderSet } from "@codemirror/view";
    import CodeMirrorHeader from "$lib/shared/CodeMirrorHeader.svelte";

    export let placeholder: string;

    let value: string = "";
    let view: EditorView;
    let element: HTMLDivElement;

    let updateFromProp = false;
    let updateFromState = false;

    const stateExtensions = [
        basicSetup,
        lineHighlightField,
        json(),
        themeExtensions,
        placeholderSet(placeholder)
    ];

    const dispatch = createEventDispatcher<{ change: string }>();

    onMount(() => (view = createEditorView()));
    onDestroy(() => view?.destroy());

    $: view && update(value);
    $: onChange = handleChange;

    const createEditorView = (): EditorView => {
        const codemirror = new EditorView({
            parent: element,
            state: createEditorState(value),
            dispatch(transaction) {
                view.update([transaction]);
                if (!updateFromProp && transaction.docChanged) {
                    onChange();
                }
            },
            extensions: [stateExtensions]
        });
        return codemirror;
    };

    const update = (value: string | undefined): void => {
        if (updateFromState) {
            updateFromState = false;
            return;
        }
        updateFromProp = true;
        view.setState(createEditorState(value));
        updateFromProp = false;
    };

    const handleChange = async (): Promise<void> => {
        const new_value = view.state.doc.toString();
        if (new_value === value) return;
        updateFromState = true;
        value = new_value;
        dispatch("change", value);
    };

    const createEditorState = (value: string | undefined): EditorState => {
        return EditorState.create({
            doc: value,
            extensions: [stateExtensions]
        });
    };

    const formatJSON = async () => {
        if (value) {
            try {
                const result = await JSONDataOperations.format(value);
                removeHighlightedLines(view);
                $showError = false;
                return result;
            } catch (err) {
                if (isFormatError(err)) {
                    addHighlightedLine(view, err.loc.start.line);
                }
                $showError = true;
                return value;
            }
        } else {
            $showError = false;
            return value;
        }
    };

    const downloadJsonFile = () => {
        const blob = new Blob([value], { type: "application/json" });
        const url = URL.createObjectURL(blob);

        const aTag = document.createElement("a");
        aTag.href = url;
        aTag.download = "data.json";
        document.body.appendChild(aTag);
        aTag.click();
        document.body.removeChild(aTag);
        URL.revokeObjectURL(url);
    };

    const copyToClipboard = async () => {
        await navigator.clipboard.writeText(value);
    };

    $: {
        if (value === "") {
            $showError = false;
            if (view) removeHighlightedLines(view);
        }
    }
    // if (browser) {
    //     const cmDiv = document.getElementsByClassName("cm-content");
    //     cmDiv.ariaLabel = "JSON-input";
    // }
</script>

<div class="field_wrapper">
    <CodeMirrorHeader
        formatClick={formatJSON}
        downloadClick={downloadJsonFile}
        copyClick={copyToClipboard}
    />
    <div class="codemirror-wrapper" bind:this={element} />
    {#if $showError}
        <ErrorModal />
    {/if}
</div>

<style>
    .field_wrapper {
        position: relative;
    }
</style>
