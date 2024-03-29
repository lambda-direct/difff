<script lang="ts">
    import Head from "~/lib/shared/Head.svelte";
    import DoubleCodeMirror from "~/lib/shared/Codemirror/DoublecCodemirrorField.svelte";
    import Converter from "~/utils/Converter";

    export let data;
</script>

<Head
    title="YAML to JSON Converter Online Tool"
    description="difff.app provides converting YAML to JSON with validation and pretty print."
    openGraph={{ type: "website", locale: "en_US" }}
/>

<main class="main">
    <header>
        <h1 class="main_title">YAML to JSON Converter Online</h1>
        <h2 class="main_subtitle">Validate YAML, converter it to JSON with output pretty print.</h2>
    </header>
    <section class="converter_field-wrapper">
        <DoubleCodeMirror
            formatLeft="yaml"
            placeholderLeft="Provide a YAML, or Drag & Drop a file"
            labelLeft="YAML to convert field"
            formatRight="json"
            placeholderRight="Converted JSON output"
            labelRight="JSON converted field"
            convertFunction={Converter.jsonToYaml}
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
