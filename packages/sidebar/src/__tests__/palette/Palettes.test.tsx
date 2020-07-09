import { Palettes } from "../../palette";
import { Sidebar } from "../../Sidebar";
import { editorUi } from "../mocks";

describe("Palettes", () => {
  const editorElem = document.createElement("editor");
  const sidebar = new Sidebar(editorUi, editorElem);

  let instance;
  beforeAll(() => {
    instance = new Palettes(sidebar);
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
      describe("#addPalette", () => {
        const id = "x";
        const title = "stuff";
        const expanded = true;
        const onInit = () => {};

        test("does not throw", () => {
          expect(instance.addPalette(id, title, expanded, onInit)).not
            .toThrow();
        });
      });

      describe("#addAll", () => {
        const expansion = { basic: true };

        test("does not throw", () => {
          expect(instance.addAll(expansion)).not
            .toThrow();
        });
      });

      describe("#addArrowsPalette", () => {
        test("does not throw", () => {
          expect(instance.addArrowsPalette()).not
            .toThrow();
        });
      });

      describe("#addFlowchartPalette", () => {
        test("does not throw", () => {
          expect(instance.addFlowchartPalette()).not
            .toThrow();
        });
      });

      describe("#addStencilPalette", () => {
        const opts = {
          id: "stencil",
          title: "Stencils",
          stencilFile: "/stencils",
          style: "",
        };
        test("does not throw", () => {
          expect(instance.addStencilPalette(opts)).not
            .toThrow();
        });
      });

      describe("#addSearchPalette", () => {
        test("does not throw", () => {
          expect(instance.addSearchPalette()).not
            .toThrow();
        });
      });

      describe("#addGeneralPalette", () => {
        test("does not throw", () => {
          expect(instance.addGeneralPalette()).not
            .toThrow();
        });
      });

      describe("#addBasicPalette", () => {
        test("does not throw", () => {
          expect(instance.addBasicPalette("left")).not
            .toThrow();
        });
      });

      describe("#addMiscPalette", () => {
        test("does not throw", () => {
          expect(instance.addMiscPalette()).not
            .toThrow();
        });
      });

      describe("#addAdvancedPalette", () => {
        test("does not throw", () => {
          expect(instance.addAdvancedPalette()).not
            .toThrow();
        });
      });

      describe("#createAdvancedShapes", () => {
        test("does not throw", () => {
          expect(instance.createAdvancedShapes()).not
            .toThrow();
        });
      });

      describe("#addPaletteFunctions", () => {
        const id = "x", title = "my title", expanded = true, fns = [];
        test("does not throw", () => {
          expect(instance.addPaletteFunctions(id, title, expanded, fns)).not
            .toThrow();
        });
      });

      describe("#addUmlPalette", () => {
        test("does not throw", () => {
          expect(instance.addUmlPalette()).not
            .toThrow();
        });
      });

      describe("#addBpmnPalette", () => {
        test("does not throw", () => {
          expect(instance.addBpmnPalette("left")).not
            .toThrow();
        });
      });

      describe("#addImagePalette", () => {
        const opts = {
          id: "bmpn",
          title: "BPMN",
          prefix: "-",
          postfix: ":",
          items: [{}],
          titles: ["x"],
          tags: ["a"],
        };

        test("does not throw", () => {
          expect(instance.addImagePalette(opts)).not
            .toThrow();
        });
      });
    });
  });
});
