<script lang="ts">
    import "~/styles/index.css";
</script>

<div class="page-wrapper">
    <div class="container">
        <slot />
    </div>
</div>

<style lang="scss">
    .page-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0 0 16px;
    }
</style>
