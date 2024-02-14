<script lang="ts">
    import LeftArrowIcon from "$lib/icons/Left.svelte";
    import RightArrowIcon from "$lib/icons/Right.svelte";

    export let total: number;
    export let messages: string[];

    let currentDiffMessage: number = 0;

    const clickRight = () => {
        if (currentDiffMessage + 2 > total) {
            currentDiffMessage = 0;
        } else {
            currentDiffMessage += 1;
        }
    };
    const clickLeft = () => {
        if (currentDiffMessage - 1 < 0) {
            currentDiffMessage = total - 1;
        } else {
            currentDiffMessage -= 1;
        }
    };
</script>

<div class="diff-messages">
    {#if total && messages.length}
        <div class="diff-message-header">
            <button on:click={clickLeft} class="arrows"><LeftArrowIcon margin={"2px 0 0"} /></button
            >
            {currentDiffMessage + 1} of {total}
            <button on:click={clickRight} class="arrows"><RightArrowIcon /></button>
        </div>
        <div class="diff-messages-message">{messages[currentDiffMessage]}</div>
    {:else}
        <p class="title">There is no differences between this two objects.</p>
        <button class="another-compare-btn">Another compare</button>
    {/if}
</div>

<style>
    .another-compare-btn {
        height: 36px;
        padding: 0 8px;
        background: transparent;
        border: 1px solid #676767;
        border-radius: 4px;
        font-size: 16px;
        font-weight: 500;
    }
    .another-compare-btn:hover {
        background: #e1e1e1;
        border: 1px solid #e1e1e1;
    }
    .title {
        margin: 0;
        padding: 16px;
        text-align: center;
        font-size: 16px;
        font-weight: 600;
        color: #000;
    }
    .diff-messages-message {
        margin: 8px;
        width: 70%;
        padding: 8px;
        background-color: #3239581a;
        border-radius: 4px;
        border: thin solid lightgray;
        font-size: 14px;
        font-weight: 500;
        color: #000;
        line-height: 18px;
    }
    .diff-message-header {
        display: flex;
        align-items: center;
        flex-direction: row;
        justify-content: space-around;
        width: 70%;
        padding: 8px 0;
    }
    .diff-messages {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 20%;
    }

    .arrows {
        background: transparent;
        border: none;
        display: flex;
    }
    .arrows:hover {
        background: #e1e1e1;
        border-radius: 6px;
    }
</style>
