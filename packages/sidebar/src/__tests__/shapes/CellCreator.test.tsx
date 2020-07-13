import { editorUi } from "../mocks";
import { CellCreator } from "../../shapes/CellCreator";
import { SidebarEntries } from "../../side";

describe("ImagePaletteAdder", () => {
  describe("create - no entries", () => {
    let creator;
    beforeAll(() => {
      creator = new CellCreator();
    });

    describe("instance", () => {
      describe("entries", () => {
        test("to be set", () => {
          expect(creator.entries).toBeDefined();
        });
      });
    });
  });

  describe("create - with entries", () => {
    const entries = new SidebarEntries(editorUi);

    let creator;
    beforeAll(() => {
      creator = new CellCreator(entries);
    });

    describe("instance", () => {
      describe("entries", () => {
        test("to be set", () => {
          expect(creator.entries).toBe(entries);
        });
      });
    });
  });
});
