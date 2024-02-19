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
</svelte:head>

<main class="main">
    <h1 class="title">JSON Formatter Online</h1>
    <h2 class="subtitle">Validate, Format & Prettify your JSON</h2>

    <section class="formatter_field-wrapper">
        {#if browser}
            <CodeMirror placeholder={"Put your JSON, provide a link, or Drag & Drop a file"} />
        {:else}
            <div class="back-field" />
        {/if}
    </section>
    <article class="article">
        <h2 class="article_title">How to Format JSON Using an Online Tool (Easy Method)</h2>
        <p class="article_text">
            JSON formatter & validator helps to beautify your JSON text and pretty print it.
            Optimize your JSON formatting effortlessly with our online tool. Simply put your JSON
            text, provide a link to your JSON, or upload a file containing your JSON. Whether your
            JSON is valid or not, our service will identify and display errors if any are present.
            For valid JSON, it will be formatted using <a
                href="https://prettier.io/"
                rel="nofollow noopener noreferrer"
                target="_blank">Prettier</a
            >.
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
    .title {
        margin: 28px 0 0;
        text-align: center;
    }
    .subtitle {
        margin: 16px 0 0;
        text-align: center;
        color: #e2e8f0;
    }
    .article {
        margin: 32px auto 0;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .article_title {
        text-align: center;
        font-weight: 700;
    }
    .article_text {
        margin: 16px 0 0;
        text-align: center;
        font-family: "Noto Sans", sans-serif;
    }
    .formatter_field-wrapper {
        width: 100%;
        margin: 32px 0 0;
    }
    .back-field {
        height: 500px;
        resize: none;
        background: #030711;
        border-radius: 12px;
    }
</style>
