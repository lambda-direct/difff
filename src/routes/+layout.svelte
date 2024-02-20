<script lang="ts">
    import "~/styles/index.css";
</script>

<header class="header">
    <div class="container">
        <p class="header-text">🚀 Visit and see how our service has changed over the past week →</p>
    </div>
</header>
<div class="page-wrapper">
    <div class="container">
        <slot />
    </div>
</div>

<style>
    .header {
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0 16px;
        height: 40px;
        border-bottom: 1px solid #303030;
        font-family: "Noto Sans", sans-serif;
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
        padding: 0 0 32px;
        @media (min-width: 768px) {
            height: 100%;
            padding: 0;
        }
    }
</style>
