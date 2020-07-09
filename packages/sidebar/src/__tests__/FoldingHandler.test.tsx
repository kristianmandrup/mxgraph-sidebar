import { FoldingHandler } from "..";
import { editorUi } from "./mocks";
import { Sidebar } from "../Sidebar";

describe("ImagePaletteAdder", () => {
  const ui = editorUi;
  const container = document.createElement("editor");
  let sidebar = new Sidebar(ui, container);

  let handler;
  beforeAll(() => {
    handler = new FoldingHandler(sidebar);
  });

  describe("instance", () => {
    describe("properties", () => {
      describe("editorUi", () => {
        test("to be set", () => {
          expect(handler.editorUi).toBe(editorUi);
        });
      });

      describe("graph", () => {
        test("to be set", () => {
          expect(handler.graph).toBeDefined();
        });
      });

      describe("collapsedImage", () => {
        test("to be set", () => {
          expect(handler.collapsedImage).toBeDefined();
        });
      });

      describe("expandedImage", () => {
        test("to be set", () => {
          expect(handler.expandedImage).toBeDefined();
        });
      });

      describe("documentMode", () => {
        test("to be set", () => {
          expect(handler.documentMode).toBeDefined();
        });
      });
    });

    describe("methods", () => {
      const title = "xx", content = "avc", funct = () => {};
      describe("add", () => {
        test("does not throw", () => {
          expect(handler.add(title, content, funct)).not.toThrow();
        });
      });
    });
  });
});
