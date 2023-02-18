<script lang="ts">
	import { KeyCombo } from "../../shortcut";
	import Key from "./Key.svelte";

	export let combo: KeyCombo;
</script>

<div class="shortcut">
	{#if combo.ctrl}
		<Key key="Ctrl" />
	{/if}
	{#if combo.alt}
		<Key key="Alt" />
	{/if}
	{#if combo.shift}
		<Key key="Shift" />
	{/if}
	{#if combo.key}
		<Key key={KeyCombo.IRREGULAR_KEYS[combo.key] ?? combo.key} />
	{/if}
</div>

<style>
	.shortcut {
		display: flex;
		gap: 0.5rem;
	}
</style>
