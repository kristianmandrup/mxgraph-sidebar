import mx from "@mxgraph-app/mx";
import { Sidebar } from "./Sidebar";
const { mxClient, mxEvent, mxResources } = mx;

export class FoldingHandler {
  sidebar: Sidebar;
  editorUi: any;
  graph: any;
  showTooltips = true;

  collapsedImage: any;
  expandedImage: any;
  documentMode: any;
  originalNoForeignObject: any; // Editor.prototype.originalNoForeignObject

  constructor(sidebar: Sidebar) {
    this.sidebar = sidebar;
    const {
      editorUi,
      graph,
      collapsedImage,
      expandedImage,
      documentMode,
    } = sidebar;
    this.editorUi = editorUi;
    this.graph = graph;
    this.collapsedImage = collapsedImage;
    this.expandedImage = expandedImage;
    this.documentMode = documentMode;
  }

  /**
   * Create the given title element.
   */
  add(title, content, funct) {
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
