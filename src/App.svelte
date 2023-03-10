<script lang="ts">
	import { FSM, state } from "./state";
	import Sidebar from "./lib/Sidebar.svelte";
	import Checkbox from "./lib/Checkbox.svelte";
	import { roundToNearest } from "./util";
	import { Shortcut } from "./shortcut";
	import { Path as PathObj, Point } from "./path";
	import Toolbar from "./lib/Toolbar.svelte";
	import { Shortcuts } from "./lib/shortcut";
	import Testing from "./lib/Testing.svelte";
	import Path from "./lib/Path.svelte";

	/** The directory to look for cursor svg files */
	export let cursorDir: String;

	let canvasHeight = 0;
	let canvasWidth = 0;
	let snapToGrid = true;

	let gridSize = 50;
	// Increasing denominator increases snap precision (2 = corners, 4 = corners & midpoints etc.)
	$: inc = gridSize / 4;

	let pointerX = 0;
	let pointerY = 0;
	let points = [];

	const shortcuts = [
		new Shortcut({
			default_combo: "v",
			combo: "m",
			description: "Switch to Move mode",
			callback: () => FSM.transition("move"),
		}),
		new Shortcut({
			default_combo: "p",
			description: "Switch to Draw mode",
			callback: () => FSM.transition("draw"),
		}),
		new Shortcut({
			default_combo: "ctrl+z",
			description: "Undo",
			callback: () => {
				points.pop();
				points = points;
			},
		}),
		new Shortcut({
			default_combo: "ctrl+=",
			description: "Zoom in",
			callback: (e) => {
				e.preventDefault();
				console.log("zoom in");
				gridSize += 10;
			},
		}),
		new Shortcut({
			default_combo: "ctrl+-",
			description: "Zoom out",
			callback: (e) => {
				e.preventDefault();
				console.log("zoom out");
				gridSize -= 10;
			},
		}),
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
		console.log(e);
		const active: HTMLElement = document.activeElement as HTMLElement;
		if (
			(active instanceof HTMLInputElement && active.dataset.blockShortcuts !== "false") ||
			active?.dataset?.blockShortcuts === "true"
		) {
			if (e.currentTarget === document.activeElement) {
				$state.onKeyPress(e);
			}
			return;
		}
		$state.onKeyPress(e);
		for (const shortcut of shortcuts) {
			shortcut.try(e);
		}
	}
</script>

<svelte:body on:keydown={onKeyPress} />

<Testing />
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
		viewBox="0 0 {canvasWidth} {canvasHeight}"
		fill="none"
		style:--cursor-0="url('{cursorDir}/{$state.name}.svg')"
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
		{#each points as point, i}
			<circle
				cx={point.x}
				cy={point.y}
				r={i === points.length - 1 ? 5 : 3.5}
				class="point"
				class:last={i === points.length - 1}
			/>
		{/each}
		<circle cx={pointerX} cy={pointerY} r="3.5" class="point" />
		<Path path={new PathObj("M10,10 V20 L20,30 V40 L30,50 V60 L40,70 A1,1 0 1,0 10,10")} />
	</svg>
</main>
<Sidebar>
	<Checkbox bind:checked={snapToGrid}>Snap to grid</Checkbox>
	<input type="text" inputmode="numeric" bind:value={gridSize} />
</Sidebar>
<Shortcuts />

<style lang="scss">
	svg {
		position: absolute;
		z-index: 10;
		cursor: var(--cursor-0), auto;
	}
	main {
		position: relative;
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 2 2'%3E%3Cpath d='M0 0H2V2H0z' fill='%238F8F8F'/%3E%3Cpath d='M0 0H1V2H2V1H0z' fill='%23969696'/%3E%3C/svg%3E");
		background-size: var(--grid-size);
	}
	.point {
		stroke: var(--accent-00);
		fill: white;
		&.last {
			fill: var(--accent-00);
			stroke: white;
			stroke-width: 2;
		}
	}
	.selection {
		stroke: var(--accent-00);
	}
</style>
