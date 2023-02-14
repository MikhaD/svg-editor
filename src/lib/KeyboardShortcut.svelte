<script lang="ts">
	import type { Shortcut } from "../utils";

	export let shortcut: Shortcut;
</script>

<div class="shortcut">
	{#if shortcut.ctrl}
		<span class="key">Ctrl</span>
		<span class="plus">+</span>
	{/if}
	{#if shortcut.alt}
		<span class="key">Alt</span>
		<span class="plus">+</span>
	{/if}
	{#if shortcut.shift}
		<span class="key">Shift</span>
		<span class="plus">+</span>
	{/if}
	<span class="key primary">
		{shortcut.key}
	</span>
</div>

<style>
	.shortcut {
		width: fit-content;
	}
	.plus {
		margin-inline: -0.2rem;
		font-weight: bold;
	}
	.key {
		display: inline-block;
		background-color: var(--bg-02);
		padding: 0 0.5rem;
		border-radius: 0.2rem;
		border: solid var(--border-00);
		border-width: 0.1rem 0.2rem 0.3rem 0.2rem;
		border-bottom-color: var(--bg-00);
		font-size: 0.9em;
		font-weight: bold;
	}
	.primary {
		text-transform: capitalize;
	}
</style>
