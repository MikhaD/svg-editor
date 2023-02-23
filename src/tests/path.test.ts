import { Path } from "../path";
import { describe, expect, it } from "vitest";

describe("Path", () => {
	it("should parse string with M, H, V, L, Q & A commands", () => {
		const path = new Path("M0 0H50V50L25 25Q25 50 0 50A50 30 0 000 0");
		expect(path.length).toBe(6);
		expect(path.toString()).toBe("M0,0 H50 V50 L25,25 Q25,50 0,50 A50,30 0 0,0 0,0");
	});
	it("should parse a string with M, Q, T, C, S, A & Z commands", () => {
		const path = new Path(
			`M20 20C30 10 40 10 50 20S70 30 80 20S100 10 110 20
			 A50 40 50 11120 110Q110 90 100 110T80 110 60 110 40 110 20 90Z`
		);
		expect(path.length).toBe(11);
		expect(path.toString("")).toBe("M20,20C30,10 40,10 50,20S70,30 80,20S100,10 110,20A50,40 50 1,1 120,110Q110,90 100,110T80,110T60,110T40,110T20,90Z");
	});
	// convert path to relative & test
	it("should convert paths to relative", () => {
		const path = new Path("M10,10 V20 L20,30 V40 L30,50 V60 L40,70 A1,1 0 1,0 10,10");
		expect(path.length).toBe(8);
		expect(path.toString()).toBe("M10,10 V20 L20,30 V40 L30,50 V60 L40,70 A1,1 0 1,0 10,10");
		expect(path.relative()).toBe("m10,10 v10 l10,10 v10 l10,10 v10 l10,10 a1,1 0 1,0 -30,-60");
	});
	it("should convert paths to absolute", () => {
		const path = new Path("m10 10 v10 l10 10 v10 l10 10 v10 l10 10 a1 1 0 10-30-60");
		expect(path.length).toBe(8);
		expect(path.toString()).toBe("m10,10 v10 l10,10 v10 l10,10 v10 l10,10 a1,1 0 1,0 -30,-60");
		expect(path.absolute()).toBe("M10,10 V20 L20,30 V40 L30,50 V60 L40,70 A1,1 0 1,0 10,10");
	});
	it("should handle mixed paths", () => {
		const path = new Path("m10 10m10 0L40 50a20 20 0 10 20 0L80 10z");
		expect(path.length).toBe(6);
		expect(path.toString("|")).toBe("m10,10|m10,0|L40,50|a20,20 0 1,0 20,0|L80,10|z");
		expect(path.absolute("|")).toBe("M10,10|M20,10|L40,50|A20,20 0 1,0 60,50|L80,10|Z");
		expect(path.relative("|")).toBe("m10,10|m10,0|l20,40|a20,20 0 1,0 20,0|l20,-40|z");
	});
});