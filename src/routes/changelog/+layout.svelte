<script context="module">
    import a from "~/lib/shared/a.svelte";
    export { a };
</script>

<script lang="ts">
    import "~/styles/index.css";
</script>

<div class="container">
    <slot />
</div>
