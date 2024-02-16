<script lang="ts">
    import ArrowIcon from "~/lib/icons/ArrowIcon.svelte";

    export let name: string;
</script>

<div class="card">
    <p class="name">{name}</p>
    <ArrowIcon />
</div>

<style>
    .card {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 216px;
        height: 60px;
        border: 1px solid #323232;
        border-radius: 4px;
        background: #1d1d1d;
    }
    .name {
        margin: 0;
        font-family: "JetBrains Mono", monospace;
        font-weight: 600;
    }
</style>
