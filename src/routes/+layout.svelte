<script>
    import Footer from "~/lib/shared/Footer.svelte";

</script>

<div class="page">
    <slot/>
    <Footer/>
</div>


<style>
    .page{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 100%;
    }
</style>