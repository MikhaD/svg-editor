<script lang="ts">
	export let checked = false;

	const id = Math.random().toString(36).slice(2);
</script>

<span>
	<input type="checkbox" {id} bind:checked />
	<label for={id}>
		<slot />
	</label>
</span>

<style>
	span {
		display: inline-flex;
		align-items: center;
		gap: 0.25rem;
	}
</style>
