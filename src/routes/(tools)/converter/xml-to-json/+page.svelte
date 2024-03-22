<script lang="ts">
    import Head from "~/lib/shared/Head.svelte";
    import DoubleCodeMirror from "~/lib/shared/Codemirror/DoublecCodemirrorField.svelte";
    import Converter from "~/utils/Converter";
    import xml from "highlight.js/lib/languages/xml";
    import json from "highlight.js/lib/languages/json";
    import "../style.css";
    import hljs from "highlight.js";
    import { onMount } from "svelte";
    import { browser } from "$app/environment";

    export let data;

    onMount(() => {
        if (browser) {
            hljs.registerLanguage("xml", xml);
            hljs.registerLanguage("json", json);
            hljs.highlightAll();
        }
    });
</script>

<Head
    title="Difff | XML to JSON Converter Online Tool, Beautifier & Validator"
    description="Converter XML to JSON Online with difff.app. Our online tool provides XML and JSON pretty print, beautifies, and converts it."
    openGraph={{ type: "website", locale: "en_US" }}
/>

<main class="main">
    <header>
        <h1 class="main_title">XML to JSON Converter Online</h1>
        <h2 class="main_subtitle">Convert XML to JSON, Validate and Prettify it.</h2>
    </header>
    <section class="converter_field-wrapper">
        <DoubleCodeMirror
            formatLeft="xml"
            placeholderLeft="Provide a XML or Drag & Drop a file"
            labelLeft="XML to convert field"
            formatRight="json"
            placeholderRight="Converted JSON output"
            labelRight="JSON converted field"
            convertFunction={Converter.XmlToJson}
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
