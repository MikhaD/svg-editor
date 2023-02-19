import { isAlpha, isNumeric, isUpper, roundToNearest, toTitleCase, strip } from "../utils";
import { describe, expect, it } from "vitest";

describe("isAlpha", () => {
	it("should return true for a single letter", () => {
		expect(isAlpha("a")).toBe(true);
		expect(isAlpha("A")).toBe(true);
	});
	it("should return true for a string of letters", () => {
		expect(isAlpha("alphabet")).toBe(true);
		expect(isAlpha("AlPhaBet")).toBe(true);
		expect(isAlpha("ALPHABET")).toBe(true);
	});
	it("should return false for a single non character", () => {
		expect(isAlpha("!")).toBe(false);
		expect(isAlpha(" ")).toBe(false);
		expect(isAlpha("\t")).toBe(false);
	});
	it("should return false for a a string containing non characters", () => {
		expect(isAlpha("Hello there")).toBe(false);
		expect(isAlpha("Hello-there")).toBe(false);
		expect(isAlpha("Hi!")).toBe(false);
		expect(isAlpha("M10 10")).toBe(false);
	});
});

describe("isNumeric", () => {
	it("should return true for a single digit", () => {
		expect(isNumeric("1")).toBe(true);
	});
	it("should return true for a string of digits", () => {
		expect(isNumeric("1234567890")).toBe(true);
	});
	it("should return true for a single decimal", () => {
		expect(isNumeric(".")).toBe(true);
	});
	it("should return false for a string of decimals", () => {
		expect(isNumeric("...........")).toBe(false);
	});
	it("should return true for a single negative", () => {
		expect(isNumeric("-")).toBe(true);
	});
	it("should return false for a string of negatives", () => {
		expect(isNumeric("---------")).toBe(false);
	});
	it("should return true for a decimal", () => {
		expect(isNumeric("3.1415")).toBe(true);
	});
	it("should return true for a negative", () => {
		expect(isNumeric("-31415")).toBe(true);
		expect(isNumeric("-3.1415")).toBe(true);
	});
	it("should return false for non numbers", () => {
		expect(isNumeric("-31.41.5")).toBe(false);
		expect(isNumeric("31-415")).toBe(false);
		expect(isNumeric(".31415-")).toBe(false);
	});
	it("should return false for a string containing non digits", () => {
		expect(isNumeric("Hello there")).toBe(false);
		expect(isNumeric("Hello-there")).toBe(false);
		expect(isNumeric("Hi!")).toBe(false);
		expect(isNumeric("M10 10")).toBe(false);
	});
});

describe("isUpper", () => {
	it("should return true for a single uppercase letter", () => {
		expect(isUpper("A")).toBe(true);
	});
	it("should return false for a single lowercase letter", () => {
		expect(isUpper("a")).toBe(false);
	});
	it("should return true for non character strings", () => {
		expect(isUpper("! \t")).toBe(true);
	});
	it("should return false for a a string containing lower case letters", () => {
		expect(isUpper("Hello there")).toBe(false);
		expect(isUpper("Hello-there")).toBe(false);
		expect(isUpper("Hi!")).toBe(false);
		expect(isUpper("m10 10")).toBe(false);
	});
	it("should return true for a string containing no lower case letters", () => {
		expect(isUpper("HELLO THERE")).toBe(true);
		expect(isUpper("HI!")).toBe(true);
		expect(isUpper("M10 10")).toBe(true);
	});
});

describe("roundToNearest", () => {
	it("should round to the nearest 1 by default", () => {
		expect(roundToNearest(-3.5)).toBe(-3);
		expect(roundToNearest(-3.6)).toBe(-4);
		expect(roundToNearest(0.4)).toBe(0);
		expect(roundToNearest(1.1)).toBe(1);
		expect(roundToNearest(6.5)).toBe(7);
		expect(roundToNearest(11.9)).toBe(12);
	});
	it("should round to the nearest 0.5", () => {
		expect(roundToNearest(1.1, 0.5)).toBe(1);
		expect(roundToNearest(1.5, 0.5)).toBe(1.5);
		expect(roundToNearest(1.9, 0.5)).toBe(2);
	});
	it("should round to the nearest 50", () => {
		expect(roundToNearest(75, 50)).toBe(100);
		expect(roundToNearest(133, 50)).toBe(150);
		expect(roundToNearest(174, 50)).toBe(150);
		expect(roundToNearest(176, 50)).toBe(200);
	});
});

describe("toTitleCase", () => {
	it("Should make the string title case", () => {
		expect(toTitleCase("hello there")).toBe("Hello There");
		expect(toTitleCase("Hello There")).toBe("Hello There");
		expect(toTitleCase("hi!")).toBe("Hi!");
		expect(toTitleCase("M10 10")).toBe("M10 10");
		expect(toTitleCase("CTRL + ALT + SPACE")).toBe("Ctrl + Alt + Space");
	});
});

describe("strip", () => {
	it("should remove whitespace from the start and end of a string", () => {
		expect(strip(" Hello there ")).toBe("Hello there");
		expect(strip("\t Hello there")).toBe("Hello there");
		expect(strip("Hello there ")).toBe("Hello there");
		expect(strip(" Hello there\n ")).toBe("Hello there");
	});
	it("should remove + and - characters from the start and end of a string", () => {
		expect(strip("+Hello there+", /\+/)).toBe("Hello there");
		expect(strip("-Hello there-", /-/)).toBe("Hello there");
		expect(strip("+-+Hello there-+-", /\+|-/)).toBe("Hello there");
		expect(strip("++Hello there++", /(\+|-)/)).toBe("Hello there");
	});
});