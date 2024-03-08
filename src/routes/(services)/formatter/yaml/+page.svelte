<script lang="ts">
    import { browser } from "$app/environment";
    import Head from "~/lib/shared/Head.svelte";
    import CodeMirror from "~/lib/shared/codemirror/Codemirror.svelte";
    import hljs from "highlight.js";
    import "./style.css";
    import yaml from "highlight.js/lib/languages/yaml";

    if (browser) {
        hljs.highlightAll();
        hljs.registerLanguage("yaml", yaml);
    }
</script>

<Head
    title="YAML Formatter Online Tool, Beautifier & Validator - Difff"
    description="Format & Validate YAML Online with difff.app. Our online tool provides YAML pretty print, beautifies, and converts text files effortlessly."
    twitter={{}}
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
            YAML (<strong>A</strong>'t <strong>M</strong>arkup <strong>L</strong>anguage). It is a
            data serialization language. YAML used as a format for configuration files, create it
            with extension (.yaml) or (.yml). <strong>YAML</strong> structured as key-value pairs, the
            key is always a string. Structure example.
        </p>
        <ul>
            <li>Restriction that each of the keys is unique</li>
            <li>Comments identified with a hash symbol (#)</li>
            <li>Doesn`t support multi-lane comments</li>
            <li>Case and space sensitive format</li>
            <li>Doesn`t accept tabs</li>
            <li>Can support multiple documents</li>
        </ul>
        <p>
            For multiple documents starts each with three dashes and end it with three dots.
            Indentation defines it's structure, <strong>YAML</strong> values in key-value pair act like
            scalar types(numbers, dates, boolean & quoted or unquoted string). If value is an array,
            elements indicates by using dashes. Nesting indication relies on whitespace. Tab characters
            cannot be used for indentation, only spaces it's number must be consistent.
        </p>
        <h3>YAML naming for data structures.</h3>
        <p>
            <strong>Mappings</strong> - store key-value pairs. Represent complex structures like
            hashes or dictionaries.<br /> <strong>Sequences</strong> - simple structures, each item
            placed on its own line & that start with an opening dash serve for arrays or tuples.
            <br /><strong>Scalar</strong> - equivalent basic types boolean, Date, Timestamp, integers,
            and floating numbers.
        </p>
        <pre>
            <code class="language-yaml hljs">
                
#Comment: This is an example using YAML

---
tutorial:  #nesting level 1
  - yaml:  #nesting level 2 (2 spaces used for indentation)
      name: "YAML Ain't Markup Language" #string #nesting level 3 (4 spaces used for indentation)
      type: awesome #string
      born: 2001 #number
...

---
# key: value [mapping]
company: spacelift
# key: value is an array [sequence]
domain:
 - devops
 - devsecops
tutorial:
  - yaml:
      name: "YAML Ain't Markup Language" #string [scalar]
      type: awesome #string [scalar]
      born: 2001 #number [scalar]
  - json:
      name: JavaScript Object Notation #string [scalar]
      type: great #string [scalar]
      born: 2001 #number [scalar]
  - xml:
      name: Extensible Markup Language #string [scalar]
      type: good #string [scalar]
      born: 1996 #number [scalar]
...
            </code>
        </pre>
        <h3>How to use Formatter</h3>
        <p>
            Put your YAML as single line, but wrap it in curly brackets and separate key-value pairs
            with coma(like in js object) or write new key-value pair from a new row.
        </p>
        <h5>Input:</h5>

        <pre>
            <code class="language-yaml hljs">
{`{someData   : "trees", randomNumber: 322, nullValue : ~, moreValues : 21 22 23, array: [null,22, "true"], boolean : false,obj    :     {val1: "value", val2: "value",val3: true}}`}



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
        <h3>How YAML formatter types work</h3>
        <p>
            YAML autodetects types. However, you can specify the type.To force a type indication use
            a prefix (!!) before type. To force a type indication, you can prefix the type with a
            (!!).
        </p>
        <h5>Example:</h5>
        <pre>
            <code class="language-yaml hljs">
age: !!float 23
dead: !!str false
binary: !!int 0b101010
hexadecimal: !!int 0x1C7A
name: !!str "James"
    </code>
        </pre>
        <p>
            If want to use special characters wrap string in single quotes. With a backslash more
            handy to use double quoted, cos formatter processes quoted value as ending with
            linefeed. In unquoted, it treats the \n as two characters. Also it will convert some of
            the values uppercase or camelCase to lowercase. To use single quote(') doubled it.
        </p>
        <h5>Input:</h5>
        <pre>
            <code class="language-yaml hljs">
foo: "hello world quoted\n" 
bar: hello world unquoted\n
nullExample: [~, NULL, Null]
nullExample2:  #empty
intExample: [0b1110001111010, 0o16172, 0x1C7A] #binary, octal, hexadecimal to int
boolExample: [TRUE, True]
floatExample: [.NAN, .NaN, .INF]
quote: 'A single quote '' inside a single-quoted string'
            </code>
        </pre>
        <h5>Output:</h5>
        <pre>
            <code class="language-yaml hljs">
foo: |
  hello world quoted
bar: hello world unquoted\n
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
quote: A single quote ' inside a single-quoted string
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
