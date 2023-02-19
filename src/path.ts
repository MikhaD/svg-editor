import { LinkedList, assertNumber, assertString } from "./util";

/** An error that occurs when parsing an SVG path */
export class SVGPathError extends Error {
	constructor(message: string) {
		super(message);
	}
}

/** A class to represent an immutable point in 2D space */
export class Point {
	static readonly ORIGIN = new Point(0, 0);
	#x: number;
	#y: number;
	#control: boolean;
	selected: boolean;
	/**
	 * @param x - The x coordinate
	 * @param y - The y coordinate
	 * @param control - Whether this point is a control point or not
	 */
	constructor(x: number, y: number, control: boolean = false) {
		if (isNaN(x) || isNaN(y)) throw new SVGPathError("Invalid point");
		this.#x = x;
		this.#y = y;
		this.#control = control;
		this.selected = false;
	}
	get x() { return this.#x; }
	get y() { return this.#y; }
	get control() { return this.#control; }
	/**
	 * Return a new point that represent this point relative to another point instead of the origin
	 * @param other - The point to make this point relative to (the new origin)
	 */
	relativeTo(other: Point) {
		return new Point(this.x - other.x, this.y - other.y);
	}
	compact() {
		return `${this.x}${this.y < 0 ? "" : ","}${this.y}`;
	}
	toString() {
		return `${this.x},${this.y}`;
	}
}

abstract class PathSegment {
	dest: Point;
	relative: boolean;
	constructor(dest: Point, relative: boolean) {
		this.dest = dest;
		this.relative = relative;
	}
	formatOutput(output: string) {
		return this.relative ? output.toLowerCase() : output.toUpperCase();
	}
	abstract relativeTo(other: PathSegment): PathSegment;
	abstract toString(): string;
}

class M extends PathSegment {
	constructor(dest: Point, relative?: boolean) {
		super(dest, relative);
	}
	relativeTo(other: PathSegment) {
		return new M(this.dest.relativeTo(other.dest), true);
	}
	toString() {
		return super.formatOutput(`M${this.dest}`);
	}
	static from(path: LinkedList<string>, relative?: boolean): M {
		return new M(
			new Point(+path.pop(), +path.pop()),
			relative,
		);
	}
}

class H extends PathSegment {
	constructor(dest: Point, relative?: boolean) {
		if (dest.y !== 0) throw new SVGPathError("Invalid point");
		super(dest, relative);
	}
	relativeTo(other: PathSegment) {
		return new H(this.dest.relativeTo(other.dest), true);
	}
	valid(): boolean {
		return this.dest.y === 0;
	}
	toString() {
		return super.formatOutput(`H${this.dest.x}`);
	}
	static from(path: LinkedList<string>, relative?: boolean): H {
		return new H(
			new Point(+path.pop(), 0),
			relative,
		);
	}
}

class V extends PathSegment {
	constructor(dest: Point, relative?: boolean) {
		if (dest.x !== 0) throw new SVGPathError("Invalid point");
		super(dest, relative);
	}
	relativeTo(other: PathSegment) {
		return new V(this.dest.relativeTo(other.dest), true);
	}
	toString() {
		return super.formatOutput(`V${this.dest.y}`);
	}
	static from(path: LinkedList<string>, relative?: boolean): V {
		return new V(
			new Point(0, +path.pop()),
			relative,
		);
	}
}

class L extends PathSegment {
	constructor(dest: Point, relative?: boolean) {
		super(dest, relative);
	}
	relativeTo(other: PathSegment) {
		return new L(this.dest.relativeTo(other.dest), true);
	}
	toString() {
		return super.formatOutput(`L${this.dest}`);
	}
	static from(path: LinkedList<string>, relative?: boolean): L {
		return new L(
			new Point(+path.pop(), +path.pop()),
			relative,
		);
	}
}

class Q extends PathSegment {
	ctrl: Point;
	constructor(control: Point, dest: Point, relative?: boolean) {
		if (!control.control) throw new SVGPathError("Invalid control point");
		super(dest, relative);
		this.ctrl = control;
	}
	relativeTo(other: PathSegment) {
		return new Q(this.dest.relativeTo(other.dest), this.ctrl.relativeTo(other.dest), true);
	}
	toString() {
		return super.formatOutput(`Q${this.ctrl} ${this.dest}`);
	}
	static from(path: LinkedList<string>, relative?: boolean): Q {
		return new Q(
			new Point(+path.pop(), +path.pop(), true),
			new Point(+path.pop(), +path.pop()),
			relative,
		);
	}
}

class T extends PathSegment {
	constructor(dest: Point, relative?: boolean) {
		super(dest, relative);
	}
	relativeTo(other: PathSegment) {
		return new T(this.dest.relativeTo(other.dest), true);
	}
	toString() {
		return super.formatOutput(`T${this.dest}`);
	}
	static from(path: LinkedList<string>, relative?: boolean): T {
		return new T(
			new Point(+path.pop(), +path.pop()),
			relative,
		);
	}
}

class C extends PathSegment {
	ctrl1: Point;
	ctrl2: Point;
	constructor(control1: Point, control2: Point, dest: Point, relative?: boolean) {
		if (!control1.control || !control2.control) throw new SVGPathError("Invalid control points");
		super(dest, relative);
		this.ctrl1 = control1;
		this.ctrl2 = control2;
	}
	relativeTo(other: PathSegment) {
		return new C(this.dest.relativeTo(other.dest), this.ctrl1.relativeTo(other.dest), this.ctrl2.relativeTo(other.dest), true);
	}
	toString() {
		return super.formatOutput(`C${this.ctrl1} ${this.ctrl2} ${this.dest}`);
	}
	static from(path: LinkedList<string>, relative?: boolean): C {
		return new C(
			new Point(+path.pop(), +path.pop(), true),
			new Point(+path.pop(), +path.pop(), true),
			new Point(+path.pop(), +path.pop()),
			relative,
		);
	}
}

class S extends PathSegment {
	ctrl: Point;
	constructor(control: Point, dest: Point, relative?: boolean) {
		if (!control.control) throw new SVGPathError("Invalid control point");
		super(dest, relative);
		this.ctrl = control;
	}
	relativeTo(other: PathSegment) {
		return new S(this.dest.relativeTo(other.dest), this.ctrl.relativeTo(other.dest), true);
	}
	toString() {
		return super.formatOutput(`S${this.ctrl} ${this.dest}`);
	}
	static from(path: LinkedList<string>, relative?: boolean): S {
		return new S(
			new Point(+path.pop(), +path.pop(), true),
			new Point(+path.pop(), +path.pop()),
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
	constructor(dest: Point, rx: number, ry: number, rotation: number, large: boolean, sweep: boolean, relative?: boolean) {
		if (isNaN(rx) || isNaN(ry) || isNaN(rotation)) throw new SVGPathError("Invalid arc parameters");
		super(dest, relative);
		this.rx = Math.abs(rx);
		this.ry = Math.abs(ry);
		this.rotation = rotation;
		this.large = large;
		this.sweep = sweep;
	}
	relativeTo(other: PathSegment) {
		return new A(this.dest.relativeTo(other.dest), this.rx, this.ry, this.rotation, this.large, this.sweep, true);
	}
	toString() {
		return super.formatOutput(`A${this.rx},${this.ry} ${this.rotation} ${+this.large},${+this.sweep} ${this.dest}`);
	}
	static from(path: LinkedList<string>, relative?: boolean): A {
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
			new Point(x, y),
			rx, ry, rotation,
			Boolean(large), Boolean(sweep),
			relative,
		);
	}
}

class Z extends PathSegment {
	constructor(start: M, relative?: boolean) {
		super(start.dest, relative);
	}
	relativeTo(other: PathSegment) {
		return this;
	}
	toString() {
		return super.formatOutput("z");
	}
}

export class Path {
	// points: Map<string, Point>;
	segments: PathSegment[];
	#lastM: M;
	constructor(draw: string) {
		// this.points = new Map<string, Point>();
		this.segments = [];
		this.#parse(draw);
	}
	#parse(draw: string) {
		// This regular expression matches svg path commands and numbers
		const path = new LinkedList(draw.match(/[a-z]|-?\d*\.?\d+/gi).reverse());
		if (path.length > 0 && path.peak().toLowerCase() !== "m") throw new SVGPathError("Missing initial moveto");
		let lastM: M;
		let command: string;
		while (path.length > 0) {
			if (isNaN(+path.peak())) {
				command = path.pop();
			}
			const relative = command.toLowerCase() === command;
			switch (command.toLowerCase()) {
				case "m":
					this.segments.push(M.from(path, relative));
					this.#lastM = this.segments.at(-1) as M;
					break;
				case "h":
					this.segments.push(H.from(path, relative));
					break;
				case "v":
					this.segments.push(V.from(path, relative));
					break;
				case "l":
					this.segments.push(L.from(path, relative));
					break;
				case "q":
					this.segments.push(Q.from(path, relative));
					break;
				case "t":
					this.segments.push(T.from(path, relative));
					break;
				case "c":
					this.segments.push(C.from(path, relative));
					break;
				case "s":
					this.segments.push(S.from(path, relative));
					break;
				case "a":
					this.segments.push(A.from(path, relative));
					break;
				case "z":
					this.segments.push(new Z(this.#lastM, relative));
					break;
				default:
					throw new SVGPathError(`Invalid path command: ${command}`);
			}
		}
	}
	// relativeTo(point?: Point = Point.ORIGIN) {

	// }

	toString(delimiter: string = " ") {
		return this.segments.join(delimiter);
	}
}