<script lang="ts">
    import { browser } from "$app/environment";
    import { EditorView } from "@codemirror/view";
    import MagicWand from "~/lib/icons/MagicWandIcon.svelte";
    import { addHighlightedLine, removeHighlightedLines } from "~/lib/shared/codemirror/codeMirror";
    import CodeMirror from "~/lib/shared/codemirror/Codemirror.svelte";
    import CodeMirrorHeader from "~/lib/shared/CodeMirrorHeader.svelte";
    import { showError } from "~/lib/storages";
    import * as yaml from "js-yaml";
    import { isFormatError, isYamlError } from "~/utils/helpers";


    let value: string
    let view: EditorView;

    const formatClick = (value: string, view: EditorView, isError: boolean) =>{
        validateYaml(value, view);
        if (!isError && value.replaceAll(" ", "")) {
            view.dispatch({
                effects: [EditorView.scrollIntoView(1)]
            });
            return formatYaml(value);
        } else {
            return value;
        }  
    }

    const validateYaml = (value: string, view: EditorView) => {
        if (value) {
            try {
                formatYaml(value);
                removeHighlightedLines(view);
                showError.set(false);
                return;
            } catch (err) {
                if (isYamlError(err)) {
                    addHighlightedLine(view, err.mark.line);
                }
                showError.set(true);
                return;
            }
        } else {
            showError.set(false);
            return;
        }
    };

    const formatYaml = (yamlString: string) => {
        const yamlObject = yaml.load(yamlString);
        const formattedYaml = yaml.dump(yamlObject);
        return formattedYaml;
    };
</script>

<svelte:head>
    <title>YAML Formatter Online Tool, Beautifier & Validator - Difff</title>
    <meta
        name="description"
        content="Format & Validate YAML Online with difff.app. Our online tool provides YAML pretty print, beautifies, and converts text files effortlessly."
    />
</svelte:head>

<main class="main">
    <header>
        <h1 class="title">YAML Formatter Online</h1>
        <h2 class="subtitle">Validate, Format & Prettify your YAML</h2>
    </header>
    <section class="formatter_field-wrapper">
        <CodeMirrorHeader label="YAML Formatter" btnName="Format" functionClick={async() => {value = await formatClick(value, view, $showError)}}>
            <span  class="header_btn">
                <MagicWand/>
                Format
            </span>
        </CodeMirrorHeader>
        {#if browser}
            <CodeMirror bind:value bind:view placeholder={"Put your YAML, provide a link, or Drag & Drop a file"} controlFunction={formatYaml} validateFunction={validateYaml}/>
        {:else}
            <div class="back-field" />
        {/if}
    </section>

    <article class="article">
        <h2 class="article_title">How to Format YAML Using an Online Tool (Easy Method)</h2>
        <p class="article-text">
            YAML formatter & validator helps to beautify your YAML text and pretty print it.
            Optimize your YAML formatting effortlessly with our online tool. Simply put your YAML
            text, provide a link to your YAML, or upload a file containing your YAML. Whether your
            YAML is valid or not, our service will identify and display errors if any are present.
            For valid YAML, it will be formatted using <a
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
