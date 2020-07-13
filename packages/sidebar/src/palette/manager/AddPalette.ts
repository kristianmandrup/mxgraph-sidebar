import mx from "@mxgraph-app/mx";
const { mxClient } = mx;
import { PaletteDelegator } from "../PaletteDelegator";

export class AddPalette extends PaletteDelegator {
  container: any;
  id: any;
  title: any;
  expanded: boolean = false;
  onInit: any;
  titleElem: any;
  contentElem: any;
  outerElem: any;

  constructor(sidebar, container, { id, title, expanded, onInit }) {
    super(sidebar);
    this.container = container;
    this.id = id;
    this.title = title;
    this.expanded = expanded;
    this.onInit = onInit;
  }

  appendTitleElement() {
    var elem = this.createTitle(this.title);
    this.container.appendChild(elem);
    this.titleElem = elem;
    return elem;
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
      this.onInit = null;
    } else {
      div.style.display = "none";
    }
    this.contentElem = div;
    return div;
  }

  /**
   * Create the given title element.
   */
  addFoldingHandler() {
    const { titleElem, onInit, contentElem } = this;
    return this.sidebar.addFoldingHandler(titleElem, contentElem, onInit);
  }

  appendOuterElem() {
    const { contentElem } = this;
    var outer = document.createElement("div");
    outer.appendChild(contentElem);
    this.outerElem = outer;
    this.container.appendChild(outer);
  }

  /**
   * Adds the given palette.
   */
  add() {
    const {
      storePaletteElementRefs,
      addFoldingHandler,
      appendTitleElement,
      createMainDiv,
    } = this;

    appendTitleElement();
    createMainDiv();
    addFoldingHandler();
    storePaletteElementRefs();

    return this.contentElem;
  }

  // Keeps references to the DOM nodes
  storePaletteElementRefs() {
    const { id, palettes, titleElem, outerElem } = this;
    if (id != null) {
      palettes[id] = [titleElem, outerElem];
    }
  }
}
