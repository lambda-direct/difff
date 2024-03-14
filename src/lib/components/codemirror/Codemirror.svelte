<script lang="ts">
    import { browser } from "$app/environment";
    import { EditorView } from "@codemirror/view";
    import { onDestroy, onMount } from "svelte";
    import { createEditorState, trackCursorPosition } from "~/lib/components/codemirror/codemirror";
    import Header from "~/lib/components/codemirror/components/Header.svelte";
    import ErrorModal from "~/lib/components/shared/ErrorModal.svelte";
    import SettingsModal from "~/lib/components/shared/SettingsModal.svelte";
    import { isSettingsOpen, showError } from "~/lib/storages";
    import CodemirrorActions, {
        getExtentions
    } from "~/lib/components/codemirror/codemirrorActions";
    import Footer from "~/lib/components/codemirror/components/Footer.svelte";

    export let format: "json" | "yaml" | "xml";
    export let placeholder: string;

    let value: string = "";
    let view: EditorView;
    let codemirrorActions: CodemirrorActions;
    let element: HTMLDivElement;
    let isDownloadClicked: boolean = false;
    let isCopyClicked: boolean = false;

    let storage: Storage | null = null;
    let cursorPosition: { line: number; col: number } = { line: 0, col: 0 };

    $: useTabs = storage?.tab || false;
    $: indentationLevel = storage?.spaces || format === "json" ? 4 : 2;
    $: onChange = handleValueChange;

    const createEditorView = () => {
        view = new EditorView({
            parent: element,
            state: createEditorState(value, getExtentions(format, placeholder)),
            dispatch(transaction) {
                view.update([transaction]);
                if (transaction.selection || transaction.docChanged) {
                    cursorPosition = trackCursorPosition(view);
                    onChange();
                }
            },
            extensions: [getExtentions(format, placeholder)]
        });
    };

    const handleFormatClick = async () => {
        await codemirrorActions.updateFormattedValue(value);
    };

    const handleValueChange = async () => {
        value = await codemirrorActions.valueChange(value);
    };

    const handlePaste = async () => {
        await codemirrorActions.updateFormattedValue(value);
    };

    const handleDrop = (event: DragEvent) => {
        event.preventDefault();
        codemirrorActions.dragAndDrop(event, value);
    };

    const handleFileChange = (event: Event & { currentTarget: EventTarget & HTMLInputElement }) => {
        event.preventDefault();
        codemirrorActions.handleFileUpload(event);
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
        codemirrorActions.downloadFile(value);
    };

    onMount(() => {
        createEditorView();
        codemirrorActions = new CodemirrorActions(view, format);
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
        view?.destroy();
        if (browser) {
            document.removeEventListener("paste", handlePaste);
            document.removeEventListener("drop", handleDrop);
        }
    });
</script>

<Header bind:view {format} {handleFileChange} {handleFormatClick} />
<div class="field_wrapper">
    <div class="codemirror-wrapper" bind:this={element} />
    {#if $isSettingsOpen}
        <SettingsModal bind:useTabs bind:indentationLevel {format} />
    {/if}
    {#if $showError}
        <ErrorModal />
    {/if}
</div>
<Footer
    {handleCopyClick}
    {handleDownloadClick}
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
