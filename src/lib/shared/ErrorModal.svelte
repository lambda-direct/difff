<script lang="ts">
</script>

<div class="modal">
    <p class="title">Invalid JSON</p>
</div>

<style>
    .title {
        margin: 0;
        color: #000;
        font-family: "Montserrat", sans-serif;
    }
    .modal {
        padding: 12px;
        background: #d70000;
        border: 1px solid #9b0000;
        border-radius: 4px;
        bottom: 0%;
        position: absolute;
        right: 6px;
        z-index: 100;
        animation: floatIn 0.5s ease-in-out 0s forwards;
    }
    @keyframes floatIn {
        to {
            bottom: 12px;
        }
    }
</style>
