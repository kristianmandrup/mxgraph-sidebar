import { SidebarDestroyer } from "../../..";
import { editorUi } from "../../mocks";
import { Sidebar } from "../../../side";

describe("SidebarDestroyer", () => {
  const ui = editorUi;
  const container = document.createElement("editor");
  let sidebar = new Sidebar(ui, container);

  let instance;
  beforeAll(() => {
    instance = new SidebarDestroyer(sidebar);
  });

  describe("instance", () => {
    describe("properties", () => {
      describe("editorUi", () => {
        test("to be set", () => {
          expect(instance.editorUi).toBe(editorUi);
        });
      });

      describe("pointerUpHandler", () => {
        test("to be set", () => {
          expect(instance.pointerUpHandler).toBeDefined();
        });
      });

      describe("pointerDownHandler", () => {
        test("to be set", () => {
          expect(instance.pointerDownHandler).toBeDefined();
        });
      });

      describe("pointerMoveHandler", () => {
        test("to be set", () => {
          expect(instance.pointerMoveHandler).toBeDefined();
        });
      });

      describe("pointerOutHandler", () => {
        test("to be set", () => {
          expect(instance.pointerOutHandler).toBeDefined();
        });
      });
    });
  });

  describe("methods", () => {
    // destroy()
    // removePointerHandlers()
    // destroyGraph()
    // removePointerMoveHandler()
    // removePointerOutHandler()
    // removePointerDownHandler()
    // removePointerUpHandler()
  });
});
