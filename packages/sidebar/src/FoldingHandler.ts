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

  title: any;
  content: any;
  funct: any;
  initialized: boolean = false;
  prev: any;

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
    this.set(title, content, funct);
    this.setTitle(title);
    this.addClickHandler();
    this.preventFocus();
  }

  preventFocus() {
    const { title } = this;
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

  set(title, content, funct) {
    this.title = title;
    this.content = content;
    this.funct = funct;
    return this;
  }

  setTitle(title?) {
    title = title || this.title;
    const { content } = this;
    // Avoids mixed content warning in IE6-8
    if (!mxClient.IS_IE || this.documentMode >= 8) {
      title.style.backgroundImage =
        content.style.display == "none"
          ? "url('" + this.collapsedImage + "')"
          : "url('" + this.expandedImage + "')";
    }

    title.style.backgroundRepeat = "no-repeat";
    title.style.backgroundPosition = "0% 50%";
    return title;
  }

  addClickHandler() {
    const { title } = this;
    mxEvent.addListener(title, "click", this.clickListener);
  }

  clickListener = (evt) => {
    const { contentHidden, contentDisplay } = this;
    contentHidden() || contentDisplay();
    mxEvent.consume(evt);
  };

  contentDisplay = () => {
    const { title, content } = this;
    title.style.backgroundImage = "url('" + this.collapsedImage + "')";
    content.style.display = "none";
  };

  contentHidden = () => {
    const { title, content, initialize, doDefault } = this;
    if (content.style.display != "none") return;
    initialize() || doDefault();
    title.style.backgroundImage = "url('" + this.expandedImage + "')";
    return true;
  };

  doDefault = () => {
    this.content.style.display = "block";
  };

  initialize = () => {
    const { funct, doInitialize, doDefault } = this;
    if (this.initialized) return;
    this.initialized = true;
    funct ? doInitialize() : doDefault();
    return true;
  };

  doInitialize = () => {
    const { ensureWaitCursorMac, setWindowTimeout } = this;
    ensureWaitCursorMac();
    setWindowTimeout();
  };

  ensureWaitCursorMac() {
    const { title } = this;
    // Wait cursor does not show up on Mac
    title.style.cursor = "wait";
    this.prev = title.innerHTML;
    title.innerHTML = mxResources.get("loading") + "...";
  }

  setWindowTimeout = () => {
    const { title, content, funct, prev } = this;
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
  };
}
