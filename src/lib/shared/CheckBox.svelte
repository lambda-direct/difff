<script lang="ts">
    export let prop: boolean;
    export let label: string;
    export let name: string;
    const changeProp = () => {
        prop = !prop;
    };
</script>

<button on:click={changeProp} class="check-box-pick">
    <input class="check-box" type="checkbox" id={name} {name} value={name} checked={prop} />
    <label class="for-check" for="missing">{label}</label>
</button>

<style>
    .check-box-pick {
        display: flex;
        align-items: center;
        background: transparent;
        border: none;
        padding: 4px;
        font-weight: 600;
    }

    .check-box {
        border-radius: 2px !important;
        border: 2px solid #507299;
        cursor: pointer;
        width: 15px;
        height: 14px;
        appearance: none;
        accent-color: #507299;
        margin-right: 4px;
    }

    .check-box:checked {
        border-radius: 2px !important;
        cursor: pointer;
        width: 15px;
        height: 14px;
        appearance: auto;
        accent-color: #507299;
        margin-right: 4px;
    }
    .for-check {
        cursor: pointer;
        font-size: 14px;
        font-weight: 500;
        color: #000;
    }
</style>
