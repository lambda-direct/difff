import axios from "axios";
import * as yamlConvert from "js-yaml";
import { isURL } from "~/utils/helper";
import { js2xml, xml2json } from "xml-js";

export class Converter {
    private sanitizeTags = (xmlString: string) => {
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

    private unNestJSON = (json: string) => {
        const parsedJson = JSON.parse(json);

        const isGotOnlyOneKey = (obj: object) => {
            return typeof obj === "object" && Object.keys(obj).length === 1;
        };
        const transformObject = (obj: object) => {
            const transformedObj: { [key: string]: string | string[] | object } = {};
            for (const key in obj) {
                const value = obj[key];
                if (Array.isArray(value)) {
                    const arrayValues = value.map((item) => {
                        if (isGotOnlyOneKey(item) && Object.hasOwn(item, "_text")) {
                            return item["_text"];
                        } else if (typeof item === "string") {
                            return item;
                        } else {
                            return transformObject(item);
                        }
                    });

                    transformedObj[key] = arrayValues;
                } else if (key === "_attributes" && isGotOnlyOneKey(value)) {
                    const attributeKey = Object.keys(value)[0];
                    transformedObj[attributeKey] = value[attributeKey];
                } else if (
                    typeof value === "object" &&
                    Object.prototype.hasOwnProperty.call(value, "_text")
                ) {
                    if (isGotOnlyOneKey(value)) {
                        transformedObj[key] = value["_text"];
                    } else {
                        transformedObj[key] = transformObject(value);
                    }
                } else if (typeof value === "object" && !Array.isArray(value)) {
                    transformedObj[key] = transformObject(value);
                } else {
                    transformedObj[key] = value;
                }
            }

            return transformedObj;
        };

        const transformedJSON = transformObject(parsedJson);
        return JSON.stringify(transformedJSON);
    };

    public jsonToXml = (json: string) => {
        try {
            const xml = js2xml(JSON.parse(json), { compact: true });
            const sanitizedXML = this.sanitizeTags(xml);
            return `<?xml version="1.0" encoding="UTF-8"?><root>${sanitizedXML}</root>`;
        } catch (err) {
            return "";
        }
    };

    public xmlToJson = (xml: string) => {
        try {
            const json = xml2json(xml, { compact: true, trim: true, ignoreComment: true });

            return this.unNestJSON(json);
        } catch (err) {
            return "";
        }
    };

    public urlToJson = async (userInput: string) => {
        if (!isURL(userInput)) return userInput;
        try {
            const response = await axios.get(userInput);
            return JSON.stringify(response.data);
        } catch (err) {
            return userInput;
        }
    };

    public jsonToYaml = (json: string) => {
        try {
            const yaml = yamlConvert.load(json);
            return JSON.stringify(yaml);
        } catch (err) {
            return "";
        }
    };

    public yamlToJson = (yaml: string) => {
        try {
            const loadedYaml = yamlConvert.load(yaml);
            const json = JSON.stringify(loadedYaml, null);
            return json;
        } catch (err) {
            return "";
        }
    };

    public yamlToXml = (yaml: string) => {
        try {
            const loadedYaml = yamlConvert.load(yaml);
            const json = JSON.stringify(loadedYaml, null);
            const xml = this.jsonToXml(json);
            return xml;
        } catch (err) {
            return "";
        }
    };

    public xmlToYaml = (xml: string) => {
        try {
            const json = this.xmlToJson(xml);
            const yaml = yamlConvert.load(json);
            return JSON.stringify(yaml);
        } catch (err) {
            return "";
        }
    };
}

export default new Converter();
