<script lang="ts">
    import "~/styles/index.css";
</script>

<header class="header">🚀 Visit and see how our service has changed over the past week →</header>
<div class="page-wrapper">
    <div class="container">
        <slot />
    </div>
</div>

<style>
    .header {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 40px;
        border-bottom: 1px solid #303030;
        font-family: "Noto Sans", sans-serif;
        color: #e2e8f0;
    }

    .page-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        height: calc(100% - 41px);
    }
</style>
