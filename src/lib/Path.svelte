<script lang="ts">
	import type { Path } from "../path";
	export let path: Path;
</script>

{#each [...path] as point}
	<path d={point.asSegment()} />
{/each}
{#each [...path] as point}
	<circle cx={point.dest.x} cy={point.dest.y} r={3.5} />
{/each}

<style lang="scss">
	path {
		stroke: white;
		stroke-width: 2;
		fill: none;
	}
	path:hover {
		stroke: var(--accent-00);
	}
	circle {
		stroke: var(--accent-00);
		fill: white;
	}
</style>
