<script lang="ts">
    import { page } from "$app/stores";
    // TODO alias imports with ~
    import { toolsRoutes } from "../../routes/routes";
    import NavLink from "$lib/shared/LinkCard.svelte";
    const routesToShow = toolsRoutes.filter((route) => route.path !== $page.url.pathname);
</script>

<footer class="footer">
    <h2 class="footer-title">Helpful links</h2>
    <div class="links"></div>

    <div class="link-group">
        {#each routesToShow as route}
            <a href={route.path}><NavLink name={route.name} /></a>
        {/each}
    </div>
</footer>

<style>
    a {
        text-decoration: none;
    }

    .footer {
        margin: 38px auto 0;
        width: 925px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .links {
        display: flex;
    }
    .link-group {
        display: grid;
        gap: 20px;
    }
    .footer-title {
        margin: 0 auto 16px;
    }
</style>
