## What is XML file format?

**XML (eXtensible Markup Language)** - file format(.xml) for any data. Stores data in plain text format with the standardized XML syntax. This helps to use a independent storing, transporting, and sharing data. Provide accessibility across various platforms and devices, including humans, computers, voice assistants, news feeds, and more.

### XML Components:

-   Declaration
-   Elements
    -   attributes
    -   content

<pre>

<code class="language-xml hljs">{`
<?xml version="1.0" encoding="UTF-8"?> <!--Information about XML, declaration-->

    <!--All the other tags in XML document are called elements-->
    <Catalog>
        <Car>
            <Brand>Audi</Brand>
            <Model>RS 6</Model>
            <Color>Shady Green</Color>
            <Price sale="true">$120 200.44</Price> <!--Descriptors names="values" called attributes-->
            <BodyNumber>031599</BodyNumber>
        </Car>

        <!--Values inside tags is a content-->
        <Car>
            <Brand>Porsche</Brand>
            <Model>911</Model>
            <Color>Bright Red</Color>
            <Price>$230 000.37</Price>
            <BodyNumber>02356599</BodyNumber>
        </Car>
    </Catalog>`}

</code>
</pre>

XML is platform independent and language independent. Tags are not predefined, you must define your own tags. They structure the document and specify
how it should be stored and transported over the internet. Tags can contain other tags.
First is called the "root", all other tags in "root" are "child" tag. XML code formatted with indentation to make easier human readability. Additionally, comments can be included using <!-- -->,
some rules about comments, cannot appear before XML declaration, can be anywhere in a document, can't have attributes &
Comments can't be nested within other comments.

## What is XML file used for?

Due to its structured nature, XML is used for transferring data, formatting documents, creating layouts, web searching & storing configuration data.
The main benefit is that you can use it to take data from a program like Microsoft SQL, convert it into XML then share it with other programs and platforms. You can communicate between two platforms. The main thing which makes XML truly powerful is its international acceptance. Many corporation use XML interfaces for databases, programming, office application mobile phones and more. It is due to its platform independent feature.
