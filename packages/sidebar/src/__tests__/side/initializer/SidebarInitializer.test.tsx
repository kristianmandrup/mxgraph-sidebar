import { SidebarInitializer } from "../../..";

import { editorUi } from "../../mocks";
import { Sidebar } from "../../../side";

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

      describe("graph", () => {
        test("is set", () => {
          expect(initializer.graph).toBeDefined();
        });
      });
    });

    describe("methods", () => {
      describe("appendGraphElemToDocument()", () => {
        test("no throw", () => {
          expect(() => initializer.appendGraphElemToDocument()).toBeDefined();
        });
      });

      describe("configure()", () => {
        test("no throw", () => {
          expect(() => initializer.configure()).toBeDefined();
        });
      });

      describe("configureSideBar()", () => {
        test("no throw", () => {
          expect(() => initializer.configureSideBar()).toBeDefined();
        });
      });

      describe("configureGraph()", () => {
        test("no throw", () => {
          expect(() => initializer.configureGraph()).toBeDefined();
        });
      });

      describe("addScrollHandler()", () => {
        test("no throw", () => {
          expect(() => initializer.addScrollHandler()).toBeDefined();
        });
      });

      describe("addPointerHandlers()", () => {
        test("no throw", () => {
          expect(() => initializer.addPointerHandlers()).toBeDefined();
        });
      });

      describe("addPointerMoveHandler()", () => {
        test("no throw", () => {
          expect(() => initializer.addPointerMoveHandler()).toBeDefined();
        });
      });

      describe("addPointerOutHandler()", () => {
        test("no throw", () => {
          expect(() => initializer.addPointerOutHandler()).toBeDefined();
        });
      });

      describe("addPointerDownHandler()", () => {
        test("no throw", () => {
          expect(() => initializer.addPointerDownHandler()).toBeDefined();
        });
      });

      describe("addPointerUpHandler()", () => {
        test("no throw", () => {
          expect(() => initializer.addPointerUpHandler()).toBeDefined();
        });
      });

      describe("#initialize", () => {
        initializer.initialize();

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
