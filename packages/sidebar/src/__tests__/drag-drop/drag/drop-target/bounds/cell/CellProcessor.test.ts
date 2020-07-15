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

      describe("boxDirections", () => {
        it("is set", () => {
          expect(instance.boxDirections).toBeDefined();
        });
      });

      describe("handler", () => {
        it("is set", () => {
          expect(instance.handler).toBeDefined();
        });
      });
    });

    describe("methods", () => {
      describe("addBoxDirections()", () => {
        it("adds box directions", () => {
          expect(() => instance.addBoxDirections()).not.toThrow();
        });
      });

      describe("process()", () => {
        it("is processed", () => {
          expect(() => instance.process()).not.toThrow();
        });
      });

      describe("growBds()", () => {
        it("grows bds", () => {
          expect(() => instance.growBds()).not.toThrow();
        });
      });

      describe("configureHandler()", () => {
        it("handler is configured", () => {
          expect(() => instance.configureHandler()).not.toThrow();
        });
      });

      describe("hasVisibleNodeAndBoundingBox(handler)", () => {
        it("adds bounding box to handler", () => {
          const handler = instance.handler;
          expect(() =>
            instance.hasVisibleNodeAndBoundingBox(handler)
          ).not.toThrow();
        });
      });

      describe("addBoundingBox(handler)", () => {
        it("adds bounding box to handler", () => {
          const handler = instance.handler;
          expect(() => instance.addBoundingBox(handler)).not.toThrow();
        });
      });
    });
  });
});
