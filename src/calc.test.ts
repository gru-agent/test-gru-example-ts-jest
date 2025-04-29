import { add } from "../src/calc";

describe("test add function", () => {
  it("should return 15 for add(10,5)", () => {
    expect(add(10, 5)).toBe(15);
  });

  it("should return 5 for add(2,3)", () => {
    expect(add(2, 3)).toBe(5);
  });

  it("should handle negative numbers", () => {
    expect(add(-5, -3)).toBe(-8);
    expect(add(-10, 5)).toBe(-5);
    expect(add(10, -5)).toBe(5);
  });

  it("should handle decimal numbers", () => {
    expect(add(1.5, 2.7)).toBeCloseTo(4.2);
    expect(add(0.1, 0.2)).toBeCloseTo(0.3);
  });

  it("should handle zero", () => {
    expect(add(0, 5)).toBe(5);
    expect(add(5, 0)).toBe(5);
    expect(add(0, 0)).toBe(0);
  });

  it("should handle large numbers", () => {
    expect(add(999999999, 1)).toBe(1000000000);
    expect(add(1000000, 2000000)).toBe(3000000);
  });

  it("should handle Number.MAX_VALUE", () => {
    expect(add(Number.MAX_VALUE, 0)).toBe(Number.MAX_VALUE);
    expect(add(Number.MAX_VALUE, 1)).toBe(Number.MAX_VALUE);
    expect(add(Number.MAX_VALUE, Number.MAX_VALUE)).toBe(Infinity);
  });
});
