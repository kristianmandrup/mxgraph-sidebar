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

  createItem(
    cells,
    title,
    showLabel,
    showTitle,
    width,
    height,
    allowCellsInserted
  ) {
    var elt = document.createElement("a");
    elt.className = "geItem";
    elt.style.overflow = "hidden";
    var border = mxClient.IS_QUIRKS
      ? 8 + 2 * this.thumbPadding
      : 2 * this.thumbBorder;
    elt.style.width = this.thumbWidth + border + "px";
    elt.style.height = this.thumbHeight + border + "px";
    elt.style.padding = this.thumbPadding + "px";

    if (mxClient.IS_IE6) {
      elt.style.border = "none";
    }

    // Blocks default click action
    mxEvent.addListener(elt, "click", function (evt) {
      mxEvent.consume(evt);
    });

    this.createThumb(
      cells,
      this.thumbWidth,
      this.thumbHeight,
      elt,
      title,
      showLabel,
      showTitle,
      width,
      height
    );
    var bounds = new mxRectangle(0, 0, width, height);

    if (cells.length > 1 || cells[0].vertex) {
      var ds: any = this.createDragSource(
        elt,
        this.createDropHandler(cells, true, allowCellsInserted, bounds),
        this.createDragPreview(width, height),
        cells,
        bounds
      );
      this.addClickHandler(elt, ds, cells);

      // Uses guides for vertices only if enabled in graph
      ds.isGuidesEnabled = () => {
        return this.editorUi.editor.graph.graphHandler.guidesEnabled;
      };
    } else if (cells[0] != null && cells[0].edge) {
      ds = this.createDragSource(
        elt,
        this.createDropHandler(cells, false, allowCellsInserted, bounds),
        this.createDragPreview(width, height),
        cells,
        bounds
      );
      this.addClickHandler(elt, ds, cells);
    }

    // Shows a tooltip with the rendered cell
    if (!mxClient.IS_IOS) {
      mxEvent.addGestureListeners(
        elt,
        null,
        (evt) => {
          if (mxEvent.isMouseEvent(evt)) {
            this.showTooltip(
              elt,
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

    return elt;
  }
}
