<script lang="ts">
    import CodeMirror from "svelte-codemirror-editor";
    import LeftArrowIcon from "$lib/icons/Left.svelte";
    import RightArrowIcon from "$lib/icons/Right.svelte";
    import GitHubIcon from "$lib/icons/GitHubIcon.svelte";
    import { javascript } from "@codemirror/lang-javascript";
    import { compareJson, formatJson, leftSample, rightSample } from "../utils/index";

    let fileContentLeft: string | null = null;
    let fileContentRight: string | null = null;

    let resultContentLeft: string | null = null;
    let resultContentRight: string | null = null;

    let missingProperties: number;
    let incorrectTypes: number;
    let unequalValues: number;
    let totalDifferences: number;
    let diffMessages: string[];

    let currentDiffMessage: number = 0;

    let showMissingProperties: boolean = true;
    let showIncorrectTypes: boolean = true;
    let showUnequalValues: boolean = true;

    const clickRight = () => {
        if (currentDiffMessage + 2 > totalDifferences) {
            currentDiffMessage = 0;
        } else {
            currentDiffMessage += 1;
        }
    };
    const clickLeft = () => {
        if (currentDiffMessage - 1 < 0) {
            currentDiffMessage = totalDifferences - 1;
        } else {
            currentDiffMessage -= 1;
        }
    };
    const handleFileChange = (event: Event) => {
        const fileInput = event.target as HTMLInputElement;
        const file = fileInput.files?.[0];
        const reader = new FileReader();
        if (file) {
            reader.onload = (e) => {
                if (e.target && typeof e.target.result === "string") {
                    if (fileInput.id === "leftField") {
                        fileContentLeft = e.target.result;
                    } else {
                        fileContentRight = e.target.result;
                    }
                }
            };
            reader.readAsText(file);
        }
    };

    const trySample = () => {
        fileContentLeft = leftSample;
        fileContentRight = rightSample;
    };

    const getResults = () => {
        if (fileContentLeft && fileContentRight) {
            const { diffKey, diffTypes, diffValues, messages } = compareJson(
                fileContentLeft,
                fileContentRight
            );
            missingProperties = diffKey;
            incorrectTypes = diffTypes;
            unequalValues = diffValues;
            totalDifferences = diffKey + diffTypes + diffValues;
            diffMessages = messages;

            resultContentLeft = formatJson(fileContentLeft);
            resultContentRight = formatJson(fileContentRight);
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
        title="Diff GitHub repository"
        class="github-link"
    >
        <GitHubIcon />
    </a>
</header>
<main class="compare-jsons_main">
    {#if resultContentLeft && resultContentRight}
        <h2>Check JSONs differences</h2>
        <div class="results">
            <p class="title">Found {totalDifferences} differences</p>
            <div class="radio-input">
                <p class="title">Show:</p>
                <div class="radio-pick">
                    <input
                        class="radio"
                        type="checkbox"
                        id="missing"
                        name="missing properties"
                        value="missingProperties"
                        checked={showMissingProperties}
                        on:click={() => (showMissingProperties = !showMissingProperties)}
                    />
                    <label class="for-radio" for="missing"
                        >{missingProperties} missing properties</label
                    >
                </div>
                <div class="radio-pick">
                    <input
                        class="radio"
                        type="checkbox"
                        id="incorrect"
                        name="incorrect types"
                        value="incorrectTypes"
                        checked={showIncorrectTypes}
                        on:click={() => (showIncorrectTypes = !showIncorrectTypes)}
                    />
                    <label class="for-radio" for="incorrect"
                        >{incorrectTypes} incorrect types
                    </label>
                </div>
                <div class="radio-pick">
                    <input
                        class="radio"
                        type="checkbox"
                        id="unequal"
                        name="unequal values"
                        value="unequalValues"
                        checked={showUnequalValues}
                        on:click={() => (showUnequalValues = !showUnequalValues)}
                    />
                    <label class="for-radio" for="unequal">{unequalValues} unequal values</label>
                </div>
            </div>
        </div>
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
            <div class="diff-messages">
                <div class="diff-message-header">
                    <button on:click={clickLeft} class="arrows"
                        ><LeftArrowIcon margin={"2px 0 0"} /></button
                    >
                    {currentDiffMessage + 1} of {totalDifferences}
                    <button on:click={clickRight} class="arrows"><RightArrowIcon /></button>
                </div>
                <div class="diff-messages-message">{diffMessages[currentDiffMessage]}</div>
            </div>
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
            <div class="input-cards">
                <textarea
                    bind:value={fileContentLeft}
                    placeholder="Enter JSON to compare, enter an URL to JSON"
                    spellcheck="false"
                    id="textAreaLeft"
                />
                <div class="input-container">
                    <label class="label-for-file" for="leftField">Or upload file</label>
                    <input
                        class="for-file"
                        type="file"
                        id="leftField"
                        on:change={handleFileChange}
                    />
                </div>
            </div>
            <div class="center">
                <button on:click={getResults} class="compare-btn">Compare</button>
                <span class="secondary"> or</span>
                <button on:click={trySample} class="sample-btn"> try sample data </button>
            </div>
            <div class="input-cards">
                <textarea
                    bind:value={fileContentRight}
                    placeholder="Enter JSON to compare, enter an URL to JSON"
                    spellcheck="false"
                    id="textAreaRight"
                />

                <div class="input-container">
                    <label class="label-for-file" for="rightField">Or upload file</label>
                    <input
                        class="for-file"
                        type="file"
                        id="rightField"
                        on:change={handleFileChange}
                    />
                </div>
            </div>
        </section>
    {/if}
</main>

<style>
    .diff-messages-message {
        margin: 8px;
        width: 70%;
        padding: 8px;
        background-color: #3239581a;
        border-radius: 4px;
        border: thin solid lightgray;
        font-size: 14px;
        font-weight: 500;
        color: #000;
        line-height: 18px;
    }
    .diff-message-header {
        display: flex;
        align-items: center;
        flex-direction: row;
        justify-content: space-around;
        width: 70%;
        padding: 8px 0;
    }
    .diff-messages {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 20%;
    }
    .radio {
        border-radius: 2px !important;
        border: 2px solid #507299;
        cursor: pointer;
        width: 15px;
        height: 14px;
        appearance: none;
        accent-color: #507299;
        margin-right: 4px;
    }
    .radio:checked {
        border-radius: 2px !important;
        cursor: pointer;
        width: 15px;
        height: 14px;
        appearance: auto;
        accent-color: #507299;
        margin-right: 4px;
    }
    .arrows {
        background: transparent;
        border: none;
        display: flex;
    }
    .arrows:hover {
        background: #e1e1e1;
        border-radius: 6px;
    }
    .for-radio {
        cursor: pointer;
    }
    .for-file,
    .for-radio {
        font-size: 14px;
        font-weight: 500;
        color: #000;
    }
    .label-for-file {
        padding: 4px;
        font-size: 14px;
    }
    textarea::placeholder {
        font-size: 12px;
        color: #545454;
    }
    textarea {
        min-height: 450px;
        padding: 6px;
        resize: vertical;
        background: #e1e1e1;
        border: 1px solid #676767;
        border-radius: 4px;
    }
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
    .input-container {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        padding: 8px;
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
    .radio-input {
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    .radio-pick {
        display: flex;
        align-items: center;
        padding: 4px;
        font-weight: 600;
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
    .input-cards {
        display: flex;
        flex-direction: column;
        width: 40%;
    }
    .center {
        display: flex;
        flex-direction: column;
        margin: 0 auto;
    }
</style>
