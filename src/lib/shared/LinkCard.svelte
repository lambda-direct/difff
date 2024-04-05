<script lang="ts">
    export let name: string;
</script>

<div class="card">
    <p class="name">{name}</p>
</div>

<style lang="scss">
    .card {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 36px;
        min-width: 235px;
        border: 1px solid #292828;
        border-radius: 4px;
        background: #171717;
        padding: 0 4px;
        @media (min-width: 420px) {
            height: 42px;
            padding: 0 8px;
        }
        @media (min-width: 1024px) {
            height: 52px;
            padding: 0 12px;
        }
        &:hover {
            background: #1d1d1d;
        }
    }
    .name {
        margin: 0;
        font-family: "JetBrainsMono-SemiBold", monospace;
    }
</style>
