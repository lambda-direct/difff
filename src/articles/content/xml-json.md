## How does the converter work?

In conversion, comments will be ignored, but declarations will not. Elements will be converted where the key is the tag name and the value is an object with two pairs: if attributes exist, the key is "\_attributes", and the value represents all attributes as key-value pairs. For content inside the tags, the key is "\_text", and the value is the content as a string.
If there are multiple identical tags, they will be converted into an array with the same schema.

XML:

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

JSON:

<pre>


<code class="language-json hljs">{`{
    "_declaration": {
        "_attributes": {
            "version": "1.0",
            "encoding": "UTF-8"
        }
    },
    "html": {
        "_attributes": {
            "style": "color: green"
        },
        "head": {
            "title": {
                "_text": "HTML Example"
            }
        },
        "body": {
            "_text": [
                "The indentation tries to be",
                "... but might not match your style."
            ],
            "em": {
                "_text": "somewhat \"do whatI mean\""
            }
        }
    }
}`}
</code>
</pre>
