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
    title="Difff | YAML to XML Converter Online Tool"
    description="Converter YAML to XML Online with difff.app. Our online tool provides YAML and XML  pretty print, beautifies, and converts it."
    openGraph={{ type: "website", locale: "en_US" }}
/>

<main class="main">
    <header>
        <h1 class="main_title">YAML to XML Converter Online</h1>
        <h2 class="main_subtitle">Convert YAML to XML, Validate and Prettify it.</h2>
    </header>
    <section class="converter_field-wrapper">
        <DoubleCodeMirror
            formatLeft="yaml"
            placeholderLeft="Provide a YAML, or Drag & Drop a file"
            labelLeft="YAML to convert field"
            formatRight="xml"
            placeholderRight="Converted XML output"
            labelRight="XML converted field"
            convertFunction={Converter.yamlToXml}
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
