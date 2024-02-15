<script lang="ts">
    import CompareJson from "../../utils/index";
    import ErrorModal from "$lib/shared/ErrorModal.svelte";
    import { showError } from "$lib/storages";
    import CodeMirror from "svelte-codemirror-editor";
    import { json } from "@codemirror/lang-json";

    export let userValue: string | null;
    export let id: string;
</script>

<div class="wrapper">
    {#if $showError}<ErrorModal />{/if}
    <textarea
        bind:value={userValue}
        on:input={async () => {
            try {
                userValue = await CompareJson.format(userValue);
                $showError = false;
            } catch (err) {
                $showError = true;
            }
        }}
        placeholder="Enter JSON to compare, enter an URL to JSON"
        spellcheck="false"
        {id}
    />
</div>

<style>
    textarea::placeholder {
        font-family: "JetBrains Mono", monospace;
        font-size: 16px;
        font-weight: 400;
        line-height: 21.12px;
        color: #e2e8f0;
    }

    textarea {
        width: 925px;
        height: 500px;
        padding: 6px;
        resize: none;
        background: #202830;
        border: 1px solid #202830;
        border-radius: 4px;
    }

    .wrapper {
        position: relative;
    }
</style>
