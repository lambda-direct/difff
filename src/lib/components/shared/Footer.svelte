<script lang="ts">
    import { page } from "$app/stores";
    import type { ToolsRoute } from "~/types";
    import { toolsRoutes } from "~/routes/routes";
    import NavLink from "$lib/components/shared/LinkCard.svelte";

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
                    {#each routesToShow.filter((element) => element.group === "Formatter") as route}
                        <li>
                            <a href={route.path}>
                                <NavLink name={route.name} />
                            </a>
                        </li>
                    {/each}
                </ul>
            </div>
            <div>
                <h3>Blog</h3>
                <ul class="list_column_link-group">
                    {#each routesToShow.filter((element) => element.group === "Blog") as route}
                        <li>
                            <a href={route.path}>
                                <NavLink name={route.name} />
                            </a>
                        </li>
                    {/each}
                </ul>
            </div>
        </div>
    </div>
</footer>

<style lang="scss">
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
        flex-direction: column;
        justify-content: space-around;
        @media (min-width: 768px) {
            flex-direction: row;
        }
    }

    .list_column {
        display: flex;
        flex-direction: column;
        margin: 0 0 16px 0;
        @media (min-width: 768px) {
            margin: 0;
        }
    }

    .list_column_link-group {
        display: flex;
        flex-direction: column;
        gap: 12px;
        list-style: none;
        list-style-image: none;
        @media (max-width: 768px) {
            flex-wrap: wrap;
            flex-direction: row;
            justify-content: center;
        }
    }

    .footer-title {
        text-align: center;
        margin: 0 auto 16px;
    }
</style>
