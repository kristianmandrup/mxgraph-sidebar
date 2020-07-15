import { DropConnector } from "../../../..";
import { editorUi } from "../../../mocks";

describe("DropConnector", () => {
  let instance;
  beforeEach(() => {
    instance = new DropConnector(editorUi);
  });

  const force = {};
  const evt = {};

  describe("instance", () => {
    describe("properties", () => {
      describe("editorUi", () => {
        it("is set", () => {
          expect(instance.editorUi).toBeDefined();
        });
      });

      describe("container", () => {
        it("is set", () => {
          expect(instance.container).toBeDefined();
        });
      });

      describe("cells", () => {
        it("is set", () => {
          expect(instance.cells).toBeDefined();
        });
      });

      describe("allowSplit", () => {
        it("is set", () => {
          expect(instance.allowSplit).toBeDefined();
        });
      });

      describe("allowCellsInserted", () => {
        it("is set", () => {
          expect(instance.allowCellsInserted).toBeDefined();
        });
      });

      describe("bounds", () => {
        it("is set", () => {
          expect(instance.bounds).toBeDefined();
        });
      });
    });

    describe("methods", () => {
      describe("createDropElement(force, evt)", () => {
        it("no throw", () => {
          expect(() => instance.createDropElement(force, evt)).not.toThrow();
        });
      });

      describe("create()", () => {
        it("no throw", () => {
          expect(() => instance.create()).not.toThrow();
        });
      });

      describe("process(opts)", () => {
        it("no throw", () => {
          const opts = {};
          expect(() => instance.process(opts)).not.toThrow();
        });
      });

      describe("shouldProcess(element, graph)", () => {
        it("no throw", () => {
          const element = document.createElement("div");
          const graph = editorUi.editor.graph;
          expect(() => instance.shouldProcess(element, graph)).not.toThrow();
        });
      });

      describe("setElementToParent(element)", () => {
        it("no throw", () => {
          const element = document.createElement("div");
          expect(() => instance.setElementToParent(element)).not.toThrow();
        });
      });
    });
  });
});
