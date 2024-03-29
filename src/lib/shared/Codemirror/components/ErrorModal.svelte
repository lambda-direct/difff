<script lang="ts">
    import AlertIcon from "~/lib/icons/AlertIcon.svelte";
    import { errorMessage, showError } from "~/storage/store";
    import { onMount } from "svelte";

    let showErrorMessage = true;

    const handleShowErrorClick = () => {
        showErrorMessage = !showErrorMessage;
    };

    const handleEnterClick = (event: KeyboardEvent) => {
        event.preventDefault();
        if (event.key === "Enter") {
            handleShowErrorClick();
        }
    };

    onMount(() => {
        setTimeout(() => {
            showErrorMessage = false;
        }, 5000);
    });
</script>

{#if $showError}
    <div
        role="button"
        tabindex="0"
        aria-labelledby="showErrorMessage"
        aria-label="showErrorMessage"
        on:click={handleShowErrorClick}
        on:keydown={handleEnterClick}
        class="modal"
        class:gap={showErrorMessage}
    >
        <p class="title">
            {#if showErrorMessage}
                {$errorMessage === "" ? "Invalid format" : $errorMessage}
            {/if}
        </p>
        <AlertIcon color={"#eaeaea"} />
    </div>
{/if}

<style>
    .title {
        color: #eaeaea;
        font-size: 14px;
        font-family: "JetBrainsMono-Regular", monospace;
    }

    .modal {
        display: flex;
        align-items: center;
        flex-direction: row-reverse;
        padding: 12px;
        background: #8f2626;
        border-radius: 4px;
        bottom: 0px;
        position: absolute;
        right: 24px;
        z-index: 5;
        cursor: pointer;
        animation: floatIn 0.3s ease-in-out 0s forwards;
    }

    .gap {
        gap: 4px;
    }

    @keyframes floatIn {
        to {
            bottom: 12px;
        }
    }
</style>
