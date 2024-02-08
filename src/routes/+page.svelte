<script lang="ts">
    import GitHubIcon from "~/lib/icons/GitHubIcon.svelte";
</script>

<svelte:head>
    <title>Difff | compare and format json online</title>
    <meta
        name="description"
        content="Compare two JSON documents. Validate, format, and .  See the differences between the objects."
    />
</svelte:head>

<header class="header">
    <h1>Compare JSON online</h1>
    <a
        href="https://github.com/lambda-direct/difff"
        target="_blank"
        rel="noopener"
        title="Diff GitHub repository"
        class="github-link"
    >
        <GitHubIcon />
    </a>
</header>
<main class="compare-jsons_main">
    <h2>Check JSONs differences</h2>
    <section class="compare-jsons_fields"></section>
</main>

<style>
    .header {
        position: relative;
        text-align: center;
    }
    .github-link {
        position: absolute;
        top: 0;
        right: 0;
    }
    .compare-jsons_main {
        text-align: center;
    }
    .compare-jsons_fields {
    }
</style>
