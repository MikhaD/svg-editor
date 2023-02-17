<script lang="ts">
	import type { Shortcut } from "../utils";
	import KeyCombination from "./KeyCombination.svelte";
	import Modal from "./Modal.svelte";
	import SetCombo from "./SetCombo.svelte";
	export let shortcut: Shortcut;

	let setting_shortcut = false;

	function reset() {
		shortcut.reset();
		shortcut = shortcut;
	}

	function setShortcut() {
		setting_shortcut = true;
	}
</script>

<div class="shortcut">
	<span>{shortcut.description}</span>
	{#key setting_shortcut}
		<span class="keys"><KeyCombination combo={shortcut.combo} /></span>
	{/key}
	<span class="options">
		{#key setting_shortcut}
			{#if !shortcut.default_combo.equals(shortcut.combo)}
				<button on:click={reset}>
					<svg class="reset" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
						<path d="M5 12A12 12 0 1 1 5 20M5 12l0-4l3.3 2.2z" />
					</svg>
				</button>
			{/if}
		{/key}
		<button on:click={setShortcut}>
			<svg class="edit" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
				<path
					d="M188.873 16l4.226.377c11.952 1.065 23.058 7.183 31.312 15.438s14.373 19.361 15.439 31.313l.376 4.225-147.55 147.55-82.949 31.596 31.596-82.949L188.873 16zm6.545 19.131L61.954 168.596l25.676 25.676L221.095 60.808c-1.418-5.678-4.759-11.392-9.522-16.155s-10.477-8.103-16.155-9.522zM71.298 203.617l-18.69-18.689-11.499 30.188 30.189-11.499z"
				/>
			</svg>
		</button>
	</span>
</div>

<Modal bind:open={setting_shortcut} --modal-width="40vw">
	<SetCombo {shortcut} />
</Modal>

<style lang="scss">
	svg {
		height: 2.5rem;
		cursor: pointer;
	}
	.edit {
		fill: var(--text-00);
	}
	.reset {
		stroke: var(--text-00);
		fill: none;
		stroke-width: 2.5;
	}
	.shortcut {
		display: grid;
		grid-template-columns: 6fr 2fr min-content;
		padding-block: 1rem;
		border-bottom: 1px solid var(--border-01);
		line-height: 1.3;
		&:last-child {
			border-bottom: none;
		}
	}
	.keys {
		display: flex;
		justify-content: end;
	}
	.options {
		display: flex;
		gap: 0.5rem;
		justify-content: end;
		margin-left: 1rem;
	}
</style>
