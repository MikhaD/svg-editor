<script lang="ts">
	import { KeyCombo, Shortcut } from "../shortcut";
	import { strip } from "../utils";
	import Checkbox from "./Checkbox.svelte";
	import Key from "./Key.svelte";
	import KeyCombination from "./KeyCombination.svelte";

	export let shortcut: Shortcut;
	let enterElement: HTMLInputElement;
	let combo = new KeyCombo();
	let frozen = false;
	let clash = 0;
	let failedSubmit = false;
	let invalid = false;

	function onKeydown(e: KeyboardEvent) {
		if (frozen || (e.key !== "Enter" && e.key !== "Escape")) {
			e.preventDefault();
		} else {
			return;
		}
		combo = new KeyCombo(e.key, e.ctrlKey, e.shiftKey, e.altKey);
		clash = Shortcut.SHORTCUTS.hasCombo(combo) - Number(shortcut.combo.equals(combo));
	}

	function onSubmit(e: Event) {
		// todo check that shortcut is valid (add logic to shortcut parser that throws errors if invalid)
		if (invalid) {
			e.preventDefault();
			failedSubmit = true;
			return;
		}
		shortcut.combo = combo;
	}
</script>

<div class="set-shortcut">
	<div>Press the desired key combination, then press <Key key="Enter" /></div>
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div class="freeze" on:click={() => enterElement.focus()}>
		<Checkbox bind:checked={frozen}>
			Shortcut contains <Key key="Enter" /> and / or <Key key="Esc" />
		</Checkbox>
	</div>
	<form on:submit={onSubmit} method="dialog">
		<!-- svelte-ignore a11y-autofocus -->
		<input
			bind:this={enterElement}
			class:invalid
			class:failed-submit={failedSubmit}
			on:animationend={() => (failedSubmit = false)}
			on:keydown={onKeydown}
			value={strip(combo.toString(), /\+/)}
			type="text"
			autofocus
		/>
	</form>
	<div class="display">
		<KeyCombination {combo} />
	</div>
	<div class="display clash">
		{#if clash > 0}
			{clash} existing command{clash > 1 ? "s have" : " has"} this keybinding
		{/if}
	</div>
</div>

<style lang="scss">
	div {
		user-select: none;
	}
	.set-shortcut {
		text-align: center;
	}
	input {
		display: inline-block;
		text-align: center;
		width: 70%;
		margin-top: 2rem;
		text-transform: capitalize;
		background-color: var(--bg-alt);
		&.invalid {
			outline: 1px solid var(--red);
			border-color: var(--red);
		}
		&.failed-submit {
			animation: shake 0.6s;
		}
	}
	.display {
		height: 2.5rem;
		display: flex;
		justify-content: center;
		margin-top: 0;
	}
	.clash {
		text-decoration: underline;
		margin-top: 0.2rem;
		color: var(--text-02);
		margin-bottom: 1.2rem;
		&:hover {
			color: inherit;
		}
	}
	.freeze {
		position: absolute;
		left: 0.8rem;
		bottom: 0.5rem;
		// height: ;
		font-size: 0.95rem;
		color: var(--text-02);
	}
	@keyframes shake {
		10%,
		90% {
			transform: translateX(-1px);
		}

		20%,
		80% {
			transform: translateX(2px);
		}

		30%,
		50%,
		70% {
			transform: translateX(-4px);
		}

		40%,
		60% {
			transform: translateX(4px);
		}
	}
</style>
