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

      describe("success", () => {
        it("is set", () => {
          expect(instance.success).toBeDefined();
        });
      });

      describe("dict", () => {
        it("is set", () => {
          expect(instance.dict).toBeDefined();
        });
      });

      describe("tmpDict", () => {
        it("is set", () => {
          expect(instance.tmpDict).toBeDefined();
        });
      });

      describe("results", () => {
        it("is empty array", () => {
          expect(instance.results).toBeDefined();
          expect(instance.results.length).toEqual(0);
        });
      });

      describe("index", () => {
        it("is 0", () => {
          expect(instance.index).toEqual(0);
        });
      });

      describe("searchTerms", () => {
        it("is empty string", () => {
          expect(instance.searchTerms).toEqual("");
        });
      });

      describe("terms", () => {
        it("is empty array", () => {
          expect(instance.terms).toBeDefined();
          expect(instance.terms.length).toEqual(0);
        });
      });
    });
  });

  describe("methods", () => {
    describe("hasSearchTerms(searchTerms)", () => {
      describe("no search terms", () => {
        it("is false", () => {
          expect(instance.hasSearchTerms("")).toBeFalsy();
        });
      });

      describe("with search terms", () => {
        it("is true", () => {
          instance.tagList = { x: ["x"] };
          expect(instance.hasSearchTerms("x")).toBeTruthy();
        });
      });

      describe("set(searchTerms, { count, page })", () => {
        it("is true", () => {
          const searchTerms = "x",
            count = 50;
          instance.set(searchTerms, { count });
          expect(instance.searchTerms).toEqual(searchTerms);
          expect(instance.count).toEqual(count);
          expect(instance.page).toEqual(0);
        });
      });

      describe("onSearchTerms(searchTerms, { count, page }", () => {
        let result;
        beforeAll(() => {
          const searchTerms = "x",
            count = 50;
          result = instance.onSearchTerms(searchTerms, { count });
        });

        it("is true", () => {
          expect(result).toBeTruthy();
        });
      });

      describe("onNoSearchTerms()", () => {
        it("no throw", () => {
          expect(() => instance.onNoSearchTerms()).not.toThrow();
        });
      });
    });
  });
});
