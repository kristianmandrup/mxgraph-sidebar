import mx from "@mxgraph-app/mx";
import { DropTargetProcessor } from "./DropTargetProcessor";
const { mxEvent } = mx;

export class DropProcessor {
  editorUi: any;
  allowSplit: any;
  allowCellsInserted: any;
  graph: any;
  target: any;
  cells: any;
  evt: any;
  bounds: any;
  x: number = 0;
  y: number = 0;

  constructor(
    editorUi,
    {
      allowSplit,
      allowCellsInserted,
      bounds,
      graph,
      cells,
      target,
      evt,
      x,
      y,
    }: any = {}
  ) {
    this.editorUi = editorUi;
    this.allowSplit = allowSplit;
    this.allowCellsInserted = allowCellsInserted;
    this.graph = graph;
    this.bounds = bounds;
    this.cells = cells;
    this.target = target;
    this.evt = evt;
    this.x = x;
    this.y = y;
  }

  get validDropTarget() {
    const { target, evt, cells, graph } = this;
    return target != null && !mxEvent.isAltDown(evt)
      ? graph.isValidDropTarget(target, cells, evt)
      : false;
  }

  process() {
    const { graph, evt, processCells } = this;
    let cells = graph.getImportableCells(this.cells);
    processCells(cells);
    mxEvent.consume(evt);
  }

  processCells(cells) {
    const { graph, processDropTarget } = this;
    if (cells.length === 0) return;
    graph.stopEditing();
    const target = this.getTarget();
    processDropTarget({ target, cells });
  }

  processDropTarget({ target, cells }) {
    return this.createDropTargetProcessor({ target, cells }).process();
  }

  createDropTargetProcessor({ target, cells }) {
    return new DropTargetProcessor(this, { target, cells });
  }

  getTarget() {
    const { target, validDropTarget } = this;
    // Holding alt while mouse is released ignores drop target
    if (target && !validDropTarget) return null;
    return target;
  }
}
