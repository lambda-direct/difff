<script lang="ts">
    import AlertIcon from "~/lib/icons/AlertIcon.svelte";
</script>

<div class="modal">
    <p class="title">Invalid JSON</p>
    <AlertIcon color={"#ffffff"} />
</div>

<style>
    .title {
        color: #fff;
        font-size: 14px;
        font-family: "JetBrains Mono", monospace;
    }
    .modal {
        display: flex;
        gap: 4px;
        align-items: center;
        flex-direction: row-reverse;
        padding: 12px;
        background: #cd1c1cbf;
        border-radius: 4px;
        bottom: 0%;
        position: absolute;
        right: 12px;
        z-index: 100;
        animation: floatIn 0.5s ease-in-out 0s forwards;
    }
    @keyframes floatIn {
        to {
            bottom: 12px;
        }
    }
</style>
