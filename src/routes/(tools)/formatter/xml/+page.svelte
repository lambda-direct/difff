<script lang="ts">
    import CodeMirror from "~/lib/shared/Codemirror/Codemirror.svelte";
    import Head from "~/lib/shared/Head.svelte";
    import hljs from "highlight.js";
    import { onMount } from "svelte";
    import { browser } from "$app/environment";

    export let data;

    onMount(() => {
        if (browser) hljs.highlightAll();
    });
</script>

<Head
    title="XML Formatter Online Tool, Beautifier & Validator | Difff"
    description="Format, Validate & Minify XML Online with difff.app. Our online tool provides XML pretty print, minify, beautifies, and converts text files effortlessly."
    openGraph={{ type: "website", locale: "en_US" }}
/>

<main class="main">
    <header>
        <h1 class="main_title">XML Formatter Online</h1>
        <h2 class="main_subtitle">Validate, Format and Prettify your XML</h2>
    </header>
    <section class="formatter_field-wrapper">
        <CodeMirror
            tool="formatter"
            format="xml"
            placeholder="Put your XML or Drag & Drop a file"
            label="XML format field"
        />
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
