import mx from "@mxgraph-app/mx";
const { mxClient } = mx;
import { PaletteDelegator } from "./PaletteDelegator";

export class PaletteManager extends PaletteDelegator {
  /**
   * Create the given title element.
   */
  addFoldingHandler(title, content, funct) {
    return this.sidebar.addFoldingHandler(title, content, funct);
  }

  /**
   * Adds the given palette.
   */
  addPaletteFunctions(id, title, expanded, fns) {
    this.addPalette(id, title, expanded, (content) => {
      for (var i = 0; i < fns.length; i++) {
        content.appendChild(fns[i](content));
      }
    });
  }

  /**
   * Adds the given palette.
   */
  addPalette(id, title, expanded, onInit) {
    var elt = this.createTitle(title);
    this.container.appendChild(elt);

    var div = document.createElement("div");
    div.className = "geSidebar";

    // Disables built-in pan and zoom in IE10 and later
    if (mxClient.IS_POINTER) {
      div.style.touchAction = "none";
    }

    if (expanded) {
      onInit(div);
      onInit = null;
    } else {
      div.style.display = "none";
    }

    this.addFoldingHandler(elt, div, onInit);

    var outer = document.createElement("div");
    outer.appendChild(div);
    this.container.appendChild(outer);

    // Keeps references to the DOM nodes
    if (id != null) {
      this.palettes[id] = [elt, outer];
    }

    return div;
  }
}
