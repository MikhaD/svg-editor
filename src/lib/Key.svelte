<script lang="ts">
	export let key: string;
</script>

<span class="key">{key}</span>

<style>
	.key {
		--size: 2.5rem;
		display: inline-grid;
		place-items: center;
		width: fit-content;
		border-radius: 0.2rem;
		height: fit-content;

		color: var(--text-01);
		padding: 0.1em 0.4em;
		/* height: var(--size); */
		min-width: var(--size);
		font-size: 0.9em;
		border: solid var(--text-00) 1px;
		text-transform: capitalize;
		user-select: none;
	}
</style>
