<script lang="ts">
    import { dropDownOptions } from "~/utils/services"
    import DropDownIcon from "~/lib/icons/DropDownIcon.svelte";
    import DropDownOpenIcon from "~/lib/icons/DropDownOpenIcon.svelte";
    import { browser } from "$app/environment";
    import SearchIcon from "~/lib/icons/SearchIcon.svelte";
    import UploadIcon from "../icons/UploadIcon.svelte";
    import type { EditorView } from "@codemirror/view";
    import { openSearchPanel } from "@codemirror/search"

    export let passedFunctionClick: (userValue: string, view: EditorView) => Promise<string>
    export let btnName: string
    export let label: string
    export let value: string
    export let view: EditorView

    let showDropDown: boolean = false
    let fileInput: HTMLInputElement;

    const handleDropDownClick = () => {
		showDropDown = !showDropDown
        if(browser)document.body.addEventListener('click', handleMenuClose)
	}

	const handleMenuClose= () => {
		showDropDown = false
		if(browser)document.body.removeEventListener('click', handleMenuClose)
	}

    const functionClick= async () => {
		value = await passedFunctionClick(value, view)
	}

    const handleFileUpload = () => {
        if (fileInput) {
            fileInput.click();
        }
    };

    const handleSearchMenuClick = () => {
        openSearchPanel(view)
    };

    const handleFileChange = (event: any) => { // redo any
        if (event.target && event.target.files.length > 0) {
            value=""
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.onload = async (e: ProgressEvent<FileReader>) => {
                const droppedData = e.target?.result as string;
                console.log(droppedData)
                value = await passedFunctionClick(droppedData, view)
            };
            reader.readAsText(file)
        }
    };
    
</script>

<header class="header">
    <nav class="drop-down-wrapper">
        <div class="dropdown" class:active={showDropDown} class:hidden={!showDropDown} >
            {#each dropDownOptions as  options}
                <div on:click|stopPropagation class="dropdown_content"> 
                    <p class="content_label">
                        {options.title}
                    </p>
                    <ul>
                        {#each options.values as option}
                            <li class="dropdown_options">
                                <a href={option.path} class="option_link">
                                    {option.name}
                                </a>
                            </li>
                        {/each}
                    </ul>
                </div>
            {/each}
        </div>
        <button on:click|stopPropagation={handleDropDownClick} class="button text">
            {label}
            {#if showDropDown}
                <DropDownOpenIcon/>
            {:else}
                <DropDownIcon/>
            {/if} 
        </button>
    </nav>
    <button on:click={functionClick} class="button text" aria-label={btnName} aria-labelledby={btnName} name={btnName} >
        <slot/>
    </button>
    <div class="button-wrapper">
        <button class="icon button" title="search" aria-label="search" aria-labelledby="search"  name="search"on:click={handleSearchMenuClick} >
            <SearchIcon />
        </button>
        <button  class="icon button" title="upload" aria-label="upload" aria-labelledby="upload" name="upload" on:click={handleFileUpload}>
            <input type="file" class="file-input" bind:this={fileInput} on:change={handleFileChange} />
            <UploadIcon />
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

    .option_link{
        display: block;
        width: 100%
    }

    .active{
        opacity: 1;
    }

    .hidden{
        opacity: 0;
        height: 0px;
    }

    .file-input {
        display: none;
    }

	.dropdown_content {
		z-index: 4;
		display: flex;
        flex-direction: column;
		position: absolute;
        top: 42px;
        padding: 8px;
		background: #040b1a;
		border: 1px solid #313345;
		border-radius: 6px;
		box-shadow: 0px 8px 16px #000;
        user-select: none;
	}

    .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 12px;
        height: 54px;
        background: #030711;
        border-bottom: 1px solid #313345;
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
    }

    .drop-down-wrapper{
        display: flex;
    }

    .content_label{
        display: flex;
        align-items: center;
        justify-content: flex-start;
        height: 36px;
        padding: 0 4px;
        border-radius: 8px;
        color: #7d8799;
        font-size: 16px;
        font-weight: 600;
        cursor: default;
    }

    

    .button {
        display: flex;
        align-items: center;
        height: 36px;
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

    .text{
        padding: 0 12px;
    }

    .icon{
        padding: 0 7px;
    }

    .button-wrapper{
        display: flex;
        flex-direction: row;
        gap: 6px
    }
    
</style>
