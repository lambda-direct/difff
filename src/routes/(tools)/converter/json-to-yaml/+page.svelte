<script lang="ts">
    import Head from "~/lib/shared/Head.svelte";
    import DoubleCodeMirror from "~/lib/shared/Codemirror/DoublecCodemirrorField.svelte";
    import Converter from "~/utils/Converter";

    export let data;
</script>

<Head
    title="JSON to YAML Converter Online Tool | Difff"
    description="Convert JSON to YAML Online with difff.app. Online tool provides JSON validation and formatting, convert it to YAML with pretty print."
    openGraph={{ type: "website", locale: "en_US" }}
/>

<main class="main">
    <header>
        <h1 class="main_title">JSON to YAML Converter Online</h1>
        <h2 class="main_subtitle">
            Convert JSON format into YAML, with formatted and beautified output.
        </h2>
    </header>
    <section class="converter_field-wrapper">
        <DoubleCodeMirror
            formatLeft="json"
            placeholderLeft="Provide a JSON, link, or Drag & Drop a file"
            labelLeft="JSON to convert field"
            formatRight="yaml"
            placeholderRight="Converted YAML output"
            labelRight="YAML converted field"
            convertFunction={Converter.yamlToJson}
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
