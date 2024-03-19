import { sveltekit } from "@sveltejs/kit/vite";
import path from "path";
import { defineConfig } from "vite";
import wasm from "vite-plugin-wasm";
import topLevelAwait from "vite-plugin-top-level-await";

const VitePluginRemoveHashFontFiles = () => {
    return {
        name: "Remove hash from font files",
        apply: "build",
        enforce: "post",
        config(config: any) {
            const defaultAssetFileNames = config.build.rollupOptions.output.assetFileNames;
            config.build.rollupOptions.output.assetFileNames = ({ type, name }) => {
                if (type === "asset" && /\.(woff2?|ttf|otf)$/.test(name)) return `[name].[ext]`;
                return defaultAssetFileNames;
            };
        }
    };
};
export default defineConfig({
    optimizeDeps: {
        exclude: ["@biomejs/wasm-bundler", "@codemirror/*"]
    },
    plugins: [sveltekit(), wasm(), topLevelAwait(), VitePluginRemoveHashFontFiles()],
    resolve: {
        alias: {
            "~": path.resolve("./src"),
            "$md/": path.resolve("./src/md")
        }
    }
});
