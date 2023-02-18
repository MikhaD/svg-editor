<script lang="ts">
	import { FSM, State } from "../state";
	import Logo from "./Logo.svelte";
	import ToolbarButton from "./ToolbarButton.svelte";
</script>

<div class="toolbar">
	<Logo />
	{#each Object.values(FSM.states) as state}
		<ToolbarButton thisState={state} />
	{/each}
</div>

<style>
	div {
		grid-column-start: 1;
		grid-column-end: 4;
		display: flex;
	}
</style>
