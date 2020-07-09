import { SingleClickInserter } from "..";
import { editorUi, graph } from "./mocks";

describe("SingleClickInserter", () => {
  const source = {};
  const targets = [{}];

  let inserter;
  beforeAll(() => {
    inserter = new SingleClickInserter(editorUi);
  });

  describe("instance", () => {
    describe("properties", () => {
      describe("editorUi", () => {
        test("to be set", () => {
          expect(inserter.editorUi).toBe(editorUi);
        });
      });
    });

    describe("dropAndConnect", () => {
      const source = {};
      const targets = {};
      const direction = "";
      const dropCellIndex = 0;
      const evt = {};

      describe("simple test", () => {
        const dropConnect = inserter.dropAndConnect(
          source,
          targets,
          direction,
          dropCellIndex,
          evt,
        );

        test("returns DropConnect", () => {
          expect(dropConnect).toBeDefined();
        });
      });
    });

    describe("updateShapes", () => {
      describe("simple test", () => {
        const dropConnect = inserter.updateShapes(source, targets);

        test("returns ShapeUpdater", () => {
          expect(dropConnect).toBeDefined();
        });
      });
    });

    describe("itemClicked", () => {
      describe("simple test", () => {
        const cells = [{}], ds = {}, evt = {};

        test("returns ShapeUpdater", () => {
          expect(() => inserter.itemClicked(cells, ds, evt)).toBeDefined();
        });
      });
    });
  });
});
