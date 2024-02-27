<script lang="ts">
    import AlertIcon from "~/lib/icons/AlertIcon.svelte";

</script>

<div class="modal">
    <p class="title">Invalid format</p>
    <AlertIcon color={"#eaeaea"} />
</div>

<style>
    .title {
        color: #eaeaea;
        font-size: 14px;
        font-family: "JetBrainsMono-Regular", monospace;
    }
    .modal {
        display: flex;
        gap: 4px;
        align-items: center;
        flex-direction: row-reverse;
        padding: 12px;
        background: #8f2626;
        border-radius: 4px;
        top: 8px;
        position: absolute;
        right: 12px;
        z-index: 5;
        animation: floatIn 0.3s ease-in-out 0s forwards;
    }
    @keyframes floatIn {
        to {
            top: 12px;
        }
    }
</style>
