<script lang="ts">
    import { browser } from "$app/environment";
    import { showError } from "~/lib/storages";
    import { EditorView, placeholder as placeholderSet } from "@codemirror/view";
    import { onDestroy, onMount } from "svelte";
    import CopyIcon from "~/lib/icons/CopyIcon.svelte";
    import SuccessIcon from "~/lib/icons/SuccessIcon.svelte";
    import DownLoadIcon from "~/lib/icons/DownloadIcon.svelte";
    import ErrorModal from "~/lib/shared/ErrorModal.svelte";
    import Header from "~/lib/shared/codemirror/JSONCodemirror/CodemirrorHeader.svelte";
    import { createEditorState, removeHighlightedLines } from "~/lib/shared/codemirror/codeMirror";
    import JsonFormatter from "~/utils/JSONFormatter";
    import { stateExtensions } from "./codemirrorJSON";

    let value: string = "";
    let view: EditorView;

    let element: HTMLDivElement;

    let updateFromProp: boolean = false;
    let updateFromState: boolean = false;
    let isDownloadClicked: boolean = false;
    let isCopyClicked: boolean = false;

    const extensions = [
        ...stateExtensions,
        placeholderSet("Put your JSON, provide a link, or Drag & Drop a file")
    ];

    $: view && update(value);
    $: onChange = handleChange;

    const createEditorView = (): EditorView => {
        const codemirror = new EditorView({
            parent: element,
            state: createEditorState(value, extensions),
            dispatch(transaction) {
                view.update([transaction]);
                if (!updateFromProp && transaction.docChanged) onChange();
            },
            extensions: [extensions]
        });

        return codemirror;
    };

    const update = (value: string): void => {
        if (value === "") removeHighlightedLines(view);
        if (value) JsonFormatter.validateJSON(value, view);
        if (updateFromState) {
            updateFromState = false;
            return;
        }
        updateFromProp = true;
        view.setState(createEditorState(value, extensions));

        view.dispatch({
            effects: [EditorView.scrollIntoView(1, { y: "nearest", x: "start" })]
        });
        updateFromProp = false;
    };

    const handleChange = async (): Promise<void> => {
        const new_value = view.state.doc.toString();
        if (new_value === value) return;
        updateFromState = true;
        value = new_value;
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
        aTag.download = `data.json`;
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
        value = await JsonFormatter.prettierFormatJSON(value, view);
    };

    const onDrop = async (event: DragEvent) => {
        event.preventDefault();
        if (event.dataTransfer && event.dataTransfer.files.length > 0) {
            value = "";
            const file = event.dataTransfer.files[0];
            const reader = new FileReader();
            reader.onload = async (e: ProgressEvent<FileReader>) => {
                const droppedData = e.target?.result as string;
                value = await JsonFormatter.prettierFormatJSON(droppedData, view);
            };
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

<Header bind:value bind:view />
<section class="field_wrapper">
    <div class="codemirror-wrapper" bind:this={element} />
    <footer class="footer">
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
            </button>
        </div>
    </footer>
    {#if $showError}
        <ErrorModal />
    {/if}
</section>

<style>
    .footer {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        padding: 0 12px;
        height: 54px;
        border-top: 1px solid #313345;
        background: #030711;
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

    .field_wrapper {
        position: relative;
    }
</style>
