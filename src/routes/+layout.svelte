<script lang="ts">
    import { configure } from "onedollarstats";
    import { onMount } from "svelte";
    import Footer from "~/lib/shared/Footer.svelte";
    import "~/styles/index.css";

    onMount(() => {
        configure();
    });
</script>

<div class="page">
    <slot />
    <Footer />
</div>

<style>
    .page {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 100%;
    }
</style>
