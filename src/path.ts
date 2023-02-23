import { LinkedList, assertNumber, assertString } from "./util";

/** An error that occurs when parsing an SVG path */
export class SVGPathError extends Error {
	constructor(message: string) {
		super(message);
	}
}

/** A class to represent a coordinate in an SVG path */
export class Point {
	/** (0, 0) */
	static readonly ORIGIN = new Point(0, 0);
	readonly #x: number;
	readonly #y: number;
	#control: boolean;
	selected: boolean;
	/**
	 * @param control - Whether this point is a control point or not
	 */
	constructor(x: number, y: number, control: boolean = false) {
		if (isNaN(x) || isNaN(y)) throw new SVGPathError("Invalid coordinate");
		this.#x = x;
		this.#y = y;
		this.#control = control;
		this.selected = false;
	}
	get x() { return this.#x; }
	get y() { return this.#y; }
	get control() { return this.#control; }
	/**
	 * Create a new point that is relative to this point
	 * @param coords - The coordinates to offset by
	 */
	relativeTo(other: Point) {
		return new Point(this.x - other.x, this.y - other.y);
	}
	/**
	 * Return the string representation of this point
	 * @param compact - Whether to use compact form if possible
	 */
	toString(compact?: boolean) {
		return `${this.#x}${compact && this.#y < 0 ? "" : ","}${this.#y}`;
	}
}

abstract class PathSegment {
	#next: PathSegment | null;
	#prev: PathSegment | null;
	dest: Point;
	relative: boolean;
	constructor(parent: PathSegment, dest: Point, relative: boolean) {
		this.#prev = parent;
		this.#next = null;
		if (parent) parent.#next = this;
		this.dest = dest;
		this.relative = relative;
	}
	abstract asRelative(): string;
	abstract asAbsolute(): string;

	toString() {
		return this.relative ? this.asRelative() : this.asAbsolute();
	}
	/**
	 * Add a segment starting from this segment's destination, essentially inserting it into the path
	 * @param child - The segment to add
	 */
	addChild(child: PathSegment) {
		if (this.#next) {
			this.#next.#prev = child;
			child.#next = this.#next;
		}
		this.#next = child;
		child.#prev = this;
	}
	asSegment() {
		return `M${this.prev?.dest ?? Point.ORIGIN}${this.asAbsolute()}`;
	}
	static getAbsolutePoint(start: Point, x: number, y: number, relative: boolean, control: boolean = false) {
		if (relative) return new Point(start.x + x, start.y + y, control);
		return new Point(x, y, control);
	}

	get prev() { return this.#prev; }
	get next() { return this.#next; }
}

class M extends PathSegment {
	constructor(parent: PathSegment, dest: Point, relative?: boolean) {
		super(parent, dest, relative);
	}
	asRelative() {
		return `m${this.dest.relativeTo(this.prev?.dest ?? Point.ORIGIN)}`;
	}
	asAbsolute() {
		return `M${this.dest}`;
	}
	static from(path: LinkedList<string>, parent?: PathSegment, relative?: boolean): M {
		return new M(
			parent,
			PathSegment.getAbsolutePoint(parent?.dest ?? Point.ORIGIN, +path.pop(), +path.pop(), relative),
			relative,
		);
	}
}

class H extends PathSegment {
	constructor(parent: PathSegment, dest: Point, relative?: boolean) {
		if (parent.dest.y !== dest.y) throw new SVGPathError(`Invalid point ${dest}}`);
		super(parent, dest, relative);
	}
	asRelative(): string {
		return `h${this.dest.relativeTo(this.prev.dest).x}`;
	}
	asAbsolute(): string {
		return `H${this.dest.x}`;
	}
	static from(path: LinkedList<string>, parent: PathSegment, relative?: boolean): H {
		return new H(
			parent,
			PathSegment.getAbsolutePoint(parent.dest, +path.pop(), relative ? 0 : parent.dest.y, relative),
			relative,
		);
	}
}

class V extends PathSegment {
	constructor(parent: PathSegment, dest: Point, relative?: boolean) {
		if (parent.dest.x !== dest.x) throw new SVGPathError(`Invalid V: (${parent.dest}) → (${dest})`);
		super(parent, dest, relative);
	}
	asRelative(): string {
		return `v${this.dest.relativeTo(this.prev.dest).y}`;
	}
	asAbsolute(): string {
		return `V${this.dest.y}`;
	}
	static from(path: LinkedList<string>, parent: PathSegment, relative?: boolean): V {
		return new V(
			parent,
			PathSegment.getAbsolutePoint(parent.dest, relative ? 0 : parent.dest.x, +path.pop(), relative),
			relative,
		);
	}
}

class L extends PathSegment {
	constructor(parent: PathSegment, dest: Point, relative?: boolean) {
		super(parent, dest, relative);
	}
	asRelative(): string {
		return `l${this.dest.relativeTo(this.prev.dest)}`;
	}
	asAbsolute(): string {
		return `L${this.dest}`;
	}
	static from(path: LinkedList<string>, parent: PathSegment, relative?: boolean): L {
		return new L(
			parent,
			PathSegment.getAbsolutePoint(parent.dest, +path.pop(), +path.pop(), relative),
			relative,
		);
	}
}

class Q extends PathSegment {
	ctrl: Point;
	constructor(parent: PathSegment, control: Point, dest: Point, relative?: boolean) {
		if (!control.control) throw new SVGPathError("Invalid control point");
		super(parent, dest, relative);
		this.ctrl = control;
	}
	asRelative(): string {
		return `q${this.ctrl.relativeTo(this.prev.dest)} ${this.dest.relativeTo(this.prev.dest)}`;
	}
	asAbsolute(): string {
		return `Q${this.ctrl} ${this.dest}`;
	}
	static from(path: LinkedList<string>, parent: PathSegment, relative?: boolean): Q {
		return new Q(
			parent,
			PathSegment.getAbsolutePoint(parent.dest, +path.pop(), +path.pop(), relative, true),
			PathSegment.getAbsolutePoint(parent.dest, +path.pop(), +path.pop(), relative),
			relative,
		);
	}
}

class T extends PathSegment {
	constructor(parent: PathSegment, dest: Point, relative?: boolean) {
		super(parent, dest, relative);
	}
	asRelative(): string {
		return `t${this.dest.relativeTo(this.prev.dest)}`;
	}
	asAbsolute(): string {
		return `T${this.dest}`;
	}
	static from(path: LinkedList<string>, parent: PathSegment, relative?: boolean): T {
		return new T(
			parent,
			PathSegment.getAbsolutePoint(parent.dest, +path.pop(), +path.pop(), relative),
			relative,
		);
	}
}

class C extends PathSegment {
	ctrl1: Point;
	ctrl2: Point;
	constructor(parent: PathSegment, control1: Point, control2: Point, dest: Point, relative?: boolean) {
		if (!control1.control || !control2.control) throw new SVGPathError("Invalid control points");
		super(parent, dest, relative);
		this.ctrl1 = control1;
		this.ctrl2 = control2;
	}
	asRelative(): string {
		return `c${this.ctrl1.relativeTo(this.prev.dest)} ${this.ctrl2.relativeTo(this.prev.dest)} ${this.dest.relativeTo(this.prev.dest)}`;
	}
	asAbsolute(): string {
		return `C${this.ctrl1} ${this.ctrl2} ${this.dest}`;
	}
	static from(path: LinkedList<string>, parent: PathSegment, relative?: boolean): C {
		return new C(
			parent,
			PathSegment.getAbsolutePoint(parent.dest, +path.pop(), +path.pop(), relative, true),
			PathSegment.getAbsolutePoint(parent.dest, +path.pop(), +path.pop(), relative, true),
			PathSegment.getAbsolutePoint(parent.dest, +path.pop(), +path.pop(), relative),
			relative,
		);
	}
}

class S extends PathSegment {
	ctrl: Point;
	constructor(parent: PathSegment, control: Point, dest: Point, relative?: boolean) {
		if (!control.control) throw new SVGPathError("Invalid control point");
		super(parent, dest, relative);
		this.ctrl = control;
	}
	asRelative(): string {
		return `s${this.ctrl.relativeTo(this.prev.dest)} ${this.dest.relativeTo(this.prev.dest)}`;
	}
	asAbsolute(): string {
		return `S${this.ctrl} ${this.dest}`;
	}
	static from(path: LinkedList<string>, parent: PathSegment, relative?: boolean): S {
		return new S(
			parent,
			PathSegment.getAbsolutePoint(parent.dest, +path.pop(), +path.pop(), relative, true),
			PathSegment.getAbsolutePoint(parent.dest, +path.pop(), +path.pop(), relative),
			relative,
		);
	}
}

class A extends PathSegment {
	rx: number;
	ry: number;
	rotation: number;
	large: boolean;
	sweep: boolean;
	constructor(parent: PathSegment, dest: Point, rx: number, ry: number, rotation: number, large: boolean, sweep: boolean, relative?: boolean) {
		if (isNaN(rx) || isNaN(ry) || isNaN(rotation)) throw new SVGPathError("Invalid arc parameters");
		super(parent, dest, relative);
		this.rx = Math.abs(rx);
		this.ry = Math.abs(ry);
		this.rotation = rotation;
		this.large = large;
		this.sweep = sweep;
	}
	asRelative(): string {
		return `a${this.rx},${this.ry} ${this.rotation} ${+this.large},${+this.sweep} ${this.dest.relativeTo(this.prev.dest)}`;
	}
	asAbsolute(): string {
		return `A${this.rx},${this.ry} ${this.rotation} ${+this.large},${+this.sweep} ${this.dest}`;
	}
	static from(path: LinkedList<string>, parent: PathSegment, relative?: boolean): A {
		const rx = assertNumber(+path.pop());
		const ry = assertNumber(+path.pop());
		const rotation = assertNumber(+path.pop());
		let large: number;
		let sweep: number;
		let x: number;
		// Accounting for the fact that arc flags must be 1 or 0 and don't need to be separated from following parameters
		let next = assertString(path.pop());
		if (next.length > 1) {
			large = +next[0];
			sweep = +next[1];
			if (next.length > 2) {
				x = +next.slice(2);
			} else {
				x = +path.pop();
			}
		} else {
			large = +next;
			next = assertString(path.pop());
			sweep = +next[0];
			if (next.length > 1) {
				x = +next.slice(1);
			} else {
				x = +path.pop();
			}
		}
		if (large !== 0 && large !== 1) throw new SVGPathError("Invalid arc large flag");
		if (sweep !== 0 && sweep !== 1) throw new SVGPathError("Invalid arc sweep flag");
		let y = +path.pop();
		return new A(
			parent,
			PathSegment.getAbsolutePoint(parent.dest, x, y, relative),
			rx, ry, rotation,
			Boolean(large), Boolean(sweep),
			relative,
		);
	}
}

class Z extends PathSegment {
	constructor(parent: PathSegment, end: M, relative?: boolean) {
		super(parent, end.dest, relative);
	}
	asRelative(): string {
		return "z";
	}
	asAbsolute(): string {
		return "Z";
	}
}

export class Path {
	#head: M;
	#tail: PathSegment;
	#lastM: M;
	constructor(draw?: string) {
		if (draw) this.#parse(draw);
	}
	#parse(draw: string) {
		// This regular expression matches svg path commands and numbers
		const path = new LinkedList(draw.match(/[a-z]|-?\d*\.?\d+/gi).reverse());
		let command: string;
		if (path.length > 0) {
			command = path.pop();
			if (command.toLowerCase() !== "m") throw new SVGPathError("Missing initial moveto");
			this.#head = M.from(path, null, command.toLowerCase() === command);
			this.#lastM = this.#head;
			this.#tail = this.#head;
		}
		while (path.length > 0) {
			if (isNaN(+path.peek())) {
				command = path.pop();
			}
			const relative = command.toLowerCase() === command;
			switch (command.toLowerCase()) {
				case "m":
					this.#tail = M.from(path, this.#tail, relative);
					this.#lastM = this.#tail as M;
					break;
				case "h":
					this.#tail = H.from(path, this.#tail, relative);
					break;
				case "v":
					this.#tail = V.from(path, this.#tail, relative);
					break;
				case "l":
					this.#tail = L.from(path, this.#tail, relative);
					break;
				case "q":
					this.#tail = Q.from(path, this.#tail, relative);
					break;
				case "t":
					this.#tail = T.from(path, this.#tail, relative);
					break;
				case "c":
					this.#tail = C.from(path, this.#tail, relative);
					break;
				case "s":
					this.#tail = S.from(path, this.#tail, relative);
					break;
				case "a":
					this.#tail = A.from(path, this.#tail, relative);
					break;
				case "z":
					this.#tail = new Z(this.#tail, this.#lastM, relative);
					break;
				default:
					throw new SVGPathError(`Invalid path command: ${command}`);
			}
		}
	}

	[Symbol.iterator]() {
		let current: PathSegment = this.#head;
		return {
			next: () => {
				if (current) {
					const value = current;
					current = current.next;
					return { value, done: false };
				} else {
					return { done: true };
				}
			},
		};
	}
	relative(delimiter: string = " ") {
		const result = [];
		for (const segment of this) {
			result.push(segment.asRelative());
		}
		return result.join(delimiter);
	}
	absolute(delimiter: string = " ") {
		const result = [];
		for (const segment of this) {
			result.push(segment.asAbsolute());
		}
		return result.join(delimiter);
	}
	toString(delimiter: string = " ") {
		return [...this].join(delimiter);
	}
	get length() {
		let total = 0;
		for (const segment of this) {
			++total;
		}
		return total;
	}
}