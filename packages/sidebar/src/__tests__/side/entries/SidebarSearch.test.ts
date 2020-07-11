import { SidebarSearch } from "../../..";
import { editorUi } from "../../mocks";
import { Sidebar } from "../../../side";

describe("SidebarDestroyer", () => {
  const ui = editorUi;
  const container = document.createElement("editor");
  let sidebar = new Sidebar(ui, container);

  let instance;
  beforeAll(() => {
    instance = new SidebarSearch(sidebar);
  });
});
