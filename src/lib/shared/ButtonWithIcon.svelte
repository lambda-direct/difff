<button
    on:click={() => {
        console.log(22);
    }}
    class="icon-btn"
>
    <slot />
</button>

<style>
    .icon-btn {
        display: flex;
        align-items: center;
        height: 36px;
        padding: 0 8px;
        background: #070c18;
        border: 1px solid #2b29298c;
        border-radius: 8px;
    }
</style>
