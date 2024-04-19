<script lang="ts">
    import CodeMirror from "~/lib/shared/Codemirror/Codemirror.svelte";
    import Head from "~/lib/shared/Head.svelte";
    import hljs from "highlight.js";
    import { onMount } from "svelte";
    import { browser } from "$app/environment";

    // export let data;

    onMount(() => {
        if (browser) hljs.highlightAll();
    });
</script>

<Head
    title="SQL Formatter Online, Formatter and Beautifier for SQL Statements | Difff"
    description="Format, Validate & Beautify SQL Statements Online with difff.app. Our online tool provides SQL pretty print, beautifies, and converts text files effortlessly."
    openGraph={{ type: "website", locale: "en_US" }}
/>

<main class="main">
    <header>
        <h1 class="main_title">SQL Formatter Online</h1>
        <h2 class="main_subtitle">Perform SQL Statements Validation, Format, and Prettify.</h2>
    </header>
    <section class="formatter_field-wrapper">
        <CodeMirror
            tool="formatter"
            format="sql"
            placeholder="Put your SQL or Drag & Drop a file"
            label="SQL format field"
        />
    </section>
    <!-- <article>
        <svelte:component this={data.content} />
    </article> -->
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
