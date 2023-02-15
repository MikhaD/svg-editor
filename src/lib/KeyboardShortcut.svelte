<script lang="ts">
	import type { Shortcut } from "../utils";
	import Key from "./Key.svelte";

	export let shortcut: Shortcut;
</script>

<div class="shortcut">
	{#if shortcut.ctrl}
		<Key key="Ctrl" />
	{/if}
	{#if shortcut.alt}
		<Key key="Alt" />
	{/if}
	{#if shortcut.shift}
		<Key key="Shift" />
	{/if}
	<Key key={shortcut.key} />
</div>

<style>
	.shortcut {
		display: flex;
		gap: 0.5rem;
	}
</style>
