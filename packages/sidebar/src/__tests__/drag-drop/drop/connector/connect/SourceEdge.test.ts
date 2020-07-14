import { SourceEdge } from "../../../../..";
import { testProps } from "./base";

describe("SourceEdge", () => {
  const opts = {};

  let instance;
  beforeEach(() => {
    instance = new SourceEdge(opts);
  });

  describe("instance", () => {
    describe("properties", () => {
      describe("graph", () => {
        it("is set", () => {
          expect(instance.graph).toBeDefined();
        });
      });

      testProps(instance);
    });

    describe("methods", () => {
      describe("addTerminalToEdge()", () => {
        it("is set", () => {
          expect(() => instance.addTerminalToEdge()).not.toThrow();
        });
      });
    });
  });
});
