import { ClickHandler } from "..";
import { editorUi } from "./mocks";

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
      describe("#add", () => {
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
    });
  });
});
