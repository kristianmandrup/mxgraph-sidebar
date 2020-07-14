import { ArrowCreator } from "../../../..";

describe("ArrowCreator", () => {
  const refreshTarget = {};
  const img = new Image();
  img.src = "x";
  const tooltip = "hello";

  const opts = {
    refreshTarget,
    img,
    tooltip,
  };
  let instance;
  beforeEach(() => {
    instance = new ArrowCreator(opts);
  });

  describe("instance", () => {
    describe("properties", () => {
      describe("refreshTarget", () => {
        it("is set", () => {
          expect(instance.refreshTarget).toBe(refreshTarget);
        });
      });

      describe("img", () => {
        it("is set", () => {
          expect(instance.img).toBe(img);
        });
      });

      describe("tooltip", () => {
        it("is set", () => {
          expect(instance.tooltip).toBe(tooltip);
        });
      });

      describe("isIE6", () => {
        it("is false", () => {
          expect(instance.isIE6).toBeFalsy();
        });
      });
    });

    describe("methods", () => {
      describe("create()", () => {
        it("creates an arrow", () => {
          expect(instance.create()).toBeDefined();
        });
      });

      describe("setArrow()", () => {
        it("sets arrow properties", () => {
          expect(instance.setArrow()).toBeDefined();
        });
      });

      describe("setArrowTitle()", () => {
        it("sets arrow title", () => {
          expect(instance.setArrowTitle()).toBeDefined();
        });
      });

      describe("styleArrow()", () => {
        it("sets arrow styling", () => {
          expect(instance.styleArrow()).toBeDefined();
        });
      });

      describe("createArrow()", () => {
        it("creates arrow", () => {
          expect(instance.createArrow()).toBeDefined();
        });
      });

      describe("createDefaultArrow()", () => {
        it("creates default arrow", () => {
          expect(instance.createDefaultArrow()).toBeDefined();
        });
      });

      describe("ie6Arrow()", () => {
        it("creates ie6 arrow", () => {
          expect(instance.ie6Arrow()).toBeDefined();
        });
      });
    });
  });
});
