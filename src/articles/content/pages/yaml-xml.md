## How does the converter work?

When you paste, drag and drop, or upload a [YAML](/formatter/yaml#yamlAnchor) file, it will be formatted and validated automatically. After conversion, declaration with version 1.0 and encoding UTF-8 will be added and everything will be wrapped in a root tag. All whitespace in the keys will be removed. Tags must start with a letter, an underscore '\_', or a colon ':', followed by letters, digits, hyphens '-', underscores '\_', colons ':', and periods '.' . Any invalid characters will be replaced with an underscore. The output in the right read-only field, formatted as [XML](/formatter/xml#xmlAnchor), will already adhere to the specified indentation settings.

YAML:

<pre>

<code class="language-yaml hljs">{`book:
    - cate     gory: children
      l"a"ng: en
      title: Harry Potter
      author: J K. Rowling
      ye:r: '2005'
      price: '29.99'
    - c@tegory: web
      lang: en
      title: XQuery Kick Start
      author:
        - James McGovern
        - Per Bothner
        - Kurt Cagle
        - James Linn
        - Vaidyanathan Nagarajan
      _year: '2003'
      price: '49.99'`}
</code>
</pre>

XML:

<pre>

<code class="language-xml hljs">{`<?xml version="1.0" encoding="UTF-8"?>
<root>
   <book>
      <category>
         children
      </category>
      <l_a_ng>
         en
      </l_a_ng>
      <title>
         Harry Potter
      </title>
      <author>
         J K. Rowling
      </author>
      <ye:r>
         2005
      </ye:r>
      <price>
         29.99
      </price>
   </book>
   <book>
      <c_tegory>
         web
      </c_tegory>
      <lang>
         en
      </lang>
      <title>
         XQuery Kick Start
      </title>
      <author>
         James McGovern
      </author>
      <author>
         Per Bothner
      </author>
      <author>
         Kurt Cagle
      </author>
      <author>
         James Linn
      </author>
      <author>
         Vaidyanathan Nagarajan
      </author>
      <_year>
         2003
      </_year>
      <price>
         49.99
      </price>
   </book>
</root>`}
</code>
</pre>
