import { InsideBoundsConfig } from "../../../../..";
import { editorUi } from "../../../../mocks";

describe("InsideBoundsConfig", () => {
  const dropArrow = {};
  const opts = {
    dropArrow,
  };
  let instance;
  beforeEach(() => {
    instance = new InsideBoundsConfig(editorUi, opts);
  });

  describe("instance", () => {
    describe("properties", () => {
      describe("dropArrow", () => {
        it("is set", () => {
          expect(instance.dropArrow).toBe(dropArrow);
        });
      });

      describe("isInsideBounds", () => {
        it("is false", () => {
          expect(instance.isInsideBounds).toBeFalsy();
        });
      });

      describe("isEdgeCell", () => {
        it("is false", () => {
          expect(instance.isEdgeCell).toBeFalsy();
        });
      });

      describe("bbox", () => {
        it("is set", () => {
          expect(instance.bbox).toBeDefined();
        });
      });

      describe("bds", () => {
        it("is set", () => {
          expect(instance.bds).toBeDefined();
        });
      });
    });

    describe("methods", () => {
      describe("postProcess()", () => {
        it("post processing", () => {
          expect(() => instance.postProcess()).not.toThrow();
        });
      });

      describe("addBoxTolerance()", () => {
        it("adds box tolerance", () => {
          expect(() => instance.addBoxTolerance()).not.toThrow();
        });
      });

      describe("processCell()", () => {
        it("processes non-edge cell", () => {
          expect(() => instance.processCell()).not.toThrow();
        });
      });

      describe("processEdgeCell()", () => {
        it("processes edge cell", () => {
          expect(() => instance.processEdgeCell()).not.toThrow();
        });
      });

      describe("createBds()", () => {
        it("creates bds", () => {
          expect(instance.createBds()).toBeDefined();
        });
      });

      describe("addBoxes()", () => {
        it("adds direction arrows to box", () => {
          expect(() => instance.addBoxes()).not.toThrow();
        });
      });

      describe("bboxUp()", () => {
        it("ads up arrow to box", () => {
          expect(() => instance.bboxUp()).not.toThrow();
        });
      });

      describe("bboxRight()", () => {
        it("ads right arrow to box", () => {
          expect(() => instance.bboxRight()).not.toThrow();
        });
      });

      describe("bboxDown()", () => {
        it("ads down arrow to box", () => {
          expect(() => instance.bboxDown()).not.toThrow();
        });
      });

      describe("bboxLeft()", () => {
        it("ads left arrow to box", () => {
          expect(() => instance.bboxLeft()).not.toThrow();
        });
      });

      describe("checkBounds()", () => {
        it("checks bounds", () => {
          expect(() => instance.checkBounds()).not.toThrow();
        });
      });
    });
  });
});
