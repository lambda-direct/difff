<script lang="ts">
    import { onMount, onDestroy } from "svelte";
    import { SearchQuery, setSearchQuery } from "@codemirror/search";
    import type { EditorView } from "codemirror";
    import AllIcon from "~/lib/icons/searchFieldIcons/AllIcon.svelte";
    import NextIcon from "~/lib/icons/searchFieldIcons/NextIcon.svelte";
    import CloseIcon from "~/lib/icons/searchFieldIcons/CloseIcon.svelte";
    import ReplaceIcon from "~/lib/icons/searchFieldIcons/ReplaceIcon.svelte";
    import PreciousIcon from "~/lib/icons/searchFieldIcons/PreviousIcon.svelte";
    import DropDownIcon from "~/lib/icons/searchFieldIcons/DropDownIcon.svelte";
    import WholeWordIcon from "~/lib/icons/searchFieldIcons/WholeWordIcon.svelte";
    import MatchCaseIcon from "~/lib/icons/searchFieldIcons/MatchCaseIcon.svelte";
    import ReplaceAllIcon from "~/lib/icons/searchFieldIcons/ReplaceAllIcon.svelte";
    import DropDownIconOpen from "~/lib/icons/searchFieldIcons/OpenDropDOwnIcon.svelte";
    import RegularExpreIcon from "~/lib/icons/searchFieldIcons/RegularExpreIcon.svelte";

    let performSearch: () => void;

    let searchValue: string = "";
    let replaceValue: string = "";

    let matchCaseChecked = false;
    let wholeWordChecked = false;
    let regexChecked = false;

    let showDropDown: boolean = false;

    const dropDownClick = () => {
        showDropDown = !showDropDown;
    };
</script>

<form class="form">
    <div class="field-wrap" class:open={showDropDown} class:closed={!showDropDown}>
        <button on:click={dropDownClick} class="dropdown">
            {#if showDropDown}
                <DropDownIconOpen />
            {:else}
                <DropDownIcon />
            {/if}
        </button>
        <div class="search">
            <div class="search_row">
                <div class="input_wrapper">
                    <input
                        bind:value={searchValue}
                        on:input={performSearch}
                        autocomplete="off"
                        id="searchInput"
                        placeholder="Find"
                        class="input-field"
                        type="text"
                        name="search"
                    />
                    <div class="icon-wrapper">
                        <button
                            class="icon_buttons secondary"
                            class:checked={matchCaseChecked}
                            on:click={() => (matchCaseChecked = !matchCaseChecked)}
                            ><input type="checkbox" bind:checked={matchCaseChecked} /><MatchCaseIcon
                            />
                        </button>
                        <button
                            class="icon_buttons secondary"
                            class:checked={wholeWordChecked}
                            on:click={() => (wholeWordChecked = !wholeWordChecked)}
                        >
                            <input type="checkbox" bind:checked={wholeWordChecked} />
                            <WholeWordIcon />
                        </button>
                        <button
                            class="icon_buttons secondary"
                            class:checked={regexChecked}
                            on:click={() => (regexChecked = !regexChecked)}
                        >
                            <input type="checkbox" bind:checked={regexChecked} />
                            <RegularExpreIcon />
                        </button>
                    </div>
                </div>
                <button class="icon_buttons main">
                    <PreciousIcon />
                </button>
                <button class="icon_buttons main"> <NextIcon /> </button>
                <button class="icon_buttons main">
                    <AllIcon />
                </button>
                <button class="icon_buttons main"> <CloseIcon /> </button>
            </div>
            {#if showDropDown}
                <div class="search_row">
                    <div class="input_wrapper">
                        <input
                            bind:value={replaceValue}
                            autocomplete="off"
                            placeholder="Replace"
                            id="replaceInput"
                            class="input-field"
                            type="text"
                            name="replace"
                        />
                    </div>
                    <button disabled={replaceValue.length < 1} class="icon_buttons main">
                        <ReplaceIcon />
                    </button>
                    <button disabled={replaceValue.length < 1} class="icon_buttons main">
                        <ReplaceAllIcon />
                    </button>
                </div>
            {/if}
        </div>
    </div>
</form>

<style lang="scss">
    button {
        display: flex;
        align-items: center;
        background: transparent;
        border: none;
        color: #b1b1b1;
        &:hover {
            background: #535353;
        }
        &:disabled {
            &:hover {
                background: transparent;
            }
            cursor: default;
        }
        input[type="checkbox"] {
            display: none;
        }
    }

    .form {
        position: absolute;
        z-index: 100;
    }

    .field-wrap {
        display: inline-flex;
        align-items: center;
        padding: 0 6px;
        border: 1px solid #2c2c2c;
        border-radius: 4px;
        background: #252526;
        color: #b1b1b1;
    }

    .input_wrapper {
        display: inline-flex;
        align-items: center;
        position: relative;
    }

    .open {
        height: 76px;
    }

    .closed {
        height: 36px;
    }

    .icon-wrapper {
        position: absolute;
        right: 2px;
        display: inline-flex;
        align-items: center;
    }

    .input-field {
        height: 26px;
        padding: 0 72px 0 4px;
        background: #3c3c3c;
        outline: none;
        border: 1px solid transparent;
        border-radius: 2px;
        font-size: 14px;
        color: #b1b1b1;
        &:focus {
            border: 1px solid #007fd4;
        }
    }

    .search {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 4px;
    }

    .search_row {
        display: inline-flex;
    }

    .icon_buttons {
        margin: 0 2px;
        padding: 0 1px;
        border-radius: 4px;
    }

    .main {
        height: 24px;
    }

    .secondary {
        height: 22px;
        border: 1px solid transparent;
    }

    .checked {
        background: #007fd48a !important;
        border: 1px solid #007fd4 !important;
    }

    .dropdown {
        height: 100%;
        margin: 0 1px 0 0;
        padding: 0;
        &:hover {
            background: #3d3d3f;
        }
    }
</style>
