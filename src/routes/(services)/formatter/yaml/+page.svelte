<script lang="ts">
    import { browser } from "$app/environment";
    import Head from "~/lib/shared/Head.svelte";
    import CodeMirror from "~/lib/shared/codemirror/Codemirror.svelte";
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
        <h2>How to Format YAML Using an Online Tool</h2>
        <h3>What is YAML file format?</h3>
        <p>
            YAML - Ain't Markup Language. It is a data serialization language, also easy for humans
            to read. Used as a format for configuration files (.yaml .yml). Let's take a look at a
            YAML file structure example.
        </p>
        <pre>
            <code>
---
Aidan Gillen:
    array:
        - Game of Thrones
        - The Wire
    string: some string
    int: '2'
    otherint: 4
    aboolean: 'true'
    boolean: false
    object:
        foo: bar
    Amy Ryan:
        - In Treatment
        - The Wire
    Annie Fitzgerald:
        - True Blood
        - Big Love
        - The Sopranos
        - Oz
            </code>
        </pre>
        <p>
            First row starts with 3 dashes. They indicate start of a new YAML document, cos YAML can
            support multiple documents.
        </p>
        <ul>
            <li>YAML is a case-sensitive format.</li>
            <li>
                Indentation defines the structure, so YAML is space sensitive, also it doesn`t
                accept tabs for indentation.
            </li>
            <li>
                In YAML values are key-value pairs. They act like scalar types(numbers, boolean &
                quoted or unquoted string). Array elements indicated by using dashes.
            </li>
        </ul>
        <h3>How to use Format YAML.</h3>
        <p>
            Don't write everything in 1 line, write down new key value pair from new row or write it
            down like js object
        </p>
        <span>Input:</span>
        <pre>
            <code>
{`someData   : "trees"
randomNumber: 322
nullValue : ~
moreValues : 
  21
  22
 23
array: [null,22, "true"]
boolean : false
obj    :     {val1: "value", val2: "value",
val3: true}`}
            </code>
        </pre>
        <span>or</span>
        <pre>
            <code>
{`{someData   : "trees", randomNumber: 322, nullValue : ~, moreValues : 21 22 23, array: [null,22, "true"], boolean : false,obj    :     {val1: "value", val2: "value",val3: true}}`}
            </code>
        </pre>
        <span>Output:</span>
        <pre>
            <code>
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
        <h3>Now lets see some more examples how it work.</h3>
        <p>
            As I've said about strings, in most cases, you don`t need to wrap them in quotes. But
            here some situations when you should do it.
        </p>
        <span>Input:</span>
        <pre>
            <code>
foo: "hello world quoted\n" 
bar: hello world unquoted\n
            </code>
        </pre>
        <span>Output:</span>
        <pre>
            <code>
foo: |
    hello world quoted
bar: hello world unquoted\n
          </code>
        </pre>
        <p>
            Formatter processes quoted value as ending with linefeed. So unquoted value, YAML
            formatter treats the \n as two characters.
        </p>
        <span>Input:</span>
        <pre>
            <code>
number: 22
string: "22"
boolean: true
alsoString: "true"
            </code>
        </pre>
        <span>Output:</span>
        <pre>
            <code>
number: 22
string: '22'
boolean: true
alsoString: 'true'
          </code>
        </pre>
        <p>
            Conclusion after this example, if you want value as string quote it. Also some of
            examples how Yaml output format will be consider as.
        </p>
        <span>Example:</span>
        <pre>
            <code
                >{` 
null:
    "canonical"   -> "~"
    "lowercase"   => "null"
    "uppercase"   -> "NULL"
    "camelcase"   -> "Null"
          
int:
    "binary"      -> "0b1", "0b101010", "0b1110001111010"
    "octal"       -> "0o1", "0o52", "0o16172"
    "decimal"     => "1", "42", "7290"
    "hexadecimal" -> "0x1", "0x2A", "0x1C7A"
          
bool:
    "lowercase"   => "true", "false"
    "uppercase"   -> "TRUE", "FALSE"
    "camelcase"   -> "True", "False"
          
float:
    "lowercase"   => ".nan", '.inf'
    "uppercase"   -> ".NAN", '.INF'
    "camelcase"   -> ".NaN", '.Inf'`}
    </code>
        </pre>
        <p>
            Our tool for validating & formatting YAML is <a
                href="https://github.com/nodeca/js-yaml#readme"
                target="_blank"
                rel="noreferrer nofollow noopener"
                class="prettier-href">js-yaml</a
            >.
        </p>
    </article>
</main>

<style>
    code {
        display: block;
        padding: 10px;
        background-color: #030711;
        border-radius: 5px;
        font-size: 14px;
        color: #77849b;
        overflow: auto;
    }
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

    .prettier-href {
        text-decoration: underline;
    }
</style>
