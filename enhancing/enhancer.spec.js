const enhancer = require("./enhancer.js");

describe("sanity test", () => {
  test("should pass", () => {
    expect(true).toBe(true);
  });
});

describe("test enhancer functions", () => {
  const testItem = { name: "sword", durability: 50, enhancement: 19 };

  describe("test item", () => {
    it("should have name, durability and enhancement properties", () => {
      const keys = Object.keys(testItem);
      expect(keys).toContain("name");
      expect(keys).toContain("durability");
      expect(keys).toContain("enhancement");
    });
    it("should have name that is a string", () => {
      expect(typeof testItem.name).toBe("string");
    });
    it("should have a durability between 0 and 100", () => {
      expect(testItem.durability).toBeGreaterThanOrEqual(0);
      expect(testItem.durability).toBeLessThanOrEqual(100);
    });
    it("should have enhancement between 0 and 20", () => {
      expect(testItem.enhancement).toBeGreaterThanOrEqual(0);
      expect(testItem.enhancement).toBeLessThanOrEqual(20);
    });
  });

  describe("test repair function", () => {
    it("repair should return new item with 100 durability", () => {
      const repairedItem = enhancer.repair(testItem);
      expect(repairedItem).toEqual({ ...testItem, durability: 100 });
      expect(repairedItem).not.toEqual(testItem);
    });
  }),

    describe("test success function", () => {
      const enhancedItem = enhancer.success(testItem);
      it("success should return new item with +1 enhancement if level under 20", () => {
        expect(enhancedItem).not.toEqual(testItem);
        expect(enhancedItem).toEqual({ ...testItem, enhancement: testItem.enhancement + 1 });
      });
      it("success should not change other attributes", () => {
        expect(enhancedItem.durability).toBe(testItem.durability);
        expect(enhancedItem.name).toBe(testItem.name);
      });
      it("success should not exceed enhancement level 21", () => {
        const maxEnhancement = { name: "sword", durability: 50, enhancement: 20 };
        const maxEnhanced = enhancer.success(maxEnhancement);
        expect(maxEnhanced.enhancement).toBeLessThan(21);
      });
    });

  describe("test fail function", () => {
    const enhance15 = { name: "sword", durability: 50, enhancement: 15 };
    const enhanced15 = enhancer.fail(enhance15);
    const enhance14 = { name: "sword", durability: 50, enhancement: 14 };
    const enhanced14 = enhancer.fail(enhance14);
    const enhance17 = { name: "sword", durability: 50, enhancement: 17 };
    const enhanced17 = enhancer.fail(enhance17);
    it("doesn't change enhancement if enhancement is under or equal to 16", () => {
      expect(enhanced15.enhancement).toBe(enhance15.enhancement);
    });
    it("decreases durability by 5 if enhancement is under 15", () => {
      expect(enhanced14.durability).toBe(enhance14.durability - 5);
    });
    it("decreases durability by 10 if enhancement is 15 or more", () => {
      expect(enhanced15.durability).toBe(enhance15.durability - 10);
    });
    it("decreases enhancement by 1 if enhancement is over 16", () => {
      expect(enhanced17.enhancement).toBe(enhance17.enhancement - 1);
    });
  });
});
