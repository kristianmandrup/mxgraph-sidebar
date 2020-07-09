import { SidebarPaletteSetup } from "..";
import { editorUi, graph } from "./mocks";
import { Sidebar } from "../Sidebar";

describe("SidebarPaletteSetup", () => {
  const opts = {};
  const container = document.createElement("x");
  const sidebar = new Sidebar(editorUi, container);

  let instance;
  beforeAll(() => {
    instance = new SidebarPaletteSetup(sidebar, opts);
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

      describe("palettes", () => {
        test("to be set", () => {
          expect(instance.palettes).toBeDefined();
        });
      });

      describe("documentMode", () => {
        test("to be set", () => {
          expect(instance.documentMode).toBe(sidebar.documentMode);
        });
      });

      describe("thumbPadding", () => {
        test("is 0", () => {
          expect(instance.thumbPadding).toEqual(0);
        });
      });

      describe("thumbBorder", () => {
        test("is 1", () => {
          expect(instance.thumbBorder).toEqual(1);
        });
      });

      describe("thumbWidth", () => {
        test("is 32", () => {
          expect(instance.thumbWidth).toEqual(32);
        });
      });

      describe("thumbWidth", () => {
        test("is 32", () => {
          expect(instance.thumbHeight).toEqual(30);
        });
      });

      describe("minThumbStrokeWidth", () => {
        test("is 32", () => {
          expect(instance.minThumbStrokeWidth).toEqual(1.3);
        });
      });

      describe("thumbAntiAlias", () => {
        test("is 32", () => {
          expect(instance.thumbAntiAlias).toBeTruthy();
        });
      });
    });

    describe("methods", () => {
      describe("#init", () => {
        test("does not throw", () => {
          expect(() => instance.init()).not.toThrow();
        });
      });

      describe("#configure", () => {
        beforeAll(() => {
          instance.configure();
        });

        test("does not throw", () => {
          expect(() => instance.configure()).not.toThrow();
        });

        describe("configured", () => {
          describe("thumbPadding", () => {
            test("is 0", () => {
              expect(instance.thumbPadding).toEqual(0);
            });
          });

          describe("thumbBorder", () => {
            test("is 1", () => {
              expect(instance.thumbBorder).toEqual(1);
            });
          });

          describe("thumbWidth", () => {
            test("is 32", () => {
              expect(instance.thumbWidth).toEqual(32);
            });
          });

          describe("minThumbStrokeWidth", () => {
            test("is 32", () => {
              expect(instance.minThumbStrokeWidth).toEqual(1.3);
            });
          });

          describe("thumbAntiAlias", () => {
            test("is 32", () => {
              expect(instance.thumbAntiAlias).toBeTruthy();
            });
          });
        });
      });
    });
  });
});
