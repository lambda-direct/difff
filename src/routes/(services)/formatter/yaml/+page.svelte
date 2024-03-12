<script lang="ts">
    import { browser } from "$app/environment";
    import Head from "~/lib/shared/Head.svelte";
    import CodeMirror from "~/lib/shared/codemirror/Codemirror.svelte";
    import hljs from "highlight.js";
    import "./style.css";
    import yaml from "highlight.js/lib/languages/yaml";
    import { onMount } from "svelte";

    onMount(() => {
        if (browser) {
            hljs.highlightAll();
            hljs.registerLanguage("yaml", yaml);
        }
    });
</script>

<Head
    title="YAML Formatter Online Tool, Beautifier & Validator - Difff"
    description="Format & Validate YAML Online with difff.app. Our online tool provides YAML pretty print, beautifies, and converts text files effortlessly."
    openGraph={{ type: "website", locale: "en_US" }}
/>

<main class="main">
    <header>
        <h1 class="main_title">YAML Formatter Online</h1>
        <h2 class="main_subtitle">Validate, Format & Prettify your YAML</h2>
    </header>
    <section class="formatter_field-wrapper">
        {#if browser}
            <CodeMirror format="yaml" placeholder="Put your YAML or Drag & Drop a file" />
        {:else}
            <div class="back-field" />
        {/if}
    </section>

    <article class="article_style">
        <h2 class="article_style_tittle">How to Format YAML Using an Online Tool</h2>
        <h3>What is YAML file format?</h3>
        <p>
            <strong>YAML (Ain't Markup Language)</strong> - data serialization language used as a format
            for configuration files, with (.yaml) or (.yml) extensions. Structured with key-value pairs,
            where key is always a string.
        </p>
        <p>Basic principles:</p>
        <ul>
            <li>Each key is unique</li>
            <li>Comments are identified by (#)</li>
            <li>Multi-lane comments unsupported</li>
            <li>Case and space sensitive</li>
            <li>Uses spaces instead of tabs</li>
            <li>Each level of indentation multiplies spaces num</li>
            <li>Support multiple documents in one file</li>
        </ul>
        <h3>YAML naming for data structures</h3>
        <p>
            <strong>Mappings</strong> - store key-value pairs. Represent complex structures like
            hashes or dictionaries.<br /> <strong>Sequences</strong> - simple structures, each item
            placed on its own line & that start with an opening dash serve for arrays or tuples.
            <br /><strong>Scalar</strong> - equivalent basic types boolean, date, integers, and floating.
        </p>
        <pre>
            <code class="language-yaml hljs">    
# Each documents starts with three dashes, ends with three dots. 
---
# string
quoted: "YAML"
singleQuoted: 'YAML'
unquoted: YAML

# number
decimal: 7290
binary: 0b1110001111010
octal: 0o16172
hexadecimal: 0x1C7A

# boolean 
null: 
  - ~
  - NULL
  - Null
  - null
  -      # empty also null

# boolean 

boolean: 
  - TRUE
  - True
  - true

# object
human:
  name: James
  age: 51
  children:
    - Bob
    - Joana


# array
arrayName:
  - true
  - "string"
  - 2024

# Redeclare types
age: !!float 23
dead: !!str false
binaryNum: !!int 0b101010
hexadecimalNum: !!int 0x1C7A
name: !!str "James"
...
            </code>
        </pre>
        <h3>How to use YAML formatter</h3>
        <p>
            Put JSON, JavaScript object or an undecorated YAML. We'll validate input and format it.
        </p>
        <h5>Input:</h5>
        <pre>
            <code class="language-yaml hljs">
# JSON
{`{
    "someData": "trees",
    "randomNumber": 322,
    "nullValue": "~",
    "moreValues": "21 22 23",
    "array": [ null, 22, "true"],
    "boolean": false,
    "obj": {
        "val1": "value",
        "val2": "value",
        "val3": true
    }
}`}

# JS object
{`{someData   : "trees", randomNumber: 322, nullValue : ~, moreValues : 21 22 23, array: [null,22, "true"], boolean : false,obj    :     {val1: "value", val2: "value",val3: true}}`}

# badly decorated YAML
someData   : "trees"
randomNumber: 322
nullValue : ~
moreValues : 
  21
  22
 23
array: [null,22, "true"]
boolean : false
obj    :     val1: "value", val2: "value",
val3: true
            </code>
        </pre>
        <h5>Output:</h5>
        <pre>
            <code class="language-yaml hljs">
someData: trees
randomNumber: 322
nullValue: null
moreValues: 21 22 23
array:
  - null
  - 22
  - 'true'
boolean: false
obj:
  val1: value
  val2: value
  val3: true
          </code>
        </pre>
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
    .article_style {
        max-width: 100%;
    }
    .article_style_tittle {
        text-align: center;
    }
</style>
