import { BaseCellProcessor } from "./BaseCellProcessor";
import mx from "@mxgraph-app/mx";
const { mxRectangle } = mx;

export class EdgeCellProcessor extends BaseCellProcessor {
  constructor(config: any) {
    super(config);
  }

  process() {
    const { addTargetRect, addSourceRect } = this;
    addTargetRect();
    addSourceRect();
  }

  addTargetRect() {
    const { currentTargetState, dropArrow, x, y, bbox } = this.config;
    const { checkArrow, roundDrop, roundTarget } = dropArrow;
    const pts = currentTargetState.absolutePoints;

    if (!roundTarget.parentNode) return;
    var pe = pts[pts.length - 1];
    bbox.add(
      checkArrow(
        x,
        y,
        new mxRectangle(
          pe.x - roundDrop.width / 2,
          pe.y - roundDrop.height / 2,
          roundDrop.width,
          roundDrop.height
        ),
        roundTarget
      )
    );
  }

  addSourceRect() {
    const { currentTargetState, dropArrow, x, y, bbox } = this.config;
    const { checkArrow, roundDrop, roundSource } = dropArrow;
    const pts = currentTargetState.absolutePoints;

    if (!roundSource.parentNode) return;
    var p0 = pts[0];
    bbox.add(
      checkArrow(
        x,
        y,
        new mxRectangle(
          p0.x - roundDrop.width / 2,
          p0.y - roundDrop.height / 2,
          roundDrop.width,
          roundDrop.height
        ),
        roundSource
      )
    );
  }
}
