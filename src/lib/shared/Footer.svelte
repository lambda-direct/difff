<script lang="ts">
    import { page } from "$app/stores";
    import { toolsRoutes } from "~/routes/routes";
    import NavLink from "$lib/shared/LinkCard.svelte";

    const routesToShow = toolsRoutes.filter((route) => route.path !== $page.url.pathname);
    
</script>

<footer class="footer">
    <h2 class="footer-title">Helpful links</h2>
    <div class="link-group">
        {#each routesToShow as route}
            <a href={route.path}><NavLink name={route.name} /></a>
        {/each}
    </div>
</footer>

<style>
    .footer {
        display: flex;
        flex-direction: column;
        align-items: center;
        max-width: 1024px;
        margin: 38px auto 0;
        padding: 0 16px 32px;
        
    }
    .link-group {
        display: grid;
        gap: 24px;
        grid-template-columns: repeat(4, 216px);
        @media (max-width: 984px) {
            grid-template-columns: repeat(3, 216px)
        }
        @media (max-width: 768px) {
            grid-template-columns: repeat(2, 216px)
        }
        @media (max-width: 476px) {
            grid-template-columns: repeat(1, 216px)
        }
    }
    .footer-title {
        margin: 0 auto 16px;
    }
</style>
