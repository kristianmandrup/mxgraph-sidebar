import { ImagePaletteAdder } from "../..";
import { editorUi } from "../mocks";
import { Palettes } from "../../palette";
import { Sidebar } from "../../side";

describe("ImagePaletteAdder", () => {
  const container = document.createElement("a");
  const sidebar = new Sidebar(editorUi, container);
  const palettes = new Palettes(sidebar);

  let adder;
  beforeAll(() => {
    adder = new ImagePaletteAdder(palettes);
  });

  describe("instance", () => {
    describe("properties", () => {
      describe("palettes", () => {
        test("to be set", () => {
          expect(adder.palettes).toBe(palettes);
        });
      });

      describe("dir", () => {
        test("to be set", () => {
          expect(adder.dir).toBe("/");
        });
      });

      describe("items", () => {
        test("non-empty array", () => {
          expect(adder.items.length).toBeGreaterThan(0);
        });
      });

      describe("id", () => {
        test("is set", () => {
          expect(adder.id).toEqual("clipart");
        });
      });

      describe("title", () => {
        test("is set", () => {
          expect(adder.title).toBeDefined();
        });
      });

      describe("prefix", () => {
        test("is set", () => {
          expect(adder.prefix).toBeDefined();
        });
      });

      describe("postfix", () => {
        test("is set", () => {
          expect(adder.postfix).toBeDefined();
        });
      });

      describe("tags", () => {
        test("is set", () => {
          expect(adder.tags).toBeDefined();
        });
      });

      describe("titles", () => {
        test("is set", () => {
          expect(adder.titles).not.toBeUndefined();
        });
      });
    });
  });

  describe("methods", () => {
    describe("add()", () => {
      test("not to throw", () => {
        expect(() => adder.add()).not.toThrow();
      });
    });
  });
});
