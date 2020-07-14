import { DropTargetEnabler } from "../../../..";
import { editorUi } from "../../../mocks";

describe("DropTargetEnabler", () => {
  let instance;
  beforeEach(() => {
    instance = new DropTargetEnabler(editorUi);
  });

  describe("instance", () => {
    describe("properties", () => {
      describe("shouldReset", () => {
        it("is false", () => {
          expect(instance.shouldReset).toBeFalsy();
        });
      });

      describe("hasTargets", () => {
        it("is false", () => {
          expect(instance.hasTargets).toBeFalsy();
        });
      });
    });

    describe("methods", () => {
      describe("resetTargets()", () => {
        it("resets targets", () => {
          expect(() => instance.resetTargets()).not.toThrow();
        });
      });

      describe("createRect()", () => {
        it("creates rectangle", () => {
          expect(instance.createRect()).toBeDefined();
        });
      });

      describe("createPoint()", () => {
        it("creates point", () => {
          expect(instance.createPoint()).toBeDefined();
        });
      });

      describe("enableTargets()", () => {
        it("enables targets", () => {
          expect(() => instance.enableTargets()).not.toThrow();
        });
      });

      describe("enable()", () => {
        it("enables", () => {
          expect(() => instance.enable()).not.toThrow();
        });
      });
    });
  });
});
