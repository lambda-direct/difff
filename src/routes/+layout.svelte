<script lang="ts">
    import Footer from "~/lib/shared/Footer.svelte";
    import { onMount } from "svelte";

    const isInternalLink = (href: string) => {
        return href.startsWith(window.location.origin);
    };

    onMount(() => {
        const links = document.querySelectorAll("a");

        links.forEach((link) => {
            const isInternal = isInternalLink(link.href);
            if (!isInternal) {
                link.rel = "nofollow noopener noreferrer";
            }
        });
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
