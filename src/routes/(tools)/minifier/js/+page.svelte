<script lang="ts">
    import Head from "~/lib/shared/Head.svelte";
    import CodeMirror from "~/lib/shared/Codemirror/Codemirror.svelte";
    export let data;
</script>

<Head
    title="JavaScript Minifier Online, Minify Tool | Difff"
    description="Minify, formatted JavaScript Online with difff.app. Our online tool provides minified JavaScript pretty print."
    openGraph={{ type: "website", locale: "en_US" }}
/>

<main class="main">
    <header>
        <h1 class="main_title">JavaScript Minifier Online</h1>
        <h2 class="main_subtitle">Validate and Minify your JavaScript.</h2>
    </header>
    <section class="formatter_field-wrapper">
        <CodeMirror
            tool="minifier"
            format="js"
            placeholder="Provide a JavaScript, or Drag & Drop a file"
            label="JavaScript format field"
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
