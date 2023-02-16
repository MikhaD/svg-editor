<script lang="ts">
	import { Shortcut } from "../utils";
	import Key from "./Key.svelte";

	export let shortcut: Shortcut | KeypressData;
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
	{#if shortcut.key}
		<Key key={Shortcut.IRREGULAR_KEYS[shortcut.key] ?? shortcut.key} />
	{/if}
</div>

<style>
	.shortcut {
		display: flex;
		gap: 0.5rem;
	}
</style>
