import { Thumbnail } from "../..";
import { editorUi } from "../mocks";

describe("SidebarEntries", () => {
  const ui = editorUi;

  let thumbnail;
  beforeAll(() => {
    thumbnail = new Thumbnail(editorUi);
  });

  describe("instance", () => {
    describe("editorUi", () => {
      test("to be set", () => {
        expect(thumbnail.editorUi).toBe(editorUi);
      });
    });

    describe("createThumb", () => {
      const cells = [];
      const width = 100;
      const height = 100;
      const parent = document.createElement("x");
      const title = "thumb";
      const showLabel = true;
      const showTitle = true;

      const thumb = thumbnail.createThumb(
        cells,
        width,
        height,
        parent,
        title,
        showLabel,
        showTitle,
      );

      test("creates thumbnail", () => {
        expect(thumbnail.editorUi).toBe(editorUi);
      });
    });
  });
});
