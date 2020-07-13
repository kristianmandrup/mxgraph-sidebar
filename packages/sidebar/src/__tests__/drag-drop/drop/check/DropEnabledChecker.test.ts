import { DropEnabledChecker } from "../../../..";
import { editorUi } from "../../../mocks";

describe("DropEnabledChecker", () => {
  const opts = {
    firstVertex: {},
    cells: [{}],
  };

  let instance;
  beforeEach(() => {
    instance = new DropEnabledChecker(editorUi, opts);
  });

  describe("instance", () => {
    describe("properties", () => {});
  });
});
