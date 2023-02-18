import { UIDGenerator, toTitleCase } from "./utils";

/** A class to represent a keyboard combination */
export class KeyCombo {
	/** A set of all valid key values. Anything not in here will be converted to "" */
	static readonly VALID_KEYS = new Set<string>([
		..."0123456789 abcdefghijklmnopqrstuvwxyz_+-=`~@#$%^&*()[]{}<>/\\|;:\"',.?!",
		"escape",
		"enter",
		"os",
		"meta",
		"tab",
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
	static readonly IRREGULAR_KEYS = {
		" ": "space",
		"meta": "cmd",
		"command": "cmd",
		"control": "ctrl",
		"os": "⊞",
		"escape": "esc",
		"delete": "del",
		"arrowup": "⇧",
		"arrowright": "⇨",
		"arrowdown": "⇩",
		"arrowleft": "⇦",
	};
	/** The key part of the keyboard shortcut (eg: in `Ctrl+Alt+Del` the key is `Del`) */
	#key: string;
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
			this.#key = KeyCombo.normalizeKey(key, true);
			this.ctrl = ctrl ?? false;
			this.shift = shift ?? false;
			this.alt = alt ?? false;
		}
	}
	get key(): string {
		return this.#key;
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
		// If the key is supposed to be + set it to that, otherwise normalize it
		this.#key = this.shift && key === "" ? "+" : KeyCombo.normalizeKey(key, true);
	}

	/**
	 * Return true if this KeyCombo is equal to another
	 * @param other The KeyCombo to compare to
	 */
	equals(other: KeyCombo): boolean {
		return this.toString() == other.toString();
	}

	/**
	 * Return true if the event matches this combo
	 * @param e The event to check
	 */
	matches(e: KeyboardEvent): boolean {
		return this.key == KeyCombo.normalizeKey(e.key) && this.ctrl == e.ctrlKey && this.shift == e.shiftKey && this.alt == e.altKey;
	}
	/** Return a copy of this KeyCombo */
	copy(): KeyCombo {
		const result = new KeyCombo(null, this.ctrl, this.shift, this.alt);
		result.#key = this.#key;
		return result;
	}

	/**
	 * Convert a key into a normalized form (eg: "Control" → "Ctrl", " " → "Space", "Meta" → "Cmd")
	 * @param key The key to normalize
	 * @param filter If `true`, only return keys that are valid (eg: "F3" or `undefined` will return "")
	 */
	static normalizeKey(key: string, filter: boolean = false): string {
		if (filter && !KeyCombo.VALID_KEYS.has(key?.toLowerCase())) return "";
		return KeyCombo.IRREGULAR_KEYS[key.toLowerCase()] ?? key.toLowerCase();
	}

	/** Return a representation of the KeyCombo as a string in the format "Ctrl+Shift+Alt+Key" */
	toString(): string {
		return `${this.ctrl ? "Ctrl+" : ""}${this.shift ? "Shift+" : ""}${this.alt ? "Alt+" : ""}${toTitleCase(this.key)}`;
	}
}

interface ShortcutData {
	/** The default key combo for this action in the format "Ctrl+Shift+Alt+key". */
	default_combo: string;
	/** A description of the action that occurs when this shortcut is triggered */
	description: string;
	/** The callback function to call when this shortcut is triggered */
	callback: (arg0: KeyboardEvent) => void;
	/** The key combo for this action in the format "Ctrl+Shift+Alt+key". Defaults to `default_combo` if not set */
	combo?: string;
}

class ShortcutMap {
	#map: Map<string, Shortcut[]>;
	constructor() {
		this.#map = new Map<string, Shortcut[]>();
	}
	/**
	 * Adds the new shortcut to the map with the combo as the key. If the combo already exists, the
	 * shortcut will be added to the list of shortcuts with that combo.
	 * @param value The shortcut to add
	 */
	set(value: Shortcut): this {
		const key = value.toString();
		if (this.#map.has(key)) {
			this.#map.get(key).push(value);
		} else {
			this.#map.set(key, [value]);
		}
		return this;
	}
	/**
	 * Remove a shortcut from the map
	 * @param value The shortcut to remove
	 */
	delete(value: Shortcut): boolean {
		const key = value.toString();
		if (this.#map.has(key)) {
			const index = this.#map.get(key).indexOf(value);
			if (index >= 0) {
				if (this.#map.get(key).length === 1) {
					this.#map.delete(key);
					return true;
				}
				this.#map.get(key).splice(index, 1);
				return true;
			}
		}
		return false;
	}
	/**
	 * Return the number of shortcuts that have the given key combo, or 0 if none
	 * @param value The key combo to check
	 */
	hasCombo(value: KeyCombo): number {
		// this works based on the assumption that a key cannot have a list containing 0 elements,
		// because that would mean that the key was never set, or it was already deleted
		const combos = this.#map.get(value.toString());
		return combos ? combos.length : 0;
	}
	/**
	 * Return true if the given shortcut is in the map
	 * @param value - The shortcut to check
	 */
	has(value: Shortcut): boolean {
		const key = value.toString();
		if (this.#map.has(key)) {
			return this.#map.get(key).includes(value);
		}
		return false;
	}
}

/** A class to represent a keyboard shortcut */
export class Shortcut {
	static readonly SHORTCUTS = new ShortcutMap();
	/** A list of all shortcuts WORKS ON THE ASSUMPTION THAT SHORTCUTS ARE NEVER DELETED */
	static readonly ALL: Shortcut[] = [];
	/** The unique ID of this shortcut */
	readonly id: string;
	/** A description of the action that occurs when this shortcut is triggered */
	description: string;
	/** The key combo for this action as a string in the format "Ctrl+Shift+Alt+key" */
	#combo: KeyCombo;
	/** The default key combo for this action as a string in the format "Ctrl+Shift+Alt+key" */
	default_combo: KeyCombo;
	/** The callback function to call when this shortcut is triggered */
	callback: (arg0: KeyboardEvent) => void;

	constructor(data: ShortcutData) {
		this.id = UIDGenerator.next();
		this.#combo = new KeyCombo(data.combo ?? data.default_combo);
		this.default_combo = new KeyCombo(data.default_combo);
		this.description = data.description;
		this.callback = data.callback;

		Shortcut.ALL.push(this);
		Shortcut.SHORTCUTS.set(this);
	}
	get combo() {
		return this.#combo;
	}
	/**
	 * Set the shortcut to a new key combination
	 * @param shortcut A KeypressData object
	 */
	set combo(combo: KeyCombo) {
		Shortcut.SHORTCUTS.delete(this);
		this.#combo = combo;
		Shortcut.SHORTCUTS.set(this);
	}
	/** Reset the shortcut to the default key combination */
	reset() {
		this.combo = this.default_combo;
	}
	/**
	 * Try to match the event to this shortcut. If it matches, call the callback and return true, else return false.
	 * @param e The event to try to match
	*/
	try(e: KeyboardEvent): boolean {
		if (this.#combo.matches(e)) {
			this.callback(e);
			return true;
		}
		return false;
	}

	toString(): string {
		return this.#combo.toString();
	}
}