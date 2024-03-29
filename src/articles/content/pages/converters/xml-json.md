## How does the XML/JSON converter work?

In conversion, comments will be ignored, but declarations will not.If an element has more than one attribute, after conversion, the key is '\_attributes', and the value represents all attributes as key-value pairs. If there was only one key/value pair, it will be unnested. If there is tag and content inside the element, the key '\_text' represents the content as a string. If there are multiple identical tags, they will be converted into an array with the same schema. The [JSON](/#jsonAnchor) output in a read-only field will be formatted according to the specified settings for indentation, type, and width.

Input:

<pre>

<code class="language-xml hljs">{`<?xml version="1.0" encoding="UTF-8"?>
<html style="color: green">
   <!-- this is a comment -->
   <head>
      <title>
         HTML Example
      </title>
   </head>
   <body>
      The indentation tries to be
      <em>
         somewhat &quot;do whatI mean&quot;
      </em>
      ... but might not match your style.
   </body>
</html>`}
</code>
</pre>

Output:

<pre>

<code class="language-json hljs">{`{
    "html": {
        "style": "color: green",
        "head": {
            "title": "HTML Example"
        },
        "body": {
            "_text": [
                "The indentation tries to be",
                "... but might not match your style."
            ],
            "em": "somewhat \"do whatI mean\""
        }
    }
}
`}
</code>
</pre>
