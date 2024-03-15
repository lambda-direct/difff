## What is YAML file format?

**YAML (Ain't Markup Language)** - data serialization language used as a format
for configuration files, with (.yaml) or (.yml) extensions. Structured with key-value pairs,
where key is always a string.

### YAML Basic principles:

-   Each key is unique
-   Comments are identified by (#)
-   Multi-lane comments unsupported
-   Case and space sensitive
-   Uses spaces instead of tabs
-   Each level of indentation multiplies spaces num
-   Support multiple documents in one file

## YAML naming for data structures

**Mappings** - store key-value pairs. Represent complex structures like
hashes or dictionaries.<br/>
**Sequences** - simple structures, each item
placed on its own line & that start with an opening dash serve for arrays or tuples.<br/>
**Scalar** - equivalent basic types boolean, date, integers, and floating.<br/> <br/>

<pre><code class="language-yaml hljs">#Each documents starts with three dashes, ends with three dots.

#string
quoted: "YAML"
singleQuoted: 'YAML'
unquoted: YAML

#number
decimal: 7290
binary: 0b1110001111010
octal: 0o16172
hexadecimal: 0x1C7A

#boolean
null:
  - ~
  - NULL
  - Null
  - null
  -    # empty also null

#boolean
boolean:
  - TRUE
  - True
  - true

#object
human:
  name: James
  age: 51
  children: 
    - Bob
    - Joana

#array
arrayName:
  - true
  - "string"
  - 2024

#Redeclare types
integer: !!float 23
bool: !!str false
binaryNumber: !!int 0b101010
hexadecimalNumber: !!int 0x1C7A
stringExample: !!str "James"
</code></pre>

## How to use YAML formatter

Put JSON, JavaScript object or an undecorated YAML. We'll validate input and format it.

##### Input:

<pre><code class="language-yaml hljs">#JSON

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

#JS object

{`{someData   : "trees", randomNumber: 322, nullValue : ~, moreValues : 21 22 23, array: [null,22, "true"], boolean : false,obj    :     {val1: "value", val2: "value",val3: true}}`}

#badly decorated YAML

someData :   "trees"
randomNumber     : 322
nullValue    :  ~
moreValues : 21 22    23
array  :    [null,22, "true"]
boolean: false
obj : {`{val1: "value",   val2: "value"}`}
val3: true
</code></pre>

##### Output:

<pre><code class="language-yaml hljs">someData: trees
randomNumber: 322
nullValue: null
moreValues: 21 22    23
array:
  - null
  - 22
  - 'true'
boolean: false
obj:
  val1: value
  val2: value
val3: true
</code></pre>
