<script lang="ts">
	import { FSM, state } from "./states";
	import Sidebar from "./lib/Sidebar.svelte";
	import Checkbox from "./lib/Checkbox.svelte";
	import { Point, roundToNearest, Shortcut } from "./utils";
	import Toolbar from "./lib/Toolbar.svelte";

	let canvasHeight = 0;
	let canvasWidth = 0;
	let snapToGrid = true;

	let gridSize = 50;
	// Increasing denominator increases snap precision (2 = corners, 4 = corners & midpoints etc.)
	let inc = gridSize / 2;

	let pointerX = 0;
	let pointerY = 0;
	let points = [];
	const shortcuts = [
		new Shortcut("v", () => FSM.transition("move")),
		new Shortcut("p", () => FSM.transition("draw")),
	];

	function onMouseMove(e: MouseEvent & { currentTarget: EventTarget & HTMLElement }) {
		$state.onMouseMove(e);
		const { clientX: x, clientY: y } = e;
		const { left, top } = e.currentTarget.getBoundingClientRect();
		if (snapToGrid) {
			pointerX = roundToNearest(x, inc) - left;
			pointerY = roundToNearest(y, inc) - top;
		} else {
			pointerX = x - left;
			pointerY = y - top;
		}
	}

	let mousedown = false;
	function onMouseDown(e: MouseEvent & { currentTarget: EventTarget & SVGSVGElement }) {
		$state.onMouseDown(e);
		points.push(new Point(pointerX, pointerY));
		points = points;
		mousedown = true;
	}

	function onMouseUp(e: MouseEvent & { currentTarget: EventTarget & SVGSVGElement }) {
		$state.onMouseUp(e);
		mousedown = false;
	}

	function onKeyPress(e: KeyboardEvent) {
		$state.onKeyPress(e);
		for (const shortcut of shortcuts) {
			shortcut.try(e);
		}
		if (e.key.toLowerCase() === "z" && e.ctrlKey) {
			points.pop();
			points = points;
		}
	}
</script>

<svelte:body on:keydown={onKeyPress} />
<div id="debug">
	<div>X: {pointerX}</div>
	<div>Y: {pointerY}</div>
</div>

<Toolbar />
<Sidebar />
<main
	bind:clientWidth={canvasWidth}
	bind:clientHeight={canvasHeight}
	on:mousemove={onMouseMove}
	style:--grid-size="{gridSize}px"
>
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 {canvasWidth} {canvasHeight}"
		fill="none"
		style:--cursor-0="url('cursor/svg/{$state.name}.svg')"
		style:--cursor-1="url('cursor/png/{$state.name}.png')"
		on:mousedown={onMouseDown}
		on:mouseup={onMouseUp}
	>
		{#if mousedown}
			{@const lastPoint = points.at(-1)}
			<path
				d="M{lastPoint.x} {lastPoint.y}H{pointerX}V{pointerY}H{lastPoint.x}z"
				class="selection"
				fill="#0D99FF20"
				stroke-width="1"
			/>
		{/if}
		{#each points as point}
			<circle cx={point.x} cy={point.y} r="5" class="point" stroke="white" stroke-width="2" />
		{/each}
		<circle cx={pointerX} cy={pointerY} r="3" fill="white" class="preview" />
	</svg>
</main>
<Sidebar>
	<Checkbox bind:checked={snapToGrid}>Snap to grid</Checkbox>
</Sidebar>

<style>
	#debug {
		position: absolute;
		z-index: 100;
		right: 0;
		bottom: 0;
		width: 10rem;
		background-color: var(--bg-00);
		padding: 1rem;
	}
	svg {
		position: absolute;
		z-index: 100;
		cursor: var(--cursor-0), var(--cursor-1), auto;
	}
	main {
		position: relative;
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 2 2'%3E%3Cpath d='M0 0H2V2H0z' fill='%238F8F8F'/%3E%3Cpath d='M0 0H1V2H2V1H0z' fill='%23969696'/%3E%3C/svg%3E");
		background-size: var(--grid-size);
	}
	.point {
		fill: var(--accent-00);
	}
	.preview {
		stroke: var(--accent-00);
	}
	.selection {
		stroke: var(--accent-00);
	}
</style>
