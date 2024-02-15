<script lang="ts">
    import InputField from "$lib/shared/InputField.svelte";

    let userInput: string | null = null;
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
        <InputField
            id={"leftField"}
            bind:userValue={userInput}
            placeholder="Put your JSON, provide a link, or Drag & Drop a file"
        />
    </section>
    <article class="article">
        <h2 class="article_title">How to Format JSON Using an Online Tool (Easy Method)</h2>
        <p class="article_text">
            JSON formatter & validator helps to beautify your JSON text and pretty print it.
            Optimize your JSON formatting effortlessly with our online tool. Simply put your JSON
            text, provide a link to your JSON, or upload a file containing your JSON. Whether your
            JSON is valid or not, our service will identify and display errors if any are present.
            For valid JSON, it will be formatted using <a href="https://biomejs.dev/">Biome</a>.
        </p>
    </article>
</main>

<style>
    .main {
        display: flex;
        align-items: center;
        flex-direction: column;
    }
    .title {
        margin: 28px 0 0;
    }
    .subtitle {
        margin: 16px 0 0;
        color: #e2e8f0;
    }
    .article {
        margin: 32px auto 0;
        width: 925px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .article_title {
        font-weight: 700;
    }
    .article_text {
        margin: 16px 0 0;
        text-align: center;
    }
    .formatter_field-wrapper {
        margin: 32px 0 0;
    }
</style>
