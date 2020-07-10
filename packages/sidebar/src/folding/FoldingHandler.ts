import mx from "@mxgraph-app/mx";
const { mxClient, mxEvent, mxResources } = mx;

export class FoldingHandler {
  collapsedImage: any;
  expandedImage: any;
  documentMode: any;
  originalNoForeignObject: any; // Editor.prototype.originalNoForeignObject

  title: any;
  content: any;
  funct: any;
  initialized: boolean = false;
  prev: any;

  /**
   * Create the given title element.
   */
  constructor({
    title,
    content,
    funct,
    collapsedImage,
    expandedImage,
    documentMode,
  }: any = {}) {
    this.set(title, content, funct);
    this.collapsedImage = collapsedImage;
    this.expandedImage = expandedImage;
    this.documentMode = documentMode;
  }

  configure() {
    this.configureTitleElement();
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

  configureTitleElement() {
    this.ie8QuirkFix();
    this.configureTitleStyle();
  }

  configureTitleStyle() {
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
    const { setTitleBackgroundImage, isVisible, initialize, doDefault } = this;
    isVisible ? initialize() : doDefault();
    setTitleBackgroundImage();
    return true;
  };

  setTitleBackgroundImage() {
    this.title.style.backgroundImage = "url('" + this.expandedImage + "')";
  }

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
    const { waitCursorMac, setWindowTimeout } = this;
    waitCursorMac();
    setWindowTimeout();
  };

  waitCursorMac() {
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
