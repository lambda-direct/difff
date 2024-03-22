import axios from "axios";
import { isURL } from "~/utils/helper";
import { js2xml } from "xml-js";

export class Converter {
    public urlToJson = async (userInput: string) => {
        if (!isURL(userInput)) return userInput;
        try {
            const response = await axios.get(userInput);
            return JSON.stringify(response.data);
        } catch (err) {
            return userInput;
        }
    };

    private clearTags = (xmlString: string) => {
        const tagPattern = /<[^<>]+>/g;

        const removeSpaces = (str: string) => str.replace(/\s/g, "");

        const resignTagToValid = (tag: string) => {
            const isValidChar = (char: string) => /[a-zA-Z0-9_.:]/.test(char);
            const isFirstCharValid = (char: string) => /[a-zA-Z_:]/.test(char);

            const firstSymbol = tag.startsWith("</") ? 2 : 1;
            const lastSymbol = tag.endsWith("/>") ? 2 : 1;

            let sanitizedTag = tag.slice(0, firstSymbol);

            for (let i = firstSymbol; i < tag.length - lastSymbol; i++) {
                const charIsValid =
                    i === firstSymbol ? isFirstCharValid(tag[i]) : isValidChar(tag[i]);
                sanitizedTag += charIsValid ? tag[i] : "_";
            }

            return sanitizedTag + tag.slice(-lastSymbol);
        };

        const spaceRemoved = xmlString.replace(tagPattern, removeSpaces);
        return spaceRemoved.replace(tagPattern, resignTagToValid);
    };

    public jsonToXml = (json: string) => {
        try {
            const xml = js2xml(JSON.parse(json), { compact: true });

            return `<?xml version="1.0" encoding="UTF-8"?><root>${this.clearTags(xml)}</root>`;
        } catch (err) {
            return "";
        }
    };
}

export default new Converter();
