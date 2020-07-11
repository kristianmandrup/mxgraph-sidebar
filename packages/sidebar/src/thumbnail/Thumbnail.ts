import mx from "@mxgraph-app/mx";
import resources from "@mxgraph-app/resources";
const { mxClient, mxUtils, mxConstants } = mx;
const {} = resources;

export class Thumbnail {
  editorUi: any;
  graph: any;
  documentMode: any;
  thumbBorder: any;
  thumbHeight: any;
  thumbPadding: any;
  sidebarTitles: any;
  sidebarTitleSize: any;
  originalNoForeignObject: any; // Editor.prototype.originalNoForeignObject

  width: number = 0;
  height: number = 0;
  node: any;
  cells: any;
  parent: any;
  title: any;
  titleElem: any;
  showLabel: boolean = true;
  showTitle: boolean = true;

  constructor(editorUi) {
    this.editorUi = editorUi;
  }

  get bounds() {
    return this.graph.getGraphBounds();
  }

  get s() {
    const { bounds, width, height } = this;
    return (
      Math.floor(
        Math.min(
          (width - 2 * this.thumbBorder) / bounds.width,
          (height - 2 * this.thumbBorder) / bounds.height
        ) * 100
      ) / 100
    );
  }

  createMainNode() {
    var node: any;
    // For supporting HTML labels in IE9 standards mode the container is cloned instead
    if (
      this.graph.dialect == mxConstants.DIALECT_SVG &&
      !mxClient.NO_FO &&
      this.graph.view.getCanvas().ownerSVGElement != null
    ) {
      node = this.graph.view.getCanvas().ownerSVGElement.cloneNode(true);
    } // LATER: Check if deep clone can be used for quirks if container in DOM
    else {
      node = this.graph.container.cloneNode(false);
      node.innerHTML = this.graph.container.innerHTML;

      // Workaround for clipping in older IE versions
      if (mxClient.IS_QUIRKS || this.documentMode == 8) {
        node.firstChild.style.overflow = "visible";
      }
    }
    this.node = node;
    return node;
  }

  scaleAndTranslateGraph() {
    const { s, bounds, height, width } = this;
    this.graph.view.scaleAndTranslate(
      s,
      Math.floor((width - bounds.width * s) / 2 / s - bounds.x),
      Math.floor((height - bounds.height * s) / 2 / s - bounds.y)
    );
  }

  addCellsToGraph() {
    const { cells, showLabel } = this;
    this.graph.labelsVisible = showLabel == null || showLabel;
    const fo = mxClient.NO_FO;
    mxClient.NO_FO = this.originalNoForeignObject;
    this.graph.view.scaleAndTranslate(1, 0, 0);
    this.graph.addCells(cells);

    this.scaleAndTranslateGraph();
    this.createMainNode();
    this.graph.getModel().clear();
    mxClient.NO_FO = fo;
  }

  catchAllEventHandling() {
    const { parent } = this;
    // Catch-all event handling
    if (!mxClient.IS_IE6) return;
    parent.style.backgroundImage =
      "url(" + this.editorUi.editor.transparentImage + ")";
  }

  configureNode() {
    const { node, width, height } = this;
    node.style.position = "relative";
    node.style.overflow = "hidden";
    node.style.left = this.thumbBorder + "px";
    node.style.top = this.thumbBorder + "px";
    node.style.width = width + "px";
    node.style.height = height + "px";
    node.style.visibility = "";
    node.style.minWidth = "";
    node.style.minHeight = "";
    return node;
  }

  appendNode() {
    const { parent } = this;
    const node = this.configureNode();
    parent.appendChild(node);
    return parent;
  }

  createTitleElem() {
    var div = document.createElement("div");
    div.style.fontSize = this.sidebarTitleSize + "px";
    div.style.color = "#303030";
    div.style.textAlign = "center";
    div.style.whiteSpace = "nowrap";

    if (mxClient.IS_IE) {
      div.style.height = this.sidebarTitleSize + 12 + "px";
    }

    div.style.paddingTop = "4px";
    return div;
  }

  addTitleElement() {
    const { parent, title, showTitle } = this;
    // Adds title for sidebar entries
    if (this.sidebarTitles && title != null && showTitle != false) {
      var border = mxClient.IS_QUIRKS ? 2 * this.thumbPadding + 2 : 0;
      parent.style.height =
        this.thumbHeight + border + this.sidebarTitleSize + 8 + "px";

      const titleElem = this.createTitleElem();
      this.titleElem = titleElem;
      mxUtils.write(titleElem, title);
      parent.appendChild(titleElem);
    }
  }

  set(cells, width, height, parent, title, showLabel = true, showTitle = true) {
    this.cells = cells;
    this.parent = parent;
    this.width = width;
    this.height = height;
    this.title = title;
    this.showLabel = showLabel;
    this.showTitle = showTitle;
  }

  /**
   * Creates a thumbnail for the given cells.
   */
  createThumb(
    cells,
    width,
    height,
    parent,
    title,
    showLabel = true,
    showTitle = true,
    _realWidth?,
    _realHeight?
  ) {
    this.set(cells, width, height, parent, title, showLabel, showTitle);
    this.addCellsToGraph();
    this.appendNode();
    this.addTitleElement();
    return this.bounds;
  }
}
