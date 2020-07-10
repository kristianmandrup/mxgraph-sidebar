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
      describe("editorUi", () => {
        it("is set", () => {
          expect(instance.getTooltipOffset).toBeDefined();
        });
      });
    });

    describe("methods", () => {
      describe("showTooltip(elem, cells, w, h, title)", () => {
        it("shows tooltip", () => {
          const elem = document.createElement("div");
          const cells = [{}];
          const w = 100;
          const h = 100;
          const title = "title";
          expect(() =>
            instance.showTooltip(elem, cells, w, h, title)
          ).not.toThrow();
        });
      });

      describe("hideTooltip()", () => {
        it("hides tooltip", () => {
          expect(() => instance.hideTooltip()).not.toThrow();
        });
      });

      describe("showLater()", () => {
        it("sets window timeout to trigger show", () => {
          expect(() => instance.showLater()).not.toThrow();
        });
      });

      describe("show(element, opts)", () => {
        it("shows tooltip", () => {
          const elem = document.createElement("div");
          const opts = {};
          expect(() => instance.show(elem, opts)).not.toThrow();
        });
      });

      describe("createTooltipDisplayer(element, opts)", () => {
        it("creates a TooltipDisplayer", () => {
          const elem = document.createElement("div");
          const opts = {};
          expect(instance.createTooltipDisplayer(elem, opts)).toBeDefined();
        });
      });

      describe("resetThread()", () => {
        it("resets thread", () => {
          expect(() => instance.resetThread()).not.toThrow();
        });
      });
    });
  });
});
