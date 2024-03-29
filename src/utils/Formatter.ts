import { XMLValidator } from "fast-xml-parser";
import * as yaml from "js-yaml";
import * as prettier from "prettier/standalone";
import Converter from "~/utils/Converter";
import { prettierJSSettings, prettierSettings } from "~/utils/settings";
import xmlFormat from "xml-formatter";
import type { Formats } from "~/types";

class Formatter {
    private format: Formats;
    constructor(format: Formats) {
        this.format = format;
    }

    private formatJson = async (
        userInput: string,
        options?: { tabWidth?: number; useTabs?: boolean }
    ) => {
        if (!options || (!options.tabWidth && !options.useTabs))
            options = { tabWidth: 4, useTabs: false };

        if (!options.tabWidth) options = { tabWidth: 4, useTabs: options.useTabs };

        if (!options.useTabs) {
            options = { tabWidth: options.tabWidth, useTabs: false };
        }
        try {
            const originalCode = await Converter.urlToJson(userInput);
            const formattedResult = await prettier.format(originalCode, {
                ...prettierSettings,
                ...options
            });

            if (originalCode === formattedResult) return originalCode;

            return formattedResult;
        } catch (err) {
            return err;
        }
    };

    private formatJs = async (
        userInput: string,
        options?: { tabWidth?: number; useTabs?: boolean }
    ) => {
        if (!options || (!options.tabWidth && !options.useTabs))
            options = { tabWidth: 4, useTabs: false };

        if (!options.tabWidth) options = { tabWidth: 4, useTabs: options.useTabs };

        if (!options.useTabs) {
            options = { tabWidth: options.tabWidth, useTabs: false };
        }
        try {
            const formattedResult = await prettier.format(userInput, {
                ...prettierJSSettings,
                ...options
            });

            if (userInput === formattedResult) return userInput;

            return formattedResult;
        } catch (err) {
            return err;
        }
    };

    private formatYaml = (userInput: string, options?: { indent: number }) => {
        if (!options) options = { indent: 2 };
        try {
            const yamlObject = yaml.load(userInput);
            const formattedYaml = yaml.dump(yamlObject, options);
            return formattedYaml;
        } catch (err) {
            return err;
        }
    };

    private formatXml = (userInput: string, spaceNum?: number) => {
        if (!spaceNum) spaceNum = 2;
        if (userInput) {
            const validationResult = XMLValidator.validate(userInput, {
                allowBooleanAttributes: true
            });

            if (validationResult === true) {
                const options = { indentation: " ".repeat(spaceNum) };
                const formattedXML = xmlFormat(userInput, options);
                return formattedXML;
            } else {
                return validationResult;
            }
        } else {
            return userInput;
        }
    };

    public formatInput = async (
        userInput: string,
        tab?: boolean,
        spaces?: number
    ): Promise<unknown> => {
        if (userInput) {
            if (this.format === "yaml") {
                const options = spaces ? { indent: spaces } : undefined;
                return this.formatYaml(userInput, options);
            }
            if (this.format === "json") {
                const options = { tabWidth: spaces, useTabs: tab };
                return await this.formatJson(userInput, options);
            }
            if (this.format === "js") {
                const options = { tabWidth: spaces, useTabs: tab };
                return await this.formatJs(userInput, options);
            }
            if (this.format === "xml") return this.formatXml(userInput, spaces);
        }
        return userInput;
    };
}

export default Formatter;
