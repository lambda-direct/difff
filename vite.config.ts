import { sveltekit } from "@sveltejs/kit/vite";
import path from "path";
import { defineConfig } from "vite";
import wasm from "vite-plugin-wasm";
import topLevelAwait from "vite-plugin-top-level-await";

export default defineConfig({
	optimizeDeps: {
		exclude: ["@biomejs/wasm-bundler", "@codemirror/*"],
	},
	plugins: [sveltekit(), wasm(), topLevelAwait()],
	resolve: {
		alias: {
			"~": path.resolve("./src"),
		},
	},
});
