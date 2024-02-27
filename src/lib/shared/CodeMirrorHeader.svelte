<script lang="ts">
    import { dropDownOptions } from "~/utils/services"
    import DropDownIcon from "~/lib/icons/DropDownIcon.svelte";
    import DropDownOpenIcon from "~/lib/icons/DropDownOpenIcon.svelte";

    export let functionClick: () => void
    export let btnName: string
    export let label: string

    let showDropDown: boolean = false

    const setShowDropDown = () => {
        showDropDown = true
    }
    
    const setCloseDropDown = ({ relatedTarget, currentTarget }: {relatedTarget: unknown, currentTarget: any}) => {
        if (relatedTarget instanceof HTMLElement && currentTarget.contains(relatedTarget)) return
        showDropDown = false
    } // REDO!!

</script>

<header class="header">
    <div class="label-wrapper">
        <div on:focusout={setCloseDropDown}  class="dropdown">
            {#if showDropDown}
                <div class="dropdown_content">
                    {#each dropDownOptions as  options}
                        <div>
                            <span class="label">
                                {options.title}
                            </span>
                            <ul>
                                {#each options.values as option}
                                    <a href={option.path}>
                                        <li class="dropdown_options">
                                            {option.name}
                                        </li>
                                    </a>
                                {/each}
                            </ul>
                        </div>
                    {/each}
                </div>
            {/if}
            <button on:click={setShowDropDown} class="button">
                JSON {label}
                {#if showDropDown}
                    <DropDownOpenIcon/>
                {:else}
                    <DropDownIcon/>
                {/if} 
            </button>
        </div>
    </div>
    <div class="button-wrapper">
        <button on:click={functionClick} class="button" aria-label={btnName} aria-labelledby={btnName} name={btnName} >
            <slot/>
        </button>
    </div>
</header>

<style>
    .dropdown_options {
		padding: 4px;
		border-radius: 4px;
		background: transparent;
		font-size: 16px;
        color: #7d8799;
	}

	.dropdown_options:hover {
		z-index: 5;
		overflow: visible;
		white-space: normal;
		cursor: pointer;
		background: #f5f5f014;
		color: #e1e1e1;
	}

	.dropdown {
		position: relative;
		display: inline-block;
	}

	.dropdown_content {
		z-index: 4;
		display: flex;
		position: absolute;
        top: 42px;
        padding: 8px;
		background: #040b1a;
		border: 1px solid #313345;
		border-radius: 6px;
		box-shadow: 0px 8px 16px #000;
	}

    .header {
        display: flex;
        align-items: center;
        padding: 0 12px;
        height: 54px;
        background: #030711;
        border-bottom: 1px solid #313345;
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
    }

    .label{
        display: flex;
        align-items: center;
        justify-content: flex-start;
        height: 36px;
        padding: 0 4px;
        border-radius: 8px;
        color: #7d8799;
        font-size: 18px;
        font-weight: 600;
        cursor: default;
    }

    .label-wrapper{
        display: flex;
        justify-content: flex-start;
        width: 45%;
    }

    .button {
        display: flex;
        align-items: center;
        height: 36px;
        padding: 0 12px;
        background:#040b1a;
        border: 1px solid #313345;
        border-radius: 8px;
        transition: all 0.2s;
        color: #7d8799;
        &:hover {
            background: #040f1e;
            color: #e1e1e1;
        }
    }

    .button-wrapper{
        display: flex;
        justify-content: flex-start;
        width: 55%;
        @media (max-width: 768px) {
            justify-content: flex-end;
        }
    }
    
</style>
