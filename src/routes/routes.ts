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
        name: "Change & Decision log",
        group: "Blog",
        path: "/changelog"
    },
    {
        name: "Week 1",
        group: "Blog",
        path: "/changelog/10-02-2024"
    }
];
