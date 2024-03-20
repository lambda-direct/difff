## What is JSON in simple terms?

**<a id="jsonAnchor"></a>JSON — JavaScript Object Notation** text-based data storing and exchange format, "self-describing" and easy to understand. The format is syntactically identical to the JavaScript objects.

### Syntax rules:

-   Key/value pairs structure
-   Pairs separated by commas
-   Objects are stored within curly braces
-   Square brackets hold arrays

The keys have to be string, the values can be string, number, JSON object, array, boolean, or null. JSON can be converted between text and object with methods, 'parse()', and 'stringify()'. The parse method accepts a JSON string as a parameter and automatically returns a JavaScript object. The stringify method accepts an object as a parameter and automatically returns a JSON string.

## Why JSON is so popular?

JSON is easy for humans to read, lightweight to ensure small transmission size. Equivalent to JavaScript objects, making it simple to process in web frontends. But, it isn’t the solution for everything, [YAML](/formatter/yaml#yamlAnchor) is more popular for things like configuration files. In API programming, JSON helps in faster data interchange and web service results, reducing the mismatch between objects in the application code and their serialized representation. It’s text based and an easy-to-parse format with no additional code needed for parsing. JSON less verbose, in compare to [XML](/formatter/xml#xmlAnchor), it follows a compact style to improve users readability. Moreover, parsing process is faster than in the [XML](/formatter/xml#xmlAnchor). However, requires less data that ultimately results in reducing the cost and increasing the parsing speed. Used a map data structure, the key-value pairs easily understandable.

## When and Why do we use JSON?

JSON has become popular because it requires less coding, and processes faster since deserialization isn’t required. It can be used for API integration.
Top use cases:

1.  Generating a JSON object from user-generated data.
2.  Transferring data between systems.
3.  Configuring data for applications.
4.  Simplifying complex data models.

## What is JSON API?

JSON:API is standardizing the structure of ad hoc client-server interfaces that utilize JSON as the exchange format. It describes how users should requests, capture, or modify data and how the server should respond to those requests. Also aims at speeding up HTTP requests and the size of transferred data maintaining accuracy, flexibility, and clarity. JSON:API is useful to the end-users by retrieving information from the servers where they have been stored or cached. JSON:API does not impose any specific requirements regarding URI structure, allowing implementations the freedom to adopt whatever format they prefer.

### Benefits of JSON:API

**Caching**
This is the process of storing data in a cache for a short period of time. Caching boosts the speed and performance of a website. Through caching, users can retrieve searched information very quickly

**Has Optimization Features**
The ability to test JSON API, analyze, and separate useful information in the return package. Two resources in the free JSON:API that enhance optimization are pagination and sorting. Pagination divides the responses into groups containing different content, improving the complexity of navigating through the results. Sorting specifies the direction for each key

**Compound Documents**
Enables servers to efficiently send both related and main resources at the same time and allows users to include additional resources in the initial request. When executed correctly, it reduces loading speed by minimizing the number of HTTP requests.

**Sparse Fieldsets**
Offers a simple method for accessing data. With Fieldset, users can request and retrieve data from specific fields, enabling the addition of fields containing resource names.

**Freedom of Selection**
The software offers numerous optional features. Allowing clients or users to handle data choices liberates the system from redundant and potentially unnecessary large datasets.
