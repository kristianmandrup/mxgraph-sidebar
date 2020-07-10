import mx from "@mxgraph-app/mx";
// import { Graph } from "ui/graph/Graph";
const { mxPopupMenu, mxClient, mxUtils } = mx;

export class TooltipDisplayer {
  editorUi: any;
  tooltip: any;
  classMap: any;

  graph2: any;
  tooltipBorder: any;
  maxTooltipWidth: any;
  maxTooltipHeight: any;
  width: any;
  height: any;
  w2: any;
  tooltipTitles: any;
  tooltipTitle: any;
  title: any;
  bounds: any;
  getTooltipOffset: any;
  container: any;
  element: any;
  showLabel: any;
  originalNoForeignObject: any;
  cells: any;

  constructor(editorUi, tooltip, { classMap }: any = {}) {
    this.editorUi = editorUi;
    this.tooltip = tooltip;
    this.classMap = classMap;
  }

  get graph() {
    return this.editorUi.graph;
  }

  createGraph() {
    const { graph, tooltip } = this;
    return new this.classMap.Graph(tooltip, null, null, graph.getStylesheet());
  }

  createTooltipAndGraph() {
    const { tooltip, createGraph } = this;
    this.tooltip = document.createElement("div");
    tooltip.className = "geSidebarTooltip";
    tooltip.style.zIndex = mxPopupMenu.prototype.zIndex - 1;
    document.body.appendChild(tooltip);

    const graph = createGraph();
    graph.resetViewOnRootChange = false;
    graph.foldingEnabled = false;
    graph.gridEnabled = false;
    graph.autoScroll = false;
    graph.setTooltips(false);
    graph.setConnectable(false);
    graph.setEnabled(false);

    if (!mxClient.IS_SVG) {
      graph.view.canvas.style.position = "relative";
    }
    this.graph2 = graph;
    return graph;
  }

  scaleGraph() {
    const { width, maxTooltipWidth, height, maxTooltipHeight } = this;
    if (width > maxTooltipWidth || height > maxTooltipHeight) {
      this.graph2.view.scale =
        Math.round(
          Math.min(
            this.maxTooltipWidth / width,
            this.maxTooltipHeight / height
          ) * 100
        ) / 100;
    } else {
      this.graph2.view.scale = 1;
    }
  }

  setTooltipBounds() {
    const { tooltip, tooltipBorder } = this;

    const bounds = this.graph2.getGraphBounds();
    const width = bounds.width + 2 * tooltipBorder + 4;
    let height = bounds.height + 2 * tooltipBorder;

    if (mxClient.IS_QUIRKS) {
      height += 4;
      tooltip.style.overflow = "hidden";
    } else {
      tooltip.style.overflow = "visible";
    }

    tooltip.style.width = width + "px";
    this.height = height;
    this.width = width;
    this.w2 = width;
  }

  setTooltipTitle() {
    const { tooltipTitles, tooltipTitle, tooltip, title } = this;
    // Adds title for entry
    if (tooltipTitles && title != null && title.length > 0) {
      if (tooltipTitle == null) {
        const tooltipTitle = document.createElement("div");
        tooltipTitle.style.borderTop = "1px solid gray";
        tooltipTitle.style.textAlign = "center";
        tooltipTitle.style.width = "100%";
        tooltipTitle.style.overflow = "hidden";
        tooltipTitle.style.position = "absolute";
        tooltipTitle.style.paddingTop = "6px";
        tooltipTitle.style.bottom = "6px";

        tooltip.appendChild(tooltipTitle);
      } else {
        tooltipTitle.innerHTML = "";
      }

      tooltipTitle.style.display = "";
      mxUtils.write(tooltipTitle, title);
    } else if (tooltipTitle != null && tooltipTitle.parentNode != null) {
      tooltipTitle.style.display = "none";
    }
  }

  allowWiderLabels() {
    const { tooltipTitle, width } = this;
    let height = this.height;
    // Allows for wider labels
    this.w2 = Math.min(
      this.maxTooltipWidth,
      Math.max(width, tooltipTitle.scrollWidth + 4)
    );
    var ddy = tooltipTitle.offsetHeight + 10;
    height += ddy;

    if (mxClient.IS_SVG) {
      tooltipTitle.style.marginTop = 2 - ddy + "px";
    } else {
      height -= 6;
      tooltipTitle.style.top = height - ddy + "px";
    }
    this.height = height;
  }

  get x0() {
    const { w2, width, bounds, tooltipBorder } = this;
    return (
      -Math.round(bounds.x - tooltipBorder) +
      (w2 > width ? (w2 - width) / 2 : 0)
    );
  }

  get y0() {
    const { bounds, tooltipBorder } = this;
    return -Math.round(bounds.y - tooltipBorder);
  }

  get body() {
    return document.body;
  }

  get docElem() {
    return document.documentElement;
  }

  get off() {
    return this.getTooltipOffset();
  }

  get bottom() {
    return Math.max(this.body.clientHeight || 0, this.docElem.clientHeight);
  }

  get left() {
    const { container, editorUi, off } = this;
    return (
      container.clientWidth +
      editorUi.splitSize +
      3 +
      editorUi.container.offsetLeft +
      off.x
    );
  }

  get top() {
    const { bottom, height, element, off } = this;
    return (
      Math.min(
        bottom - height - 20 /*status bar*/,
        Math.max(
          0,
          this.editorUi.container.offsetTop +
            this.container.offsetTop +
            element.offsetTop -
            this.container.scrollTop -
            height / 2 +
            16
        )
      ) + off.y
    );
  }

  show = () => {
    const {
      graph2,
      tooltip,
      createTooltipAndGraph,
      tooltipBorder,
      width,
      height,
      showLabel,
      originalNoForeignObject,
      cells,
    } = this;

    // Lazy creation of the DOM nodes and graph instance
    if (!tooltip) {
      createTooltipAndGraph();
    }
    graph2.model.clear();
    graph2.view.setTranslate(tooltipBorder, tooltipBorder);
    this.scaleGraph();

    tooltip.style.display = "block";
    graph2.labelsVisible = showLabel == null || showLabel;
    const fo = mxClient.NO_FO;

    mxClient.NO_FO = originalNoForeignObject;
    graph2.addCells(cells);
    mxClient.NO_FO = fo;

    this.setTooltipBounds();

    this.setTooltipTitle();

    const { w2, x0, y0, left, top } = this;
    // Updates width if label is wider
    if (w2 > width) {
      tooltip.style.width = w2 + "px";
    }

    tooltip.style.height = height + "px";

    if (mxClient.IS_SVG) {
      if (x0 != 0 || y0 != 0) {
        graph2.view.canvas.setAttribute(
          "transform",
          "translate(" + x0 + "," + y0 + ")"
        );
      } else {
        graph2.view.canvas.removeAttribute("transform");
      }
    } else {
      graph2.view.drawPane.style.left = x0 + "px";
      graph2.view.drawPane.style.top = y0 + "px";
    }
    this.graph2 = graph2;

    // Workaround for ignored position CSS style in IE9
    // (changes to relative without the following line)
    tooltip.style.position = "absolute";
    tooltip.style.left = left + "px";
    tooltip.style.top = top + "px";
    this.tooltip = tooltip;
  };
}
