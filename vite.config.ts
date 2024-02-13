import { sveltekit } from "@sveltejs/kit/vite";
import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
	optimizeDeps: {
		exclude: ["@codemirror/state", "@codemirror/lang-markdown", "@codemirror/view", "@codemirror/lang-javascript"],
	},
	plugins: [sveltekit()],
	resolve: {
		alias: {
			"~": path.resolve("./src"),
		},
	},
});
