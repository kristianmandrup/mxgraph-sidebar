import { AbstractShaper } from "../shapes/AbstractShaper";
import { Sidebar } from "../Sidebar";

export class AbstractPalette extends AbstractShaper {
  addDataEntry: any;
  sidebar: Sidebar;

  constructor(sidebar: Sidebar) {
    super();
    this.sidebar = sidebar;
  }

  get graph() {
    return this.sidebar.graph;
  }

  get paletteManager() {
    return this.sidebar.paletteManager;
  }

  addPalette(id, title, expanded, fns) {
    return this.paletteManager.addPalette(id, title, expanded, fns);
  }

  addPaletteFunctions(id, title, expanded, fns) {
    return this.paletteManager.addPaletteFunctions(id, title, expanded, fns);
  }

  /**
   * Creates the array of tags for the given stencil. Duplicates are allowed and will be filtered out later.
   */
  getTagsForStencil(packageName, stencilName, moreTags?) {
    return this.sidebar.getTagsForStencil(packageName, stencilName, moreTags);
  }

  // Avoids having to bind all functions to "this"
  get sb() {
    return this;
  }
}
