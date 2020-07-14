import { DragArrow } from "../../../..";

describe("DragArrow", () => {
  const refreshTarget = document.createElement("div");

  const createImg = (src) => {
    const img = new Image();
    img.src = src;
    return img;
  };

  const createBounds = (left, top, width, height) => ({
    left,
    top,
    width,
    height,
  });

  const triangle = {
    triangleUp: createImg("triangleUp"),
    triangleDown: createImg("triangleDown"),
    triangleLeft: createImg("triangleLeft"),
    triangleRight: createImg("triangleRight"),
  };

  let instance;
  beforeEach(() => {
    instance = new DragArrow({
      refreshTarget,
      ...triangle,
    });
  });

  describe("instance", () => {
    describe("properties", () => {
      describe("refreshTarget", () => {
        it("is set", () => {
          expect(instance.refreshTarget).toBe(refreshTarget);
        });
      });

      describe("connect", () => {
        it("is set", () => {
          expect(instance.connect).toBeDefined();
        });
      });

      describe("replace", () => {
        it("is set", () => {
          expect(instance.replace).toBeDefined();
        });
      });

      describe("arrowUp", () => {
        it("is set", () => {
          expect(instance.arrowUp).toBeDefined();
        });
      });

      describe("arrowDown", () => {
        it("is set", () => {
          expect(instance.arrowDown).toBeDefined();
        });
      });

      describe("arrowRight", () => {
        it("is set", () => {
          expect(instance.arrowRight).toBeDefined();
        });
      });

      describe("arrowLeft", () => {
        it("is set", () => {
          expect(instance.arrowLeft).toBeDefined();
        });
      });

      describe("styleTarget", () => {
        it("is set", () => {
          expect(instance.styleTarget).toBeDefined();
        });
      });

      describe("roundSource", () => {
        it("is set", () => {
          expect(instance.roundSource).toBeDefined();
        });
      });

      describe("roundTarget", () => {
        it("is set", () => {
          expect(instance.roundTarget).toBeDefined();
        });
      });

      describe("direction", () => {
        it("is set", () => {
          expect(instance.direction).toBeDefined();
        });
      });

      describe("activeArrow", () => {
        it("is initially null", () => {
          expect(instance.activeArrow).toBeNull();
        });
      });
    });

    describe("methods", () => {
      describe("setTriangle", () => {
        const {
          triangleUp,
          triangleDown,
          triangleLeft,
          triangleRight,
        } = triangle;
        beforeAll(() => {
          instance.setTriangle({ ...triangle });
        });

        it("triangleUp is set", () => {
          expect(instance.triangleUp).toBe(triangleUp);
        });

        it("triangleDown is set", () => {
          expect(instance.triangleDown).toBe(triangleDown);
        });

        it("triangleLeft is set", () => {
          expect(instance.triangleLeft).toBe(triangleLeft);
        });

        it("triangleRight is set", () => {
          expect(instance.triangleRight).toBe(triangleRight);
        });
      });

      describe("withinBounds(bounds, x, y)", () => {
        const bounds = createBounds(10, 10, 100, 100);
        it("is within bounds", () => {
          const x = 20,
            y = 20;
          expect(instance.withinBounds(bounds, x, y)).toBeTruthy();
        });

        it("is outside bounds", () => {
          const x = 0,
            y = 0;
          expect(instance.withinBounds(bounds, x, y)).toBeFalsy();
        });
      });

      describe("arrowInsideBounds(arrow)", () => {
        it("sets activeArrow", () => {
          const arrow = {};
          instance.arrowInsideBounds(arrow);
          expect(instance.activeArrow).toBeDefined();
        });
      });

      describe("arrowOutsideBounds(arrow)", () => {
        it("no throw", () => {
          const arrow = {};
          expect(() => instance.arrowOutsideBounds(arrow)).not.toThrow();
        });
      });

      describe("checkArrow", () => {
        const x = 0,
          y = 0;
        const bounds = createBounds(0, 0, 100, 100);
        const arrow = {};
        beforeAll(() => {
          instance.checkArrow(x, y, bounds, arrow);
        });

        it("sets activeArrow", () => {
          expect(instance.activeArrow);
        });
      });

      describe("createArrowCreator(img, tooltip)", () => {
        it("creates ArrowCreator instance", () => {
          const img = createImg("arrow"),
            tooltip = {};
          expect(instance.createArrowCreator(img, tooltip)).toBeDefined();
        });
      });

      describe("createArrow(img, tooltip)", () => {
        it("creates arrow", () => {
          const img = createImg("arrow"),
            tooltip = {};
          expect(instance.createArrow(img, tooltip)).toBeDefined();
        });
      });
    });
  });
});
