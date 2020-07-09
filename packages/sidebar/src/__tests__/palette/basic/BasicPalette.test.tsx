import { Sidebar, BasicPalette } from "../../..";
import { editorUi } from "../mocks";

describe("BasicPalette", () => {
  const editorElem = document.createElement("editor");
  const $sidebar = new Sidebar(editorUi, editorElem);
  const create = (sidebar = $sidebar) => new BasicPalette(sidebar);

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
