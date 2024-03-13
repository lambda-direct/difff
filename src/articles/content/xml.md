## What is XML file format?

**XML (eXtensible Markup Language)** - file format(.xml) for any data. It's easy for human and machine readability.

### XML Components:

-   Declaration
-   Elements
    -   attributes
    -   content

<pre>

<code class="language-xml hljs">{`
<?xml version="1.0" encoding="UTF-8"?> <!--Information about XML, declaration-->

    <!--All the other tags in XML document are called elements-->
    <CATALOG>
        <PLANT>
            <COMMON>Bloodroot</COMMON>
            <BOTANICAL>Sanguinaria canadensis</BOTANICAL>
            <ZONE>4</ZONE>
            <LIGHT>Mostly Shady</LIGHT>
            <PRICE sale="true">$2.44</PRICE> <!--Descriptors names="values" called attributes-->
            <AVAILABILITY>031599</AVAILABILITY>
        </PLANT>

        <!--Values inside tags is a content-->
        <PLANT>
            <COMMON>Columbine</COMMON>
            <BOTANICAL>Aquilegia canadensis</BOTANICAL>
            <ZONE>3</ZONE>
            <LIGHT>Mostly Shady</LIGHT>
            <PRICE>$9.37</PRICE>
            <AVAILABILITY>030699</AVAILABILITY>
        </PLANT>
    </CATALOG>`}

</code>
</pre>

An XML file is plain text files. Tags define structure of the document and specify how it should be stored and transported over the internet. Elements can contain other elements.
First is called the "root", all other elements in "root" are "child" elements. XML code formatted with indentation. Additionally, comments can be included using <!-- -->,
some rules about comments, cannot appear before XML declaration, can be anywhere in a document, can't have attributes &
Comments can't be nested within other comments.

## What is XML file used for?

Due to its structured nature, XML is used for transferring data, formatting documents, creating layouts, web searching & storing configuration data.
