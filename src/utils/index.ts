import * as prettier from "prettier/standalone";
import parserBabel from "prettier/plugins/babel";
import * as prettierPluginEstree from "prettier/plugins/estree";
import { showError } from "~/lib/storages";

class CompareJson {
	private ifValuesJSObject = (value1: unknown, value2: unknown): boolean => {
		return (
			value1 !== null &&
			value2 !== null &&
			!Array.isArray(value1) &&
			typeof value1 === "object" &&
			!Array.isArray(value2) &&
			typeof value2 === "object"
		);
	};

	private getKeyDifference = (json1: object, json2: object, mainKey: string | undefined) => {
		const keys1 = Object.keys(json1);
		const keys2 = Object.keys(json2);
		const messages: string[] = [];

		keys1.forEach(key => {
			if (!keys2.includes(key)) {
				messages.push(`Property ${key} missing from the ${mainKey ? mainKey : "object"} on the right side`);
			}
		});
		keys2.forEach(key => {
			if (!keys1.includes(key)) {
				messages.push(`Property ${key} missing from the ${mainKey ? mainKey : "object"} on the left side`);
			}
		});
		const uniqValues1 = keys1.filter(key => !keys2.includes(key));
		const uniqValues2 = keys2.filter(key => !keys1.includes(key));
		const sameKeys = keys1.filter(key => keys2.includes(key));
		return {
			messages,
			sameKeys,
			keyDifference: uniqValues1.length + uniqValues2.length,
		};
	};

	private getIfDiffValueType = (value1: unknown, value2: unknown, key: string) => {
		if (typeof value1 !== typeof value2) {
			return {
				count: 1,
				message: `Values ${key ? `of ${key}` : ""} have different types: ${typeof value1} and ${typeof value2}`,
			};
		}
		if ((Array.isArray(value1) && !Array.isArray(value2)) || (!Array.isArray(value1) && Array.isArray(value2))) {
			return { count: 1, message: `Values of key: ${key}, should both be array or object` };
		}
		return { count: 0 };
	};

	private getValuesDiff = (value1: unknown, value2: unknown, key?: string) => {
		const diffKey: number = 0;
		let diffTypes: number = 0;
		let diffValues: number = 0;
		const messages: string[] = [];
		if (Array.isArray(value1) && Array.isArray(value2)) {
			const missingElements1: unknown[] = value1.filter(el => !value2.includes(el));
			const missingElements2: unknown[] = value2.filter(el => !value1.includes(el));

			outerLoop: for (const el of missingElements1) {
				for (const el2 of missingElements2) {
					if (typeof el !== typeof el2) {
						messages.push(`Values ${key ? `of ${key}` : ""} have different types: ${typeof el} and ${typeof el2}`);
						diffTypes += 1;
						break outerLoop;
					}
				}
			}

			if (diffTypes === 0) {
				if (missingElements1.length > 0) {
					messages.push(
						`Values ${key ? `of ${key}` : ""} on the right side are missing elements: ${missingElements1.join(", ")}`
					);
					diffValues += 1;
				}

				if (missingElements2.length > 0) {
					messages.push(`Values ${key ? `of ${key}` : ""} on the left side are missing elements: ${missingElements2.join(", ")}`);
					diffValues += 1;
				}
			}
		}
		if (this.ifValuesJSObject(value1, value2)) {
			return this.compare(value1 as object, value2 as object, key);
		}
		if (!this.ifValuesJSObject(value1, value2) && !Array.isArray(value1) && !Array.isArray(value2)) {
			if (value1 !== value2) {
				messages.push(`Value ${value1} are not the same as  ${value2}`);
				diffValues += 1;
			}
		}

		return {
			messages,
			diffKey,
			diffTypes,
			diffValues,
		};
	};
	private compare = (json1: object, json2: object, key?: string) => {
		let diffKey: number = 0;
		let diffTypes: number = 0;
		let diffValues: number = 0;
		let messages: string[] = [];
		if (!Array.isArray(json1) && !Array.isArray(json2)) {
			const keyDiff = this.getKeyDifference(json1, json2, key);
			diffKey = keyDiff.keyDifference;
			messages = [...messages, ...keyDiff.messages];
			for (const key of keyDiff.sameKeys) {
				const val1: unknown = (json1 as { [key: string]: unknown })[key];
				const val2: unknown = (json2 as { [key: string]: unknown })[key];
				const diffTypeResult = this.getIfDiffValueType(val1, val2, key);
				diffTypes += diffTypeResult.count;
				if (diffTypeResult.message) messages.push(diffTypeResult.message);

				const valueDiff = this.getValuesDiff(val1, val2, key);
				diffKey += valueDiff.diffKey;
				diffTypes += valueDiff.diffTypes;
				diffValues += valueDiff.diffValues;
				messages = [...messages, ...valueDiff.messages];
			}
		}
		if (Array.isArray(json1) && Array.isArray(json2)) {
			for (let i = 0; i < json1.length; i++) {
				const valueDiff = this.getValuesDiff(json1[i], json2[i]);
				diffKey += valueDiff.diffKey;
				diffTypes += valueDiff.diffTypes;
				diffValues += valueDiff.diffValues;
				messages = [...messages, ...valueDiff.messages];
			}
		}
		return {
			messages,
			diffKey,
			diffTypes,
			diffValues,
		};
	};

	compareJson = (input1: string, input2: string) => {
		const json1 = JSON.parse(input1);
		const json2 = JSON.parse(input2);
		return this.compare(json1, json2);
	};

	isValid = (input1: string | null, input2: string | null) => {
		if (!input1 || !input2) {
			alert(`Please enter JSON data to ${!input1 && !input2 ? "both fields" : !input1 ? "left field" : "right field"}.`);
			return null;
		}
		try {
			const parsedJson1 = JSON.parse(input1);
			const parsedJson2 = JSON.parse(input2);
			if (typeof parsedJson1 !== "object" || parsedJson1 === null) {
				alert("Invalid JSON format at left field. Please enter a valid JSON object.");
				return null;
			}
			if (typeof parsedJson2 !== "object" || parsedJson2 === null) {
				alert("Invalid JSON format at right field. Please enter a valid JSON object.");
				return null;
			}

			return { left: JSON.stringify(parsedJson1, null, 2), right: JSON.stringify(parsedJson2, null, 2) };
		} catch (error) {
			alert(`Invalid JSON format. ${(error as Error).message}`);
			return null;
		}
	};

	format = async (json: string) => {
		return await prettier.format(json, {
			tabWidth: 4,
			semi: true,
			useTabs: false,
			singleQuote: false,
			trailingComma: "none",
			endOfLine: "lf",
			printWidth: 100,
			parser: "json",
			plugins: [parserBabel, prettierPluginEstree],
		});
	};
}

export default new CompareJson();
