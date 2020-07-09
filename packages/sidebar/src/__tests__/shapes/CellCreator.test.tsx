import { editorUi } from "../mocks";
import { CellCreator } from "../../shapes/CellCreator";
import { SidebarEntries } from "../../SidebarEntries";

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
    const entries = new SidebarEntries();

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
