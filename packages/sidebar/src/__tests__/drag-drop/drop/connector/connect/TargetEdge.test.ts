import { TargetEdge } from "../../../../..";
import { testProps } from "./base";

describe("TargetEdge", () => {
  const opts = {};

  let instance;
  beforeEach(() => {
    instance = new TargetEdge(opts);
  });

  describe("instance", () => {
    describe("properties", () => {
      describe("graph", () => {
        it("is set", () => {
          expect(instance.graph).toBeDefined();
        });
      });

      testProps(instance);

      describe("useParent", () => {
        it("is set", () => {
          expect(instance.useParent).toBeDefined();
        });
      });

      describe("geo", () => {
        it("is set", () => {
          expect(instance.geo).toBeDefined();
        });
      });

      describe("geo2", () => {
        it("is set", () => {
          expect(instance.geo2).toBeDefined();
        });
      });

      describe("offset", () => {
        it("is set", () => {
          expect(instance.offset).toBeDefined();
        });
      });

      describe("tmpState", () => {
        it("is set", () => {
          expect(instance.tmpState).toBeDefined();
        });
      });

      describe("hasParent", () => {
        it("is set", () => {
          expect(instance.hasParent).toBeDefined();
        });
      });
    });

    describe("methods", () => {
      describe("hasTerminalPoints(geo)", () => {
        const geo = {};
        it("no throw", () => {
          expect(() => instance.hasTerminalPoints(geo)).not.toThrow();
        });
      });

      describe("getTerminalPoints(geo)", () => {
        it("no throw", () => {
          const geo = {};
          expect(() => instance.getTerminalPoints(geo)).not.toThrow();
        });
      });

      describe("copyTerminalPoints()", () => {
        it("no throw", () => {
          expect(() => instance.copyTerminalPoints()).not.toThrow();
        });
      });

      describe("moveCellsByOffset()", () => {
        it("no throw", () => {
          expect(() => instance.moveCellsByOffset()).not.toThrow();
        });
      });

      describe("setTerminal()", () => {
        it("no throw", () => {
          expect(() => instance.setTerminal()).not.toThrow();
        });
      });

      describe("addTerminalToEdge()", () => {
        it("no throw", () => {
          expect(() => instance.addTerminalToEdge()).not.toThrow();
        });
      });
    });
  });
});
