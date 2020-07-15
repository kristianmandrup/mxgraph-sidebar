import { DropTargetProcessor } from "../../../..";
import { editorUi } from "../../../mocks";

describe("DropTargetProcessor", () => {
  let instance;
  beforeEach(() => {
    instance = new DropTargetProcessor(editorUi);
  });

  describe("instance", () => {
    describe("properties", () => {
      describe("editorUi", () => {
        it("is set", () => {
          expect(instance.editorUi).toBeDefined();
        });
      });

      describe("dropProcessor", () => {
        it("is set", () => {
          expect(instance.dropProcessor).toBeDefined();
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

      describe("dropTarget", () => {
        it("is set", () => {
          expect(instance.dropTarget).toBeDefined();
        });
      });

      // shouldEditSelectedElement
      // hasSelectedElements
    });

    describe("methods", () => {
      describe("process()", () => {
        it("no throw", () => {
          expect(() => instance.process()).not.toThrow();
        });
      });

      describe("init()", () => {
        it("no throw", () => {
          expect(() => instance.init()).not.toThrow();
        });
      });

      describe("setSelected()", () => {
        it("no throw", () => {
          expect(() => instance.setSelected()).not.toThrow();
        });
      });

      describe("executeParentLayoutHooks()", () => {
        it("no throw", () => {
          expect(() => instance.executeParentLayoutHooks()).not.toThrow();
        });
      });

      describe("executeParentLayoutHooks()", () => {
        it("no throw", () => {
          expect(() => instance.executeParentLayoutHooks()).not.toThrow();
        });
      });

      describe("splitTargetEdge(target, cells)", () => {
        it("no throw", () => {
          const target = {};
          const cells = [{}];
          expect(() => instance.splitTargetEdge(target, cells)).not.toThrow();
        });
      });

      describe("shouldSplitTarget(target, cells)", () => {
        it("no throw", () => {
          const target = {};
          const cells = [{}];
          expect(() => instance.shouldSplitTarget(target, cells)).not.toThrow();
        });
      });
      //

      describe("editSelected()", () => {
        it("no throw", () => {
          expect(() => instance.editSelected()).not.toThrow();
        });
      });

      describe("selectAndDisplaySelectedCells()", () => {
        it("no throw", () => {
          expect(() => instance.selectAndDisplaySelectedCells()).not.toThrow();
        });
      });

      describe("postProcess()", () => {
        it("no throw", () => {
          expect(() => instance.postProcess()).not.toThrow();
        });
      });

      describe("handleError(e)", () => {
        it("no throw", () => {
          const e = {};
          expect(() => instance.handleError(e)).not.toThrow();
        });
      });

      describe("notifyCellsInserted()", () => {
        it("no throw", () => {
          expect(() => instance.notifyCellsInserted()).not.toThrow();
        });
      });
    });
  });
});
