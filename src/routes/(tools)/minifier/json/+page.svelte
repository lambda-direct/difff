<script lang="ts">
    import Head from "~/lib/shared/Head.svelte";
    import CodeMirror from "~/lib/shared/Codemirror/Codemirror.svelte";
</script>

<Head
    title="Difff | JSON Minifier Online Tool. Beautify, minify, format & validate"
    description="Minify, formatted JSON Online with difff.app. Our online tool provides JSON pretty print, minifies, beautifies, and converts text files."
    openGraph={{ type: "website", locale: "en_US" }}
/>

<main class="main">
    <header>
        <h1 class="main_title">JSON Minifier Online</h1>
        <h2 class="main_subtitle">Validate and Minify your JSON</h2>
    </header>
    <section class="formatter_field-wrapper">
        <CodeMirror
            tool="minifier"
            format="json"
            placeholder="Provide a JSON, link, or Drag & Drop a file"
            label="JSON format field"
        />
    </section>
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
