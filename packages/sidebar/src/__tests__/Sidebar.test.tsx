import { editorUi, graph } from "./mocks";
import { Sidebar } from "../Sidebar";

describe("SidebarPaletteSetup", () => {
  const container = document.createElement("x");

  let instance;
  beforeAll(() => {
    instance = new Sidebar(editorUi, container);
  });

  describe("instance", () => {
    describe("properties", () => {
      describe("editorUi", () => {
        test("to be set", () => {
          expect(instance.editorUi).toBe(editorUi);
        });
      });

      describe("graph", () => {
        test("to be set", () => {
          expect(instance.graph).toBe(graph);
        });
      });

      describe("palettes", () => {
        test("to be set", () => {
          expect(instance.palettes).toBeDefined();
        });
      });

      describe("paletteManager", () => {
        test("to be set", () => {
          expect(instance.paletteManager).toBeDefined();
        });
      });

      describe("thumbnail", () => {
        test("to be set", () => {
          expect(instance.thumbnail).toBeDefined();
        });
      });

      describe("documentMode", () => {
        test("to be set", () => {
          expect(instance.documentMode).toBeDefined();
        });
      });

      describe("sidebar handlers", () => {
        describe("pointerUpHandler", () => {
          test("is set", () => {
            expect(instance.pointerUpHandler).toBeDefined();
          });
        });

        describe("pointerDownHandler", () => {
          test("is set", () => {
            expect(instance.pointerDownHandler).toBeDefined();
          });
        });

        describe("pointerMoveHandler", () => {
          test("is set", () => {
            expect(instance.pointerMoveHandler).toBeDefined();
          });
        });

        describe("pointerOutHandler", () => {
          test("is set", () => {
            expect(instance.pointerOutHandler).toBeDefined();
          });
        });
      });
    });

    describe("methods", () => {
      describe("#init", () => {
        test("does not throw", () => {
          expect(() => instance.init()).not.toThrow();
        });
      });
      describe("#getTooltipOffset", () => {
        test("does not throw", () => {
          expect(() => instance.getTooltipOffset()).not.toThrow();
        });
      });
      describe("#getTooltipOffset", () => {
        const elem = document.createElement("a");
        const cells = [];
        const w = 500, h = 200, title = "tools";
        test("does not throw", () => {
          expect(() => instance.showTooltip(elem, cells, w, h, title))
            .not.toThrow();
        });
      });
      describe("#hideTooltip", () => {
        test("does not throw", () => {
          expect(() => instance.hideTooltip()).not.toThrow();
        });
      });
      describe("#filterTags", () => {
        const tags = ["x"];
        test("does not throw", () => {
          expect(() => instance.filterTags(tags)).not.toThrow();
        });
      });
      describe("#cloneCell", () => {
        const cell = {}, value = "x";
        test("does not throw", () => {
          expect(() => instance.cloneCell(cell, value)).not.toThrow();
        });
      });

      describe("#addSearchPalette", () => {
        test("does not throw", () => {
          expect(() => instance.addSearchPalette()).not.toThrow();
        });
      });

      describe("#insertSearchHint", () => {
        const div = document.createElement("div"), searchTerm = "hello";
        test("does not throw", () => {
          expect(() => instance.insertSearchHint(div, searchTerm))
            .not.toThrow();
        });
      });

      describe("#addSearchPalette", () => {
        const label = "x";
        test("does not throw", () => {
          expect(() => instance.createTitle(label)).not.toThrow();
        });
      });

      describe("#createThumb", () => {
        const cells = [],
          width = 600,
          height = 400,
          parent = document.createElement("x"),
          title = "hello";
        test("does not throw", () => {
          expect(() =>
            instance.createThumb(cells, width, height, parent, title)
          ).not.toThrow();
        });
      });

      describe("#createItem", () => {
        const cells = [],
          width = 600,
          height = 400,
          title = "hello";
        const showLabel = true,
          showTitle = true,
          allowCellsInserted = true;

        test("does not throw", () => {
          expect(() =>
            instance.createItem(
              cells,
              title,
              showLabel,
              showTitle,
              width,
              height,
              allowCellsInserted,
            )
          ).not.toThrow();
        });
      });

      describe("#updateShapes", () => {
        const source = {}, targets = [{}];
        test("does not throw", () => {
          expect(() => instance.updateShapes(source, targets)).not.toThrow();
        });
      });

      describe("#createDropHandler", () => {
        const cells = [{}],
          allowSplit = true,
          allowCellsInserted = true,
          bounds = {};
        test("does not throw", () => {
          expect(() =>
            instance.createDropHandler(
              cells,
              allowSplit,
              allowCellsInserted,
              bounds,
            )
          ).not.toThrow();
        });
      });

      describe("#createDropHandler", () => {
        const width = 600, height = 400;
        test("does not throw", () => {
          expect(() => instance.createDragPreview(width, height)).not.toThrow();
        });
      });

      describe("#dropAndConnect", () => {
        const source = {}, targets = [{}];
        const direction = "left", dropCellIndex = 0, evt = {};
        test("does not throw", () => {
          expect(() =>
            instance.dropAndConnect(
              source,
              targets,
              direction,
              dropCellIndex,
              evt,
            )
          ).not.toThrow();
        });
      });

      describe("#isDropStyleEnabled", () => {
        const cells = [], firstVertex = {};
        test("does not throw", () => {
          expect(() => instance.isDropStyleEnabled(cells, firstVertex)).not
            .toThrow();
        });
      });

      describe("#isDropStyleTargetIgnored", () => {
        const state = {};
        test("does not throw", () => {
          expect(() => instance.isDropStyleTargetIgnored(state)).not.toThrow();
        });
      });

      describe("#createDragSource", () => {
        const elem = document.createElement("a");
        const dropHandler = (evt) => {};
        const preview = true, cells = [], bounds = {};
        test("does not throw", () => {
          expect(() =>
            instance.createDragSource(elem, dropHandler, preview, cells, bounds)
          ).not.toThrow();
        });
      });

      describe("#itemClicked", () => {
        const elem = document.createElement("a");
        const ds = {}, evt = {};
        const cells = [];
        test("does not throw", () => {
          expect(() => instance.itemClicked(cells, ds, evt, elem)).not
            .toThrow();
        });
      });

      describe("#addClickHandler", () => {
        const elem = document.createElement("a");
        const ds = {};
        const cells = [];
        test("does not throw", () => {
          expect(() => instance.addClickHandler(elem, ds, cells)).not
            .toThrow();
        });
      });

      describe("#addEntry", () => {
        const tags = ["x"];
        test("does not throw", () => {
          expect(() => instance.addEntry(tags)).not
            .toThrow();
        });
      });

      describe("#addFoldingHandler", () => {
        const title = "x", content = "xx", funct = () => {};
        test("does not throw", () => {
          expect(() => instance.addFoldingHandler(title, content, funct)).not
            .toThrow();
        });
      });
      describe("#getTagsForStencil", () => {
        const packageName = "x", stencilName = "abc", moreTags = ["a", "b"];
        test("does not throw", () => {
          expect(() =>
            instance.getTagsForStencil(packageName, stencilName, moreTags)
          ).not
            .toThrow();
        });
      });
    });
  });
});
