export const testProps = (instance) => {
  describe("source", () => {
    it("is set", () => {
      expect(instance.source).toBeDefined();
    });
  });

  describe("targets", () => {
    it("is set", () => {
      expect(instance.targets).toBeDefined();
    });
  });

  describe("targetParent", () => {
    it("is set", () => {
      expect(instance.targetParent).toBeDefined();
    });
  });

  describe("direction", () => {
    it("is set", () => {
      expect(instance.direction).toBeDefined();
    });
  });

  describe("dropCellIndex", () => {
    it("is set", () => {
      expect(instance.dropCellIndex).toBeDefined();
    });
  });
};
