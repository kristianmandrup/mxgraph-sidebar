import { Tooltip } from "../..";
import { editorUi } from "../mocks";

describe("Tooltip", () => {
  let instance;

  beforeAll(() => {
    instance = new Tooltip(editorUi);
  });

  describe("instance", () => {
    describe("properties", () => {
      describe("editorUi", () => {
        it("is set", () => {
          expect(instance.editorUi).toBe(editorUi);
        });
      });

      describe("getTooltipOffset", () => {
        it("is set", () => {
          expect(instance.getTooltipOffset).toBeDefined();
        });
      });

      describe("shouldCreateTooltipTitleElem", () => {
        it("is true", () => {
          expect(instance.shouldCreateTooltipTitleElem).toBeTruthy();
        });
      });

      describe("hasTooltipTitle", () => {
        it("is true", () => {
          expect(instance.hasTooltipTitle).toBeTruthy();
        });
      });

      describe("x0", () => {
        it("is set", () => {
          expect(instance.x0).toBeDefined();
        });
      });

      describe("y0", () => {
        it("is set", () => {
          expect(instance.y0).toBeDefined();
        });
      });

      describe("body", () => {
        it("is set", () => {
          expect(instance.body).toBeDefined();
        });
      });

      describe("docElem", () => {
        it("is set", () => {
          expect(instance.docElem).toBeDefined();
        });
      });

      describe("off", () => {
        it("is set", () => {
          expect(instance.off).toBeDefined();
        });
      });

      describe("bottom", () => {
        it("is set", () => {
          expect(instance.bottom).toBeDefined();
        });
      });

      describe("left", () => {
        it("is set", () => {
          expect(instance.left).toBeDefined();
        });
      });

      describe("top", () => {
        it("is set", () => {
          expect(instance.top).toBeDefined();
        });
      });

      describe("isSvg", () => {
        it("is true", () => {
          expect(instance.isSvg).toBeTruthy();
        });
      });
    });

    describe("methods", () => {
      describe("createGraphInstance()", () => {
        it("creates graph instance", () => {
          expect(instance.createGraphInstance()).toBeDefined();
        });
      });

      describe("createTooltipAndGraph()", () => {
        it("creates tooltip and graph - no throw", () => {
          expect(() => instance.createTooltipAndGraph()).not.toThrow();
        });
      });

      describe("createGraph()", () => {
        it("creates graph", () => {
          expect(() => instance.createGraph()).not.toThrow();
        });
      });

      describe("createTooltip()", () => {
        it("creates tooltip", () => {
          expect(() => instance.createTooltip()).not.toThrow();
        });
      });

      describe("appendTooltip()", () => {
        it("creates and appends tooltip", () => {
          expect(() => instance.appendTooltip()).not.toThrow();
        });
      });

      describe("configureGraph()", () => {
        it("configures graph", () => {
          expect(() => instance.configureGraph()).not.toThrow();
        });
      });

      describe("scaleGraph()", () => {
        it("scales graph", () => {
          expect(() => instance.scaleGraph()).not.toThrow();
        });
      });

      describe("setTooltipBounds()", () => {
        it("set tooltip bounds", () => {
          expect(() => instance.setTooltipBounds()).not.toThrow();
        });
      });

      describe("appendNewTooltipTitleElem()", () => {
        it("creates and appends tooltip title element", () => {
          expect(() => instance.appendNewTooltipTitleElem()).not.toThrow();
        });
      });

      describe("resetTooltipTitleElem()", () => {
        it("resets tooltip title element", () => {
          expect(() => instance.resetTooltipTitleElem()).not.toThrow();
        });
      });

      describe("setTooltipTitle()", () => {
        describe("append", () => {
          it("appends tooltip title element", () => {
            expect(() => instance.setTooltipTitle()).not.toThrow();
          });
        });

        describe("hide", () => {
          it("hides tooltip title element", () => {
            expect(() => instance.setTooltipTitle()).not.toThrow();
          });
        });
      });

      describe("hideTooltipTitle()", () => {
        it("hides tooltip title element", () => {
          expect(() => instance.hideTooltipTitle()).not.toThrow();
        });
      });

      describe("styleTooltipTitle()", () => {
        it("styles tooltip title element", () => {
          expect(() => instance.styleTooltipTitle()).not.toThrow();
        });
      });

      describe("setAndStyleTooltipTitle()", () => {
        describe("append", () => {
          it("appends tooltip title element", () => {
            expect(() => instance.setAndStyleTooltipTitle()).not.toThrow();
          });
        });

        describe("hide", () => {
          it("hides tooltip title element", () => {
            expect(() => instance.setAndStyleTooltipTitle()).not.toThrow();
          });
        });
      });

      describe("createTooltipTitleElem()", () => {
        it("no throw", () => {
          expect(() => instance.createTooltipTitleElem()).not.toThrow();
        });

        it("creates tooltip title element", () => {
          expect(instance.createTooltipTitleElem()).toBeDefined();
        });
      });

      describe("allowWiderLabels()", () => {
        it("adjusts tooltip label bounds", () => {
          expect(() => instance.allowWiderLabels()).not.toThrow();
        });
      });

      describe("initGraph()", () => {
        it("initializes graph", () => {
          expect(() => instance.initGraph()).not.toThrow();
        });
      });

      describe("addCellsToGraph()", () => {
        it("adds cells to graph", () => {
          expect(() => instance.addCellsToGraph()).not.toThrow();
        });
      });

      describe("show()", () => {
        it("shows tooltip", () => {
          expect(() => instance.show()).not.toThrow();
        });
      });

      describe("ie9QuirksFix()", () => {
        it("applies ie9 quirks fix", () => {
          expect(() => instance.ie9QuirksFix()).not.toThrow();
        });
      });

      describe("adjustTooltipBounds()", () => {
        it("ajusts tooltip bounds", () => {
          expect(() => instance.adjustTooltipBounds()).not.toThrow();
        });
      });

      describe("setDrawPaneStyle()", () => {
        it("sets element drawpane style", () => {
          expect(() => instance.setDrawPaneStyle()).not.toThrow();
        });
      });

      describe("svgTransform()", () => {
        it("applies SVG transform", () => {
          expect(() => instance.svgTransform()).not.toThrow();
        });
      });
    });
  });
});
