import { ImagePaletteAdder } from "..";
import { editorUi } from "./mocks";
import { Palettes } from "../palette";
import { Sidebar } from "../Sidebar";

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
    });
  });

  describe("methods", () => {
    describe("add", () => {
      test("to be set", () => {
        expect(() => adder.add()).not.toThrow();
      });
    });
  });
});
