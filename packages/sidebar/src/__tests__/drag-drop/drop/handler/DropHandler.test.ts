import { DropConnector } from "../../../..";
import { editorUi } from "../../../mocks";

describe("DropConnector", () => {
  let instance;
  beforeEach(() => {
    instance = new DropConnector(editorUi);
  });

  const force = {};
  const evt = {};

  describe("instance", () => {
    describe("properties", () => {});

    describe("methods", () => {
      describe("createDropElement(force, evt)", () => {
        it("no throw", () => {
          expect(() => instance.createDropElement(force, evt)).not.toThrow();
        });
      });

      describe("create()", () => {
        it("no throw", () => {
          expect(() => instance.create()).not.toThrow();
        });
      });
    });
  });
});
