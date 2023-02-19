import { Path } from "../path";
import { describe, expect, it } from "vitest";

describe("Path", () => {
	it("should parse string with M, H, V, L, Q & A commands", () => {
		const path = new Path("M0 0H50V50L25 25Q25 50 0 50A50 30 0 000 0");
		expect(path.segments.length).toBe(6);
		expect(path.segments[0].toString()).toBe("M0,0");
		expect(path.segments[1].toString()).toBe("H50");
		expect(path.segments[2].toString()).toBe("V50");
		expect(path.segments[3].toString()).toBe("L25,25");
		expect(path.segments[4].toString()).toBe("Q25,50 0,50");
		expect(path.segments[5].toString()).toBe("A50,30 0 0,0 0,0");
		expect(path.toString()).toBe("M0,0 H50 V50 L25,25 Q25,50 0,50 A50,30 0 0,0 0,0");
	});
	it("should parse a string with M, Q, T, C, S, A & Z commands", () => {
		const path = new Path(
			`M20 20C30 10 40 10 50 20S70 30 80 20S100 10 110 20
			 A50 40 50 11120 110Q110 90 100 110T80 110 60 110 40 110 20 90Z`
		);
		expect(path.segments.length).toBe(11);
		expect(path.segments[0].toString()).toBe("M20,20");
		expect(path.segments[1].toString()).toBe("C30,10 40,10 50,20");
		expect(path.segments[2].toString()).toBe("S70,30 80,20");
		expect(path.segments[3].toString()).toBe("S100,10 110,20");
		expect(path.segments[4].toString()).toBe("A50,40 50 1,1 120,110");
		expect(path.segments[5].toString()).toBe("Q110,90 100,110");
		expect(path.segments[6].toString()).toBe("T80,110");
		expect(path.segments[7].toString()).toBe("T60,110");
		expect(path.segments[8].toString()).toBe("T40,110");
		expect(path.segments[9].toString()).toBe("T20,90");
		expect(path.segments[10].toString()).toBe("Z");
	});
	// convert path to relative & test

});