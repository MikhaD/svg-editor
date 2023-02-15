<script lang="ts">
	import type { Shortcut } from "../utils";
	import Key from "./Key.svelte";

	export let shortcut: Shortcut;
</script>

<div>Press the desired key combination, then press <Key key="Enter" />.</div>
