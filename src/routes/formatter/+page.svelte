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
    <h1>JSON Formatter Online</h1>
    <h2>Validate, Format & Prettify your JSON</h2>

    <InputField id={"leftField"} bind:userValue={userInput} />
    <article>
        <h2>How to Format JSON Using an Online Tool (Easy Method)</h2>
        <p>
            JSON formatter & validator helps to beautify your JSON text and pretty print it.
            Optimize your JSON formatting effortlessly with our online tool. Simply put your JSON
            text, provide a link to your JSON, or upload a file containing your JSON. Whether your
            JSON is valid or not, our service will identify and display errors if any are present.
            For valid JSON, it will be formatted using <a href="https://biomejs.dev/">Biome</a>.
        </p>
    </article>
</main>

<style>
    h1 {
        margin: 24px 0 16px;
    }
    h2 {
        margin: 16px 0 32px;
        font-weight: 700;
        font-size: 24px;
        line-height: 32.69px;
    }
    .main {
        display: flex;
        align-items: center;
        flex-direction: column;
    }
</style>
