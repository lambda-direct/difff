import * as prettier from "prettier/standalone";
import parserBabel from "prettier/plugins/babel";
import * as prettierPluginEstree from "prettier/plugins/estree";

class CompareJson {
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
