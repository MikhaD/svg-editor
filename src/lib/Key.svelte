<script lang="ts">
	export let key: string;
</script>

<span class="key">{key}</span>

<style>
	.key {
		--size: 2.5rem;
		text-align: center;
		line-height: normal;
		width: fit-content;
		border-radius: 0.2rem;

		color: var(--text-01);
		padding-inline: 0.5rem;
		height: var(--size);
		min-width: var(--size);
		font-size: 0.9em;
		border: solid var(--text-00) 1px;
		text-transform: capitalize;
	}
</style>
