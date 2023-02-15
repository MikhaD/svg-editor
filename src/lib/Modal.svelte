<script lang="ts">
	import { fade, scale } from "svelte/transition";
	export let open = false;
	export let title = "";
</script>

{#if open}
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div
		transition:fade={{ duration: 200 }}
		class="background"
		on:click|self={() => (open = false)}
	>
		<!-- svelte-ignore a11y-autofocus -->
		<div transition:scale={{ duration: 300 }} class="modal" data-block-shortcuts="true">
			<svg
				class="close"
				viewBox="0 0 4 4"
				xmlns="http://www.w3.org/2000/svg"
				on:click={() => (open = false)}
			>
				<!-- <path d="M.5 .5L3.5 3.5M3.5 .5L.5 3.5" stroke-linecap="round" /> -->
				<path d="M.35 .35L3.65 3.65M3.65 .35L.35 3.65" />
			</svg>
			{#if title}
				<h2 class="title">{title}</h2>
			{/if}
			<slot />
		</div>
	</div>
{/if}

<style>
	.background {
		z-index: 99;
		position: fixed;
		inset: 0;
		background-color: #0008;
	}
	.modal {
		position: fixed;
		inset: 0;
		min-width: 25rem;
		width: 50vw;
		max-width: 80rem;
		max-height: 90vh;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		height: fit-content;
		padding: 1.5rem 4rem;
		border: solid var(--accent-00) 2px;
		background-color: var(--bg-00);
	}
	.close {
		stroke: var(--text-00);
		stroke-width: 0.75;
		width: 1.5rem;
		position: absolute;
		top: 1.5rem;
		right: 1.5rem;
		cursor: pointer;
	}
	.title {
		user-select: none;
		margin-block: 0.5rem 1.5rem;
	}
</style>
