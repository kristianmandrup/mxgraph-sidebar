import { Sidebar, MiscPalette } from "../../..";
import { editorUi } from "../mocks";

describe("MiscPalette", () => {
  const editorElem = document.createElement("editor");
  const $sidebar = new Sidebar(editorUi, editorElem);
  const create = (sidebar = $sidebar) => new MiscPalette(sidebar);

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
