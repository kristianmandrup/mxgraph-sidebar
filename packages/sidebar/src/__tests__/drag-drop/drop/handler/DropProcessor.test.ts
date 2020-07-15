import { DropProcessor } from "../../../..";
import { editorUi } from "../../../mocks";

describe("DropProcessor", () => {
  let instance;
  beforeEach(() => {
    instance = new DropProcessor(editorUi, {});
  });

  describe("instance", () => {
    describe("properties", () => {
      describe("editorUi", () => {
        it("is set", () => {
          expect(instance.editorUi).toBeDefined();
        });
      });

      describe("graph", () => {
        it("is set", () => {
          expect(instance.graph).toBeDefined();
        });
      });

      describe("allowSplit", () => {
        it("is set", () => {
          expect(instance.allowSplit).toBeDefined();
        });
      });

      describe("cells", () => {
        it("is set", () => {
          expect(instance.cells).toBeDefined();
        });
      });

      describe("allowCellsInserted", () => {
        it("is set", () => {
          expect(instance.allowCellsInserted).toBeDefined();
        });
      });

      describe("bounds", () => {
        it("is set", () => {
          expect(instance.bounds).toBeDefined();
        });
      });

      describe("target", () => {
        it("is set", () => {
          expect(instance.target).toBeDefined();
        });
      });

      describe("evt", () => {
        it("is set", () => {
          expect(instance.evt).toBeDefined();
        });
      });

      describe("x", () => {
        it("is set", () => {
          expect(instance.x).toBeDefined();
        });
      });

      describe("y", () => {
        it("is set", () => {
          expect(instance.y).toBeDefined();
        });
      });

      describe("validDropTarget", () => {
        it("is set", () => {
          expect(instance.validDropTarget).toBeDefined();
        });
      });
    });

    describe("methods", () => {
      describe("process()", () => {
        it("no throw", () => {
          expect(() => instance.process()).not.toThrow();
        });
      });

      describe("processCells(cells)", () => {
        it("no throw", () => {
          const cells = [{}];
          expect(() => instance.processCells(cells)).not.toThrow();
        });
      });

      describe("processDropTarget({ target, cells })", () => {
        it("no throw", () => {
          const target = {};
          const cells = [{}];
          expect(() =>
            instance.processDropTarget({ target, cells })
          ).not.toThrow();
        });
      });

      describe("createDropTargetProcessor({ target, cells })", () => {
        it("no throw", () => {
          const target = {};
          const cells = [{}];
          expect(() =>
            instance.createDropTargetProcessor({ target, cells })
          ).not.toThrow();
        });
      });

      describe("getTarget()", () => {
        it("no throw", () => {
          expect(() => instance.getTarget()).not.toThrow();
        });
      });
    });
  });
});
