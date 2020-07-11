import { SidebarItemCreator } from "../..";
import { editorUi, graph } from "../mocks";
import { Sidebar } from "../../side";

describe("SidebarItemCreator", () => {
  const opts = {};
  const container = document.createElement("x");
  const sidebar = new Sidebar(editorUi, container);

  let instance;
  beforeAll(() => {
    instance = new SidebarItemCreator(sidebar);
  });

  describe("instance", () => {
    describe("properties", () => {
      describe("sidebar", () => {
        test("to be set", () => {
          expect(instance.sidebar).toBe(sidebar);
        });
      });
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

      describe("bounds", () => {
        test("to be set", () => {
          expect(instance.bounds).toBeDefined();
        });
      });

      describe("isSingleCellDrag", () => {
        test("to be true", () => {
          expect(instance.isSingleCellDrag).toBeTruthy();
        });
      });

      describe("isMultiCellDrag", () => {
        test("to be true", () => {
          expect(instance.isMultiCellDrag).toBeTruthy();
        });
      });
    });
  });

  describe("methods", () => {
    describe("createLinkElement()", () => {
      test("create link element", () => {
        expect(instance.createLinkElement()).toBeDefined();
      });
    });

    describe("multiCellDrag()", () => {
      test("multi cell drag", () => {
        expect(instance.multiCellDrag()).toBeDefined();
      });
    });

    describe("singleCellDrag()", () => {
      test("single cell drag", () => {
        expect(instance.singleCellDrag()).toBeDefined();
      });
    });

    describe("configureDrag()", () => {
      test("configures drag", () => {
        expect(instance.configureDrag()).toBeDefined();
      });
    });

    describe("addToolTipListener()", () => {
      test("adds tooltip activation listener to link element", () => {
        expect(instance.addToolTipListener()).toBeDefined();
      });
    });

    describe("set(cells, title, showLabel, showTitle, width, height, allowCellsInserted)", () => {
      const cells = [],
        title = "a title",
        showLabel = true,
        showTitle = true,
        width = 200,
        height = 100,
        allowCellsInserted = true;
      beforeAll(() => {
        instance.set(
          cells,
          title,
          showLabel,
          showTitle,
          width,
          height,
          allowCellsInserted
        );
      });

      test("sets cells", () => {
        expect(instance.cells).toBe(cells);
      });

      test("sets title", () => {
        expect(instance.title).toBe(title);
      });

      test("sets showLabel", () => {
        expect(instance.showLabel).toBe(showLabel);
      });

      test("sets showTitle", () => {
        expect(instance.showTitle).toBe(showTitle);
      });

      test("sets width", () => {
        expect(instance.width).toBe(width);
      });

      test("sets height", () => {
        expect(instance.height).toBe(height);
      });

      test("sets allowCellsInserted", () => {
        expect(instance.allowCellsInserted).toBe(allowCellsInserted);
      });
    });
  });
});
