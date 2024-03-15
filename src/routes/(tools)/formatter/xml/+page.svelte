<script lang="ts">
    import { browser } from "$app/environment";
    import hljs from "highlight.js";
    import xml from "highlight.js/lib/languages/xml";
    import { onMount } from "svelte";
    import CodeMirror from "~/lib/components/codemirror/Codemirror.svelte";
    import Head from "~/lib/components/shared/Head.svelte";
    import "../style.css";

    export let data;

    onMount(() => {
        if (browser) {
            hljs.registerLanguage("xml", xml);
            hljs.highlightAll();
        }
    });
</script>

<Head
    title="XML Formatter Online Tool, Beautifier & Validator - Difff"
    description="Format & Validate XML Online with difff.app. Our online tool provides XML pretty print, beautifies, and converts text files effortlessly."
    openGraph={{ type: "website", locale: "en_US" }}
/>

<main class="main">
    <header>
        <h1 class="main_title">XML Formatter Online</h1>
        <h2 class="main_subtitle">Validate, Format & Prettify your XML</h2>
    </header>
    <section class="formatter_field-wrapper">
        <CodeMirror format="xml" placeholder="Put your XML or Drag & Drop a file" />
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
