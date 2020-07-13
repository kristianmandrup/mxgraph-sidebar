import { PaletteAdder } from "../../../palette";
import { Sidebar } from "../../../side";
import { editorUi } from "../../mocks";

describe("PaletteAdder", () => {
  const editorElem = document.createElement("editor");
  const sidebar = new Sidebar(editorUi, editorElem);

  let instance;
  beforeAll(() => {
    instance = new PaletteAdder(sidebar);
  });

  describe("instance", () => {
    describe("properties", () => {
      describe("sidebar", () => {
        test("to be set", () => {
          expect(instance.sidebar).toBe(sidebar);
        });
      });
    });

    describe("methods", () => {
      describe("addPalette(id, title, {expanded, onInit})", () => {
        const id = "x";
        const title = "stuff";
        const expanded = true;
        const onInit = () => {};

        test("does not throw", () => {
          expect(instance.addPalette(id, title, { expanded, onInit })).not
            .toThrow();
        });
      });

      describe("addFoldingHandler(title, content, funct)", () => {
        const title = "stuffed";
        const content = "some stuff";
        const funct = () => {};

        test("does not throw", () => {
          expect(instance.addFoldingHandler(title, content, funct)).not
            .toThrow();
        });
      });

      describe("storePaletteElements(id, titleElement)", () => {
        const titleElement = document.createElement("div");
        const id = "basic";

        test("does not throw", () => {
          expect(instance.storePaletteElements(id, titleElement)).not
            .toThrow();
        });
      });

      describe("appendTitleToContainer(title)", () => {
        const title = "basic";

        test("does not throw", () => {
          expect(instance.appendTitleToContainer(title)).not
            .toThrow();
        });
      });
    });
  });
});
