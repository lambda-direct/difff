import type { ToolsRoute } from "~/types";

export const toolsRoutes: ToolsRoute[] = [
    {
        name: "FormatterJSON",
        path: "/"
    },
    {
        name: "FormatterYAML",
        path: "/formatter/yaml"
    },
    {
        name: "Change & Decision log",
        path: "/changelog"
    }
];
