<script lang="ts">
    import JsonFormatter from "~/utils/JSONFormatter";
    import { browser } from "$app/environment";
    import { EditorView } from "@codemirror/view";
    import MagicWand from "~/lib/icons/MagicWandIcon.svelte";
    import CodeMirror from "~/lib/shared/codemirror/Codemirror.svelte";
    import CodeMirrorHeader from "~/lib/shared/CodeMirrorHeader.svelte";

    let value: string
    let view: EditorView;

</script>

<svelte:head>
    <title>JSON Formatter Online Tool, Beautifier & Validator - Difff</title>
    <meta
        name="description"
        content="Format & Validate JSON Online with difff.app. Our online tool provides JSON pretty print, beautifies, and converts text files effortlessly."
    />
</svelte:head>

<main class="main">
    <header>
        <h1 class="title">JSON Formatter Online</h1>
        <h2 class="subtitle">Validate, Format & Prettify your JSON</h2>
    </header>
    <section class="formatter_field-wrapper">
        <CodeMirrorHeader bind:value bind:view label="JSON Formatter" btnName="Format" passedFunctionClick={JsonFormatter.prettierFormatJSON}>
            <span  class="header_btn">
                <MagicWand/>
                Format
            </span>
        </CodeMirrorHeader>
        {#if browser}
            <CodeMirror bind:value bind:view placeholder={"Put your JSON, provide a link, or Drag & Drop a file"} type="json" controlFunction={JsonFormatter.prettierFormatJSON}/>
        {:else}
            <div class="back-field" />
        {/if}
    </section>
    <article class="article">
        <h2 class="article_title">How to Format JSON Using an Online Tool (Easy Method)</h2>
        <p class="article-text">
            JSON formatter & validator helps to beautify your JSON text and pretty print it.
            Optimize your JSON formatting effortlessly with our online tool. Simply put your JSON
            text, provide a link to your JSON, or upload a file containing your JSON. Whether your
            JSON is valid or not, our service will identify and display errors if any are present.
            For valid JSON, it will be formatted using <a
                href="https://prettier.io/"
                rel="nofollow noopener noreferrer"
                target="_blank"
                class="prettier-href">Prettier</a
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
    
    .header_btn{
        display: flex;
        gap: 4px;
        font-size: 16px;
    }

    .title {
        margin: 28px 0 0;
        text-align: center;
    }

    .subtitle {
        margin: 16px 0 0;
        text-align: center;
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
    }

    .article-text {
        margin: 16px 0 0;
        text-align: center;
    }

    .formatter_field-wrapper {
        display: flex;
        flex-direction: column;
        margin: 32px 0 0;
        width: 100%;
    }
    .back-field {
        height: calc(60vh + 54px);
        resize: none;
        background: #030711;
        border-bottom-left-radius: 8px;
        border-bottom-right-radius: 8px;
    }
    .prettier-href{
        text-decoration: underline;
    }
</style>
