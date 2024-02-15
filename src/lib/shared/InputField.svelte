<script lang="ts">
    import ErrorModal from "$lib/shared/ErrorModal.svelte";
    import { showError } from "$lib/storages";
    import CompareJson from "../../utils/index";

    export let userValue: string | null;
    export let id: string;
</script>

<div class="field_wrapper">
    <textarea
        {...$$restProps}
        bind:value={userValue}
        on:input={async () => {
            try {
                userValue = await CompareJson.format(userValue);
                $showError = false;
            } catch (err) {
                $showError = true;
            }
        }}
        spellcheck="false"
        class="field"
        {id}
    />
    {#if $showError}
        <ErrorModal />
    {/if}
</div>

<style>
    .field_wrapper {
        position: relative;
    }
    .field {
        width: 925px;
        height: 500px;
        padding: 16px;
        resize: none;
        background: #202830;
        border: 1px solid #202830;
        border-radius: 12px;
        font-family: "JetBrains Mono", monospace;

        &::placeholder {
            font-family: "JetBrains Mono", monospace;
            font-size: 16px;
            font-weight: 400;
            color: #e2e8f0a1;
        }
    }
</style>
