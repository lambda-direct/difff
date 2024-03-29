import { HighlightStyle, syntaxHighlighting } from "@codemirror/language";
import { type Extension } from "@codemirror/state";
import { EditorView } from "@codemirror/view";
import { tags as t } from "@lezer/highlight";
import { baseTheme } from "./base";
import type { Formats } from "~/types";

const invalid = "#eaeaea";
const cyan = "#56b6c2";
const malibu = "#61afef";
const violet = "#c678dd";
const darkBackground = "#21252b";
const tooltipBackground = "#FBFBFA";
const tooltipColor = "#373530";

const theme = [
    baseTheme,
    EditorView.theme({
        "&": {
            height: "60vh",
            color: "var(--cursor, #abb2bf)",
            background: "var(--editor-background, #030711)"
        },
        "&.cm-focused": {
            outline: "unset"
        },
        ".cm-content": {
            caretColor: "var(--cursor, #abb2bf)"
        },
        "&.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground": {
            backgroundColor: "#3e445157"
        },
        ".cm-cursor, .cm-dropCursor": {
            borderLeftColor: "var(--cursor, #abb2bf)"
        },

        ".cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection":
            {
                background: "var(--selection, #3e4451)"
            },

        ".cm-panels": {
            background: darkBackground,
            color: "var(--cursor, #abb2bf)"
        },
        ".cm-panels.cm-panels-top": {
            borderBottom: "2px solid black"
        },
        ".cm-panels.cm-panels-bottom": {
            borderTop: "2px solid black"
        },

        ".cm-activeLine": {
            background: "var(--highlight-background, #f5f5f014)"
        },

        ".cm-gutters": {
            background: "var(--editor-background, #030711)",
            color: "var(--line-number, #7d8799)",
            border: "none"
        },

        ".cm-activeLineGutter": {
            background: "var(--highlight-background, #f5f5f014)"
        },

        ".cm-foldPlaceholder": {
            background: "transparent",
            border: "none",
            color: "#ddd"
        },

        ".cm-tooltip": {
            border: "none",
            color: tooltipColor,
            background: tooltipBackground
        },

        ".cm-tooltip .cm-tooltip-arrow:before": {
            borderTopColor: "transparent",
            borderBottomColor: "transparent"
        },

        ".cm-tooltip .cm-tooltip-arrow:after": {
            borderTopColor: tooltipBackground,
            borderBottomColor: tooltipBackground
        },

        ".cm-tooltip-autocomplete": {
            "& > ul > li[aria-selected]": {
                background: "var(--highlight-background, #f5f5f014)",
                color: "var(--cursor, #abb2bf)"
            }
        }
    })
];

const themeHighlightStyleJSON = HighlightStyle.define([
    { tag: t.keyword, color: violet },
    {
        tag: [t.name, t.deleted, t.character, t.propertyName, t.macroName],
        color: "var(--property-name, #e06c75)"
    },
    { tag: [t.function(t.variableName), t.labelName], color: malibu },
    {
        tag: [t.color, t.constant(t.name), t.standard(t.name)],
        color: "var(--boolean-value, #d19a66)"
    },
    { tag: [t.definition(t.name), t.separator], color: "var(--cursor, #abb2bf)" },
    {
        tag: [
            t.typeName,
            t.className,
            t.number,
            t.changed,
            t.annotation,
            t.modifier,
            t.self,
            t.namespace
        ],
        color: "var(--number-color, #e5c07b)"
    },
    {
        tag: [
            t.operator,
            t.operatorKeyword,
            t.url,
            t.escape,
            t.regexp,
            t.link,
            t.special(t.string)
        ],
        color: cyan
    },
    { tag: [t.meta, t.comment], color: "var(--line-number, #7d8799)" },
    { tag: t.strong, fontWeight: "bold" },
    { tag: t.emphasis, fontStyle: "italic" },
    { tag: t.strikethrough, textDecoration: "line-through" },
    {
        tag: t.link,
        color: "var(--line-number, #7d8799)",
        textDecoration: "underline"
    },
    {
        tag: t.heading,
        fontWeight: "bold",
        color: "var(--property-name, #e06c75)"
    },
    {
        tag: [t.atom, t.bool, t.special(t.variableName)],
        color: "var(--boolean-value, #d19a66)"
    },
    {
        tag: [t.processingInstruction, t.string, t.inserted],
        color: "var(--string-value, #98c379)"
    },
    { tag: t.invalid, color: invalid }
]);

const themeHighlightStyleYaml = HighlightStyle.define([
    { tag: t.keyword, color: "#d19a66" },
    {
        tag: [t.name, t.deleted, t.character, t.propertyName, t.macroName],
        color: "var(--property-name, #e06c75)"
    },
    { tag: [t.function(t.variableName), t.labelName], color: malibu },
    { tag: [t.definition(t.name), t.separator], color: "var(--cursor, #abb2bf)" },
    {
        tag: [
            t.typeName,
            t.className,
            t.number,
            t.changed,
            t.annotation,
            t.modifier,
            t.self,
            t.namespace
        ],
        color: "var(--number-color, #e5c07b)"
    },
    { tag: [t.meta, t.comment], color: "var(--line-number, #Abb2bf)" },
    {
        tag: [t.atom],
        color: "var(--boolean-value, #e06c75)"
    },
    {
        tag: [t.processingInstruction, t.string, t.inserted, t.regexp],
        color: "var(--string-value, #98c379)"
    }
]);

export const themeHighlightStyleXML = HighlightStyle.define([
    { tag: t.keyword, color: "#d19a66" },
    {
        tag: [t.name, t.deleted, t.character, t.propertyName, t.macroName],
        color: "var(--property-name, #e5c07b)"
    },
    { tag: [t.function(t.variableName), t.labelName], color: malibu },
    { tag: [t.definition(t.name), t.separator], color: "var(--cursor, #abb2bf)" },
    {
        tag: [
            t.typeName,
            t.className,
            t.number,
            t.changed,
            t.annotation,
            t.modifier,
            t.self,
            t.namespace
        ],
        color: "var(--number-color, #e06c75)"
    },
    { tag: [t.meta, t.comment], color: "var(--line-number, #888)" },
    {
        tag: [t.atom],
        color: "var(--boolean-value, #e5c07b)"
    },
    {
        tag: [t.processingInstruction, t.string, t.inserted, t.regexp],
        color: "var(--string-value, #98c379)"
    }
]);

const themeExtensionsJson: Extension = [theme, syntaxHighlighting(themeHighlightStyleJSON)];

const themeExtensionsXML: Extension = [theme, syntaxHighlighting(themeHighlightStyleXML)];

const themeExtensionsYaml: Extension = [
    [
        ...theme,
        EditorView.theme({
            ".cm-line": {
                color: "var(--cursor, #98c379)"
            }
        })
    ],
    syntaxHighlighting(themeHighlightStyleYaml)
];

export const getThemeExtention = (format: Formats): Extension => {
    if (format === "json" || format === "js") return themeExtensionsJson;
    if (format === "yaml") return themeExtensionsYaml;
    return themeExtensionsXML;
};
