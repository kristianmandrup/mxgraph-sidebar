import { editorUi } from "../../../../../mocks";
import { InsideBoundsConfig, BoxDirections } from "../../../../../..";
import { CellProcessor } from "../../../../../../drag-drop";

describe("BoxDirections", () => {
  let instance;

  const config = new InsideBoundsConfig(editorUi);
  const processor = new CellProcessor(config);

  beforeEach(() => {
    instance = new BoxDirections(processor);
  });

  describe("instance", () => {
    describe("properties", () => {
      describe("processor", () => {
        it("is set", () => {
          expect(instance.processor).toBe(processor);
        });
      });
    });

    describe("methods", () => {
      describe("addBoxDirections()", () => {
        it("adds box directions", () => {
          expect(() => instance.addBoxDirections()).not.toThrow();
        });
      });

      describe("bboxDown()", () => {
        it("adds box down direction", () => {
          expect(() => instance.bboxDown()).not.toThrow();
        });
      });

      describe("bboxUp()", () => {
        it("adds box up direction", () => {
          expect(() => instance.bboxUp()).not.toThrow();
        });
      });

      describe("bboxLeft()", () => {
        it("adds box left direction", () => {
          expect(() => instance.bboxLeft()).not.toThrow();
        });
      });

      describe("bboxRight()", () => {
        it("adds box rifght direction", () => {
          expect(() => instance.bboxRight()).not.toThrow();
        });
      });
    });
  });
});
