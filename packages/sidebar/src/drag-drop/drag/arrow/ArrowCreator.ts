import mx from "@mxgraph-app/mx";
const { mxClient, mxUtils } = mx;

export class ArrowCreator {
  refreshTarget: any;
  img: any;
  tooltip: any;

  arrow: any;

  constructor({ refreshTarget, img, tooltip }) {
    this.refreshTarget = refreshTarget;
    this.img = img;
    this.tooltip = tooltip;
  }

  get isIE6() {
    return mxClient.IS_IE && !mxClient.IS_SVG;
  }

  // TODO: refactor
  create() {
    const { createArrow, setArrow } = this;
    createArrow();
    setArrow();
    return this.arrow;
  }

  setArrow() {
    this.setArrowTitle();
    this.styleArrow();
  }

  setArrowTitle() {
    const { tooltip, arrow } = this;
    if (!tooltip) return;
    arrow.setAttribute("title", tooltip);
  }

  styleArrow() {
    const { arrow, img, refreshTarget } = this;
    mxUtils.setOpacity(arrow, img == refreshTarget ? 30 : 20);
    arrow.style.position = "absolute";
    arrow.style.cursor = "crosshair";
    return arrow;
  }

  createArrow() {
    const { ie6Arrow, isIE6, createArrow } = this;
    const arrow = isIE6 ? ie6Arrow() : createArrow();
    this.arrow = arrow;
    return arrow;
  }

  createDefaultArrow() {
    const { img } = this;
    const arrow = mxUtils.createImage(img.src);
    arrow.style.width = img.width + "px";
    arrow.style.height = img.height + "px";
    return arrow;
  }

  ie6Arrow() {
    const { img } = this;
    var arrow: any;
    // Workaround for PNG images in IE6
    if (mxClient.IS_IE6 && document.compatMode != "CSS1Compat") {
      arrow = document.createElement(mxClient.VML_PREFIX + ":image");
      arrow.setAttribute("src", img.src);
      arrow.style.borderStyle = "none";
    } else {
      arrow = document.createElement("div");
      arrow.style.backgroundImage = "url(" + img.src + ")";
      arrow.style.backgroundPosition = "center";
      arrow.style.backgroundRepeat = "no-repeat";
    }

    arrow.style.width = img.width + 4 + "px";
    arrow.style.height = img.height + 4 + "px";
    arrow.style.display = mxClient.IS_QUIRKS ? "inline" : "inline-block";
    return arrow;
  }
}
