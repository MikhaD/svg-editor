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
 * @param chars - The regular expression to match the characters to strip
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
	constructor(iterable?: Iterable<T>) {
		this.#head = null;
		this.#tail = null;
		this.#length = 0;
		if (iterable) {
			for (const item of iterable) {
				this.push(item);
			}
		}
	}
	/**
	 * Push a new value to the end of the list
	 * @param data - The value to push
	 */
	push(data: T) {
		const node = new Node(data, this.#tail);
		if (this.#tail) this.#tail.next = node;
		this.#tail = node;
		if (!this.#head) this.#head = node;
		++this.#length;
	}
	/** Remove the value at the end of the list and return it */
	pop(): T | null {
		if (!this.#tail) return null;
		const data = this.#tail.data;
		this.#tail = this.#tail.prev;
		if (this.#tail) this.#tail.next = null;
		else this.#head = null;
		--this.#length;
		return data;
	}
	/** Remove the first element of the list and return it */
	shift(): T | null {
		if (!this.#head) return null;
		const data = this.#head.data;
		this.#head = this.#head.next;
		if (this.#head) this.#head.prev = null;
		else this.#tail = null;
		--this.#length;
		return data;
	}
	/** Return the element at the end of the list */
	peak(): T | null {
		return this.#tail?.data ?? null;
	}
	/** The number of items in the linked list */
	get length() {
		return this.#length;
	}
	[Symbol.iterator]() {
		let current = this.#head;
		return {
			next: () => {
				if (current) {
					const value = current.data;
					current = current.next;
					return { value, done: false };
				} else {
					return { done: true };
				}
			},
		};
	}
}

/**
 * Asserts that a value is a number and throws an error if it isn't
 * @param num - The value to assert
 */
export function assertNumber(num: any): number {
	if (!isNaN(num) && typeof num !== "number") throw new TypeError("Invalid number");
	return num;
}

/**
 * Asserts that a value is a string and throws an error if it isn't
 * @param str - The value to assert
 */
export function assertString(str: any): string {
	if (typeof str !== "string") throw new TypeError("Invalid string");
	return str;
}