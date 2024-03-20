<script lang="ts">
    import { browser } from "$app/environment";
    import hljs from "highlight.js";
    import yaml from "highlight.js/lib/languages/yaml";
    import { onMount } from "svelte";
    import Head from "~/lib/shared/Head.svelte";
    import CodeMirror from "~/lib/shared/Codemirror/Codemirror.svelte";
    import "../style.css";

    export let data;

    onMount(() => {
        if (browser) {
            hljs.registerLanguage("yaml", yaml);
            hljs.highlightAll();
        }
    });
</script>

<Head
    title="YAML Formatter Online Tool, Beautifier & Validator - Difff"
    description="Format & Validate YAML Online with difff.app. Our online tool provides YAML pretty print, beautifies, and converts text files effortlessly."
    openGraph={{ type: "website", locale: "en_US" }}
/>

<main class="main">
    <header>
        <h1 class="main_title">YAML Formatter Online</h1>
        <h2 class="main_subtitle">Validate, Format & Prettify your YAML</h2>
    </header>
    <section class="formatter_field-wrapper">
        <CodeMirror format="yaml" placeholder="Put your YAML or Drag & Drop a file" />
    </section>
    <article>
        <svelte:component this={data.content} />
    </article>
</main>

<style>
    article {
        width: 100%;
    }
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
</style>
