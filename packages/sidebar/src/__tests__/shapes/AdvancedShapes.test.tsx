import { CellCreator, AdvancedShapes } from "../../shapes";
import { editorUi } from "../mocks";

describe("ImagePaletteAdder", () => {
  const cellCreator = new CellCreator();

  let handler;
  beforeAll(() => {
    handler = new AdvancedShapes(cellCreator);
  });

  describe("instance", () => {
    describe("editorUi", () => {
      test("to be set", () => {
        expect(handler.editorUi).toBe(editorUi);
      });
    });

    // createAdvancedShapes
  });
});
