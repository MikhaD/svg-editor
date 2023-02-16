import KeyboardShortcut from "./lib/KeyboardShortcut.svelte";

/**
 * Return true if all the characters are letters
 * @param c A string to check
 */
export function isAlpha(c: string) {
	for (const char of c) {
		if (!((char >= "a" && char <= "z") || (char >= "A" && char <= "Z"))) return false;
	}
	return true;
}

/**
 * Return true if all the characters are numbers, periods, or hyphens, and if the string is longer
 * than 1 character if the the entire string is a valid number
 * @param c A string to check
 */
export function isNumeric(c: string) {
	if (isNaN(+c) && c != "." && c != "-") return false;
	for (const char of c) {
		if ((char < "0" || char > "9") && char != "." && char != "-") return false;
	}
	return true;
}

/**
 * Return true if all the characters in the string are uppercase
 * @param c A string to check
 */
export function isUpper(c: string) {
	for (const char of c) {
		if (char >= "a" && char <= "z") return false;
	}
	return true;
}

export function toTitleCase(str: string) {
	return str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase());
}

/**
 * Round a number to the nearest multiple of another number
 * @param num - The number to round
 * @param nearest - The number to round to the nearest multiple of
 */
export function roundToNearest(num: number, nearest: number = 1) {
	return Math.round(num / nearest) * nearest;
}

/**
 * Return a random integer between min and max, [min, max)
 * @param min - The minimum value
 * @param max - The maximum value
 */
export function randInt(min: number, max: number) {
	return Math.floor(Math.random() * (max - min)) + min;
}

class Node<T> {
	data: T;
	next: Node<T> | null;
	prev: Node<T> | null;

	constructor(data: T, prev: Node<T> | null = null) {
		this.data = data;
		this.prev = prev;
		this.next = null;
	}
}

export class LinkedList<T> {
	#head: Node<T> | null;
	#tail: Node<T> | null;
	#length: number;
	constructor() {
		this.#length = 0;
	}

	push(data: T) {
		console.log("value pushed");
		const node = new Node(data, this.#tail);
		if (this.#tail) this.#tail.next = node;
		this.#tail = node;
		if (!this.#head) this.#head = node;
		++this.#length;
	}
	pop(): T | null {
		console.log("value popped");
		if (!this.#tail) return null;
		const data = this.#tail.data;
		this.#tail = this.#tail.prev;
		if (this.#tail) this.#tail.next = null;
		else this.#head = null;
		--this.#length;
		return data;
	}
	peak(): T | null {
		return this.#tail?.data ?? null;
	}
	get length() {
		return this.#length;
	}
}

interface ShortcutData {
	/** The default key combo for this action in the format "Ctrl+Shift+Alt+key". */
	default_combo: string;
	/** A description of the action that occurs when this shortcut is triggered */
	description: string;
	/** The callback function to call when this shortcut is triggered */
	callback: (arg0: KeyboardEvent) => void;
	/** Set to `false` to take capitalization into account (`true` by default) */
	caseFold?: boolean;
	/** The key combo for this action in the format "Ctrl+Shift+Alt+key". Will default to `default_combo` if not set */
	combo?: string;
}

/**
 * A class to represent a keyboard shortcut
 */
export class Shortcut {
	static readonly IRREGULAR_KEYS = {
		" ": "space",
		"Control": "ctrl",
		"OS": "windows",
		"Escape": "esc",
		"Delete": "del",
		"ArrowUp": "⇧",
		"ArrowRight": "⇨",
		"ArrowDown": "⇩",
		"ArrowLeft": "⇦",
	};
	static readonly SHORTCUTS = new Map<string, Shortcut>();
	/** The key part of the keyboard shortcut (eg: in `Ctrl+Alt+Del` the key is `Del`) */
	key: string;
	ctrl: boolean;
	shift: boolean;
	alt: boolean;
	/** Set to `false` to take capitalization into account (`true` by default) */
	caseFold: boolean;
	/** A description of the action that occurs when this shortcut is triggered */
	description: string;
	/** The key combo for this action as a string in the format "Ctrl+Shift+Alt+key" */
	combo: string;
	/** The default key combo for this action as a string in the format "Ctrl+Shift+Alt+key" */
	default_combo: string;
	/** The callback function to call when this shortcut is triggered */
	callback: (arg0: KeyboardEvent) => void;

	constructor(data: ShortcutData) {
		const parsed = Shortcut.parse(data.combo ?? data.default_combo);
		this.setShortcut(parsed);
		this.default_combo = Shortcut.toString(Shortcut.parse(data.default_combo));
		this.combo = Shortcut.toString(parsed);
		this.description = data.description;
		this.caseFold = data.caseFold ?? true;
		this.callback = data.callback;
		Shortcut.SHORTCUTS.set(this.toString(), this);
	}
	/**
	 * Convert a string in the format `"\s*ctrl\s*+\s*shift\s*+\s*alt\s*+\s*key\s*"` to a ShortcutData object
	 * @param shortcut A string in the format "Ctrl+Shift+Alt+key"
	 */
	static parse(shortcut: string): KeypressData {
		const data: KeypressData = {
			key: null,
			ctrl: false,
			shift: false,
			alt: false,
		};
		const parts = shortcut.trim().toLowerCase().split(/\s*\+\s*/);
		for (const part of parts) {
			switch (part) {
				case "ctrl":
					data.ctrl = true;
					break;
				case "shift":
					data.shift = true;
					break;
				case "alt":
					data.alt = true;
					break;
				default:
					data.key = part;
					break;
			}
		}
		if (data.shift && data.key === "") data.key = "+";
		return data;
	}
	/**
	 * Set the shortcut to a new key combination
	 * @param shortcut A KeypressData object
	 */
	setShortcut(data: KeypressData) {
		this.key = data.key;
		this.ctrl = data.ctrl;
		this.shift = data.shift;
		this.alt = data.alt;
		this.combo = Shortcut.toString(data);
	}
	/** Reset the shortcut to the default key combination */
	reset() {
		this.setShortcut(Shortcut.parse(this.default_combo));
		this.combo = this.default_combo;
	}
	/**
	 * Check if the event matches this shortcut
	 * @param e The event to check
	 * @returns True if the event matches this shortcut
	 */
	matches(e: KeyboardEvent) {
		const key = Shortcut.IRREGULAR_KEYS[e.key] ?? e.key;
		if (this.caseFold) {
			return this.key.toLowerCase() === key.toLowerCase() &&
				this.ctrl === e.ctrlKey &&
				this.shift === e.shiftKey &&
				this.alt === e.altKey;
		} else {
			return this.key === key &&
				this.ctrl === e.ctrlKey &&
				this.shift === e.shiftKey &&
				this.alt === e.altKey;
		}
	}
	/**
	 * Try to match the event to this shortcut. If it matches, call the callback.
	 * @param e The event to try to match
	*/
	try(e: KeyboardEvent) {
		if (this.matches(e)) {
			this.callback(e);
		}
	}
	/** Convert a KeypressData object into a string in the format "Ctrl+Shift+Alt+key" */
	static toString(data: KeypressData) {
		return `${data.ctrl ? "Ctrl+" : ""}${data.shift ? "Shift+" : ""}${data.alt ? "Alt+" : ""}${toTitleCase(Shortcut.IRREGULAR_KEYS[data.key] ?? data.key)}`;
	}
	toString(): string {
		return this.combo;
	}
}