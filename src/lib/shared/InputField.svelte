<script lang="ts">
    import ErrorModal from "$lib/shared/ErrorModal.svelte";
    import { showError } from "$lib/storages";
    import CompareJson from "~/utils/index";
    import { json } from "@codemirror/lang-json";
    import CodeMirror from "svelte-codemirror-editor";
    import { oneDark } from "@codemirror/theme-one-dark";

    export let userValue: string | null;

    const formatJSON = async () => {
        if (userValue) {
            try {
                userValue = await CompareJson.format(userValue);
                $showError = false;
            } catch (err) {
                $showError = true;
            }
        } else {
            $showError = false;
        }
    };
</script>

<div class="field_wrapper">
    <div id="your-editor-container">
        <CodeMirror
            {...$$restProps}
            bind:value={userValue}
            on:change={formatJSON}
            lang={json()}
            readonly={false}
            theme={oneDark}
            styles={{
                "::-webkit-scrollbar": {
                    padding: "0",
                    margin: "0",
                    width: "12px"
                },
                "::-webkit-scrollbar-track": {
                    "border-radius": "12px",
                    background: "#192026"
                },

                "::-webkit-scrollbar-thumb": {
                    "border-radius": "6px",
                    background: "#4c5259"
                },

                "::-webkit-scrollbar-thumb:hover": {
                    background: "#363d44"
                },
                "&::placeholder": {
                    "font-family": `"JetBrains Mono", monospace`,
                    "font-size": "16px",
                    color: "#e2e8f0a1"
                },
                "&": {
                    width: "925px",
                    height: "500px",
                    padding: "16px",
                    resize: "none",
                    background: "#202830",
                    border: "1px solid #202830",
                    "border-radius": "12px",
                    "font-family": "`JetBrains Mono`, monospace"
                }
            }}
        />
    </div>

    {#if $showError}
        <ErrorModal />
    {/if}
</div>

<style>
    .field_wrapper {
        position: relative;
    }
</style>
