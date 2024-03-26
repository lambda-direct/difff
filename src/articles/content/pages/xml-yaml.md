## How to use the converter?

Declarations will be converted, but comments will not. Tag attributes will be shown inside the converted element. If there was more than one attribute, they will be the value of the '\_attributes' key. If there was only content inside, it will be converted to a key-value pair. Identical tags will be converted into an array under the same key. If there was both content and another tag inside a parent tag, after conversion, the content will be the value of the '\_text' key.

XML:

<pre>


<code class="language-xml hljs">{`<?xml version="1.0" encoding="UTF-8"?>
  <root root="true">
   <profile>
    <!-- self closed -->
   </profile>
   <Garage>
      <cars>
        BMW 
      </cars>
      <cars>
        Mercedes
      </cars>
      <bike>
        Kawasaki H2R  <!-- favorite -->
      </bike>
   </Garage>
   <original_paint>
      true
   </original_paint>
   <color wrapp:num="3785">blue</color>
</root>`}
</code>
</pre>

YAML:

<pre>


<code class="language-yaml hljs">{`_declaration:
  _attributes:
    version: '1.0'
    encoding: UTF-8
root:
  root: 'true'
  profile: {}
  Garage:
    cars:
      - BMW
      - Mercedes
    bike: Kawasaki H2R
  original_paint: 'true'
  color:
    wrapp:num: '3785'
    _text: blue
`}
</code>
</pre>
