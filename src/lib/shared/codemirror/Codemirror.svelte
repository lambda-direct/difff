<script lang="ts">
    import Alert from "~/utils/toastify";
    import { browser } from "$app/environment";
    import { showError } from "~/lib/storages";
    import ErrorModal from "~/lib/shared/ErrorModal.svelte";
    import { createEventDispatcher, onDestroy, onMount } from "svelte";
    import CodeMirrorHeader from "~/lib/shared/CodeMirrorHeader.svelte";
    import { EditorView, placeholder as placeholderSet } from "@codemirror/view";
    import { createEditorState, formatJSON, removeHighlightedLines, stateExtensions, validateJson } from "./codeMirror";

    export let placeholder: string;

    let value: string = "";
    let view: EditorView;
    let element: HTMLDivElement;

    let updateFromProp = false;
    let updateFromState = false;

    const dispatch = createEventDispatcher<{ change: string }>();

    const extensions = [
        ...stateExtensions,
        placeholderSet(placeholder)
    ];

    $: view && update(value);
    $: onChange = handleChange;
    $: {
        if (value === "") {
            $showError = false;
            if (view) removeHighlightedLines(view);
        }
    }
    const createEditorView = (): EditorView => {
        const codemirror = new EditorView({
            parent: element,
            state: createEditorState(value, extensions),
            dispatch(transaction) {
                view.update([transaction]);
                if (!updateFromProp && transaction.docChanged) {
                    onChange();
                }
            },
            extensions: [extensions]
        });
        return codemirror;
    };

    const update = (value: string | undefined): void => {
        if (updateFromState) {
            updateFromState = false;
            return;
        }
        updateFromProp = true;
        view.setState(createEditorState(value, extensions));
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

    const onFormatClick = async () => {
        if(!$showError){
            view.dispatch({
                effects: [
                    EditorView.scrollIntoView(1)
                ]
            })
        }
        value = await formatJSON(value, view, $showError);
    };

    const onPaste = async () => {
        value = await formatJSON(value, view, $showError);
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

<section class="field_wrapper">
    <CodeMirrorHeader
        formatClick={onFormatClick}
        downloadClick={downloadJsonFile}
        copyClick={copyToClipboard}
    />
    <div class="codemirror-wrapper" bind:this={element} />
    {#if $showError}
        <ErrorModal />
    {/if}
</section>

<style>
    .field_wrapper {
        position: relative;
    }
</style>
