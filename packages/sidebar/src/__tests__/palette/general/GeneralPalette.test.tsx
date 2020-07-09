import { Sidebar, GeneralPalette } from "../../..";
import { editorUi } from "../mocks";

describe("GeneralPalette", () => {
  const editorElem = document.createElement("editor");
  const $sidebar = new Sidebar(editorUi, editorElem);
  const create = (sidebar = $sidebar) => new GeneralPalette(sidebar);

  let palette;
  beforeAll(() => {
    palette = create();
  });

  describe("instance", () => {
    describe("sidebar", () => {
      test("to be set", () => {
        expect(palette.sidebar).toBe($sidebar);
      });
    });
  });
});
