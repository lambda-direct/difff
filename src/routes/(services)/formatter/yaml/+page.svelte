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
            for configuration files, with (.yaml) or (.yml) extension. Structured with key-value pairs,
            where key is always a string.
        </p>
        <p>Basic principles:</p>
        <ul>
            <li>Each keys is unique</li>
            <li>Comments identified by (#)</li>
            <li>Multi-lane comments unsupported</li>
            <li>Case and space sensitive</li>
            <li>Uses spaces instead of tabs</li>
            <li>Spaces number must be consistent</li>
            <li>Support multiple documents in one file</li>
        </ul>
        <h3>YAML naming for data structures</h3>
        <p>
            <strong>Mappings</strong> - store key-value pairs. Represent complex structures like
            hashes or dictionaries.<br /> <strong>Sequences</strong> - simple structures, each item
            placed on its own line & that start with an opening dash serve for arrays or tuples.
            <br /><strong>Scalar</strong> - equivalent basic types boolean, Date, Timestamp, integers,
            and floating numbers.
        </p>
        <pre>
            <code class="language-yaml hljs">    
# This is an example using YAML, each documents starts each with three dashes and end with three dots. 
# Data structure example

---
# key: value [mapping]
company: spacelift

# key: value is an array [sequence]
domain:
 - 22 #number 
 - true #boolean
 - 2024-02-10 #Date

# key: value is a string [scalar]
str1: "YAML" #string quoted
str2: 'YAML' #string quoted
str3: YAML #string unquoted

# complex example
tutorial:
  - yaml:
      name: "YAML Ain't Markup Language" #string 
      someOption: true #boolean
      born: 2001 #number
  - json:
      name: JavaScript Object Notation #string
      someOption: great #string
      born: 2001 #number
  - xml:
      name: Extensible Markup Language #string
      someOption: 2024-02-10 #Date
      born: 1996 #number
...

# Indentation defines it's structure, using spaces.
---
nestingExample:  #nesting level 1
  - yaml:  #nesting level 2 (2 spaces)
      name: "YAML Ain't Markup Language" #string #nesting level 3 (4 spaces)
      type: awesome #string
      born: 2001 #number
...

# Key case sensitivity. Two valid key-value pair
---
caseExample: true #boolean
caseexample: !!str false #string
...

# YAML autodetects types. To force a type indication usea prefix (!!) before type. 
---
age: !!float 23
dead: !!str false
binary: !!int 0b101010
hexadecimal: !!int 0x1C7A
name: !!str "James"
...

# If want to use special characters wrap string in single quotes. 
# With a backslash use double quote

#input:
foo: "hello world quoted\n" 
bar: hello world unquoted\n
quote: 'A single quote '' inside a single-quoted string'

#output:
foo: |
  hello world quoted #formatter processes quoted value as ending with linefeed
bar: hello world unquoted\n #unquoted, it treats the \n as two characters
quote: A single quote ' inside a single-quoted string #To use single quote(') doubled it


# Also it will convert other values

#input:
nullExample: [~, NULL, Null] #canonical, uppercase & camelCase to null
nullExample2:  #empty to null
intExample: [0b1110001111010, 0o16172, 0x1C7A] #binary, octal, hexadecimal to int
boolExample: [TRUE, True] #uppercase & camelCase to bool
floatExample: [.NAN, .NaN, .INF] #uppercase & camelCase to float

#output:
nullExample:
  - null
  - null
  - null
nullExample2: null
intExample:
  - 7290
  - 7290
  - 7290
boolExample:
  - true
  - true
floatExample:
  - .nan
  - .nan
  - .inf
            </code>
        </pre>
        <h3>How to use YAML formatter</h3>
        <p>
            Put JSON, js object or an undecorated YAML. We'll validate your input and return a
            formatted YAML.
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
