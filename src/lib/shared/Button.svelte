<script lang="ts">
    export let click = () => {}
</script>

<button on:click={click} {...$$props} class="button">
    <slot />
</button>


<style lang="scss">

    .button {
        display: flex;
        align-items: center;
        height: 36px;
        padding: 0 12px;
        background:#040b1a;
        border: 1px solid #313345;
        border-radius: 8px;
        transition: all 0.2s;
        color: #7d8799;
        &:hover {
            background: #040f1e;
            color: #e1e1e1;
        }
    }
    
    .btn-wrapper{
        display: flex;
        flex-direction: column;
        align-items: center;
    }
</style>