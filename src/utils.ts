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

/** A class to represent a keyboard combination */
export class KeyCombo {
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
	/** The key part of the keyboard shortcut (eg: in `Ctrl+Alt+Del` the key is `Del`) */
	key?: string;
	ctrl: boolean;
	shift: boolean;
	alt: boolean;
	constructor();
	constructor(key: string);
	constructor(key: string, ctrl: boolean, shift: boolean, alt: boolean);
	constructor(key?: string, ctrl?: boolean, shift?: boolean, alt?: boolean) {
		if (arguments.length === 1) {
			this.parse(key);
		} else {
			this.key = key ?? "";
			this.ctrl = ctrl ?? false;
			this.shift = shift ?? false;
			this.alt = alt ?? false;
		}
	}

	/**
	 * Parse a string in the format  `"\s*ctrl\s*+\s*shift\s*+\s*alt\s*+\s*key\s*"` and set this KeyCombo's properties to match
	 * @param str The string to parse
	 */
	parse(str: string): void {
		let key = null;
		this.alt = false;
		this.ctrl = false;
		this.shift = false;
		const parts = str.trim().toLowerCase().split(/\s*\+\s*/);
		for (const part of parts) {
			switch (part) {
				case "ctrl":
					this.ctrl = true;
					break;
				case "shift":
					this.shift = true;
					break;
				case "alt":
					this.alt = true;
					break;
				default:
					key = part;
					break;
			}
		}
		this.key = this.shift && key === "" ? "+" : key;
	}

	/**
	 * Return true if this KeyCombo is equal to another
	 * @param other The KeyCombo to compare to
	 */
	equals(other: KeyCombo): boolean {
		return this.toString() == other.toString();
	}

	/**
 * Check if the event matches this combo
 * @param e The event to check
 * @returns True if the event matches this combo
 */
	matches(e: KeyboardEvent): boolean {
		const key = KeyCombo.IRREGULAR_KEYS[e.key.toLowerCase()] ?? e.key.toLowerCase();
		return this.key == key && this.ctrl == e.ctrlKey && this.shift == e.shiftKey && this.alt == e.altKey;
	}

	/** Return a representation of the KeyCombo as a string in the format "Ctrl+Shift+Alt+key" */
	toString(): string {
		return `${this.ctrl ? "Ctrl+" : ""}${this.shift ? "Shift+" : ""}${this.alt ? "Alt+" : ""}${toTitleCase(KeyCombo.IRREGULAR_KEYS[this.key] ?? this.key)}`;
	}

	/** Return a copy of this KeyCombo */
	copy(): KeyCombo {
		return new KeyCombo(this.key, this.ctrl, this.shift, this.alt);
	}
}

interface ShortcutData {
	/** The default key combo for this action in the format "Ctrl+Shift+Alt+key". */
	default_combo: string;
	/** A description of the action that occurs when this shortcut is triggered */
	description: string;
	/** The callback function to call when this shortcut is triggered */
	callback: (arg0: KeyboardEvent) => void;
	/** The key combo for this action in the format "Ctrl+Shift+Alt+key". Will default to `default_combo` if not set */
	combo?: string;
}

/** A class to represent a keyboard shortcut */
export class Shortcut {
	static readonly SHORTCUTS = new Map<string, Shortcut>();
	/** A description of the action that occurs when this shortcut is triggered */
	description: string;
	/** The key combo for this action as a string in the format "Ctrl+Shift+Alt+key" */
	combo: KeyCombo;
	/** The default key combo for this action as a string in the format "Ctrl+Shift+Alt+key" */
	default_combo: KeyCombo;
	/** The callback function to call when this shortcut is triggered */
	callback: (arg0: KeyboardEvent) => void;

	constructor(data: ShortcutData) {
		this.combo = new KeyCombo(data.combo ?? data.default_combo);
		this.default_combo = new KeyCombo(data.default_combo);
		this.description = data.description;
		this.callback = data.callback;

		Shortcut.SHORTCUTS.set(this.toString(), this);
	}
	/**
	 * Set the shortcut to a new key combination
	 * @param shortcut A KeypressData object
	 */
	setCombo(combo: KeyCombo) {
		this.combo = combo;
	}
	/** Reset the shortcut to the default key combination */
	reset() {
		this.setCombo(this.default_combo);
	}
	/**
	 * Try to match the event to this shortcut. If it matches, call the callback and return true, else return false.
	 * @param e The event to try to match
	*/
	try(e: KeyboardEvent): boolean {
		if (this.combo.matches(e)) {
			console.log(this.combo.toString());
			this.callback(e);
			return true;
		}
		return false;
	}

	toString(): string {
		return this.combo.toString();
	}
}