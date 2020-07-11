import mx from "@mxgraph-app/mx";
import { Sidebar } from "./Sidebar";
const { mxRectangle, mxClient, mxEvent } = mx;

export class SidebarItemCreator {
  sidebar: Sidebar;
  editorUi: any;
  thumbPadding: number;
  thumbBorder: number;
  thumbWidth: number;
  thumbHeight: number;

  createThumb: any;
  createDragSource: any;
  createDropHandler: any;
  createDragPreview: any;
  addClickHandler: any;
  showTooltip: any;

  width: number = 0;
  height: number = 0;
  cells: any;
  linkElem: any;
  allowCellsInserted: boolean = true;
  title: any;
  showLabel: boolean = true;
  showTitle: boolean = true;

  constructor(sidebar: Sidebar) {
    this.sidebar = sidebar;
    const {
      thumbWidth,
      thumbHeight,
      thumbBorder,
      thumbPadding,
      editorUi,
      createThumb,
      createDragSource,
      createDropHandler,
      createDragPreview,
      addClickHandler,
      showTooltip,
    } = sidebar;
    this.editorUi = editorUi;
    this.thumbPadding = thumbPadding;
    this.thumbBorder = thumbBorder;
    this.thumbWidth = thumbWidth;
    this.thumbHeight = thumbHeight;
    this.createThumb = createThumb;
    this.createDragSource = createDragSource;
    this.createDropHandler = createDropHandler;
    this.createDragPreview = createDragPreview;
    this.addClickHandler = addClickHandler;
    this.showTooltip = showTooltip;
  }

  createLinkElement() {
    var linkElem = document.createElement("a");
    linkElem.className = "geItem";
    linkElem.style.overflow = "hidden";
    var border = mxClient.IS_QUIRKS
      ? 8 + 2 * this.thumbPadding
      : 2 * this.thumbBorder;
    linkElem.style.width = this.thumbWidth + border + "px";
    linkElem.style.height = this.thumbHeight + border + "px";
    linkElem.style.padding = this.thumbPadding + "px";

    if (mxClient.IS_IE6) {
      linkElem.style.border = "none";
    }

    // Blocks default click action
    mxEvent.addListener(linkElem, "click", function (evt) {
      mxEvent.consume(evt);
    });
    this.linkElem = linkElem;
    return linkElem;
  }

  get graph() {
    return this.editorUi.editor.graph;
  }

  get bounds() {
    const { width, height } = this;
    return new mxRectangle(0, 0, width, height);
  }

  set(cells, title, showLabel, showTitle, width, height, allowCellsInserted) {
    this.title = title;
    this.showTitle = showTitle;
    this.showLabel = showLabel;
    this.cells = cells;
    this.width = width;
    this.height = height;
    this.allowCellsInserted = allowCellsInserted;
  }

  createItem(
    cells,
    title,
    showLabel,
    showTitle,
    width,
    height,
    allowCellsInserted
  ) {
    this.set(
      cells,
      title,
      showLabel,
      showTitle,
      width,
      height,
      allowCellsInserted
    );
    const linkElem = this.createLinkElement();
    this.createThumb(
      cells,
      this.thumbWidth,
      this.thumbHeight,
      linkElem,
      title,
      showLabel,
      showTitle,
      width,
      height
    );
    this.configureDrag();
    this.addToolTipListener();
    return linkElem;
  }

  multiCellDrag() {
    const { linkElem, bounds, cells, width, height, allowCellsInserted } = this;
    const ds: any = this.createDragSource(
      linkElem,
      this.createDropHandler(cells, true, allowCellsInserted, bounds),
      this.createDragPreview(width, height),
      cells,
      bounds
    );
    this.addClickHandler(linkElem, ds, cells);

    // Uses guides for vertices only if enabled in graph
    ds.isGuidesEnabled = () => {
      return this.graph.graphHandler.guidesEnabled;
    };
    return ds;
  }

  singleCellDrag() {
    const { linkElem, bounds, cells, width, height, allowCellsInserted } = this;
    const ds = this.createDragSource(
      linkElem,
      this.createDropHandler(cells, false, allowCellsInserted, bounds),
      this.createDragPreview(width, height),
      cells,
      bounds
    );
    this.addClickHandler(linkElem, ds, cells);
    return ds;
  }

  get isSingleCellDrag() {
    const { cells } = this;
    return cells[0] != null && cells[0].edge;
  }

  get isMultiCellDrag() {
    const { cells } = this;
    return cells.length > 1 || cells[0].vertex;
  }

  configureDrag() {
    const {
      isMultiCellDrag,
      isSingleCellDrag,
      multiCellDrag,
      singleCellDrag,
    } = this;

    if (isMultiCellDrag) {
      multiCellDrag();
    } else if (isSingleCellDrag) {
      singleCellDrag();
    }
  }

  addToolTipListener() {
    const { linkElem } = this;
    const { cells, bounds, title, showLabel } = this;
    // Shows a tooltip with the rendered cell
    if (!mxClient.IS_IOS) {
      mxEvent.addGestureListeners(
        linkElem,
        null,
        (evt) => {
          if (mxEvent.isMouseEvent(evt)) {
            this.showTooltip(
              linkElem,
              cells,
              bounds.width,
              bounds.height,
              title,
              showLabel
            );
          }
        },
        null
      );
    }
  }
}
