<script lang="ts">
    import { page } from "$app/stores";
    import type { ToolsRoute } from "~/types";
    import { toolsRoutes } from "~/routes/routes";
    import NavLink from "$lib/shared/LinkCard.svelte";

    let routesToShow: ToolsRoute[];
    $: routesToShow = toolsRoutes.filter((route) => route.path !== $page.url.pathname);
</script>

<footer class="footer">
    <div class="container">
        <h2 class="footer-title">Other tools</h2>
        <div class="lists-wrapper">
            <div class="list_column">
                <h3>Formatter</h3>
                <ul class="list_column_link-group">
                    {#each routesToShow as route}
                        {#if route.group === "Formatter"}
                            <li>
                                <a href={route.path}>
                                    <NavLink name={route.name} />
                                </a>
                            </li>
                        {/if}
                    {/each}
                </ul>
            </div>
            <div>
                <h3>Blog</h3>
                <ul class="list_column_link-group">
                    {#each routesToShow as route}
                        {#if route.group === "Blog"}
                            <li>
                                <a href={route.path}>
                                    <NavLink name={route.name} />
                                </a>
                            </li>
                        {/if}
                    {/each}
                </ul>
            </div>
        </div>
    </div>
</footer>

<style>
    h3 {
        text-align: center;
        margin: 0 0 12px 0;
    }

    .footer {
        display: flex;
        flex-direction: column;
        align-items: center;
        max-width: 1024px;
        width: 100%;
        margin: 38px auto 0;
        padding: 0 0 32px;
    }

    .lists-wrapper {
        display: flex;
        justify-content: space-around;
    }

    .list_column {
        display: flex;
        flex-direction: column;
    }

    .list_column_link-group {
        display: flex;
        flex-direction: column;
        gap: 12px;
        list-style: none;
        list-style-image: none;
    }

    .footer-title {
        text-align: center;
        margin: 0 auto 16px;
    }
</style>
