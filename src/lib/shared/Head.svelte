<script lang="ts">
    import { page } from "$app/stores";
    import type { OGCard, TwitterCard } from "~/types";

    export let title: string;
    export let description: string;

    export let twitter: TwitterCard | undefined | null = null;
    export let openGraph: OGCard;
</script>

<svelte:head>
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:description" content={twitter?.description || description} />
    <meta name="twitter:title" content={twitter?.title || title} />
    <meta name="twitter:image" content={`${$page.url.origin}/og`} />

    <meta property="og:locale" content="en_US" />
    <meta property="og:type" content={openGraph.type} />
    <meta property="og:url" content={$page.url.origin} />
    <meta property="og:image" content={`${$page.url.origin}/og`} />
    <meta
        property="og:title"
        content={openGraph.description ? openGraph.description : description}
    />
    <meta
        property="og:description"
        content={openGraph.description ? openGraph.description : description}
    />
</svelte:head>
