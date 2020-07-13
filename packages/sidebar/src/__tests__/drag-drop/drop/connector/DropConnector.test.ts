import { DropConnector } from "../../../..";
import { editorUi } from "../../../mocks";

describe("DropConnector", () => {
  const opts = {
    dropConnect: {},
  };

  let instance;
  beforeEach(() => {
    instance = new DropConnector(editorUi, opts);
  });

  describe("instance", () => {
    describe("properties", () => {});
  });
});
