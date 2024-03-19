<script lang="ts">
    import "~/styles/index.css";
    import Footer from "~/lib/shared/Footer.svelte";
</script>

{@html `<link rel="preload" href="/fonts/JetBrainsMono-Regular.tff" as="font" type="font/tff" crossorigin />`}
{@html `<link
    rel="preload"
    href="/fonts/JetBrainsMono-SemiBold.tff"
    as="font"
    type="font/tff"
    crossorigin
/>`}
{@html `<link rel="preload" href="/fonts/NotoSans-Regular.tff" as="font" type="font/tff" crossorigin />`}
{@html `<link rel="preload" href="/fonts/NotoSans-Bold.tff" as="font" type="font/tff" crossorigin />`}
{@html `<link
    rel="preload"
    href="/fonts/SourceSerif4-BoldItalic.tff"
    as="font"
    type="font/tff"
    crossorigin
/>`}
{@html `<link rel="preload" href="/fonts/Georgia.tff" as="font" type="font/tff" crossorigin />`}
{@html `<link rel="preload" href="/fonts/Cambria.tff" as="font" type="font/tff" crossorigin />`}
{@html `<link rel="preload" href="/fonts/TimesRegular.tff" as="font" type="font/tff" crossorigin />`}
{@html `<link rel="preload" href="/fonts/timesnewroman.tff" as="font" type="font/tff" crossorigin />`}
{@html `<link rel="preload" href="/fonts/ArialMT.tff" as="font" type="font/tff" crossorigin />`}
{@html `<link rel="preload" href="/fonts/Helvetica.tff" as="font" type="font/tff" crossorigin />`}
{@html `<link
    rel="preload"
    href="/fonts/HelveticaNeueBlackCondensed.tff"
    as="font"
    type="font/tff"
    crossorigin
/>`}

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
