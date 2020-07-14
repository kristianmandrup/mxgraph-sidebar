import { DropConnector } from "../../../..";
import { editorUi } from "../../../mocks";

describe("DropConnector", () => {
  let instance;
  beforeEach(() => {
    instance = new DropConnector(editorUi);
  });

  const source = {};
  const target = {};
  const targets = [target];
  const direction = "left";
  const dropCellIndex = 0;
  const evt = {};

  describe("instance", () => {
    describe("properties", () => {});

    describe("methods", () => {
      describe("createDropConnect()", () => {
        it("no throw", () => {
          expect(() => instance.createDropConnect()).not.toThrow();
        });
      });

      describe("createDropConnect()", () => {
        it("no throw", () => {
          expect(() => instance.createDropConnect()).not.toThrow();
        });
      });

      describe("createDropConnectGeo()", () => {
        it("no throw", () => {
          expect(() => instance.createDropConnectGeo()).not.toThrow();
        });
      });

      describe("dropAndConnect(source, targets, direction, dropCellIndex, evt)", () => {
        it("no throw", () => {
          expect(() =>
            instance.dropAndConnect(
              source,
              targets,
              direction,
              dropCellIndex,
              evt
            )
          ).not.toThrow();
        });
      });

      describe("getDropAndConnectGeometry(source, target, direction, targets)", () => {
        it("no throw", () => {
          expect(() =>
            instance.getDropAndConnectGeometry(
              source,
              target,
              direction,
              targets
            )
          ).not.toThrow();
        });
      });
      //
      //
      //
    });
  });
});
