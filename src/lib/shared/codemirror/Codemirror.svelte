<script lang="ts">
    import Alert from "~/utils/toastify";
    import { basicSetup } from "codemirror";
    import { browser } from "$app/environment";
    import JSONDataOperations from "~/utils/index";
    import { showError } from "~/lib/storages";
    import { json } from "@codemirror/lang-json";
    import { EditorState } from "@codemirror/state";
    import { themeExtensions } from "./themes/theme"
    import ErrorModal from "~/lib/shared/ErrorModal.svelte";
    import { createEventDispatcher, onDestroy, onMount } from "svelte";
    import CodeMirrorHeader from "~/lib/shared/CodeMirrorHeader.svelte";
    import { EditorView, placeholder as placeholderSet } from "@codemirror/view";
    import { lineHighlightField, removeHighlightedLines, validateJson } from "./codeMirror";

    export let placeholder: string;

    let value: string = "";
    let view: EditorView;
    let element: HTMLDivElement;

    let updateFromProp = false;
    let updateFromState = false;

    const dispatch = createEventDispatcher<{ change: string }>();
    const stateExtensions = [
        basicSetup,
        lineHighlightField,
        json(),
        themeExtensions,
        placeholderSet(placeholder)
    ];

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
        validateJson(value, view);
        dispatch("change", value);
    };

    const createEditorState = (value: string | undefined): EditorState => {
        return EditorState.create({
            doc: value,
            extensions: [stateExtensions]
        });
    };

    const formatJSON = async () => {
        await validateJson(value, view);
        if (!$showError && value.replaceAll(" ","")) {
            Alert.success("Formatted")
            return await JSONDataOperations.format(value);
        } else {
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
        Alert.success("Downloading")
    };

    const copyToClipboard = async () => {
        await navigator.clipboard.writeText(value);
        Alert.success("Copied")
    };

    $: {
        if (value === "") {
            $showError = false;
            if (view) removeHighlightedLines(view);
        }
    }
    const onPaste = async () => {
        value = await formatJSON();
    };

    onMount(() => {
        view = createEditorView();

        if (browser) {
            window.addEventListener("paste", onPaste);
            const cmDiv = document.getElementsByClassName("cm-content");
            if (cmDiv.length > 0) {
                cmDiv[0].setAttribute("aria-label", "JSON input");
                cmDiv[0].setAttribute("aria-labelledby", "JSON input");
            }
        }
    });

    onDestroy(() => {
        view?.destroy();
        window.removeEventListener("paste", onPaste);
    });
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
