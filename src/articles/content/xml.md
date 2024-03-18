## What is XML file format?

**XML (eXtensible Markup Language)** - file(.xml) format for any type of data. Stores data in plain text with the standardized XML syntax. This helps to use a independent storing, transporting, and sharing data. Provide accessibility across various platforms and devices, computers, voice assistants, news feeds, and more.

### Structure rules:

-   Declaration at the beginning of the document
-   Files must contain a root element
-   All elements must have both opening and closing tags
-   Opening and closing tags are case-sensitive
-   Attributes values must be quoted
-   XML retains spaces
-   Elements must be nested properly
-   Comments are denoted by <!-- -->
-   Comments can be inserted anywhere after the declaration
-   Comments can`t have attribute
-   Comments can`t be nested within other comments

<pre>


<code class="language-xml hljs">{`<?xml version="1.0" encoding="UTF-8"?> <!--Information about XML, declaration-->

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

## How does XML work?

XML relies on components such as tags, elements, and attributes, which are organized in a nested structure. Tags are not predefined, you must define your own tags. Tags can contain other tags, with first is called the "root", and all subsequent tags inside "root" are known as "child". These components structure the document and dictate how it should be stored and transmitted over the internet. XML is platform and language-independent, designed for both human readability and machine parsing.

## What is XML file used for?

Due to its structure nature, XML is used for transferring data, formatting documents, creating layouts, web searching & storing configuration data.
You can communicate between two platforms. As example take data from a program like Microsoft SQL, convert it into XML then share it with other programs and platforms.

### Applications for which XML is useful:

-   Web publishing: simplifies the creation of interactive and customizable web pages, enhancing the development of e-commerce applications.
    Through data storage and XSL/XSLT processing, content can be dynamically rendered for various users and devices.
-   Web searching and automating Web tasks: capability to define data types within documents enhances web search precision by ensuring contextual relevance, enabling more efficient
    and accurate results for web agents and robots
-   General applications: offers a standardized approach for accessing, storing, transmitting, and displaying data across various applications and devices.
-   E-business applications: implementations facilitate electronic data interchange (EDI) for seamless business-to-business and business-to-consumer transactions.
-   Metadata applications: makes it easier to express metadata in a portable, reusable format
-   Pervasive computing: offers structured information types for display on various pervasive computing devices like PDAs and cell phones, with standards like WML and VoiceXML  
    defining interfaces for wireless devices.
