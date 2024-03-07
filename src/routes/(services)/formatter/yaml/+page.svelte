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
        <h2 class="article_style_tittle">How to Format YAML Using an Online Tool</h2>
        <h3>What is YAML file format?</h3>
        <p>
            YAML - Ain't Markup Language. It is a data serialization language, easy for humans to
            read. Used as a format for configuration files, create YAML file you can with extension
            (.yaml) or (.yml). Yaml structured as key-value pairs, the key is always a string an the
            restriction that each of the keys is unique. Comments identified with a hash symbol (#).
            Note: YAML doesn`t support multi-lane comments. Let's take a look at a YAML file
            structure example.
        </p>
        <pre>
            <code>
#Comment: This is an example using YAML
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
            As you can see after comment, row starts with 3 dashes. They indicate start of a new
            YAML document, cos YAML can support multiple documents and each document ends with three
            dots. Also YAML is a case and space sensitive format. Indentation defines it's
            structure, YAML doesn`t accept tabs. Values in key-value pair act like scalar
            types(numbers, dates, boolean & quoted or unquoted string). If as value we got an array,
            it's elements indicates by using dashes.
        </p>
        <h3>How to use Format YAML.</h3>
        <p>
            If you want write down everything in a single line, you need to wrap it in curly
            brackets and separate key-value pairs with coma(like in js object). Or you can write
            down new key-value pair from a new row.
        </p>
        <h5>Input:</h5>
        <pre>
            <code>
{`{someData   : "trees", randomNumber: 322, nullValue : ~, moreValues : 21 22 23, array: [null,22, "true"], boolean : false,obj    :     {val1: "value", val2: "value",val3: true}}`}
            </code>
        </pre>
        <h5>or</h5>
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
        <h5>Output:</h5>
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
            here some situations when you should do it. Formatter processes quoted value as ending
            with linefeed. So unquoted value, YAML formatter treats the \n as two characters.
        </p>
        <h5>Input:</h5>
        <pre>
            <code>
foo: "hello world quoted\n" 
bar: hello world unquoted\n
            </code>
        </pre>
        <h5>Output:</h5>
        <pre>
            <code>
foo: |
    hello world quoted
bar: hello world unquoted\n
          </code>
        </pre>
        <p>
            In YAML nesting indication relies on whitespace. Once again about it, tab characters
            cannot be used for indentation, only spaces. The number of spaces used for indentation
            doesn`t matter as long as they are consistent.
        </p>
        <h5>Example:</h5>
        <pre>
            <code>
---
tutorial:  #nesting level 1
  - yaml:  #nesting level 2 (2 spaces used for indentation)
      name: "YAML Ain't Markup Language" #string #nesting level 3 (4 spaces used for indentation)
      type: awesome #string
      born: 2001 #number
...
            </code>
        </pre>
        <p>
            YAML has own naming for data structures. Mappings - structure that store key-value
            pairs. Represent complex data structures like hashes or dictionaries. Sequences - simple
            structures where each item placed on its own line that start with an opening dash like
            arrays or tuples. And Scalar - the simplest data type represent basic types such as
            boolean,Date, Timestamp, integers, and floating numbers.
        </p>
        <h5>Example:</h5>
        <pre>
            <code>
---
# key: value [mapping]
company: spacelift
# key: value is an array [sequence]
domain:
 - devops
 - devsecops
tutorial:
  - yaml:
      name: "YAML Ain't Markup Language" #string [literal]
      type: awesome #string [literal]
      born: 2001 #number [literal]
  - json:
      name: JavaScript Object Notation #string [literal]
      type: great #string [literal]
      born: 2001 #number [literal]
  - xml:
      name: Extensible Markup Language #string [literal]
      type: good #string [literal]
      born: 1996 #number [literal]
...
          </code>
        </pre>

        <p>
            YAML autodetect types. However, often necessary to specify the type using a tag. To
            force a type indication, you can prefix the type with a (!!) symbol.
        </p>
        <h5>Example:</h5>
        <pre>
            <code>
age: !!float 23
dead: !!str false
binary: !!int 0b101010
hexadecimal: !!int 0x1C7A
name: !!str "James"
    </code>
        </pre>
        <p>Some of examples how Yaml output format will be consider as.</p>
        <h5>Example:</h5>
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

    .article_style_tittle {
        text-align: center;
    }

    .prettier-href {
        text-decoration: underline;
    }
</style>
