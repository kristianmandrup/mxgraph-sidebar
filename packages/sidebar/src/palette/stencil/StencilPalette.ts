import { AbstractPalette } from "../AbstractPalette";
import { StencilIndexLoader } from "./StencilIndexLoader";
import { StencilDefaultLoader } from "./StencilDefaultLoader";
import { Sidebar } from "../../";

export class StencilPalette extends AbstractPalette {
  addStencilsToIndex: any; // fn

  stencilIndexLoader: StencilIndexLoader;
  stencilDefaultLoader: StencilDefaultLoader;

  constructor(sidebar: Sidebar) {
    super(sidebar);
    this.addStencilsToIndex = sidebar.addStencilsToIndex;
    this.stencilIndexLoader = new StencilIndexLoader(sidebar);
    this.stencilDefaultLoader = new StencilDefaultLoader(sidebar);
  }

  filterTags(tags) {
    return this.sidebar.filterTags(tags);
  }

  /**
   * Adds the given stencil palette.
   */
  create(opts: any = {}) {
    opts.scale = opts.scale != null ? opts.scale : 1;
    if (this.addStencilsToIndex) {
      this.stencilIndexLoader.load(opts);
    } else {
      this.stencilDefaultLoader.load(opts);
    }
  }
}
