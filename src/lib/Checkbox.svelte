<script lang="ts">
	import { UIDGenerator } from "../utils";

	export let checked = false;

	const id = UIDGenerator.next();
</script>

<span>
	<input type="checkbox" {id} bind:checked />
	<label for={id}>
		<slot />
	</label>
</span>

<style>
	input {
		margin: 0;
	}
	span {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
	}
</style>
