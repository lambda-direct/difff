<script lang="ts">
    import { browser } from "$app/environment";
    import CodeMirror from "~/lib/shared/codemirror/Codemirror.svelte";
</script>

<svelte:head>
    <title>JSON Formatter Online Tool, Beautifier & Validator - Difff</title>
    <meta
        name="description"
        content="Format & Validate JSON Online with difff.app. Our online tool provides JSON pretty print, beautifies, and converts text files effortlessly."
    />
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:description" content="content" />
    <meta name="twitter:title" content="Post" />
    <meta name="twitter:image" content="https://site.com/past.png" />
    <meta name="twitter:site" content="@sitename" />

    <meta property="og:locale" content="en_US" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://difff.app/" />
    <meta
        property="og:title"
        content="Free JSON Formatter Online. Validate, Format & Prettify your JSON"
    />

    <meta property="og:image" content="https://site.com/post.jpg" />

    <meta
        property="og:description"
        content="Get FREE SEO report by 100+ parameters with the best website checker. Detailed site auditing will help to find errors in meta tags, images, links. Step-by-step guides for correcting any error and growing SEO score. The average time of site auditing is 15 seconds. Free use regardless of the number of website review."
    />
</svelte:head>

<main class="main">
    <header>
        <h1 class="main_title">JSON Formatter Online</h1>
        <h2 class="main_subtitle">Validate, Format & Prettify your JSON</h2>
    </header>
    <section class="formatter_field-wrapper">
        {#if browser}
            <CodeMirror
                format="json"
                placeholder="Put your JSON, provide a link, or Drag & Drop a file"
            />
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
