import { DropConnect } from "../../../../..";
import { editorUi } from "../../../../mocks";

describe("DropConnect", () => {
  const opts = {};

  let instance;
  beforeEach(() => {
    instance = new DropConnect(editorUi, opts);
  });

  describe("instance", () => {
    describe("properties", () => {
      describe("editorUi", () => {
        it("is set", () => {
          expect(instance.editorUi).toBe(editorUi);
        });
      });

      describe("graph", () => {
        it("is set", () => {
          expect(instance.graph).toBeDefined();
        });
      });

      describe("source", () => {
        it("is set", () => {
          expect(instance.source).toBeDefined();
        });
      });

      describe("targets", () => {
        it("is set", () => {
          expect(instance.targets).toBeDefined();
        });
      });

      describe("direction", () => {
        it("is set", () => {
          expect(instance.direction).toBeDefined();
        });
      });

      describe("dropCellIndex", () => {
        it("is set", () => {
          expect(instance.dropCellIndex).toBeDefined();
        });
      });

      describe("evt", () => {
        it("is set", () => {
          expect(instance.evt).toBeDefined();
        });
      });

      describe("geo", () => {
        it("is set", () => {
          expect(instance.geo).toBeDefined();
        });
      });

      describe("sourceGeo", () => {
        it("is set", () => {
          expect(instance.sourceGeo).toBeDefined();
        });
      });

      describe("geo2", () => {
        it("is set", () => {
          expect(instance.geo2).toBeDefined();
        });
      });

      describe("targetParent", () => {
        it("is set", () => {
          expect(instance.targetParent).toBeDefined();
        });
      });

      describe("layoutManager", () => {
        it("is set", () => {
          expect(instance.layoutManager).toBeDefined();
        });
      });

      describe("layout", () => {
        it("is set", () => {
          expect(instance.layout).toBeDefined();
        });
      });

      describe("isEditingCell", () => {
        it("is set", () => {
          expect(instance.isEditingCell).toBeDefined();
        });
      });
    });

    describe("methods", () => {
      describe("calcGeo()", () => {
        it("is set", () => {
          expect(instance.calcGeo()).toBeDefined();
        });
      });

      describe("adjustPosition()", () => {
        beforeAll(() => {
          instance.adjustPosition();
        });

        it("sets validLayout false", () => {
          expect(instance.validLayout).toBeFalsy();
        });

        it("sets geo", () => {
          expect(instance.geo).toBeDefined();
        });
      });

      describe("getTargets()", () => {
        it("is set", () => {
          expect(instance.getTargets()).toBeDefined();
        });
      });

      describe("setDeltaGeo()", () => {
        beforeAll(() => {
          instance.setDeltaGeo();
        });

        it("sets dx", () => {
          expect(instance.dx).toBeDefined();
        });

        it("sets dy", () => {
          expect(instance.dy).toBeDefined();
        });
      });

      describe("setDelta(dx, dy)", () => {
        beforeAll(() => {
          instance.setDelta(10, 20);
        });

        it("sets dx to 10", () => {
          expect(instance.dx).toEqual(10);
        });

        it("sets dy to 20", () => {
          expect(instance.dy).toEqual(20);
        });
      });

      describe("dropAndConnect()", () => {
        it("no throw", () => {
          expect(() => instance.dropAndConnect()).not.toThrow();
        });
      });

      describe("handleError(e)", () => {
        it("no throw", () => {
          const e = {};
          expect(() => instance.handleError(e)).not.toThrow();
        });
      });

      describe("notifyCellsInserted()", () => {
        it("no throw", () => {
          const e = {};
          expect(() => instance.notifyCellsInserted()).not.toThrow();
        });
      });

      describe("postProcess()", () => {
        it("no throw", () => {
          const e = {};
          expect(() => instance.postProcess()).not.toThrow();
        });
      });

      describe("editCell()", () => {
        it("no throw", () => {
          const e = {};
          expect(() => instance.editCell()).not.toThrow();
        });
      });
    });
  });
});
