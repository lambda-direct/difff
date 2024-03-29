import type { ToolsRoute } from "~/types";

export const toolsRoutes: ToolsRoute[] = [
    {
        name: "JSON",
        group: "Formatter",
        path: "/"
    },
    {
        name: "YAML",
        group: "Formatter",
        path: "/formatter/yaml"
    },
    {
        name: "XML",
        group: "Formatter",
        path: "/formatter/xml"
    },
    {
        name: "JSON",
        group: "Minifier",
        path: "/minifier/json"
    },
    {
        name: "XML",
        group: "Minifier",
        path: "/minifier/xml"
    },
    {
        name: "JavaScript",
        group: "Minifier",
        path: "/minifier/js"
    },
    {
        name: "Change & Decision log",
        group: "Blog",
        path: "/changelog"
    },
    {
        name: "Week 1",
        group: "Blog",
        path: "/changelog/10-02-2024"
    },
    {
        name: "JSON to XML",
        group: "Converter",
        path: "/converter/json-to-xml"
    },
    {
        name: "JSON to YAML",
        group: "Converter",
        path: "/converter/json-to-yaml"
    },
    {
        name: "XML to JSON",
        group: "Converter",
        path: "/converter/xml-to-json"
    },
    {
        name: "XML to YAML",
        group: "Converter",
        path: "/converter/xml-to-yaml"
    },
    {
        name: "YAML to JSON",
        group: "Converter",
        path: "/converter/yaml-to-json"
    },
    {
        name: "YAML to XML",
        group: "Converter",
        path: "/converter/yaml-to-xml"
    }
];
