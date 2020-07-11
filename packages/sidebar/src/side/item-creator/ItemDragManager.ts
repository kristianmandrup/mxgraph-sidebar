export class ItemDragManager {
  createDragSource: any;
  createDropHandler: any;
  createDragPreview: any;
  addClickHandler: any;

  linkElem: any;
  bounds: any;
  cells: any;
  width: any;
  height: any;
  allowCellsInserted: boolean = true;

  editorUi: any;

  constructor(editorUi) {
    this.editorUi = editorUi;
  }

  get graph() {
    return this.editorUi.editor.graph;
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
}
