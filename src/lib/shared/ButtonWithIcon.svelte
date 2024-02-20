<script lang="ts">
</script>

<button class="icon-btn">
    <slot />
</button>

<style>
    .icon-btn {
        display: flex;
        align-items: center;
        height: 36px;
        padding: 0 7px;
        background: #030711;
        border: 1px solid #2b292929;
        border-radius: 8px;
    }
    .icon-btn:hover {
        background: #2b292929;
    }
</style>
