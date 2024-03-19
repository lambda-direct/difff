## What is XML file format?

**XML — eXtensible Markup Language** for storing and transporting data with .xml file extention.Provide accessibility across various platforms and devices.

### Structure rules:

-   Declaration at the beginning of the document.
-   Files must contain a root element.
-   All elements must have both opening and closing tags.
-   Opening and closing tags are case-sensitive.
-   Attributes values must be quoted.
-   XML keep spaces.
-   Elements must be nested properly.
-   Comments are denoted by `<!-- -->`.
-   Comments can be inserted anywhere after the declaration.
-   Comments can`t have attribute.
-   Comments can`t be nested within other comments.

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

XML relies on components such as tags, elements, and attributes, which are organized in a nested structure. Tags are not predefined, users have to define them by themselves. Tags able to contain other tags, the first one is called the 'root', and other insiders are known as 'child'. These components structure the document and dictate how it should be stored and transfer over the internet. XML is a platform and language-independent, designed to be easily readable by humans and parsed by machines.

## What is XML file used for?

XML is used for formatting documents, creating layouts, web searching, transferring and storing configuration data. XML able to communicate between platforms,
as an example, take data from a program like Microsoft SQL, convert it into XML then share it with other programs and platforms.

### Applications for which XML is useful:

-   Web publishing: simplifies the creation of interactive and customizable web pages, improving the development of e-commerce applications
    through data storage and XSL/XSLT(language used for transforming XML) processing, content can be dynamically rendered for various users and devices.
-   Web searching and automating Web tasks: define data types within documents, upgrade web search precision, enabling more efficient and accurate results for web agents and robots.
-   General applications: offers a standardized approach for accessing, storing, transmitting, and displaying data across various applications and devices.
-   E-business applications: implement EDI(process of transmitting structured digital information) for seamless business-to-business and business-to-consumer transactions.
-   Metadata applications: makes it easier to express metadata in a portable, reusable format.
-   Pervasive computing: offers structured information types for display on various devices like PDAs(personal digital assistant) and cell phones, with standards like
    WML (wireless markup language) and VoiceXML, defining interfaces for wireless devices.
