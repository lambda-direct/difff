import type { ToolsRoute } from "~/types";

export const toolsRoutes: ToolsRoute[] = [
    {
        name: "JSON Formatter",
        path: "/"
    },
    {
        name: "YAML Formatter",
        path: "/formatter/yaml"
    },
    {
        name: "Change & Decision log",
        path: "/changelog"
    }
];
