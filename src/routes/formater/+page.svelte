<script lang="ts">
    import CompareJson from "../../utils/index";
    import InputField from "$lib/shared/InputField.svelte";

    let userInput: string | null = null;
    CompareJson.format();
</script>

<InputField id={"leftField"} bind:userValue={userInput} />
