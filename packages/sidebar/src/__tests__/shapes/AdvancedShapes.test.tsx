import { AdvancedShapes } from "../../shapes";
import { editorUi } from "../mocks";
import { CellCreator } from "../../shapes/CellCreator";

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
