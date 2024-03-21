import { EditorState, SelectionRange, StateField, type Extension } from "@codemirror/state";
import { EditorView, placeholder as placeholderSet, type DecorationSet } from "@codemirror/view";
import { getThemeExtention } from "~/lib/shared/Codemirror/themes/theme";
import { StreamLanguage, type LanguageSupport } from "@codemirror/language";
import { json } from "@codemirror/lang-json";
import * as xmlMode from "@codemirror/legacy-modes/mode/xml";
import * as yamlMode from "@codemirror/legacy-modes/mode/yaml";
import { basicSetup } from "codemirror";
import { closeSearchPanel, openSearchPanel, search } from "@codemirror/search";
import type { CursorPosition } from "~/types";
import { isJSONError, isXMLError, isYamlError } from "~/utils/helper";
import Highlight, {
    lineHighlightField,
    removeHighlightedLines
} from "~/lib/shared/Codemirror/Highlight";
import { errorMessage, showError } from "~/storage/store";
import Validator from "~/utils/Validator";

class Codemirror {
    view: EditorView;
    element: HTMLDivElement;
    outerValueChange: (newValue: string, cursorPos: CursorPosition) => void;
    placeholder: string;
    format: "json" | "xml" | "yaml";
    highlighter: Highlight;
    validator: Validator;
    readOnly: boolean;
    constructor({
        element,
        outerValueChange,
        placeholder,
        format,
        readOnly
    }: {
        element: HTMLDivElement;
        outerValueChange: (newValue: string, cursorPos: CursorPosition) => void;
        placeholder: string;
        format: "json" | "xml" | "yaml";
        readOnly: boolean;
    }) {
        this.element = element;
        this.outerValueChange = outerValueChange;
        this.placeholder = placeholder;
        this.format = format;
        this.readOnly = readOnly;
        this.view = this.init(element);
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
            EditorState.readOnly.of(this.readOnly),
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
        const extentions = this.getExtentions();
        return new EditorView({
            parent: element,

            state: this.createEditorState("", extentions),
            dispatch: async (transaction) => {
                this.view.update([transaction]);
                if (transaction.selection || transaction.docChanged) {
                    const docValue = this.view.state.doc.toString();
                    this.validateInput(await this.validator.validate(docValue));
                    this.outerValueChange(docValue, this.trackCursorPosition());
                }
            },
            extensions: [extentions]
        });
    };

    public updateCodemirrorValue = (input: string) => {
        const { state } = this.view;
        const selection = state.selection.main;

        const transition = state.update({
            changes: { from: 0, to: state.doc.length, insert: input }
        });

        this.view.dispatch(transition);
        if (input.length > 0 && state.doc.length >= selection.anchor) {
            this.view.dispatch({
                selection: { anchor: selection.anchor, head: selection.anchor },
                scrollIntoView: true
            });
        }
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
            errorMessage.set("");
            showError.set(false);
            this.updateCodemirrorValue(value);
        } else {
            showError.set(true);
        }
    };

    public formatInput = async (userInput: string) => {
        if (userInput) {
            this.setFormattingResult(userInput);
        }
    };

    public validateInput = async (validationResult: unknown) => {
        if (validationResult) {
            this.setValidationResult(validationResult);
        }
    };

    private setValidationResult = (value: unknown) => {
        let isError: boolean = false;
        removeHighlightedLines(this.view);
        showError.subscribe((el) => (isError = el));
        if (typeof value === "boolean" && isError) {
            errorMessage.set("");
            showError.set(false);
        }
        if (typeof value !== "boolean") {
            if (isJSONError(value)) {
                this.highlighter.highlightErrorJSON(value.loc.start.line, value.message);
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

    public scrollToTop = () => {
        this.view.dispatch({
            effects: [EditorView.scrollIntoView(1, { y: "nearest" })]
        });
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
