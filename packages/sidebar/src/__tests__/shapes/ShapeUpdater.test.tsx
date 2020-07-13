import { CellCreator, ShapeUpdater } from "../../shapes";
import { editorUi } from "../mocks";

describe("ImagePaletteAdder", () => {
  const cellCreator = new CellCreator();

  let updater;
  beforeAll(() => {
    updater = new ShapeUpdater(cellCreator);
  });

  describe("instance", () => {
    describe("editorUi", () => {
      test("to be set", () => {
        expect(updater.editorUi).toBe(editorUi);
      });
    });

    // createAdvancedShapes
  });
});
