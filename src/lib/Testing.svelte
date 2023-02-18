<script lang="ts">
	import Key from "./Key.svelte";
	import Modal from "./Modal.svelte";

	let modal = false;
	let key = "";

	$: if (!modal) key = "";

	function onKeydown(e: KeyboardEvent) {
		e.preventDefault();
		key = e.key;
		console.log(e);
	}
</script>

<Modal title="key testing" bind:open={modal}>
	<input type="text" on:keydown={onKeydown} />
	<div class="keys">
		{#if key != ""}
			<Key {key} />
		{/if}
	</div>
</Modal>

<button on:click={() => (modal = true)}>
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="none">
		<g fill="#5dd3e3">
			<ellipse cx="120.812" cy="54.745" rx="9.836" ry="9.846" />
			<ellipse cx="110.583" cy="172.111" rx="9.836" ry="9.846" />
			<ellipse cx="144.811" cy="35.446" rx="7.082" ry="7.089" />
			<ellipse cx="152.68" cy="185.895" rx="7.082" ry="7.089" />
			<ellipse cx="123.566" cy="89.797" rx="7.082" ry="7.089" />
			<ellipse cx="130.647" cy="136.271" rx="7.082" ry="7.089" />
			<ellipse cx="125.533" cy="5.12" rx="5.115" ry="5.12" />
			<ellipse cx="135.762" cy="167.385" rx="5.115" ry="5.12" />
			<ellipse cx="120.025" cy="197.317" rx="5.115" ry="5.12" />
			<ellipse cx="116.091" cy="152.418" rx="3.541" ry="3.545" />
			<ellipse cx="120.812" cy="119.335" rx="3.541" ry="3.545" />
			<ellipse cx="87.764" cy="194.166" rx="3.541" ry="3.545" />
			<ellipse cx="132.615" cy="109.095" rx="5.115" ry="5.12" />
			<path
				d="M183.611 213.12l-13.227-13.834c-13.377 8.271-20.065 4.726-32.655 6.696s-17.189 4.332-27.54 4.332l-33.048-1.364-12.043 15.151c-3.409 6.877 1.562 15.116 9.379 15.116h106.048c8.045 0 13.076-8.729 9.057-15.717l-5.97-10.38z"
			/>
		</g>
		<path
			fill-rule="evenodd"
			d="M155.04 72.468v56.48l52.769 91.618c9.074 15.754-2.284 35.434-20.45 35.434H67.641c-18.166 0-29.524-19.68-20.45-35.434l52.769-91.618v-56.48H88.157V60.652h78.686v11.815H155.04zm-97.624 154l54.347-94.358V72.468h31.474v59.642l54.347 94.358c4.537 7.876-1.142 17.717-10.225 17.717H67.641c-9.083 0-14.762-9.841-10.225-17.717z"
			fill="#fff"
		/>
	</svg>
</button>

<style>
	button {
		background: var(--bg-00);
		position: absolute;
		left: 2rem;
		bottom: 2rem;
		width: 5rem;
		height: 5rem;
		border-radius: 50%;
		padding: 1rem;
	}
	input {
		width: 100%;
		text-align: center;
		background-color: var(--bg-alt);
	}
	.keys {
		display: grid;
		place-items: center;
		font-size: 2em;
		height: 4rem;
	}
</style>
