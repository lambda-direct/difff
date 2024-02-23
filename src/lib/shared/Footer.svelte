<script lang="ts">
    import { page } from "$app/stores";
    import type { ToolsRoute } from "~/types";
    import { toolsRoutes } from "~/routes/routes";
    import NavLink from "$lib/shared/LinkCard.svelte";

    let routesToShow: ToolsRoute[]
    
    $: routesToShow = toolsRoutes.filter((route) => route.path !== $page.url.pathname);
    
</script>


<footer class="footer">
    <div class="container">
        <h2 class="footer-title">Helpful links</h2>
        <ul class="link-group">
            {#each routesToShow as route}
            <li>
                <a href={route.path}>
                    <NavLink name={route.name} />
                </a>
            </li>
            {/each}
        </ul>
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
        padding: 0 0 32px;
        
    }
    .link-group {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 12px;
        list-style: none;
        list-style-image: none;
        @media (min-width: 768px) {
            flex-direction: row;
            gap: 24px;
            width: 100%;
        }
        
    }
    .footer-title {
        text-align: center;
        margin: 0 auto 16px;
    }
</style>
