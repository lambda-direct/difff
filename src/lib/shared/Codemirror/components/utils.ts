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
    },
    {
        title: "Converters",
        values: [
            { name: "JSON to XML", path: "/converter/json-to-xml" },
            { name: "JSON to YAML", path: "/converter/json-to-yaml" },
            { name: "YAML to JSON", path: "/converter/yaml-to-json" },
            { name: "YAML to XML", path: "/converter/yaml-to-xml" },
            { name: "XML to JSON", path: "/converter/xml-to-json" },
            { name: "XML to YAML", path: "/converter/xml-to-yaml" }
        ]
    }
];
