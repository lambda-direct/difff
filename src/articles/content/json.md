## What is JSON in simple terms?

**<a id="jsonAnchor"></a>JSON (JavaScript Object Notation)** — text-based data storing and exchange format. Its syntactically identical to the JavaScript objects.

### Syntax rules:

-   Key/value pairs structure.
-   Pairs separated by commas.
-   Objects are stored within curly braces.
-   Square brackets hold arrays.
-   The keys have a string type.
-   The values might be string, number, JSON object, array, boolean, or null.

## Why JSON is so popular?

JSON human readable format, lightweight to ensure small transmission size. Our test of the same data shows that the weight of JSON is 60-70 bytes, and XML is 100-110 bytes.Equivalent to JavaScript objects, making it simple to process in JS development, when JS the most popular programming language. In API programming, JSON helps in faster data interchange and web service results, reducing the mismatch between objects in the application code and their serialized representation. It’s text based and easy-to-parse format with no additional code needed for parsing. JSON less verbose, in compare to [XML](/formatter/xml#xmlAnchor), it follows a compact style to improve users readability. Moreover, parsing process is faster than in the [XML](/formatter/xml#xmlAnchor). In Chrome, the parsing time for the same data is 70ms for JSON and 90ms for XML. In Firefox, JSON parsing takes 65ms, while XML parsing takes 129ms. Requires less data that ultimately results in reducing the cost and increasing the parsing speed. Used a map data structure, the key-value pairs easily understandable.

## When and Why do we use JSON?

Developer use JSON because it requires to code less, and processes faster since deserialization isn’t required.
**JSON Top use cases:**

-   API integration.
-   Generating a JSON object from user-generated data.
-   Transferring data between systems.
-   Configuring data for applications.
-   Simplifying complex data models.

## What is JSON API?

The JSON API standardizes the structure of **ad hoc client-server interfaces**, which are unplanned, temporary connections between clients and servers made quickly to meet specific needs without formal design or prior preparation. These interfaces utilize JSON as the exchange format. It describes how users should requests, capture, or modify data and how the server should respond to those requests. Also aims at speeding up HTTP requests and the size of transferred data maintaining accuracy, flexibility, and clarity. JSON API is useful to the end-users by retrieving information from the servers where they have been stored or cached. JSON API does not impose any specific requirements regarding URI structure, allowing implementations the freedom to adopt whatever format they prefer.

### Benefits of JSON API:

-   Caching: caching boosts the speed and performance of a website. Through caching, users can retrieve searched information very quickly.
-   Has Optimization Features: pagination and sorting. Pagination divides the responses into groups containing different content. Sorting specifies the direction for each key.
-   Compound Documents: send both related and main resources at the same time and allows users to include additional resources in the initial  
    request. Reduces loading speed by minimizing the number of HTTP requests.
-   Sparse Fieldsets: simple method for accessing data. Requesting and retrieving data from specific fields.
-   Freedom of Selection: allowing users choose data, helps avoid storing unnecessary large datasets.
