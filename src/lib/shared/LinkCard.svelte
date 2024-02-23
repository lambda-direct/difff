<script lang="ts">
    export let name: string;
</script>

<div class="card">
    <p class="name">{name}</p>
</div>

<style>
    .card {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 4px;
        min-width: 216px;
        height: 52px;
        padding: 0 12px;
        border: 1px solid #292828;
        border-radius: 4px;
        background: #171717;
        &:hover {
            background: #1d1d1d;
        }
    }
    .name {
        margin: 0;
        font-family: "JetBrainsMono-SemiBold", monospace;
    }
</style>
