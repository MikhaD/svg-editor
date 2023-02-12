export class Point {
	x: number;
	y: number;
	selected: boolean;
	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
		this.selected = false;
	}
	toString() {
		return `${this.x},${this.y}`;
	}
}

export class SimpleShape {
	points: Point[];
	relative: boolean;
	constructor() {
		this.points = [];
		this.relative = false;
	}
	addPoint(x: number, y: number) {
		this.points.push(new Point(x, y));
	}
	toString() {
		if (this.points.length == 0) return "";
		return `M${this.points.join("L")}z`;
	}
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

/**
 * Round a number to the nearest multiple of another number
 * @param num - The number to round
 * @param nearest - The number to round to the nearest multiple of
 */
export function roundToNearest(num: number, nearest: number) {
	return Math.round(num / nearest) * nearest;
}