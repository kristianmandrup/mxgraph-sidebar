import mx from "@mxgraph-app/mx";
const { mxEvent, mxClient, mxResources } = mx;
import { PaletteDelegator } from "./PaletteDelegator";

export class PaletteAdder extends PaletteDelegator {
  originalNoForeignObject: any; // Editor.prototype.originalNoForeignObject;

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
    expanded: boolean,
    onInit: (content, title?) => void
  ) {
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
      onInit = () => {};
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

  /**
   * Create the given title element.
   */
  addFoldingHandler(title, content, funct) {
    var initialized = false;

    // Avoids mixed content warning in IE6-8
    if (!mxClient.IS_IE || this.documentMode >= 8) {
      title.style.backgroundImage =
        content.style.display == "none"
          ? "url('" + this.collapsedImage + "')"
          : "url('" + this.expandedImage + "')";
    }

    title.style.backgroundRepeat = "no-repeat";
    title.style.backgroundPosition = "0% 50%";

    mxEvent.addListener(title, "click", (evt) => {
      if (content.style.display == "none") {
        if (!initialized) {
          initialized = true;

          if (funct != null) {
            // Wait cursor does not show up on Mac
            title.style.cursor = "wait";
            var prev = title.innerHTML;
            title.innerHTML = mxResources.get("loading") + "...";

            window.setTimeout(
              () => {
                content.style.display = "block";
                title.style.cursor = "";
                title.innerHTML = prev;

                var fo = mxClient.NO_FO;
                mxClient.NO_FO = this.originalNoForeignObject;
                funct(content, title);
                mxClient.NO_FO = fo;
              },
              mxClient.IS_FF ? 20 : 0
            );
          } else {
            content.style.display = "block";
          }
        } else {
          content.style.display = "block";
        }

        title.style.backgroundImage = "url('" + this.expandedImage + "')";
      } else {
        title.style.backgroundImage = "url('" + this.collapsedImage + "')";
        content.style.display = "none";
      }

      mxEvent.consume(evt);
    });

    // Prevents focus
    if (!mxClient.IS_QUIRKS) {
      mxEvent.addListener(
        title,
        mxClient.IS_POINTER ? "pointerdown" : "mousedown",
        (evt) => {
          evt.preventDefault();
        }
      );
    }
  }
}
