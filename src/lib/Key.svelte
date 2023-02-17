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

		color: var(--text-01);
		padding-inline: 0.6em;
		/* height: var(--size); */
		min-width: var(--size);
		font-size: 0.9em;
		border: solid var(--text-00) 1px;
		text-transform: capitalize;
	}
</style>
