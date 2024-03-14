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
];
