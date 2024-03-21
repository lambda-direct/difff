export const getLine = (value: number) => {
    if (value === 0) return 1;
    return value;
};

export const getColumn = (value: number) => {
    return value + 1;
};

export const dropDownOptions = [
    {
        title: "Formatters",
        values: [
            { name: "JSON", path: "/" },
            { name: "YAML", path: "/formatter/yaml" },
            { name: "XML", path: "/formatter/xml" }
        ]
    }
    // {
    //     title: "Converters",
    //     values: [
    //         { name: "JSON to XML", path: "/converter/json-to-xml" },
    //         { name: "XML to JSON", path: "/formatter/xml-to-json" }
    //     ]
    // }
];
