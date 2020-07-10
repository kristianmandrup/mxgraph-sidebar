import { FoldingHandler } from "../..";
import { editorUi } from "../mocks";
import { Sidebar } from "../../side";

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
      describe("add(title, content, funct)", () => {
        test("does not throw", () => {
          expect(() => handler.add(title, content, funct)).not.toThrow();
        });
      });

      describe("set(title, content, funct)", () => {
        test("does not throw", () => {
          expect(() => handler.set(title, content, funct)).not.toThrow();
        });
      });

      describe("preventFocus()", () => {
        test("does not throw", () => {
          expect(() => handler.preventFocus()).not.toThrow();
        });
      });

      describe("setTitle(title?)", () => {
        test("does not throw", () => {
          expect(() => handler.setTitle(title)).not.toThrow();
        });
      });

      describe("addClickHandler()", () => {
        test("does not throw", () => {
          expect(() => handler.addClickHandler()).not.toThrow();
        });
      });

      describe("clickListener(evt)", () => {
        test("does not throw", () => {
          const evt = { msg: "hello" };
          expect(() => handler.clickListener(evt)).not.toThrow();
        });
      });

      describe("contentDisplay()", () => {
        test("does not throw", () => {
          expect(() => handler.contentDisplay()).not.toThrow();
        });
      });

      describe("contentHidden()", () => {
        test("does not throw", () => {
          expect(() => handler.contentHidden()).not.toThrow();
        });
      });

      describe("initialize()", () => {
        test("does not throw", () => {
          expect(() => handler.initialize()).not.toThrow();
        });
      });

      describe("doDefault()", () => {
        test("does not throw", () => {
          expect(() => handler.doDefault()).not.toThrow();
        });
      });

      describe("doInitialize()", () => {
        test("does not throw", () => {
          expect(() => handler.doInitialize()).not.toThrow();
        });
      });

      describe("ensureWaitCursorMac()", () => {
        test("does not throw", () => {
          expect(() => handler.ensureWaitCursorMac()).not.toThrow();
        });
      });

      describe("setWindowTimeout()", () => {
        test("does not throw", () => {
          expect(() => handler.setWindowTimeout()).not.toThrow();
        });
      });
    });
  });
});
