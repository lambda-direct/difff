<script lang="ts">
    import "~/styles/index.css";
    import 'toastify-js/src/toastify.css';
</script>




<div class="page-wrapper">
    <div class="container">      
        <slot />
    </div>
</div>

<style>
    .page-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0 0 32px;
    }
</style>
