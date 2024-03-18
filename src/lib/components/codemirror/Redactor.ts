import { EditorState, SelectionRange, StateField, type Extension } from "@codemirror/state";
import { EditorView, placeholder as placeholderSet, type DecorationSet } from "@codemirror/view";
import { getThemeExtention } from "./themes/theme";
import { StreamLanguage, type LanguageSupport } from "@codemirror/language";
import { json } from "@codemirror/lang-json";
import * as xmlMode from "@codemirror/legacy-modes/mode/xml";
import * as yamlMode from "@codemirror/legacy-modes/mode/yaml";
import { basicSetup } from "codemirror";
import { closeSearchPanel, openSearchPanel, search } from "@codemirror/search";
import type { CursorPosition, UploadEvent } from "~/types";
import { isJSONError, isXMLError, isYamlError } from "~/utils/helper";
import Validator from "~/utils/Validator";
import Formatter from "~/utils/Formatter";
import Highlight from "~/lib/components/codemirror/Highlight";
import { showError } from "~/lib/storages";
import { lineHighlightField } from "./highlightField";

class Codemirror {
    view: EditorView;
    element: HTMLDivElement;
    outerValueChange: (newValue: string, cursorPos: CursorPosition) => void;
    placeholder: string;
    format: "json" | "xml" | "yaml";
    formatter: Formatter;
    validator: Validator;
    highlighter: Highlight;
    constructor(
        element: HTMLDivElement,
        outerValueChange: (newValue: string, cursorPos: CursorPosition) => void,
        placeholder: string,
        format: "json" | "xml" | "yaml"
    ) {
        this.element = element;
        this.outerValueChange = outerValueChange;
        this.placeholder = placeholder;
        this.format = format;
        this.view = this.init(element);
        this.formatter = new Formatter(format);
        this.validator = new Validator(format);
        this.highlighter = new Highlight(this.view);
    }

    private getFileFormat = (
        format: "json" | "yaml" | "xml"
    ): LanguageSupport | StreamLanguage<unknown> => {
        if (format === "json") return json();
        if (format === "yaml") return StreamLanguage.define(yamlMode.yaml);
        return StreamLanguage.define(xmlMode.xml);
    };

    private getExtentions = () => {
        const fieldFormat = this.getFileFormat(this.format);
        const themeExtension = getThemeExtention(this.format);
        return [
            EditorView.lineWrapping,
            basicSetup,
            lineHighlightField,
            search({ top: true }),
            themeExtension,
            placeholderSet(this.placeholder),
            fieldFormat
        ];
    };

    private createEditorState = (
        value: string,
        stateExtensions: Extension | StateField<DecorationSet>
    ): EditorState => {
        return EditorState.create({
            doc: value,
            extensions: [stateExtensions]
        });
    };

    public init = (element: HTMLDivElement) => {
        return new EditorView({
            parent: element,
            state: this.createEditorState("", this.getExtentions()),
            dispatch: (transaction) => {
                this.view.update([transaction]);
                if (transaction.selection || transaction.docChanged) {
                    this.valueValidation(this.view.state.doc.toString()); // REPLACE VALIDATION ????
                    this.outerValueChange(
                        this.view.state.doc.toString(),
                        this.trackCursorPosition()
                    );
                }
            },
            extensions: [this.getExtentions()]
        });
    };

    public updateCodemirrorValue = (input: string) => {
        const { state } = this.view;
        const selection = state.selection.main;

        const transition = state.update({
            changes: { from: 0, to: state.doc.length, insert: input }
        });
        this.view.dispatch({
            ...transition,
            selection: { anchor: selection.anchor, head: selection.anchor }
        });
    };

    public trackCursorPosition = (): { line: number; col: number } => {
        const { doc, selection } = this.view.state;
        const mainRange: SelectionRange = selection.main;

        const lineInfo = doc.lineAt(mainRange.head);
        const line = lineInfo.number;
        const col = mainRange.head - lineInfo.from;

        return { line, col };
    };

    public setFormattingResult = (value: unknown) => {
        if (typeof value === "string") {
            this.highlighter.removeHighlightedLines(this.view);
            this.updateCodemirrorValue(value);
        } else {
            if (isJSONError(value)) {
                this.highlighter.highlightErrorJSON(
                    value.loc.start.column,
                    value.loc.start.line,
                    value.message
                );
                return;
            }
            if (isYamlError(value)) {
                this.highlighter.highlightErrorYAML(
                    value.mark.position,
                    value.mark.line,
                    value.reason
                );
                return;
            }
            if (isXMLError(value)) {
                this.highlighter.highlightErrorXML(value.err.line, value.err.msg);
                return;
            }
        }
    };

    public formatInput = async (userInput: string) => {
        if (userInput) {
            this.setFormattingResult(await this.formatter.formatInput(userInput));
        }
    };

    public valueValidation = (value: unknown) => {
        let isError: boolean = false;
        showError.subscribe((el) => (isError = el));
        if (typeof value === "boolean" && isError) {
            this.highlighter.removeHighlightedLines(this.view);
        }
        if (typeof value !== "boolean") {
            if (isJSONError(value)) {
                this.highlighter.highlightErrorJSON(
                    value.loc.start.column,
                    value.loc.start.line,
                    value.message
                );
                return;
            }
            if (isXMLError(value)) {
                this.highlighter.highlightErrorXML(value.err.line, value.err.msg);
                return;
            }
            if (isYamlError(value)) {
                this.highlighter.highlightErrorYAML(
                    value.mark.position,
                    value.mark.line,
                    value.reason
                );
                return;
            }
        }
    };

    public dragAndDropFile = (event: DragEvent, value: string) => {
        if (event.dataTransfer && event.dataTransfer.files.length > 0) {
            const oldValue = value;
            const file = event.dataTransfer.files[0];
            const reader = new FileReader();
            reader.onload = async (e: ProgressEvent<FileReader>) => {
                const droppedData = e.target?.result as string;
                this.updateCodemirrorValue(droppedData);
                this.setFormattingResult(await this.formatter.formatInput(droppedData));
            };
            if (value !== oldValue) {
                this.view.dispatch({
                    effects: [EditorView.scrollIntoView(1, { y: "nearest" })]
                });
            }
            reader.readAsText(file);
        }
    };

    public downloadFile = (value: string) => {
        const blob = new Blob([value], { type: `application/${this.format}` });
        const url = URL.createObjectURL(blob);

        const aTag = document.createElement("a");
        aTag.href = url;
        aTag.download = `data.${this.format}`;
        document.body.appendChild(aTag);
        aTag.click();
        document.body.removeChild(aTag);
        URL.revokeObjectURL(url);
    };

    public uploadFile = (event: UploadEvent) => {
        if (
            event.currentTarget &&
            event.currentTarget.files &&
            event.currentTarget.files.length > 0
        ) {
            const file = event.currentTarget.files[0];
            const reader = new FileReader();
            reader.onload = async (e: ProgressEvent<FileReader>) => {
                const droppedData = e.target?.result as string;
                this.updateCodemirrorValue(droppedData);
                setTimeout(async () => {
                    this.setFormattingResult(await this.formatter.formatInput(droppedData));
                }, 10); // REDO
            };
            reader.readAsText(file);
        }
    };

    public open = () => {
        openSearchPanel(this.view);
    };

    public close = () => {
        closeSearchPanel(this.view);
    };

    public destroy = () => {
        this.view?.destroy();
    };
}

export default Codemirror;
