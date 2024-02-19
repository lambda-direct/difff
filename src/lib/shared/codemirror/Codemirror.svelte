<script lang="ts">
    import { basicSetup } from "codemirror";
    import CompareJson from "~/utils/index";
    import { showError } from "$lib/storages";
    import { type ErrorObject } from "~/types";
    import { json } from "@codemirror/lang-json";
    import { EditorState } from "@codemirror/state";
    import { themeExtensions } from "./themes/theme";
    import { highlightLine, ss } from "./errorHighLight";
    import ErrorModal from "$lib/shared/ErrorModal.svelte";
    import { createEventDispatcher, onDestroy, onMount } from "svelte";
    import { EditorView, placeholder as placeholderSet } from "@codemirror/view";

    export let placeholder: string;

    let value: string = "";
    let view: EditorView;
    let element: HTMLDivElement;

    let updateFromProp = false;
    let updateFromState = false;

    const stateExtensions = [basicSetup, json(), themeExtensions, placeholderSet(placeholder)];

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
        value = await formatJSON(value);
        dispatch("change", value);
    };

    const createEditorState = (value: string | undefined): EditorState => {
        return EditorState.create({
            doc: value,
            extensions: [stateExtensions]
        });
    };
    const formatJSON = async (input: string) => {
        if (input) {
            try {
                const result = await CompareJson.format(input);
                ss(view);
                $showError = false;
                return result;
            } catch (err) {
                highlightLine((err as ErrorObject).loc.start.line, view);
                $showError = true;
                return input;
            }
        } else {
            $showError = false;
            return input;
        }
    };
</script>

<div class="field_wrapper">
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
