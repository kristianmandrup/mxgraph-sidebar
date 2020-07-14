import { DropConnectGeo } from "../../../../..";
import { editorUi } from "../../../../mocks";

describe("DropConnectGeo", () => {
  // const opts = {};

  let instance;
  beforeEach(() => {
    instance = new DropConnectGeo(editorUi);
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

      describe("view", () => {
        it("is set", () => {
          expect(instance.view).toBeDefined();
        });
      });

      describe("geo", () => {
        it("is set", () => {
          expect(instance.geo).toBeDefined();
        });
      });

      describe("geo2", () => {
        it("is set", () => {
          expect(instance.geo2).toBeDefined();
        });
      });

      describe("keepSize", () => {
        it("is set", () => {
          expect(instance.keepSize).toBeDefined();
        });
      });
    });

    describe("methods", () => {
      describe("connect()", () => {
        it("no throw", () => {
          expect(() => instance.connect()).not.toThrow();
        });
      });
    });
  });
});
