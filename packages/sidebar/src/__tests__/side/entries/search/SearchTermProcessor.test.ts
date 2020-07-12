import { SidebarSearch } from "../../../..";
import { editorUi } from "../../../mocks";
import { Sidebar } from "../../../../side";

describe("SidebarDestroyer", () => {
  const ui = editorUi;
  const container = document.createElement("editor");
  let sidebar = new Sidebar(ui, container);

  let instance;
  beforeAll(() => {
    instance = new SidebarSearch(sidebar);
  });

  describe("instance", () => {
    describe("properties", () => {
      describe("sidebar", () => {
        it("is set", () => {
          expect(instance.sidebar).toBe(sidebar);
        });
      });
    });

    describe("methods", () => {
      describe("reset()", () => {
        beforeAll(() => {
          instance.reset();
        });

        it("results empty", () => {
          expect(instance.results).toEqual([]);
        });

        it("index 0", () => {
          expect(instance.index).toEqual(0);
        });
      });

      describe("processSearchTerm(term)", () => {
        const term = "x";
        instance.tagList = { x: ["x"] };

        let result;
        beforeAll(() => {
          result = instance.processSearchTerm(term);
        });

        it("is true", () => {
          expect(result).toBeTruthy();
        });

        it("index is 1", () => {
          expect(instance.index).toEqual(1);
        });

        it("dict has entry", () => {
          // expect(instance.dict).toEqual("x");
        });
      });

      describe("processEntry(entry)", () => {
        const entry = {
          entries: ["x"],
        };
        instance.tagList = { x: ["x"] };

        let result;
        beforeAll(() => {
          result = instance.processEntry(entry);
        });

        it("is truthy", () => {
          expect(result).toBeTruthy();
        });

        it("has result", () => {
          expect(instance.results[0]).toBeDefined();
        });

        it("tmpDict has entry", () => {
          // expect(instance.dict).toEqual("x");
        });
      });

      describe("processSearchResults(entry)", () => {
        const entry = {
          entries: ["x"],
        };
        instance.tagList = { x: ["x"] };

        let result;
        beforeAll(() => {
          result = instance.processSearchResults(entry);
        });

        it("is truthy", () => {
          expect(result).toBeTruthy();
        });

        it("has result", () => {
          expect(instance.results[0]).toBeDefined();
        });

        it("tmpDict has entry", () => {
          // expect(instance.dict).toEqual("x");
        });
      });
    });
  });
});
