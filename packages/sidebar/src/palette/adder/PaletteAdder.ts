import mx from "@mxgraph-app/mx";
const { mxClient } = mx;
import { PaletteDelegator } from "../PaletteDelegator";
import { FoldingHandler } from "../../folding";

type TOnInit = (content, title?) => void;

const noop = () => {};

export class PaletteAdder extends PaletteDelegator {
  originalNoForeignObject: any; // Editor.prototype.originalNoForeignObject;
  expanded: boolean = false;
  onInit: any;
  outer: any;
  div: any;

  /**
   * Adds the given palette.
   */
  /**
   * @param  { string } id
   * @param  { string } title
   * @param  { boolean } expanded
   * @param  { function } onInit
   */
  addPalette(
    id: string,
    title: string,
    opts: { expanded?: boolean; onInit?: TOnInit } = {}
  ) {
    const { expanded, onInit } = opts;
    this.expanded = !!expanded;
    this.onInit = onInit || noop;
    const titleElement = this.appendTitleToContainer(title);
    const div = this.createMainDiv();
    this.appendDivToContainer(div);
    this.addFoldingHandler(titleElement, div, onInit);
    this.storePaletteElements(id, titleElement);
    return div;
  }

  storePaletteElements(id, titleElement) {
    // Keeps references to the DOM nodes
    if (!id) return;
    this.palettes[id] = [titleElement, this.outer];
  }

  appendTitleToContainer(title) {
    var titleElement = this.createTitle(title);
    this.container.appendChild(titleElement);
    return titleElement;
  }

  appendDivToContainer(div) {
    const outer = this.appendDivToOuter(div);
    this.container.appendChild(outer);
  }

  appendDivToOuter(div) {
    const outer = document.createElement("div");
    outer.appendChild(div);
    this.outer = outer;
    return outer;
  }

  createMainDiv() {
    const { expanded, onInit } = this;
    var div = document.createElement("div");
    div.className = "geSidebar";

    // Disables built-in pan and zoom in IE10 and later
    if (mxClient.IS_POINTER) {
      div.style.touchAction = "none";
    }

    if (expanded) {
      onInit(div);
    } else {
      div.style.display = "none";
    }
    this.div = div;
    return div;
  }

  /**
   * Create the given title element.
   */
  addFoldingHandler(title, content, funct) {
    new FoldingHandler({ title, content, funct }).configure();
  }
}
