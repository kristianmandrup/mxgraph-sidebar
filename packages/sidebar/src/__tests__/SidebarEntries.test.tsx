import { SidebarEntries } from "..";
import { editorUi } from "./mocks";

describe("SidebarEntries", () => {
  let instance;
  beforeAll(() => {
    instance = new SidebarEntries(editorUi);
  });

  describe("instance", () => {
    describe("properties", () => {
      describe("editorUi", () => {
        test("to be set", () => {
          expect(instance.editorUi).toBe(editorUi);
        });
      });

      describe("cellCreator", () => {
        test("is a CellCreator instance", () => {
          expect(instance.cellCreator).toBeDefined();
        });
      });

      describe("taglist", () => {
        test("empty array", () => {
          expect(instance.taglist.length).toBe(0);
        });
      });
    });

    describe("methods", () => {
      describe("#addDataEntry", () => {
        const tags = ["x"], width = 200, height = 100, title = "abc", data = {};
        test("does not throw", () => {
          expect(() => instance.addDataEntry(tags, width, height, title, data))
            .not.toThrow();
        });
      });

      describe("#decompress", () => {
        const data = {};
        test("does not throw", () => {
          expect(() => instance.decompress(data))
            .not.toThrow();
        });
      });

      describe("#addEntries", () => {
        const image = {
          data: "x",
          tags: ["a", "b"],
          title: "abc",
          aspect: "fixed",
          w: 100,
          height: 100,
        };
        const images = [image];
        test("does not throw", () => {
          expect(() => instance.addEntries(images))
            .not.toThrow();
        });
      });

      describe("#addEntry", () => {
        const tags = ["a", "b"];
        test("does not throw", () => {
          expect(() => instance.addEntry(tags))
            .not.toThrow();
        });
      });

      describe("#searchEntries", () => {
        const searchTerms = "model", count = 1, page = 0;
        const success = (_results, _count, _on, _terms) => {};
        test("does not throw", () => {
          expect(() =>
            instance.searchEntries(searchTerms, count, page, success)
          )
            .not.toThrow();
        });
      });
    });
  });
});
