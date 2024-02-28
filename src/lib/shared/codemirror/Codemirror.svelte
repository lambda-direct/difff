<script lang="ts">
    import { browser } from "$app/environment";
    import { showError } from "~/lib/storages";
    import PopUpBtn from "~/lib/shared/PopUpButton.svelte";
    import CopyIcon from "~/lib/icons/CopyIcon.svelte";
    import ErrorModal from "~/lib/shared/ErrorModal.svelte";
    import MagicWand from "~/lib/icons/MagicWandIcon.svelte";
    import DownLoadIcon from "~/lib/icons/DownloadIcon.svelte";
    import { createEventDispatcher, onDestroy, onMount } from "svelte";
    import { EditorView, placeholder as placeholderSet } from "@codemirror/view";
    import { createEditorState, stateExtensions } from "./codeMirror";
   
    export let placeholder: string;
    export let controlFunction: (value: string, view: EditorView) => Promise<string>
    export let value: string = "";
    export let view: EditorView;
    export let type: string;


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
        dispatch("change", value);
    };
    
    const downloadClick = () => {
        const blob = new Blob([value], { type: "application/json" });
        const url = URL.createObjectURL(blob);

        const aTag = document.createElement("a");
        aTag.href = url;
        aTag.download = `data.${type}`;
        document.body.appendChild(aTag);
        aTag.click();
        document.body.removeChild(aTag);
        URL.revokeObjectURL(url);
    };

    const copyClick = async () => {
        await navigator.clipboard.writeText(value);
    };

    const onPaste = async () => {
        value = await controlFunction(value, view);
    };

    const onDrop = async (event: DragEvent) => {
        event.preventDefault();
        if (event.dataTransfer && event.dataTransfer.files.length > 0) {
            value=""
            const file = event.dataTransfer.files[0];
            const reader = new FileReader();
            reader.onload = async (e: ProgressEvent<FileReader>) => {
                const droppedData = e.target?.result as string;
                value = await controlFunction(droppedData, view);
            };
            reader.readAsText(file)
        }
    };

    onMount(() => {
        view = createEditorView();

        if (browser) {
            window.addEventListener("paste", onPaste);
            window.addEventListener("drop", onDrop);
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
        window.removeEventListener("drop", onDrop);
    });

   
</script>

<section class="field_wrapper">
    <div class="codemirror-wrapper"  bind:this={element}/>
    <footer class="footer">
        <PopUpBtn aria-label="format" aria-labelledby="format" name="format" click={async() => {value = await controlFunction(value, view)}}
        popUpMessage={"Formatted"}>
            <MagicWand />
        </PopUpBtn>
        <div class="icon-btn-wrapp">
            <PopUpBtn
                aria-label="download"
                aria-labelledby="download"
                name="download"
                click={downloadClick} popUpMessage={"Downloading"}>
                <DownLoadIcon />
            </PopUpBtn>
            <PopUpBtn aria-label="copy" aria-labelledby="copy" name="copy" click={copyClick} popUpMessage={"Copied"}>
                <CopyIcon />
            </PopUpBtn>
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
        justify-content: space-between;
        padding: 0 12px;
        height: 54px;
        background: #030711;
        border-bottom-left-radius: 8px;
        border-bottom-right-radius: 8px;
    }

    .icon-btn-wrapp {
        display: flex;
        gap: 8px;
    }

    .field_wrapper {
        position: relative;
    }
</style>
