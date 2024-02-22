<script lang="ts">
    import 'toastify-js/src/toastify.css';
    import "~/styles/index.css";

    
</script>


<div class="routing">

</div>
<div class="page-wrapper">
    <div class="container">
        <slot />
    </div>
</div>

<style lang="scss">
    .page-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0 0 32px;
    }
</style>
