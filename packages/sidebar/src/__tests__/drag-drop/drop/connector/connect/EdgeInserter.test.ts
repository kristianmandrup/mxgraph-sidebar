import { EdgeInserter } from "../../../../..";
import { testProps } from "./base";

describe("EdgeInserter", () => {
  const opts = {};

  let instance;
  beforeEach(() => {
    instance = new EdgeInserter(opts);
  });

  describe("instance", () => {
    describe("properties", () => {
      describe("graph", () => {
        it("is set", () => {
          expect(instance.graph).toBeDefined();
        });
      });

      describe("geo2", () => {
        it("is set", () => {
          expect(instance.geo2).toBeDefined();
        });
      });

      testProps(instance);
    });

    describe("methods", () => {
      describe("setGeo()", () => {
        it("is set", () => {
          expect(instance.setGeo()).toBeDefined();
        });
      });

      describe("insert()", () => {
        it("is set", () => {
          expect(instance.insert()).toBeDefined();
        });
      });

      describe("insertEdge()", () => {
        it("is set", () => {
          expect(instance.insertEdge()).toBeDefined();
        });
      });
    });
  });
});
