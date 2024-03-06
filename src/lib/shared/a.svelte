<script lang="ts">
    export let href: string;

    const isAbsoluteUrl = () => {
        try {
            new URL(href);
            return true;
        } catch (e) {
            return false;
        }
    };

    const isAbsolute = isAbsoluteUrl();
</script>

{#if isAbsolute}
    <a {href} target="_blank" rel="noreferrer nofollow noopener">
        <slot />
    </a>
{:else}
    <a {href}>
        <slot />
    </a>
{/if}
