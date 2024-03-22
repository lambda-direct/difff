## How does the converter work?

### XML element names rules:

-   Element name must start with a letter, an underscore `_` , or a colon `:` .
-   After the initial character, the name can contain letters, digits, hyphens `-` , underscores `_` , colons `:` , and periods `.`.
-   Characters cannot be used in element names `<`, `>`, `&`, `"`, and `'`.
-   Cannot contain whitespace characters (spaces, tabs, etc.).

If [JSON](/#jsonAnchor) is valid, after conversion, we add a declaration with version 1.0 and encoding UTF-8, wrap everything in a root tag. All whitespace is removed, and invalid characters will be replaced by an underscore. [XML](/formatter/xml#xmlAnchor) will be formatted with the indentation specified in the settings.

JSON:

<pre>


<code class="language-json hljs">{`{
    "Aidan Gillen": {
        "array  s": [
            "Game of Thrones",
            "The Wire"
        ],
        "2string": "some string",
        "int": "2",
        "otherint": 4,
        "boolean": false,
        "object": {
            "foo": "bar",
            "foo2": {}
        }
    },
    "Bul@ks!": {},
    "Annie Fitzgerald": [],
    "Anwan Glover": [
        "Treme",
        "The Wire"
    ],
    "Alexander Skarsg?rd": [
        "Generation Kill",
        "True Blood"
    ]
}`}
</code>
</pre>

XML:

<pre>


<code class="language-xml hljs">{`<?xml version="1.0" encoding="UTF-8"?>
<root>
   <AidanGillen>
      <arrays>
         Game of Thrones
      </arrays>
      <arrays>
         The Wire
      </arrays>
      <_string>
         some string
      </_string>
      <int>
         2
      </int>
      <otherint>
         4
      </otherint>
      <boolean>
         false
      </boolean>
      <object>
         <foo>
            bar
         </foo>
         <foo2/>
      </object>
   </AidanGillen>
   <Bul_ks_/>
   <AnwanGlover>
      Treme
   </AnwanGlover>
   <AnwanGlover>
      The Wire
   </AnwanGlover>
   <AlexanderSkarsg_rd>
      Generation Kill
   </AlexanderSkarsg_rd>
   <AlexanderSkarsg_rd>
      True Blood
   </AlexanderSkarsg_rd>
</root>`}
</code>
</pre>
