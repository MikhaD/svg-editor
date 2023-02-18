<script lang="ts">
	import { Shortcut } from "../shortcut";
	import Modal from "./Modal.svelte";
	import ShortcutDetails from "./ShortcutDetails.svelte";

	let open = false;
</script>

<Modal title="Keyboard Shortcuts" bind:open>
	{#each Shortcut.ALL as shortcut}
		<ShortcutDetails {shortcut} />
	{/each}
</Modal>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div on:click={() => (open = true)}>
	<svg viewBox="0 0 21 21" xmlns="http://www.w3.org/2000/svg">
		<path d="M1 5h3v3h-3zm4 0h3v3h-3zm4 0h3v3h-3zm4 0h3v3h-3zm4 0h3v3h-3z" />
		<path d="M1 9h5v3h-5zm6 0h3v3h-3zm4 0h3v3h-3zm4 0h5v3h-5z" />
		<path d="M4 13h13v3h-13z" />
	</svg>
</div>

<style>
	div {
		position: absolute;
		display: grid;
		place-content: center;
		border-radius: 50%;
		padding: 1rem;
		right: 2rem;
		bottom: 2rem;
		background-color: var(--bg-00);
		cursor: pointer;
	}
	svg {
		width: 2.5rem;
		fill: var(--text-00);
	}
</style>
