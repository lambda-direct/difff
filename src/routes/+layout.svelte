<script lang="ts">
    import "~/styles/index.css";
    import Footer from "~/lib/shared/Footer.svelte";
</script>

{@html `<link rel="preload" href="/fonts/JetBrainsMono-Regular.ttf" as="font" type="font/ttf" crossorigin />`}
{@html `<link rel="preload" href="/fonts/JetBrainsMono-SemiBold.ttf" as="font" type="font/ttf" crossorigin />`}
{@html `<link rel="preload" href="/fonts/NotoSans-Regular.ttf" as="font" type="font/ttf" crossorigin />`}
{@html `<link rel="preload" href="/fonts/NotoSans-Bold.ttf" as="font" type="font/ttf" crossorigin />`}
{@html `<link rel="preload" href="/fonts/SourceSerif4-BoldItalic.ttf" as="font" type="font/ttf" crossorigin />`}
{@html `<link rel="preload" href="/fonts/Georgia.ttf" as="font" type="font/ttf" crossorigin />`}
{@html `<link rel="preload" href="/fonts/Cambria.ttf" as="font" type="font/ttf" crossorigin />`}
{@html `<link rel="preload" href="/fonts/TimesRegular.ttf" as="font" type="font/ttf" crossorigin />`}
{@html `<link rel="preload" href="/fonts/timesnewroman.ttf" as="font" type="font/ttf" crossorigin />`}
{@html `<link rel="preload" href="/fonts/ArialMT.ttf" as="font" type="font/ttf" crossorigin />`}
{@html `<link rel="preload" href="/fonts/Helvetica.ttf" as="font" type="font/ttf" crossorigin />`}
{@html `<link rel="preload" href="/fonts/HelveticaNeueBlackCondensed.ttf" as="font" type="font/ttf" crossorigin />`}

<div class="page">
    <slot />
    <Footer />
</div>

<style>
    .page {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 100%;
    }
</style>
