import { mdsvex } from "mdsvex";
import adapter from "@sveltejs/adapter-cloudflare";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

const mdsvexOptions = {
    extensions: [".md"],
    layout: { _: "./src/routes/changelog/+layout.svelte" }
};

const config = {
    extensions: [".svelte", ".md"],
    preprocess: [vitePreprocess(), mdsvex(mdsvexOptions)],
    kit: {
        adapter: adapter()
    }
};

export default config;
