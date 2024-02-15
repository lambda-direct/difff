<script lang="ts">
    import Footer from "$lib/shared/Footer.svelte";
    import "~/styles/index.css";
</script>

<header class="header">You can check our weekly updates here!</header>
<slot />

<!-- <Footer /> -->

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
</style>
