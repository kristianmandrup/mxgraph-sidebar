import { editorUi } from "../../../../../mocks";
import { InsideBoundsConfig } from "../../../../../..";
import { CellProcessor } from "../../../../../../drag-drop";

describe("CellProcessor", () => {
  let instance;
  const config = new InsideBoundsConfig(editorUi);

  beforeEach(() => {
    instance = new CellProcessor(config);
  });

  describe("instance", () => {
    describe("properties", () => {
      describe("config", () => {
        it("is set", () => {
          expect(instance.config).toBe(config);
        });
      });
    });

    describe("methods", () => {
      describe("process()", () => {
        it("is processed", () => {
          expect(() => instance.process()).not.toThrow();
        });
      });

      describe("addTargetRect()", () => {
        it("adds target rect", () => {
          expect(() => instance.addTargetRect()).not.toThrow();
        });
      });

      describe("addSourceRect()", () => {
        it("adds source rect", () => {
          expect(() => instance.addSourceRect()).not.toThrow();
        });
      });
    });
  });
});
