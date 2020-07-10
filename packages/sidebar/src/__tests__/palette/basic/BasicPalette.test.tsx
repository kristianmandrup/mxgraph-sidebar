import { Sidebar, BasicPalette } from "../../..";
import { editorUi } from "../mocks";

describe("BasicPalette", () => {
  const editorElem = document.createElement("editor");
  const $sidebar = new Sidebar(editorUi, editorElem);
  const create = (sidebar = $sidebar) => new BasicPalette(sidebar);

  let palette;
  beforeAll(() => {
    palette = create();
  });

  describe("instance", () => {
    describe("properties", () => {
      describe("sidebar", () => {
        test("to be set", () => {
          expect(palette.sidebar).toBe($sidebar);
        });
      });

      describe("id", () => {
        test("to be basic", () => {
          expect(palette.id).toEqual("basic");
        });
      });

      describe("title", () => {
        test("to be set", () => {
          expect(palette.title).toBeDefined();
        });
      });

      describe("style", () => {
        test("to be set", () => {
          expect(palette.style).toBeDefined();
        });
      });

      describe("filePath", () => {
        test("to be a filepath", () => {
          const dir = "palettes";
          expect(palette.filePath(dir)).toBeDefined();
        });
      });

      describe("partialRectangles", () => {
        test("to have 4 items", () => {
          expect(palette.partialRectangles.length).toEqual(4);
        });
      });

      describe("partialRectangle1", () => {
        test("to be set", () => {
          expect(palette.partialRectangle1).toBeDefined();
        });
      });

      describe("partialRectangle2", () => {
        test("to be set", () => {
          expect(palette.partialRectangle2).toBeDefined();
        });
      });

      describe("partialRectangle3", () => {
        test("to be set", () => {
          expect(palette.partialRectangle3).toBeDefined();
        });
      });

      describe("partialRectangle4", () => {
        test("to be set", () => {
          expect(palette.partialRectangle4).toBeDefined();
        });
      });
    });

    describe("methods", () => {
      describe("addBasicPalette(dir)", () => {
        test("not to throw", () => {
          const dir = "/palettes";
          expect(() => palette.addBasicPalette(dir)).not.toThrow();
        });
      });
    });
  });
});
