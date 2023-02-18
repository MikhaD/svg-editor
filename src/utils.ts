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

/**
 * Remove all occurrences of the given character(s) on either end of the string
 * @param str - The string to strip;
 * @param chars - The characters to strip off
 */
export function strip(str: string, chars: RegExp = /\s/) {
	return str.replace(new RegExp(`^${chars.source}+|${chars.source}+$`, "g"), "");
}

/** A class that generates unique IDs */
export abstract class UIDGenerator {
	static #id = 0;
	static next() {
		return `${Date.now().toString(36)}-${(++this.#id).toString(36)}`;
	}
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