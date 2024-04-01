<script lang="ts">
    import Head from "~/lib/shared/Head.svelte";
    import CodeMirror from "~/lib/shared/Codemirror/Codemirror.svelte";

    export let data;
</script>

<Head
    title="XML Minifier Online Tool. Minify & Validate"
    description="Minify, formatted XML Online with Our online tool. Difff.app offers XML pretty-printing, minification, beautification, and text file conversion."
    openGraph={{ type: "website", locale: "en_US" }}
/>

<main class="main">
    <header>
        <h1 class="main_title">XML Minifier Online</h1>
        <h2 class="main_subtitle">Confirm XML's Validity and Reduce its Size.</h2>
    </header>
    <section class="formatter_field-wrapper">
        <CodeMirror
            tool="minifier"
            format="xml"
            placeholder="Provide a XML, link, or Drag & Drop a file"
            label="XML format field"
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
