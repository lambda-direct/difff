<script lang="ts">
    import Head from "~/lib/shared/Head.svelte";
    import CodeMirror from "~/lib/shared/Codemirror/Codemirror.svelte";
    import hljs from "highlight.js";
    import { onMount } from "svelte";
    import { browser } from "$app/environment";

    export let data;

    onMount(() => {
        if (browser) hljs.highlightAll();
    });
</script>

<Head
    title="Difff | JSON Formatter Online Tool, Beautifier & Validator"
    description="Format, Minify & Validate JSON Online with difff.app. Our online tool provides JSON pretty print, minifies, beautifies, and converts text files."
    openGraph={{ type: "website", locale: "en_US" }}
/>

<main class="main">
    <header>
        <h1 class="main_title">JSON Formatter Online</h1>
        <h2 class="main_subtitle">Validate, Format and Beautify your JSON</h2>
    </header>
    <section class="formatter_field-wrapper">
        <CodeMirror
            tool="formatter"
            format="json"
            placeholder="Provide a JSON, link, or Drag & Drop a file"
            label="JSON format field"
        />
    </section>
    <article>
        <svelte:component this={data.content} />
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
</style>
