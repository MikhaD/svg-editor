<script lang="ts" context="module">
	const VALID_KEYS = new Set<string>([
		..."`1234567890-=~!@#$%^&*()_+qwertyuiop[]\\{}|asdfghjkl;':\"zxcvbnm,./<>? ",
		"arrowup",
		"arrowright",
		"arrowdown",
		"arrowleft",
		"backspace",
		"delete",
		"end",
		"home",
		"pageup",
		"pagedown",
	]);
</script>

<script lang="ts">
	import { Shortcut } from "../utils";
	import Checkbox from "./Checkbox.svelte";
	import Key from "./Key.svelte";
	import KeyboardShortcut from "./KeyboardShortcut.svelte";

	export let shortcut: Shortcut;
	const combo: KeypressData = {
		ctrl: false,
		shift: false,
		alt: false,
		key: "",
	};

	function onKeydown(e: KeyboardEvent) {
		if (e.key !== "Enter" && e.key !== "Escape") {
			e.preventDefault();
		} else {
			return;
		}
		combo.ctrl = e.ctrlKey;
		combo.shift = e.shiftKey;
		combo.alt = e.altKey;
		combo.key = VALID_KEYS.has(e.key.toLowerCase()) ? e.key : "";
		// todo check that shortcut is not already in use
	}

	function onSubmit(e: Event) {
		// todo check that shortcut is valid (add logic to shortcut parser that throws errors if invalid)
		console.log(combo);
		shortcut.setShortcut(combo);
		combo.key = "";
		combo.ctrl = false;
		combo.shift = false;
		combo.alt = false;
	}
</script>

<div class="set-shortcut">
	<div>Press the desired key combination, then press <Key key="Enter" /></div>
	<div class="freeze">
		<Checkbox>Shortcuts contains <Key key="Enter" /> and / or <Key key="Esc" /></Checkbox>
	</div>
	<form on:submit={onSubmit} method="dialog">
		<!-- svelte-ignore a11y-autofocus -->
		<input type="text" value={Shortcut.toString(combo)} on:keydown={onKeydown} autofocus />
	</form>
	<div class="display">
		<KeyboardShortcut shortcut={combo} />
	</div>
</div>

<style>
	.set-shortcut {
		text-align: center;
	}
	input {
		display: inline-block;
		text-align: center;
		width: 60%;
		margin-top: 2rem;
		text-transform: capitalize;
	}
	.display {
		height: 2.5rem;
		display: flex;
		justify-content: center;
		margin-bottom: 2rem;
	}
	.freeze {
		position: absolute;
		left: 0.5rem;
		bottom: 0;
		font-size: 0.9rem;
		color: var(--text-02);
	}
</style>
