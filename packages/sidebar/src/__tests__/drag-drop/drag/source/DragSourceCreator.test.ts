import { DragSourceCreator } from "../../../..";
import { editorUi } from "../../../mocks";

describe("DragSourceCreator", () => {
  const element = document.createElement("div");
  const dropHandler = () => {};
  const preview = true;
  const cells = [{}];

  const opts = { element, dropHandler, preview, cells };

  let instance;
  beforeEach(() => {
    instance = new DragSourceCreator(editorUi, opts);
  });

  describe("instance", () => {
    describe("properties", () => {
      describe("ui", () => {
        it("is set", () => {
          expect(instance.ui).toBeDefined();
        });
      });

      describe("graph", () => {
        it("is set", () => {
          expect(instance.graph).toBeDefined();
        });
      });

      describe("element", () => {
        it("is set", () => {
          expect(instance.element).toBeDefined();
        });
      });

      describe("dropHandler", () => {
        it("is set", () => {
          expect(instance.dropHandler).toBeDefined();
        });
      });

      describe("preview", () => {
        it("is set", () => {
          expect(instance.preview).toBeDefined();
        });
      });

      describe("cells", () => {
        it("is set", () => {
          expect(instance.cells).toBeDefined();
        });
      });
    });

    describe("methods", () => {
      describe("create()", () => {
        it("no throw", () => {
          expect(() => instance.create()).not.toThrow();
        });

        describe("onDrag(graph, evt, target, x, y)", () => {
          it("no throw", () => {
            const { graph } = instance;
            const evt = {};
            const target = {};
            const x = 0,
              y = 0;
            expect(() =>
              instance.onDrag(graph, evt, target, x, y)
            ).not.toThrow();
          });
        });
      });
    });
  });
});
