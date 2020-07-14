import { DragSourceConfig } from "../../../..";
import { editorUi } from "../../../mocks";

describe("DragSource", () => {
  const dragSource = {};

  let instance;
  beforeEach(() => {
    instance = new DragSourceConfig(editorUi, dragSource);
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
        it("sets dragArrow", () => {
          instance.init();
          expect(instance.dragArrow).toBeDefined();
        });
      });

      describe("configure()", () => {
        it("sets dragArrow", () => {
          expect(() => instance.configure()).not.toThrow();
        });
      });

      describe("mouseDown()", () => {
        it("sets mouseDown handler on dragSource", () => {
          expect(() => instance.mouseDown()).not.toThrow();
        });
      });

      describe("createPreviewElement()", () => {
        it("sets createPreviewElement handler on dragSource", () => {
          expect(() => instance.createPreviewElement()).not.toThrow();
        });
      });

      describe("dragEnter()", () => {
        it("sets dragEnter handler on dragSource", () => {
          expect(() => instance.dragEnter()).not.toThrow();
        });
      });

      describe("dragExit()", () => {
        it("sets dragExit handler on dragSource", () => {
          expect(() => instance.dragExit()).not.toThrow();
        });
      });

      describe("dragOver()", () => {
        it("sets dragOver handler on dragSource", () => {
          expect(() => instance.dragOver()).not.toThrow();
        });
      });

      describe("createDragOver()", () => {
        it("creates DragOver instance", () => {
          expect(() => instance.createDragOver()).not.toThrow();
        });
      });

      describe("getDropTarget()", () => {
        it("sets getDropTarget on dragSource", () => {
          expect(() => instance.getDropTarget()).not.toThrow();
        });
      });

      describe("stopDrag()", () => {
        it("sets stopDrag on dragSource", () => {
          expect(() => instance.stopDrag()).not.toThrow();
        });
      });
    });
  });
});
