<script lang="ts">
	export let open = false;
	export let title = "";
	let modal: HTMLDialogElement;

	$: if (open) {
		modal?.showModal();
	} else {
		modal?.close();
	}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<dialog
	on:close={() => (open = false)}
	bind:this={modal}
	class="modal"
	data-block-shortcuts="true"
	on:click|self={() => (open = false)}
>
	<svg
		class="close"
		viewBox="0 0 4 4"
		xmlns="http://www.w3.org/2000/svg"
		on:click={() => (open = false)}
	>
		<!-- <path d="M.5 .5L3.5 3.5M3.5 .5L.5 3.5" stroke-linecap="round" /> -->
		<path d="M.35 .35L3.65 3.65M3.65 .35L.35 3.65" />
	</svg>
	<!-- Content class is to make it impossible to click the modal anywhere within the modal body so I can differentiate those clicks from clicks to the backdrop -->
	<div class="content">
		{#if title}
			<h2 class="title">{title}</h2>
		{/if}
		<slot />
	</div>
</dialog>

<style lang="scss">
	dialog {
		color: inherit;
		padding: 0;

		min-width: 25rem;
		width: var(--modal-width, 50vw);
		max-width: 80rem;
		max-height: 90vh;
		border: solid var(--accent-00) 2px;
		background-color: var(--bg-00);
		&::backdrop {
			background-color: #000a;
		}
	}
	.content {
		padding: 1.5rem 4rem;
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
