import adapter from "@sveltejs/adapter-cloudflare";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import { mdsvex } from "mdsvex";

const config = {
	extensions: [".svelte", ".svx", ".md"],
	preprocess: [vitePreprocess(), mdsvex()],
	kit: {
		adapter: adapter(),
	},
};

export default config;
