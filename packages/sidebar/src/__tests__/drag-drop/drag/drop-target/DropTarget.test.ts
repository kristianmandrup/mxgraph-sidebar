import { DropTarget } from "../../../..";
import { editorUi } from "../../../mocks";

describe("DropTarget", () => {
  let instance;

  const { graph } = editorUi.editor;
  beforeEach(() => {
    instance = new DropTarget(editorUi);
  });

  describe("instance", () => {
    describe("properties", () => {
      // editorUi
      // model
      // dropArrows
    });

    describe("methods", () => {
      describe("getDropTarget(graph, x, y, evt)", () => {
        it("is gets drop target", () => {
          const x = 0,
            y = 0,
            evt = {};
          expect(instance.getDropTarget(graph, x, y, evt)).toBeDefined();
        });
      });

      describe("selectParentGroupAsDropTarget(target, evt)", () => {
        it("no throw", () => {
          const target = document.createElement("div");
          const evt = {};
          expect(() =>
            instance.selectParentGroupAsDropTarget(target, evt)
          ).not.toThrow();
        });
      });

      describe("shouldIgnoreTarget(target, evt)", () => {
        it("is false", () => {
          const target = document.createElement("div");
          const evt = {};
          expect(instance.shouldIgnoreTarget(target, evt)).toBeFalsy();
        });
      });
      //
    });
  });
});
