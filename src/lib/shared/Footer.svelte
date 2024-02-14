<script lang="ts">
    import { page } from "$app/stores";
    // TODO alias imports with ~
    import { toolsRoutes } from "../../routes/routes";
    const routesToShow = toolsRoutes.filter((route) => route.path !== $page.url.pathname);
</script>

<footer class="footer">
    <ul>
        {#each routesToShow as route}
            <li>
                <a href={route.path}>{route.name}</a>
            </li>
        {/each}
    </ul>
</footer>

<style>
    .footer {
    }
</style>
