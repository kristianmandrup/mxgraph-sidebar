import mx from "@mxgraph-app/mx";
const { mxClient, mxUtils } = mx;

export class ArrowCreator {
  refreshTarget: any;
  img: any;
  tooltip: any;

  constructor({ refreshTarget, img, tooltip }) {
    this.refreshTarget = refreshTarget;
    this.img = img;
    this.tooltip = tooltip;
  }

  create() {
    const { refreshTarget, ie6QuirksFix, img, tooltip } = this;
    var arrow: any;

    if (mxClient.IS_IE && !mxClient.IS_SVG) {
      arrow = ie6QuirksFix();
    } else {
      arrow = mxUtils.createImage(img.src);
      arrow.style.width = img.width + "px";
      arrow.style.height = img.height + "px";
    }

    if (tooltip != null) {
      arrow.setAttribute("title", tooltip);
    }

    mxUtils.setOpacity(arrow, img == refreshTarget ? 30 : 20);
    arrow.style.position = "absolute";
    arrow.style.cursor = "crosshair";

    return arrow;
  }

  ie6QuirksFix() {
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
