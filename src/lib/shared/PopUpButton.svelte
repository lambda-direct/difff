<script lang="ts">
    export let click: Function;
    export let popUpMessage: string;

    let showPopUp: boolean = false

    const setPopUp = () =>{
        showPopUp=true
        setTimeout(()=>{
            showPopUp=false
        }, 1500)
    }
</script>

<div class="btn-wrapper">
    {#if showPopUp}
        <div class="pop-up">
            {popUpMessage}
        </div>
    {/if}
    <button on:click={()=>{click(), setPopUp()}} {...$$props} class="button">
        <slot />
    </button>
</div>


<style lang="scss">
    .button {
        display: flex;
        align-items: center;
        height: 36px;
        padding: 0 7px;
        background: #030711;
        border: 1px solid #313345;
        border-radius: 8px;
        color: #7d8799;
        transition: all 0.2s;
        &:hover {
            background: #040f1e;
            color: #e1e1e1;
        }
    }

    .pop-up{
        position: absolute;
        display: flex;
        align-items: center;
        bottom: 50px;
        height: 36px;
        padding: 0 7px;
        background: #040b1a;
        border: 1px solid #313345;
        border-radius: 8px;
        color: #e1e1e1
    }
    
    .btn-wrapper{
        display: flex;
        flex-direction: column;
        align-items: center;
    }
</style>
