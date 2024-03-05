<script lang="ts">
    import { browser } from "$app/environment";
    import CodeMirror from "~/lib/shared/codemirror/Codemirror.svelte";
</script>

<svelte:head>
    <title>YAML Formatter Online Tool, Beautifier & Validator - Difff</title>
    <meta
        name="description"
        content="Format & Validate YAML Online with difff.app. Our online tool provides YAML pretty print, beautifies, and converts text files effortlessly."
    />
</svelte:head>

<main class="main">
    <header>
        <h1 class="main_title">YAML Formatter Online</h1>
        <h2 class="main_subtitle">Validate, Format & Prettify your YAML</h2>
    </header>
    <section class="formatter_field-wrapper">
        {#if browser}
            <CodeMirror format="yaml" placeholder="Put your YAML or Drag & Drop a file" />
        {:else}
            <div class="back-field" />
        {/if}
    </section>

    <article class="footer_article">
        <h2 class="footer_article_title">How to Format YAML Using an Online Tool (Easy Method)</h2>
        <p class="footer_article_text">
            YAML formatter & validator helps to beautify your YAML Inline syntax gets expanded and
            indented with two spaces per data structure depth level. We help you to format your YAML
            effortlessly with our online tool. Put compressed(as example to JavaScript Object) YAML
            text or upload a file containing your YAML. Our service will identify is your YAML valid
            or not. Display errors if any are present. Our formatting tool for valid YAML is <a
                href="https://github.com/nodeca/js-yaml#readme"
                target="_blank"
                class="prettier-href">js-yaml</a
            >.
        </p>
    </article>
</main>

<style>
    .main {
        margin: 0 auto;
        display: flex;
        align-items: center;
        flex-direction: column;
    }

    .formatter_field-wrapper {
        display: flex;
        flex-direction: column;
        margin: 32px 0 0;
        width: 100%;
    }

    .prettier-href {
        text-decoration: underline;
    }
</style>
