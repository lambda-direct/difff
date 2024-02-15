<script lang="ts">
    import CompareJson from "../../utils/index";
    import ErrorModal from "$lib/shared/ErrorModal.svelte";
    import { showError } from "$lib/storages";

    export let userValue: string | null;
    export let id: string;

    const handleFileChange = (event: Event) => {
        const fileInput = event.target as HTMLInputElement;
        const file = fileInput.files?.[0];
        const reader = new FileReader();
        if (file) {
            reader.onload = (e) => {
                if (e.target && typeof e.target.result === "string") {
                    userValue = e.target.result;
                }
            };
            reader.readAsText(file);
        }
    };
</script>

<div class="input-cards">
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

    <div class="input-container">
        <label class="label-for-file" for={id}>Or upload file</label>
        <input class="for-file" type="file" {id} on:change={handleFileChange} />
    </div>
</div>

<style>
    .for-file {
        font-size: 14px;
        font-weight: 500;
        color: #000;
    }
    .label-for-file {
        padding: 4px;
        font-size: 14px;
    }
    textarea::placeholder {
        font-size: 12px;
        color: #545454;
    }
    textarea {
        min-height: 450px;
        width: 100%;
        padding: 6px;
        resize: vertical;
        background: #e1e1e1;
        border: 1px solid #676767;
        border-radius: 4px;
    }
    .input-container {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        padding: 8px;
    }
    .input-cards {
        display: flex;
        flex-direction: column;
        width: 40%;
    }
    .wrapper {
        position: relative;
    }
</style>
