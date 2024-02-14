<script lang="ts">
    import CompareJson from "../utils/index";
    import { leftSample, rightSample } from "../utils/samples";
    import CheckBox from "$lib/shared/CheckBox.svelte";
    import GitHubIcon from "$lib/icons/GitHubIcon.svelte";
    import InputField from "$lib/shared/InputField.svelte";
    import DiffMessages from "$lib/shared/DiffContent.svelte";
    import CodeMirror from "svelte-codemirror-editor";
    import { javascript } from "@codemirror/lang-javascript";

    let fileContentLeft: string | null = null;
    let fileContentRight: string | null = null;

    let resultContentLeft: string | null = null;
    let resultContentRight: string | null = null;

    let missingProperties: number;
    let incorrectTypes: number;
    let unequalValues: number;
    let totalDifferences: number;
    let diffMessages: string[];

    let showMissingProperties: boolean = true;
    let showIncorrectTypes: boolean = true;
    let showUnequalValues: boolean = true;

    const trySample = () => {
        fileContentLeft = leftSample;
        fileContentRight = rightSample;
    };

    const getResults = async () => {
        const formatted = CompareJson.isValid(fileContentLeft, fileContentRight);
        if (formatted) {
            resultContentLeft = formatted.left;
            resultContentRight = formatted.right;
            const { diffKey, diffTypes, diffValues, messages } = CompareJson.compareJson(
                resultContentLeft,
                resultContentRight
            );
            missingProperties = diffKey;
            incorrectTypes = diffTypes;
            unequalValues = diffValues;
            totalDifferences = diffKey + diffTypes + diffValues;
            diffMessages = messages;
        }
    };
</script>

<svelte:head>
    <title>Difff | compare and format json online</title>
    <meta
        name="description"
        content="Compare two JSON documents. Validate, format, and .  See the differences between the objects."
    />
</svelte:head>

<header class="header">
    <h1>Compare JSON online</h1>
    <a
        href="https://github.com/lambda-direct/difff"
        target="_blank"
        title="Difff GitHub repository"
        class="github-link"
    >
        <GitHubIcon />
    </a>
</header>
<main class="compare-jsons_main">
    {#if resultContentLeft && resultContentRight}
        <h2>Check JSONs differences</h2>
        {#if totalDifferences && diffMessages.length}
            <div class="results">
                <p class="title">Found {totalDifferences} differences</p>
                <div class="check-box-input">
                    <p class="title">Show:</p>
                    <CheckBox
                        name="missingProperties"
                        prop={showMissingProperties}
                        label={`${missingProperties} missing properties`}
                    />
                    <CheckBox
                        name="incorrectTypes"
                        prop={showIncorrectTypes}
                        label={`${incorrectTypes} incorrect types`}
                    />
                    <CheckBox
                        name="unequalValues"
                        prop={showUnequalValues}
                        label={`${unequalValues} unequal values`}
                    />
                </div>
            </div>
        {/if}
        <section class="result-fields">
            <div style="width:40%">
                <CodeMirror
                    bind:value={resultContentLeft}
                    lang={javascript()}
                    readonly={true}
                    styles={{
                        "&": {
                            width: "100%",
                            minHeight: "450px",
                            "text-align": "flex-start"
                        }
                    }}
                />
            </div>
            <DiffMessages total={totalDifferences} messages={diffMessages} />
            <div style="width:40%">
                <CodeMirror
                    bind:value={resultContentRight}
                    lang={javascript()}
                    readonly={true}
                    styles={{
                        "&": {
                            minHeight: "450px",
                            "text-align": "flex-start"
                        }
                    }}
                />
            </div>
        </section>
    {:else}
        <section class="compare-jsons_fields">
            <InputField id={"leftField"} bind:userValue={fileContentLeft} />
            <div class="center">
                <button on:click={getResults} class="compare-btn">Compare</button>
                <span class="secondary"> or</span>
                <button on:click={trySample} class="sample-btn"> try sample data </button>
            </div>
            <InputField id={"rightField"} bind:userValue={fileContentRight} />
        </section>
    {/if}
</main>

<style>
    .sample-btn {
        background: transparent;
        border: none;
        color: #808080;
        font-size: 14px;
        font-weight: 500;
    }
    .sample-btn:hover {
        text-decoration: underline;
        color: #3366cc;
    }
    .compare-btn {
        height: 36px;
        padding: 0 8px;
        background: transparent;
        border: 1px solid #676767;
        border-radius: 4px;
        font-size: 16px;
        font-weight: 500;
    }
    .compare-btn:hover {
        background: #e1e1e1;
        border: 1px solid #e1e1e1;
    }
    .secondary {
        font-size: 14px;
        font-weight: 500;
        color: #808080;
    }
    .results {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        padding: 12px;
    }
    .title {
        margin: 0;
        padding: 8px;
        font-size: 16px;
        font-weight: 600;
        color: #000;
    }
    .header {
        position: relative;
        text-align: center;
        margin: 24px 24px 48px;
        font-family: "Montserrat", sans-serif;
    }
    .github-link {
        position: absolute;
        top: 0;
        right: 0;
    }
    .check-box-input {
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    .compare-jsons_main {
        text-align: center;
        font-family: "Montserrat", sans-serif;
        margin: 24px;
    }
    .compare-jsons_fields {
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        margin: 24px;
    }

    .result-fields {
        display: flex;
        justify-content: space-around;
        text-align: left;
    }

    .center {
        display: flex;
        flex-direction: column;
        margin: 0 auto;
    }
</style>
