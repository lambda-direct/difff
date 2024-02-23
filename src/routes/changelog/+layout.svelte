<script lang="ts">
    import "~/styles/index.css";
    import 'toastify-js/src/toastify.css';
</script>




<div class="container_wrapper">
    <div class="container">      
        <slot />
    </div>
</div>

<style>
    .container_wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0 0 32px;
    }
</style>
