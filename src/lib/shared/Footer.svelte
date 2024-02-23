<script lang="ts">
    import { page } from "$app/stores";
    import type { ToolsRoute } from "~/types";
    import { toolsRoutes } from "~/routes/routes";
    import NavLink from "$lib/shared/LinkCard.svelte";

    let routesToShow: ToolsRoute[]
    
    $: routesToShow = toolsRoutes.filter((route) => route.path !== $page.url.pathname);
    
</script>

<footer class="footer">
    <h2 class="footer-title">Helpful links</h2>
    <div class="link-group">
        {#each routesToShow as route}
            <a href={route.path}>
                <NavLink name={route.name} />
            </a>
        {/each}
    </div>
</footer>

<style>
    .footer {
        display: flex;
        flex-direction: column;
        align-items: center;
        max-width: 1024px;
        width: 100%;
        margin: 38px auto 0;
        padding: 0 16px 32px;
        
    }
    .link-group {
        display: flex;
        gap: 24px;
        width: 100%;
    }
    .footer-title {
        margin: 0 auto 16px;
    }
</style>
