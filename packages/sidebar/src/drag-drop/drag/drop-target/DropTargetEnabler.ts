import mx from "@mxgraph-app/mx";
import { DropBase } from "../../DropBase";
const { mxPoint, mxUtils, mxRectangle, mxEvent } = mx;

export class DropTargetEnabler extends DropBase {
  currentStyleTarget: any;
  timeOnTarget: any;
  evt: any;
  x: any;
  y: any;
  styleTargetParent: any;
  styleTarget: any;
  dragArrow: any;
  dropArrow: any;
  refreshTarget: any;

  point: any;
  rect: any;

  get shouldReset() {
    const { evt, x, y, timeOnTarget, currentStyleTarget } = this;
    return (
      !currentStyleTarget ||
      !mxUtils.contains(currentStyleTarget, x, y) ||
      (timeOnTarget > 1500 && !mxEvent.isShiftDown(evt))
    );
  }

  get hasTargets() {
    const { currentStyleTarget, styleTargetParent } = this;
    return currentStyleTarget && styleTargetParent;
  }

  enable() {
    const { enableTargets, resetTargets } = this;
    // Does not reset on ignored edges
    resetTargets() || enableTargets();
  }

  enableTargets() {
    const { hasTargets } = this;
    if (!hasTargets) return;
    const { x, y, styleTarget, dropArrow, createRect } = this;
    const { checkArrow } = dropArrow;

    // Sets active Arrow as side effect
    const rect = createRect();
    checkArrow(x, y, rect, styleTarget);
    return true;
  }

  createRect() {
    const { refreshTarget, createPoint } = this;
    const point = createPoint();
    const rect = new mxRectangle(
      point.x - refreshTarget.width / 2,
      point.y - refreshTarget.height / 2,
      refreshTarget.width,
      refreshTarget.height
    );
    this.rect = rect;
    return;
  }

  createPoint() {
    const { currentStyleTarget, graph } = this;
    const point = graph.model.isEdge(currentStyleTarget.cell)
      ? graph.view.getPoint(currentStyleTarget)
      : new mxPoint(
          currentStyleTarget.getCenterX(),
          currentStyleTarget.getCenterY()
        );
    this.point = point;
    return point;
  }

  resetTargets() {
    const { shouldReset } = this;
    if (!shouldReset) return;
    const { styleTargetParent, styleTarget, dragArrow } = this;
    this.currentStyleTarget = null;
    if (!styleTargetParent) return;
    styleTarget.parentNode.removeChild(styleTarget);
    dragArrow.styleTargetParent = null;
    return true;
  }
}
