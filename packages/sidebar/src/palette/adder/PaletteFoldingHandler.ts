import mx from "@mxgraph-app/mx";
import { PaletteDelegator } from "../PaletteDelegator";
const { mxEvent, mxClient, mxResources } = mx;

export class PaletteFoldingHandler extends PaletteDelegator {
  palette: any;
  title: any;
  content: any;
  funct: any;

  documentMode: any;
  originalNoForeignObject: any;
  initialized: boolean = false;
  prev: any;

  constructor(palette, { title, content, funct }) {
    super(palette);
    this.palette = palette;
    this.title = title;
    this.content = content;
    this.funct = funct;
  }

  /**
   * Create the given title element.
   */
  add() {
    this.initialized = false;

    this.configureTitleElement();
    this.addClickHandler();
    this.preventFocus();
  }

  configureTitleElement() {
    this.ie8QuirkFix();
    const { title } = this;
    title.style.backgroundRepeat = "no-repeat";
    title.style.backgroundPosition = "0% 50%";
  }

  get isIE8() {
    return !mxClient.IS_IE || this.documentMode >= 8;
  }

  // Avoids mixed content warning in IE6-8
  ie8QuirkFix() {
    const { isIE8 } = this;
    if (!isIE8) return;
    const { title, content } = this;
    title.style.backgroundImage =
      content.style.display == "none"
        ? "url('" + this.collapsedImage + "')"
        : "url('" + this.expandedImage + "')";
  }

  get isVisible() {
    return this.content.style.display !== "none";
  }

  addClickHandler() {
    const { isVisible, title, visible, invisible } = this;
    mxEvent.addListener(title, "click", (evt) => {
      isVisible ? visible() : invisible();
      mxEvent.consume(evt);
    });
  }

  visible() {
    const { title, content } = this;
    title.style.backgroundImage = "url('" + this.collapsedImage + "')";
    content.style.display = "none";
  }

  invisible() {
    const { title, expandedImage, initialize, doDefault, initialized } = this;
    !initialized ? initialize() : doDefault();
    title.style.backgroundImage = "url('" + expandedImage + "')";
  }

  doDefault() {
    this.content.style.display = "block";
  }

  initialize() {
    const { doInitialize, doDefault, funct } = this;
    this.initialized = true;
    funct ? doInitialize() : doDefault();
  }

  doInitialize() {
    const { waitCursorMac, setWindowTimeout } = this;
    setWindowTimeout();
    waitCursorMac();
  }

  waitCursorMac() {
    const { title } = this;
    // Wait cursor does not show up on Mac
    title.style.cursor = "wait";
    this.prev = title.innerHTML;
    title.innerHTML = mxResources.get("loading") + "...";
  }

  setWindowTimeout() {
    const { title, content, prev, funct } = this;
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
}
