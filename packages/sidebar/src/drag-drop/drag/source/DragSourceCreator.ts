import mx from "@mxgraph-app/mx";
const { mxUtils } = mx;

export class DragSourceCreator {
  editorUi: any;
  updateThread: any;
  element: any;
  dropHandler: any;
  preview: any;
  cells: any;

  // ??
  currentStyleTarget: any;
  activeArrow: any;
  styleTarget: any;
  updateShapes: any;
  firstVertex: any;
  currentTargetState: any;
  freeSourceEdge: any;
  dropAndConnect: any;
  direction: any;

  constructor(editorUi, opts: any = {}) {
    const { element, dropHandler, preview, cells } = opts;
    this.editorUi = editorUi;
    this.element = element;
    this.dropHandler = dropHandler;
    this.preview = preview;
    this.cells = cells;
  }

  get ui() {
    return this.editorUi;
  }

  get graph() {
    return this.ui.editor.graph;
  }

  create({ element, dropHandler, preview, cells }: any = {}) {
    element = element || this.element;
    dropHandler = dropHandler || this.dropHandler;
    preview = preview || this.preview;
    cells = cells || this.cells;

    const { graph, onDrag } = this;

    return mxUtils.makeDraggable(
      element,
      graph,
      onDrag,
      preview,
      0,
      0,
      graph.autoscroll,
      true,
      true
    );
  }

  onDrag = (graph, evt, _target, _x, _y) => {
    const {
      cells,
      updateThread,
      currentStyleTarget,
      styleTarget,
      activeArrow,
      updateShapes,
      firstVertex,
      currentTargetState,
      freeSourceEdge,
      dropAndConnect,
      direction,
      dropHandler,
    } = this;
    if (updateThread != null) {
      window.clearTimeout(updateThread);
    }

    if (
      cells != null &&
      currentStyleTarget != null &&
      activeArrow == styleTarget
    ) {
      var tmp = graph.isCellSelected(currentStyleTarget.cell)
        ? graph.getSelectionCells()
        : [currentStyleTarget.cell];
      var updatedCells = updateShapes(
        graph.model.isEdge(currentStyleTarget.cell)
          ? cells[0]
          : cells[firstVertex],
        tmp
      );
      graph.setSelectionCells(updatedCells);
    } else if (
      cells != null &&
      activeArrow != null &&
      currentTargetState != null &&
      activeArrow != styleTarget
    ) {
      var index =
        graph.model.isEdge(currentTargetState.cell) || freeSourceEdge == null
          ? firstVertex
          : freeSourceEdge;
      graph.setSelectionCells(
        dropAndConnect(currentTargetState.cell, cells, direction, index, evt)
      );
    } else {
      dropHandler.apply(this, [graph, evt, _target, _x, _y]);
    }

    if (this.editorUi.hoverIcons != null) {
      this.editorUi.hoverIcons.update(
        graph.view.getState(graph.getSelectionCell())
      );
    }
  };
}
