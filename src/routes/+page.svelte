<script lang="ts">
    import { browser } from "$app/environment";
    import CopyIcon from "~/lib/icons/CopyIcon.svelte";
    import JSONIcon from "~/lib/icons/JSONIcon.svelte";
    import BtnIcon from "~/lib/shared/ButtonWithIcon.svelte";
    import DownLoadIcon from "~/lib/icons/DownloadIcon.svelte";
    import CodeMirror from "~/lib/shared/codemirror/Codemirror.svelte";
    let jsonData = {
        name: "John Doe",
        age: 30,
        city: "Example City"
    };
    const downloadJsonFile = () => {
        const jsonString = JSON.stringify(jsonData, null, 2);
        const blob = new Blob([jsonString], { type: "application/json" });
        const url = URL.createObjectURL(blob);

        const aTag = document.createElement("a");
        aTag.href = url;
        aTag.download = "data.json";
        document.body.appendChild(aTag);
        aTag.click();
        document.body.removeChild(aTag);
        URL.revokeObjectURL(url);
    };
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
    <div class="section-wrapper">
        <div class="icon-header">
            <div class="title-wrapper">
                <JSONIcon color={"#e2e8f0"} />
            </div>
            <div class="icon-btn-wrapp">
                <BtnIcon click={downloadJsonFile}><DownLoadIcon color={"#7d8799"} /></BtnIcon>
                <BtnIcon click={() => {}}><CopyIcon color={"#7d8799"} /></BtnIcon>
            </div>
        </div>
        <section class="formatter_field-wrapper">
            {#if browser}
                <CodeMirror placeholder={"Put your JSON, provide a link, or Drag & Drop a file"} />
            {:else}
                <div class="back-field" />
            {/if}
        </section>
    </div>

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
    .section-wrapper {
        display: flex;
        flex-direction: column;
        margin: 32px 0 0;
        width: 100%;
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
        font-weight: 700;
    }
    .article-text {
        margin: 16px 0 0;
        text-align: center;
    }
    .formatter_field-wrapper {
        width: 100%;
    }
    .back-field {
        height: 500px;
        resize: none;
        background: #030711;
        border-bottom-left-radius: 8px;
        border-bottom-right-radius: 8px;
    }
    .icon-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 12px;
        height: 48px;
        background: #030711;
        border-bottom: 1px solid #2b292929;
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
    }
    .title-wrapper {
        display: flex;
        align-items: center;
    }
    .icon-btn-wrapp {
        display: flex;
        gap: 8px;
    }
</style>
