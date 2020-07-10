import { ClickHandler } from "../..";
import { editorUi } from "../mocks";

describe("SidebarInitializer", () => {
  const ui = editorUi;
  const dragElem = document.createElement("div");

  let clickHandler;
  beforeAll(() => {
    clickHandler = new ClickHandler(editorUi, dragElem);
  });

  describe("instance", () => {
    describe("properties", () => {
      describe("editorUi", () => {
        test("to be set", () => {
          expect(clickHandler.editorUi).toBe(editorUi);
        });
      });
    });

    describe("methods", () => {
      describe("add(element, dragSource, cells)", () => {
        const element = document.createElement("x");
        const dragSource: any = {};
        const cells = [];
        clickHandler.add(element, dragSource, cells);

        describe("dragSource", () => {
          test("has mouseDown handler", () => {
            expect(dragSource.mouseDown).toBeDefined();
          });

          test("has mouseMove handler", () => {
            expect(dragSource.mouseMove).toBeDefined();
          });

          test("has mouseDown handler", () => {
            expect(dragSource.mouseUp).toBeDefined();
          });
        });
      });
      describe("setDragMouseDown()", () => {
        test("no throw", () => {
          expect(() => clickHandler.setDragMouseDown()).not.toThrow();
        });
      });
      describe("setDragMouseMove()", () => {
        test("no throw", () => {
          expect(() => clickHandler.setDragMouseMove()).not.toThrow();
        });
      });
      describe("setDragMouseUp()", () => {
        test("no throw", () => {
          expect(() => clickHandler.setDragMouseUp()).not.toThrow();
        });
      });
    });
  });
});
