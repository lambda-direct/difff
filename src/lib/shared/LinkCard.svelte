<script lang="ts">
    import ArrowIcon from "~/lib/icons/ArrowIcon.svelte";

    export let name: string;
</script>

<div class="card">
    <p class="name">{name}</p>
    <ArrowIcon color={"#eaeaea"} />
</div>

<style>
    .card {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 4px;
        height: 52px;
        border: 1px solid #292828;
        border-radius: 4px;
        background: #171717;
        &:hover{
            background: #1d1d1d;
        }
    }
    .name {
        margin: 0;
        font-family: "JetBrainsMono-SemiBold", monospace;
    }
</style>
