<script lang="ts">
    import "~/styles/index.css";
    import "./style.css";
    import json from "highlight.js/lib/languages/json";
    import yaml from "highlight.js/lib/languages/yaml";
    import xml from "highlight.js/lib/languages/xml";
    import hljs from "highlight.js";
    import { onMount } from "svelte";
    import { browser } from "$app/environment";

    onMount(() => {
        if (browser) {
            hljs.registerLanguage("xml", xml);
            hljs.registerLanguage("yaml", yaml);
            hljs.registerLanguage("json", json);
            hljs.highlightAll();
        }
    });
</script>

<a href="/changelog">
    <header class="header">
        <div class="container">
            <p class="header-text">
                🚀 Visit and see how our service has changed over the past week →
            </p>
        </div>
    </header>
</a>

<div class="container">
    <slot />
</div>

<style lang="scss">
    .header {
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0 16px;
        height: 40px;
        border-bottom: 1px solid #2c2c2c;
        font-family: "NotoSans-Regular", sans-serif;
        color: #e2e8f0;
    }

    .header-text {
        text-align: center;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        text-overflow: ellipsis;
    }
</style>
