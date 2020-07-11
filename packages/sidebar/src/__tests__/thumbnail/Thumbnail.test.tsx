import { Thumbnail } from "../..";
import { editorUi } from "../mocks";

describe("SidebarEntries", () => {
  const ui = editorUi;

  let thumbnail;
  beforeAll(() => {
    thumbnail = new Thumbnail(editorUi);
  });

  describe("instance", () => {
    describe("properties", () => {
      describe("editorUi", () => {
        it("is set", () => {
          expect(thumbnail.editorUi).toBe(editorUi);
        });
      });

      describe("s", () => {
        it("is set", () => {
          expect(thumbnail.s).toBeDefined();
        });
      });

      describe("bounds", () => {
        it("is set", () => {
          expect(thumbnail.bounds).toBeDefined();
        });
      });
    });

    describe("methods", () => {
      describe("createMainNode()", () => {
        it("created main node element", () => {
          expect(thumbnail.createMainNode()).toBeDefined();
        });
      });

      describe("scaleAndTranslateGraph()", () => {
        it("adds cells to graph", () => {
          expect(() => thumbnail.scaleAndTranslateGraph()).not.toThrow();
        });
      });

      describe("addCellsToGraph()", () => {
        it("adds cells to graph", () => {
          expect(() => thumbnail.addCellsToGraph()).not.toThrow();
        });
      });

      describe("catchAllEventHandling()", () => {
        it("configures node elem", () => {
          expect(() => thumbnail.catchAllEventHandling()).not.toThrow();
        });
      });

      describe("configureNode()", () => {
        it("configures node elem", () => {
          const node = thumbnail.configureNode();
          expect(node).toBeDefined();
        });
      });

      describe("appendNode()", () => {
        it("appends node to parent", () => {
          const node = thumbnail.appendNode();
          expect(node).toBeDefined();
        });
      });

      describe("createTitleElem()", () => {
        it("creates title element", () => {
          const elem = thumbnail.createTitleElem();
          expect(elem).toBeDefined();
        });
      });

      describe("addTitleElement()", () => {
        it("sets title element", () => {
          thumbnail.addTitleElement();
          expect(thumbnail.titleElem).toBeDefined();
        });
      });

      describe("createThumb", () => {
        const cells = [];
        const width = 100;
        const height = 100;
        const parent = document.createElement("x");
        const title = "thumb";
        const showLabel = true;
        const showTitle = true;

        const bounds = thumbnail.createThumb(
          cells,
          width,
          height,
          parent,
          title,
          showLabel,
          showTitle,
        );

        test("returns bounds", () => {
          expect(bounds).toBeDefined();
        });

        test("sets titleElem", () => {
          expect(thumbnail.titleElem).toBeDefined();
        });

        test("sets node", () => {
          expect(thumbnail.node).toBeDefined();
        });
      });
    });
  });
});
