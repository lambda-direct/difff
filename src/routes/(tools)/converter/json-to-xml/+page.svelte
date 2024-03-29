<script lang="ts">
    import Head from "~/lib/shared/Head.svelte";
    import DoubleCodeMirror from "~/lib/shared/Codemirror/DoublecCodemirrorField.svelte";
    import Converter from "~/utils/Converter";
    import hljs from "highlight.js";
    import { onMount } from "svelte";
    import { browser } from "$app/environment";

    export let data;

    onMount(() => {
        if (browser) hljs.highlightAll();
    });
</script>

<Head
    title="JSON to XML Converter Online Tool | Difff"
    description="Convert JSON to XML Online with difff.app. Our online tool will provide JSON and XML pretty print, beautifies, and validate it."
    openGraph={{ type: "website", locale: "en_US" }}
/>

<main class="main">
    <header>
        <h1 class="main_title">JSON to XML Converter Online</h1>
        <h2 class="main_subtitle">Convert JSON to XML, Validate and Prettify it.</h2>
    </header>
    <section class="converter_field-wrapper">
        <DoubleCodeMirror
            formatLeft="json"
            placeholderLeft="Provide a JSON, link, or Drag & Drop a file"
            labelLeft="JSON to convert field"
            formatRight="xml"
            placeholderRight="Converted XML output"
            labelRight="XML converted field"
            convertFunction={Converter.jsonToXml}
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
    .converter_field-wrapper {
        display: flex;
        flex-direction: column;
        margin: 32px 0 0;
        width: 100%;
    }
</style>
