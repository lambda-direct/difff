<script lang="ts">
    export let click = () => {};
</script>

<button on:click={click} {...$$props} class="icon-btn">
    <slot />
</button>

<style>
    .icon-btn {
        display: flex;
        align-items: center;
        height: 36px;
        padding: 0 7px;
        background: #030711;
        border: 1px solid #2c2c2c;
        border-radius: 8px;
    }
    
    .icon-btn:hover {
        background: #2c2c2c;
    }
</style>
