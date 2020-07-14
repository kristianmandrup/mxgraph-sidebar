import { DragOver, DragSourceConfig } from "../../../../..";
import { editorUi } from "../../../../mocks";

describe(" DragOver", () => {
  const element = document.createElement("div");
  const dropHandler = () => {};
  const preview = true;
  const cells = [{}];

  const opts = { element, dropHandler, preview, cells };

  const dragSource = {};
  const config = new DragSourceConfig(editorUi, dragSource);
  const graph = editorUi.editor.graph;
  const view = graph.view;

  let instance;
  beforeEach(() => {
    instance = new DragOver(config);
  });

  describe("instance", () => {
    describe("properties", () => {
      describe("ui", () => {
        it("is set", () => {
          expect(instance.ui).toBeDefined();
        });
      });
    });

    describe("methods", () => {
      describe("dragOver(graph, evt)", () => {
        it("no throw", () => {
          const evt = {};
          expect(() => instance.dragOver(graph, evt)).not.toThrow();
        });
      });

      describe("applyDefaultStyling()", () => {
        it("no throw", () => {
          expect(() => instance.applyDefaultStyling()).not.toThrow();
        });
      });

      describe("isHighlighted(graph)", () => {
        it("is false", () => {
          expect(instance.isHighlighted(graph)).toBeFalsy();
        });
      });

      describe("onActiveArrow(graph)", () => {
        it("no throw", () => {
          expect(() => instance.onActiveArrow(graph)).not.toThrow();
        });
      });

      describe("onStyleTarget(graph)", () => {
        it("no throw", () => {
          expect(() => instance.onStyleTarget(graph)).not.toThrow();
        });
      });

      describe("centerDropCells(view)", () => {
        it("no throw", () => {
          expect(() => instance.centerDropCells(view)).not.toThrow();
        });
      });
    });
  });
});
