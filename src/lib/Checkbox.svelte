<script lang="ts">
	export let checked = false;

	const id = Math.random().toString(36).slice(2);
</script>

<input type="checkbox" {id} bind:checked />
<label for={id}>
	<slot />
</label>
