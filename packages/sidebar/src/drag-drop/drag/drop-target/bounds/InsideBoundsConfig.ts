import mx from "@mxgraph-app/mx";
import { DropBase } from "../../../DropBase";
import { EdgeCellProcessor, CellProcessor } from "./cell";
const { mxRectangle, mxEvent } = mx;

export class InsideBoundsConfig extends DropBase {
  activeTarget: any;
  currentTargetState: any;
  activeArrow: any;
  evt: any;
  dropArrow: any;
  x: any;
  y: any;

  _bbox: any;
  _bds: any;

  constructor(editorUi, opts: any = {}) {
    super(editorUi);
    const { dropArrow } = opts;
    this.dropArrow = dropArrow;
  }

  get isInsideBounds() {
    const { evt, activeTarget, currentTargetState, activeArrow } = this;
    return (
      activeTarget &&
      currentTargetState != null &&
      !mxEvent.isAltDown(evt) &&
      activeArrow == null
    );
  }

  get bbox() {
    this._bbox =
      this._bbox || mxRectangle.fromRectangle(this.currentTargetState);
    return this._bbox;
  }

  get bds() {
    this._bds = this._bds || this.createBds();
    return this._bds;
  }

  get isEdgeCell() {
    const { currentTargetState, graph } = this;
    return graph.model.isEdge(currentTargetState.cell);
  }

  get cellProcessor() {
    return new CellProcessor(this);
  }

  get edgeCellProcessor() {
    return new EdgeCellProcessor(this);
  }

  processCell() {
    this.cellProcessor.process();
  }

  processEdgeCell() {
    this.edgeCellProcessor.process;
  }

  checkBounds() {
    const { isEdgeCell, processEdgeCell, processCell, postProcess } = this;
    // Checks if inside bounds
    if (!this.isInsideBounds) return;
    // LATER: Use hit-detection for edges
    isEdgeCell ? processEdgeCell() : processCell();
    postProcess();
  }

  postProcess() {
    this.addBoxTolerance();
  }

  addBoxTolerance() {
    const { bbox } = this;
    // Adds tolerance
    if (bbox != null) {
      bbox.grow(10);
    }
  }

  createBds() {
    const { currentTargetState } = this;
    var bds = mxRectangle.fromRectangle(currentTargetState);

    // Uses outer bounding box to take rotation into account
    if (
      currentTargetState.shape != null &&
      currentTargetState.shape.boundingBox != null
    ) {
      bds = mxRectangle.fromRectangle(currentTargetState.shape.boundingBox);
    }
    return bds;
  }
}
