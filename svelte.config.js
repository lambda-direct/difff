import { mdsvex } from "mdsvex";
import adapter from "@sveltejs/adapter-cloudflare";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import relativeImages from "mdsvex-relative-images";

const mdsvexOptions = { extensions: [".md"], remarkPlugins: [relativeImages] };

const config = {
	extensions: [".svelte", ".md"],
	preprocess: [vitePreprocess(), mdsvex(mdsvexOptions)],
	kit: {
		adapter: adapter(),
	},
};

export default config;
