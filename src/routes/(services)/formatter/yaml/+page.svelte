<script lang="ts">
    import { browser } from "$app/environment";
    import { EditorView } from "@codemirror/view";
    import CodeMirror from "~/lib/shared/codemirror/YAMLCodemirror/Codemirror.svelte";

    let value: string;
    let view: EditorView;
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
        <h1 class="title">YAML Formatter Online</h1>
        <h2 class="subtitle">Validate, Format & Prettify your YAML</h2>
    </header>
    <section class="formatter_field-wrapper">
        {#if browser}
            <CodeMirror />
        {:else}
            <div class="back-field" />
        {/if}
    </section>

    <article class="article">
        <h2 class="article_title">How to Format YAML Using an Online Tool (Easy Method)</h2>
        <p class="article-text">
            YAML formatter & validator helps to beautify your YAML Inline syntax gets expanded and
            indented with two spaces per data structure depth level. We help you to format your YAML
            effortlessly with our online tool. Put compressed(as example to JavaScript Object) YAML
            text or upload a file containing your YAML. Our service will identify is your YAML valid
            or not. Display errors if any are present. Our formatting tool for valid YAML is <a
                href="https://github.com/nodeca/js-yaml#readme"
                rel="nofollow noopener noreferrer"
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

    .header_btn {
        display: flex;
        gap: 4px;
        font-size: 16px;
    }

    .title {
        margin: 28px 0 0;
        text-align: center;
    }

    .subtitle {
        margin: 16px 0 0;
        text-align: center;
    }

    .article {
        margin: 32px auto 0;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .article_title {
        text-align: center;
    }

    .article-text {
        margin: 16px 0 0;
        text-align: center;
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
