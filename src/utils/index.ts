import axios from "axios";
import type { FormatError } from "~/types";
import * as prettier from "prettier/standalone";
import parserBabel from "prettier/plugins/babel";
import * as prettierPluginEstree from "prettier/plugins/estree";

export const isFormatError = (error: unknown): error is FormatError => {
	return <FormatError>error !== undefined && (<FormatError>error).loc !== undefined;
};

export const formattedDate = (inputDate: string) => {
	const [day, month, year] = inputDate.split("-");
	return new Date(`${month}/${day}/${year}`).toLocaleDateString("en-US", {
		month: "short",
		day: "numeric",
		year: "numeric",
	});
};

class JSONDataOperations {
	private optionsJSON = {
		tabWidth: 4,
		semi: true,
		useTabs: false,
		singleQuote: false,
		trailingComma: "none" as const,
		endOfLine: "lf" as const,
		printWidth: 100,
		parser: "json",
		plugins: [parserBabel, prettierPluginEstree],
	};

	private isURL = (url: string) => {
		try {
			new URL(url);
			return true;
		} catch (err) {
			return false;
		}
	};

	private dataFromUrl = async (userInput: string) => {
		if (this.isURL(userInput)) {
			try {
				const response = await axios.get(userInput);
				return JSON.stringify(response.data);
			} catch (err) {
				return userInput;
			}
		} else {
			return userInput;
		}
	};

	public format = async (userInput: string) => {
		const json = await this.dataFromUrl(userInput);
		return await prettier.format(json, this.optionsJSON);
	};
}

export default new JSONDataOperations();
