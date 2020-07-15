import mx from "@mxgraph-app/mx";
const { mxEvent, mxEventObject } = mx;

export class DropTargetProcessor {
  dropProcessor: any;
  target: any;
  cells: any;
  graph: any;
  bounds: any;
  x: any;
  y: any;
  allowSplit: any;
  allowCellsInserted: any;
  editorUi: any;
  evt: any;
  select: any;

  constructor(dropProcessor, { target, cells }: any = {}) {
    this.dropProcessor = dropProcessor;
    this.target = target;
    this.cells = cells;
    const {
      editorUi,
      graph,
      bounds,
      x,
      y,
      allowSplit,
      allowCellsInserted,
      evt,
    } = dropProcessor;
    this.graph = graph;
    this.allowSplit = allowSplit;
    this.evt = evt;
    this.bounds = bounds;
    this.x = x;
    this.y = y;
    this.allowCellsInserted = allowCellsInserted;
    this.editorUi = editorUi;
    this.init();
  }

  init() {
    this.setXY();
  }

  setXY() {
    this.x = Math.round(this.x);
    this.y = Math.round(this.y);
  }

  get dropTarget() {
    return this.target || this.graph.getDefaultParent();
  }

  get shouldEditSelectedElement() {
    const { graph, evt, select } = this;
    return (
      graph.editAfterInsert &&
      evt != null &&
      mxEvent.isMouseEvent(evt) &&
      select &&
      select.length == 1
    );
  }

  get hasSelectedElements() {
    const { select } = this;
    return select && select.length > 0;
  }

  shouldSplitTarget(target, cells) {
    const { allowSplit, graph, evt } = this;
    return allowSplit && graph.isSplitTarget(target, cells, evt);
  }

  splitTargetEdge(target, cells) {
    const { graph, bounds, x, y } = this;
    var clones = graph.cloneCells(cells);
    graph.splitEdge(
      target,
      clones,
      null,
      x - bounds.width / 2,
      y - bounds.height / 2
    );
    return clones;
  }

  executeParentLayoutHooks() {
    const { graph, x, y, target, select } = this;
    // Executes parent layout hooks for position/order
    if (graph.layoutManager != null) {
      var layout = graph.layoutManager.getLayout(target);

      if (layout != null) {
        var s = graph.view.scale;
        var tr = graph.view.translate;
        var tx = (x + tr.x) * s;
        var ty = (y + tr.y) * s;

        for (var i = 0; i < select.length; i++) {
          layout.moveCell(select[i], tx, ty);
        }
      }
    }
  }

  setSelected() {
    const {
      shouldSplitTarget,
      splitTargetEdge,
      graph,
      target,
      cells,
      x,
      y,
    } = this;
    let select;
    // Splits the target edge or inserts into target group
    if (shouldSplitTarget(target, cells)) {
      select = splitTargetEdge(target, cells);
    } else if (cells.length > 0) {
      select = graph.importCells(cells, x, y, target);
    }
    this.select = select;
  }

  notifyCellsInserted() {
    const { allowCellsInserted, evt, select, graph } = this;
    if (allowCellsInserted && (evt == null || !mxEvent.isShiftDown(evt))) {
      graph.fireEvent(new mxEventObject("cellsInserted", "cells", select));
    }
  }

  handleError(e) {
    this.editorUi.handleError(e);
  }

  process() {
    const {
      graph,
      postProcess,
      executeParentLayoutHooks,
      setSelected,
      notifyCellsInserted,
      handleError,
      dropTarget,
    } = this;
    if (graph.isCellLocked(dropTarget)) return;
    graph.model.beginUpdate();
    try {
      setSelected();
      executeParentLayoutHooks();
      notifyCellsInserted();
    } catch (e) {
      handleError(e);
    } finally {
      graph.model.endUpdate();
    }
    postProcess();
  }

  editSelected() {
    const { graph, select } = this;
    window.setTimeout(function () {
      graph.startEditing(select[0]);
    }, 0);
  }

  selectAndDisplaySelectedCells() {
    const { select, graph } = this;
    graph.scrollCellToVisible(select[0]);
    graph.setSelectionCells(select);
  }

  postProcess() {
    const {
      hasSelectedElements,
      shouldEditSelectedElement,
      editSelected,
      selectAndDisplaySelectedCells,
    } = this;

    if (hasSelectedElements) {
      selectAndDisplaySelectedCells();
    }

    if (shouldEditSelectedElement) {
      editSelected();
    }
  }
}
