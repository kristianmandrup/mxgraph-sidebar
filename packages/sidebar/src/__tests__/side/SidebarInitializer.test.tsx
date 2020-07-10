import { SidebarInitializer } from "../..";

import { editorUi } from "../mocks";
import { Sidebar } from "../../side";

describe("SidebarInitializer", () => {
  const ui = editorUi;
  const container = document.createElement("editor");
  let sidebar = new Sidebar(ui, container);
  let initializer;
  beforeAll(() => {
    initializer = new SidebarInitializer(sidebar);
  });

  describe("instance", () => {
    describe("properties", () => {
      describe("sidebar", () => {
        test("to be set", () => {
          expect(initializer.sidebar).toBe(sidebar);
        });
      });

      describe("editorUi", () => {
        test("to be set", () => {
          expect(initializer.editorUi).toBe(editorUi);
        });
      });

      describe("graph", () => {
        test("is not set", () => {
          expect(initializer.graph).toBeUndefined();
        });
      });

      describe("container", () => {
        test("to be set", () => {
          expect(initializer.container).toBe(container);
        });
      });
    });

    describe("methods", () => {
      describe("#initialize", () => {
        initializer.initialize();

        describe("graph", () => {
          test("is set", () => {
            expect(initializer.graph).toBeDefined();
          });
        });

        describe("sidebar handlers", () => {
          describe("pointerUpHandler", () => {
            test("is set", () => {
              expect(sidebar.pointerUpHandler).toBeDefined();
            });
          });

          describe("pointerDownHandler", () => {
            test("is set", () => {
              expect(sidebar.pointerDownHandler).toBeDefined();
            });
          });

          describe("pointerMoveHandler", () => {
            test("is set", () => {
              expect(sidebar.pointerMoveHandler).toBeDefined();
            });
          });

          describe("pointerOutHandler", () => {
            test("is set", () => {
              expect(sidebar.pointerOutHandler).toBeDefined();
            });
          });
        });
      });
    });
  });
});
