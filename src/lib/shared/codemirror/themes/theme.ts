import { HighlightStyle, syntaxHighlighting } from "@codemirror/language";
import { type Extension } from "@codemirror/state";
import { EditorView } from "@codemirror/view";
import { tags as t } from "@lezer/highlight";
import { baseTheme } from "./base";

const darkBackground = "#21252b";
const tooltipBackground = "#FBFBFA";
const tooltipColor = "#373530";

export const theme = [
    baseTheme,
    EditorView.theme(
        {
            "&": {
                height: "60vh",
                color: "#abb2bf",
                background: "#030711"
            },
            ".cm-line": {
                color: "#dadf6e"
            },
            ".ͼs": {
                color: "#c15897"
            },
            ".ͼw": {
                color: "#67badb"
            },
            ".ͼ12": {
                color: "#704fdb"
            },
            ".ͼx": {
                color: "#b067c5"
            },
            ".ͼq": {
                color: "#e1e77b"
            },
            "&.cm-focused": {
                outline: "unset"
            },
            ".cm-content": {
                caretColor: "#abb2bf"
            },
            "&.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground": {
                backgroundColor: "#3e445157"
            },
            ".cm-cursor, .cm-dropCursor": {
                borderLeftColor: "#abb2bf"
            },

            ".cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection":
                {
                    background: "#3e4451"
                },

            ".cm-panels": {
                background: darkBackground,
                color: "#abb2bf)"
            },
            ".cm-panels.cm-panels-top": {
                borderBottom: "2px solid black"
            },
            ".cm-panels.cm-panels-bottom": {
                borderTop: "2px solid black"
            },

            ".cm-activeLine": {
                background: "#f5f5f014"
            },

            ".cm-gutters": {
                background: "#030711",
                color: "#7d8799",
                border: "none"
            },

            ".cm-activeLineGutter": {
                background: "#f5f5f014"
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
                    background: "#f5f5f014",
                    color: "#abb2bf"
                }
            }
        },
        { dark: true }
    )
];

const themeHighlightStyle = HighlightStyle.define([
    { tag: t.comment, color: "#6272a4" },
    { tag: t.string, color: "#f1fa8c" },
    { tag: t.atom, color: "#bd93f9" },
    { tag: t.meta, color: "#f8f8f2" },
    { tag: [t.keyword, t.operator, t.tagName], color: "#ff79c6" },
    { tag: [t.function(t.propertyName), t.propertyName], color: "#66d9ef" },
    {
        tag: [
            t.definition(t.variableName),
            t.function(t.variableName),
            t.className,
            t.attributeName
        ],
        color: "#50fa7b"
    },
    { tag: t.atom, color: "#bd93f9" },
    { tag: t.keyword, color: "#c678dd" },
    {
        tag: [t.name, t.deleted, t.character, t.macroName],
        color: "#e06c75"
    },
    { tag: [t.function(t.variableName), t.labelName], color: "#61afef" },
    {
        tag: [t.color, t.constant(t.name), t.standard(t.name)],
        color: "#d19a66"
    },
    { tag: [t.definition(t.name), t.separator], color: "#abb2bf" },
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
        color: "#e5c07b"
    },
    {
        tag: [t.operatorKeyword, t.url, t.escape, t.regexp, t.link, t.special(t.string)],
        color: "#56b6c2"
    },
    { tag: t.strong, fontWeight: "bold" },
    { tag: t.emphasis, fontStyle: "italic" },
    { tag: t.strikethrough, textDecoration: "line-through" },
    {
        tag: t.link,
        color: "#7d8799",
        textDecoration: "underline"
    },
    {
        tag: t.heading,
        fontWeight: "bold",
        color: "#e06c75"
    },
    {
        tag: [t.bool, t.special(t.variableName)],
        color: "#d19a66"
    },
    {
        tag: [t.processingInstruction, t.inserted],
        color: "#98c379"
    },
    { tag: t.invalid, color: "#eaeaea" }
]);

export const themeExtensions: Extension = [theme, syntaxHighlighting(themeHighlightStyle)];
