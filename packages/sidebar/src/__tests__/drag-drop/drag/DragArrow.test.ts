import { DragArrow } from "../../..";

describe("DragArrow", () => {
  const refreshTarget = document.createElement("div");

  const createImg = (src) => {
    const img = new Image();
    img.src = src;
    return img;
  };

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
    });
  });
});
