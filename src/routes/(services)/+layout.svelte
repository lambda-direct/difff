<script lang="ts">
    import "~/styles/index.css";
</script>

<a href="/changelog">
    <header class="header">
        <div class="container">
            <p class="header-text">🚀 Visit and see how our service has changed over the past week →</p>
        </div>
    </header>
</a>
<div class="page-wrapper">
    <div class="container">
        <slot />
    </div>
</div>

<style lang="scss">
    .header {
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0 16px;
        height: 40px;
        border-bottom: 1px solid #2c2c2c;
        font-family: "NotoSans-Regular", sans-serif;
        color: #e2e8f0;
    }

    .header-text {
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        text-overflow: ellipsis;
    }

    .page-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0 0 16px;
        height: calc(100% - 57px);
    }
</style>
