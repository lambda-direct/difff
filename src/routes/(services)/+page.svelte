<script lang="ts">
    import { browser } from "$app/environment";
    import Head from "~/lib/shared/Head.svelte";
    import CodeMirror from "~/lib/shared/codemirror/Codemirror.svelte";
</script>

<Head
    title="Difff | JSON Formatter Online Tool, Beautifier & Validator"
    description="Format & Validate JSON Online with difff.app. Our online tool provides JSON pretty print, beautifies, and converts text files."
    openGraph={{ type: "website", locale: "en_US" }}
/>

<main class="main">
    <header>
        <h1 class="main_title">JSON Formatter Online</h1>
        <h2 class="main_subtitle">Validate, Format & Prettify your JSON</h2>
    </header>
    <section class="formatter_field-wrapper">
        {#if browser}
            <CodeMirror format="json" placeholder="Provide a JSON, link, or Drag & Drop a file" />
        {:else}
            <div class="back-field" />
        {/if}
    </section>
    <article class="footer_article">
        <h2 class="footer_article_title">How to Format JSON Using an Online Tool (Easy Method)</h2>
        <p class="footer_article_text">
            JSON formatter & validator helps to beautify your JSON text and pretty print it.
            Optimize your JSON formatting effortlessly with our online tool. Simply put your JSON
            text, provide a link to your JSON, or upload a file containing your JSON. Whether your
            JSON is valid or not, our service will identify and display errors if any are present.
            For valid JSON, it will be formatted using
            <a
                href="https://prettier.io/"
                target="_blank"
                rel="noreferrer nofollow noopener"
                class="prettier-href"
            >
                Prettier
            </a>
        </p>
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

    .prettier-href {
        text-decoration: underline;
    }
</style>
