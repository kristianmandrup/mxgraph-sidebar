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

  createGraphInstance() {
    const { graph, tooltip } = this;
    return new this.classMap.Graph(tooltip, null, null, graph.getStylesheet());
  }

  createTooltipAndGraph() {
    const { tooltip } = this;
    this.tooltip = document.createElement("div");
    tooltip.className = "geSidebarTooltip";
    tooltip.style.zIndex = mxPopupMenu.prototype.zIndex - 1;
    tooltip.style.display = "block";
    document.body.appendChild(tooltip);
  }

  createGraph() {
    const { createGraphInstance } = this;
    let graph = createGraphInstance();
    graph = this.configureGraph();
    this.graph2 = graph;
    return graph;
  }

  configureGraph() {
    const { graph, isSvg } = this;
    graph.resetViewOnRootChange = false;
    graph.foldingEnabled = false;
    graph.gridEnabled = false;
    graph.autoScroll = false;
    graph.setTooltips(false);
    graph.setConnectable(false);
    graph.setEnabled(false);

    if (!isSvg) {
      graph.view.canvas.style.position = "relative";
    }
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

  get shouldCreateTooltipTitleElem() {
    const { tooltipTitles, title } = this;
    return tooltipTitles && title != null && title.length > 0;
  }

  createTooltipTitleElem() {
    const tooltipTitle = document.createElement("div");
    tooltipTitle.style.borderTop = "1px solid gray";
    tooltipTitle.style.textAlign = "center";
    tooltipTitle.style.width = "100%";
    tooltipTitle.style.overflow = "hidden";
    tooltipTitle.style.position = "absolute";
    tooltipTitle.style.paddingTop = "6px";
    tooltipTitle.style.bottom = "6px";
    this.tooltipTitle = tooltipTitle;
    return tooltipTitle;
  }

  appendNewTooltipTitleElem() {
    const { tooltip } = this;
    const tooltipTitle = this.createTooltipTitleElem();
    tooltip.appendChild(tooltipTitle);
  }

  resetTooltipTitleElem() {
    this.tooltipTitle.innerHTML = "";
  }

  setTooltipTitle() {
    const { appendAndStyleTooltipTitle, hideTooltipTitle } = this;
    // Adds title for entry
    appendAndStyleTooltipTitle() || hideTooltipTitle();
  }

  appendAndStyleTooltipTitle() {
    if (!this.shouldCreateTooltipTitleElem) return;
    const {
      appendNewTooltipTitleElem,
      tooltipTitle,
      resetTooltipTitleElem,
      styleTooltipTitle,
    } = this;
    !tooltipTitle ? appendNewTooltipTitleElem() : resetTooltipTitleElem();
    styleTooltipTitle();
    return true;
  }

  hideTooltipTitle() {
    if (!this.hasTooltipTitle) return;
    this.tooltipTitle.style.display = "none";
  }

  get hasTooltipTitle() {
    const { tooltipTitle } = this;
    return tooltipTitle && tooltipTitle.parentNode;
  }

  styleTooltipTitle() {
    const { title, tooltipTitle } = this;
    tooltipTitle.style.display = "";
    mxUtils.write(tooltipTitle, title);
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

  initGraph() {
    const { graph2, tooltipBorder, showLabel } = this;
    graph2.model.clear();
    graph2.view.setTranslate(tooltipBorder, tooltipBorder);
    graph2.labelsVisible = showLabel == null || showLabel;
    this.addCellsToGraph();
  }

  addCellsToGraph() {
    const { graph2, cells, originalNoForeignObject } = this;
    const fo = mxClient.NO_FO;
    mxClient.NO_FO = originalNoForeignObject;
    graph2.addCells(cells);
    mxClient.NO_FO = fo;
  }

  show = () => {
    const { graph2, tooltip, createTooltipAndGraph } = this;

    // Lazy creation of the DOM nodes and graph instance
    if (!tooltip) {
      createTooltipAndGraph();
    }
    this.initGraph();
    this.scaleGraph();

    this.setTooltipBounds();
    this.setTooltipTitle();

    const { isSvg, svgTransform, setDrawPaneStyle, ie9QuirksFix } = this;
    this.adjustTooltipBounds();

    isSvg ? svgTransform() : setDrawPaneStyle();
    this.graph2 = graph2;

    ie9QuirksFix();
    this.tooltip = tooltip;
  };

  // Workaround for ignored position CSS style in IE9
  // (changes to relative without the following line)
  ie9QuirksFix() {
    const { tooltip, left, top } = this;
    tooltip.style.position = "absolute";
    tooltip.style.left = left + "px";
    tooltip.style.top = top + "px";
  }

  adjustTooltipBounds() {
    const { tooltip, w2, width, height } = this;
    // Updates width if label is wider
    if (w2 > width) {
      tooltip.style.width = w2 + "px";
    }
    tooltip.style.height = height + "px";
  }

  setDrawPaneStyle() {
    const { graph2, x0, y0 } = this;
    graph2.view.drawPane.style.left = x0 + "px";
    graph2.view.drawPane.style.top = y0 + "px";
  }

  svgTransform() {
    const { graph2, x0, y0 } = this;
    if (x0 != 0 || y0 != 0) {
      graph2.view.canvas.setAttribute(
        "transform",
        "translate(" + x0 + "," + y0 + ")"
      );
    } else {
      graph2.view.canvas.removeAttribute("transform");
    }
  }

  get isSvg() {
    return mxClient.IS_SVG;
  }
}
