<script lang="ts">
    import GitHubIcon from "$lib/icons/GitHubIcon.svelte";
    import InputField from "$lib/shared/InputField.svelte";
    import CompareJson from "../../utils/index";

    let userInput: string | null = null;
    const formater = async (input: string) => {
        userInput = await CompareJson.format(input);
    };
    $: {
        if (userInput) {
            formater(userInput);
        }
    }
</script>

<svelte:head>
    <title>JSON Formatter Online Tool, Beautifier & Validator - Difff</title>

    <meta
        name="description"
        content="Format & Validate JSON Online with difff.app. Our online tool provides JSON pretty print, beautifies, and converts text files effortlessly."
    />
</svelte:head>
<header>
    <a
        href="https://github.com/lambda-direct/difff"
        target="_blank"
        title="Difff GitHub repository"
        class="github-link"
    >
        <GitHubIcon />
    </a>
</header>
<h1>JSON Formatter Online</h1>
<main>
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
