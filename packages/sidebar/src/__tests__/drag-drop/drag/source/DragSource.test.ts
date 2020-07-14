import { DragSource } from "../../../..";
import { editorUi } from "../../../mocks";

describe("DragSource", () => {
  let instance;
  beforeEach(() => {
    instance = new DragSource(editorUi);
  });

  describe("instance", () => {
    describe("properties", () => {
      describe("ui", () => {
        it("is set", () => {
          expect(instance.ui).toBeDefined();
        });
      });

      describe("graph", () => {
        it("is set", () => {
          expect(instance.graph).toBeDefined();
        });
      });
    });

    describe("methods", () => {
      describe("init()", () => {
        it("no throw", () => {
          expect(() => instance.init()).not.toThrow();
        });
      });

      describe("processCells()", () => {
        it("no throw", () => {
          expect(() => instance.processCells()).not.toThrow();
        });
      });

      describe("processCell(cell, index)", () => {
        it("no throw", () => {
          const cell = {};
          const index = 0;
          expect(() => instance.processCell(cell, index)).not.toThrow();
        });
      });

      describe("configureDragSource(dragSource)", () => {
        it("no throw", () => {
          const dragSource = {};
          expect(() => instance.configureDragSource(dragSource)).not.toThrow();
        });
      });

      describe("setCancelHandler(dragSource)", () => {
        it("no throw", () => {
          const dragSource = {};
          expect(() => instance.setCancelHandler(dragSource)).not.toThrow();
        });
      });

      describe("createDragSourceCreator()", () => {
        it("no throw", () => {
          expect(() => instance.createDragSourceCreator()).not.toThrow();
        });
      });

      describe("createDropTarget()", () => {
        it("no throw", () => {
          expect(() => instance.createDropTarget()).not.toThrow();
        });
      });

      describe("isDropStyleEnabled(cells, firstVertex)", () => {
        it("no throw", () => {
          const cells = [{}];
          const firstVertex = {};
          expect(() =>
            instance.isDropStyleEnabled(cells, firstVertex)
          ).not.toThrow();
        });
      });

      describe("create(elem, dropHandler, preview, cells)", () => {
        it("no throw", () => {
          const elem = document.createElement("div");
          const dropHandler = () => {};
          const preview = true;
          const cells = [{}];
          expect(() =>
            instance.create(elem, dropHandler, preview, cells)
          ).not.toThrow();
        });
      });
    });
  });
});
