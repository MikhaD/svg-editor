<script lang="ts">
	import { FSM, type State, state } from "../state";
	export let thisState: State;
	$: active = thisState.name === $state.name;

	function setState() {
		FSM.transition(thisState.name);
	}
</script>

<button class="toolbar-button" on:mousedown={setState} class:active>
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" height="24" fill="none">
		<path fill-rule="evenodd" d={thisState.icon} />
	</svg>
</button>

<style lang="scss">
	button {
		height: 100%;
		aspect-ratio: 1;
		display: grid;
		place-items: center;
		&:not(.active):hover {
			background-color: var(--bg-alt);
		}
	}
	path {
		fill: var(--text-00);
	}
	.active {
		background-color: var(--accent-00);
	}
</style>
