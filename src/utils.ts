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

/**
 * Round a number to the nearest multiple of another number
 * @param num - The number to round
 * @param nearest - The number to round to the nearest multiple of
 */
export function roundToNearest(num: number, nearest: number = 1) {
	return Math.round(num / nearest) * nearest;
}

interface ShortcutData {
	key: string;
	ctrl: boolean;
	shift: boolean;
	alt: boolean;
}

/**
 * A class to represent a keyboard shortcut
 */
export class Shortcut {
	key: string;
	ctrl: boolean;
	shift: boolean;
	alt: boolean;
	caseFold: boolean;
	callback: (arg0: KeyboardEvent) => void;
	constructor(key: string, callback: (arg0: KeyboardEvent) => void, caseFold: boolean = true) {
		const data = Shortcut.parseShortcut(key);
		this.key = data.key;
		this.ctrl = data.ctrl;
		this.shift = data.shift;
		this.alt = data.alt;
		this.caseFold = caseFold;
		this.callback = callback;
	}
	/**
	 * Convert a string in the format "ctrl+shift+alt+key" to a ShortcutData object
	 * @param shortcut A string in the format "ctrl+shift+alt+key"
	 */
	static parseShortcut(shortcut: string): ShortcutData {
		const data: ShortcutData = {
			key: "",
			ctrl: false,
			shift: false,
			alt: false,
		};
		const parts = shortcut.split("+");
		for (const part of parts) {
			switch (part.toLowerCase()) {
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
		return data;
	}
	/**
	 * Check if the event matches this shortcut
	 * @param e The event to check
	 * @returns True if the event matches this shortcut
	 */
	matches(e: KeyboardEvent) {
		if (this.caseFold) {
			return this.key.toLowerCase() === e.key.toLowerCase() &&
				this.ctrl === e.ctrlKey &&
				this.shift === e.shiftKey &&
				this.alt === e.altKey;
		} else {
			return this.key === e.key &&
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

	toString() {
		return `${this.ctrl ? "Ctrl+" : ""}${this.shift ? "Shift+" : ""}${this.alt ? "Alt+" : ""}${this.key}`;
	}
}