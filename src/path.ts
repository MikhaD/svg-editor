import { isAlpha } from "./utils";

/** A class to represent an immutable point in 2D space */
export class Point {
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
		return `${this.x}${this.y < 0 ? "" : " "}${this.y}`;
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
	abstract toString(): string;
	abstract relativeTo(other: PathSegment): PathSegment;
}

class M extends PathSegment {
	constructor(dest: Point, relative: boolean = false) {
		super(dest, relative);
	}
	relativeTo(other: PathSegment) {
		return new M(this.dest.relativeTo(other.dest), true);
	}
	toString() {
		return super.formatOutput(`M${this.dest}`);
	}
}

class Z extends PathSegment {
	constructor(start: M) {
		super(start.dest, true);
	}
	relativeTo(other: PathSegment) {
		return this;
	}
	toString() {
		return "z";
	}
}

class H extends PathSegment {
	constructor(dest: Point, relative: boolean = false) {
		super(dest, relative);
	}
	relativeTo(other: PathSegment) {
		return new H(this.dest.relativeTo(other.dest), true);
	}
	toString() {
		return super.formatOutput(`H${this.dest.x}`);
	}
}

class V extends PathSegment {
	constructor(dest: Point, relative: boolean = false) {
		super(dest, relative);
	}
	relativeTo(other: PathSegment) {
		return new V(this.dest.relativeTo(other.dest), true);
	}
	toString() {
		return super.formatOutput(`V${this.dest.y}`);
	}
}

class L extends PathSegment {
	constructor(dest: Point, relative: boolean = false) {
		super(dest, relative);
	}
	relativeTo(other: PathSegment) {
		return new L(this.dest.relativeTo(other.dest), true);
	}
	toString() {
		return super.formatOutput(`L${this.dest}`);
	}
}

class C extends PathSegment {
	ctrl1: Point;
	ctrl2: Point;
	constructor(dest: Point, control1: Point, control2: Point, relative: boolean = false) {
		super(dest, relative);
		this.ctrl1 = control1;
		this.ctrl2 = control2;
	}
	relativeTo(other: PathSegment) {
		return new C(this.dest.relativeTo(other.dest), this.ctrl1.relativeTo(other.dest), this.ctrl2.relativeTo(other.dest), true);
	}
	toString() {
		return super.formatOutput(`C${this.ctrl1},${this.ctrl2},${this.dest}`);
	}
}

class Q extends PathSegment {
	ctrl: Point;
	constructor(dest: Point, control: Point, relative: boolean = false) {
		super(dest, relative);
		this.ctrl = control;
	}
	relativeTo(other: PathSegment) {
		return new Q(this.dest.relativeTo(other.dest), this.ctrl.relativeTo(other.dest), true);
	}
	toString() {
		return super.formatOutput(`Q${this.ctrl},${this.dest}`);
	}
}

class A extends PathSegment {
	rx: number;
	ry: number;
	rotation: number;
	large: boolean;
	sweep: boolean;
	constructor(dest: Point, rx: number, ry: number, rotation: number, large: boolean, sweep: boolean, relative: boolean = false) {
		super(dest, relative);
		this.rx = rx;
		this.ry = ry;
		this.rotation = rotation;
		this.large = large;
		this.sweep = sweep;
	}
	relativeTo(other: PathSegment) {
		return new A(this.dest.relativeTo(other.dest), this.rx, this.ry, this.rotation, this.large, this.sweep, true);
	}
	toString() {
		return super.formatOutput(`A${this.rx},${this.ry},${this.rotation},${this.large ? 1 : 0},${this.sweep ? 1 : 0},${this.dest}`);
	}
}

export class PathParseError extends Error {
	constructor(message: string) {
		super(message);
	}
}

export class Path {
	static types = { "m": M, "z": Z, "h": H, "v": V, "l": L, "c": C, "q": Q, "a": A };
	points: Map<string, Point>;
	segments: PathSegment[];
	constructor(draw: string) {
		this.points = new Map<string, Point>();
		this.segments = [];
		this.parse(draw);
	}
	parse(draw: string) {
		for (let char of draw.trim()) {
			if (isAlpha(char)) {
				if (char.toLowerCase() in Path.types == false) throw new PathParseError(`Invalid path character: ${char}`);

			} else { }
		}
	}
}