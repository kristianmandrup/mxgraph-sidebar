import { DropTargetDisabler } from "../../../..";
import { editorUi } from "../../../mocks";

describe("DropTargetDisabler", () => {
  let instance;
  beforeEach(() => {
    instance = new DropTargetDisabler(editorUi);
  });

  describe("instance", () => {
    describe("properties", () => {
      describe("shouldDisable", () => {
        it("is false", () => {
          expect(instance.shouldDisable).toBeFalsy();
        });
      });
    });

    describe("methods", () => {
      describe("disable()", () => {
        it("disables", () => {
          expect(() => instance.disable()).not.toThrow();
        });
      });
    });
  });
});
