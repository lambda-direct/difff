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

    <article class="footer_article">
        <h2 class="footer_article_title">How to Format YAML Using an Online Tool</h2>
        <h3 class="footer_article_subtitle">At first some YAML basics.</h3>
        <ul class="footer_article_list">
            <li class="footer_article_list_element">YAML is a case-sensitive format.</li>
            <li class="footer_article_list_element">
                Indentation defines the structure, so YAML is space sensitive, also it doesn`t
                accept tabs for indentation.
            </li>
            <li class="footer_article_list_element">
                In YAML values are key value pairs. They act like scalar types(numbers, boolean &
                quoted or unquoted string). Arrays are denoted using dashes.
            </li>
        </ul>
        <h3 class="footer_article_subtitle">
            Simply to use our formatter just paste key value pair data. As in example below.
        </h3>
        <p class="footer_article_text">
            Don't write everything in 1 line, write down new key value pair from new row or write it
            down like js object
        </p>
        <span class="footer_article_mini-title">Input:</span>
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
        <span class="footer_article_mini-title">or</span>
        <pre>
            <code>
{`{someData:"trees",randomNumber:322,nullValue:~,moreValues: 21 23,array:[null,22, "true"],boolean:false,obj:{val1: "value",}}`}
            </code>
        </pre>
        <span class="footer_article_mini-title">Output:</span>
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
        <h3 class="footer_article_subtitle">Now lets see some more examples how it work.</h3>
        <p class="footer_article_text">
            As I've said about strings, in most cases, you don`t need to wrap them in quotes. But
            here some situations when you should do it.
        </p>
        <span class="footer_article_mini-title">Input:</span>
        <pre>
            <code>
foo: "hello world quoted\n" 
bar: hello world unquoted\n
            </code>
        </pre>
        <span class="footer_article_mini-title">Output:</span>
        <pre>
            <code>
foo: |
    hello world quoted
bar: hello world unquoted\n
          </code>
        </pre>
        <p class="footer_article_text">
            Formatter processes quoted value as ending with linefeed. So unquoted value, YAML
            formatter treats the \n as two characters.
        </p>
        <span class="footer_article_mini-title">Input:</span>
        <pre>
            <code>
number: 22
string: "22"
boolean: true
alsoString: "true"
            </code>
        </pre>
        <span class="footer_article_mini-title">Output:</span>
        <pre>
            <code>
number: 22
string: '22'
boolean: true
alsoString: 'true'
          </code>
        </pre>
        <p class="footer_article_text">
            Conclusion after this example, if you want value as string quote it. Also some of
            examples how Yaml output format will be consider as.
        </p>
        <span class="footer_article_mini-title">Example:</span>
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
        <p class="footer_article_text">
            Our tool for validating & formatting YAML is <a
                    href="https://github.com/nodeca/js-yaml#readme"
                    target="_blank"
                    rel="noreferrer nofollow noopener"
                    class="prettier-href">js-yaml</a
                >.
        </p>
    </pre>
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

    .footer_article_subtitle {
        text-align: center;
        margin: 14px 0 0;
    }

    .footer_article_list {
        margin: 12px 0 0 12px;
        list-style: disc;
        color: #eaeaea;
    }

    .footer_article_list_element {
        font-family: "NotoSans-Regular", sans-serif;
        margin: 4px;
        font-size: 16px;
        color: #eaeaea;
    }

    .footer_article_text {
        margin: 12px 0 0 0;
        text-align: start;
        &:last-child {
            margin: 0;
        }
    }

    .footer_article_mini-title {
        color: #eaeaea;
        font-size: 12px;
        @media (min-width: 420px) {
            font-size: 14px;
        }
    }

    .footer_article_text + .footer_article_mini-title {
        margin: 8px 0 0 0;
    }
</style>
