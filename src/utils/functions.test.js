import {getReadableCaption, getToValue} from "./functions"

const metresData = ["метр", "метра", "метров"]

describe('functions test', () => {
  describe('getReadableCaption', () => {
    test("test => 2 метра", () => {
      const res = getReadableCaption(2, metresData)
      expect(res).toBe("метра")
    })
    test("test => 12 метров", () => {
      const res = getReadableCaption(12, metresData)
      expect(res).toBe("метров")
    })
    test("test => 210 метров", () => {
      const res = getReadableCaption(210, metresData)
      expect(res).toBe("метров")
    })
    test("test => 11 метров", () => {
      const res = getReadableCaption(11, metresData)
      expect(res).toBe("метров")
    })
    test("test => 331 метр", () => {
      const res = getReadableCaption(331, metresData)
      expect(res).toBe("метр")
    })
  });

  describe('getToValue', () => {
    test('2 => 0.02', () => {
      const res = getToValue(2, 1, 100)
      expect(res).toBe(0.02)
    });
    test('0.02 => 2', () => {
      const res = getToValue(0.02, 100, 1)
      expect(res).toBe(2)
    });
    test('15 => 30', () => {
      const res = getToValue(15, 40, 20)
      expect(res).toBe(30)
    });
    test('5.42 => 10.3473', () => {
      const res = getToValue(5.42, 21, 11)
      expect(res).toBe(10.3473)
    });
  });
});
