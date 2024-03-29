<script lang="ts">
    import Head from "~/lib/shared/Head.svelte";
    import CodeMirror from "~/lib/shared/Codemirror/Codemirror.svelte";
</script>

<Head
    title="Online JSON Minify, Validator, Minifier Tool | Difff"
    description="Using difff.app minify JSON. Get formatted and beautified output result."
    openGraph={{ type: "website", locale: "en_US" }}
/>

<main class="main">
    <header>
        <h1 class="main_title">JSON Minifier Online</h1>
        <h2 class="main_subtitle">Minimize the size of valid JSON.</h2>
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
