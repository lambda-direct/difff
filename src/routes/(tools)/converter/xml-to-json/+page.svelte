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
    title="XML to JSON Converter Online Tool | Difff"
    description="XML to JSON Online converter. Our online tool provides XML validation and formatting, converting to JSON."
    openGraph={{ type: "website", locale: "en_US" }}
/>

<main class="main">
    <header>
        <h1 class="main_title">XML to JSON Converter Online</h1>
        <h2 class="main_subtitle">
            Convert XML to JSON, after validation with pretty formatted output.
        </h2>
    </header>
    <section class="converter_field-wrapper">
        <DoubleCodeMirror
            formatLeft="xml"
            placeholderLeft="Provide a XML or Drag & Drop a file"
            labelLeft="XML to convert field"
            formatRight="json"
            placeholderRight="Converted JSON output"
            labelRight="JSON converted field"
            convertFunction={Converter.xmlToJson}
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
