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
    });
  });
});
