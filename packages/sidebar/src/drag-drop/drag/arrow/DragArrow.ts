import mx from "@mxgraph-app/mx";
import { ArrowCreator } from "./ArrowCreator";
const { mxConstants, mxResources, mxUtils } = mx;

export class DragArrow {
  triangleUp: any;
  triangleDown: any;
  triangleLeft: any;
  triangleRight: any;
  roundDrop: any;

  refreshTarget: any;

  constructor(opts: any = {}) {
    this.refreshTarget = opts.refreshTarget;
    this.setTriangle(opts);
  }

  setTriangle({ triangleUp, triangleDown, triangleLeft, triangleRight }) {
    this.triangleDown = triangleDown;
    this.triangleUp = triangleUp;
    this.triangleLeft = triangleLeft;
    this.triangleRight = triangleRight;
    return this;
  }

  get connect() {
    return mxResources.get("connect");
  }

  get replace() {
    return mxResources.get("replace");
  }

  get arrowUp() {
    const { triangleUp, connect } = this;
    return this.createArrow(triangleUp, connect);
  }

  get arrowDown() {
    const { triangleDown, connect } = this;
    return this.createArrow(triangleDown, connect);
  }

  get arrowRight() {
    const { triangleRight, connect } = this;
    return this.createArrow(triangleRight, connect);
  }

  get arrowLeft() {
    const { triangleLeft, connect } = this;
    return this.createArrow(triangleLeft, connect);
  }

  get styleTarget() {
    const { refreshTarget, replace } = this;
    return this.createArrow(refreshTarget, replace);
  }
  // Workaround for actual parentNode not being updated in old IE
  styleTargetParent = null;

  get roundSource() {
    return this.createArrow(this.roundDrop);
  }

  get roundTarget() {
    return this.createArrow(this.roundDrop);
  }

  direction = mxConstants.DIRECTION_NORTH;
  activeArrow = null;

  withinBounds = (bounds, x, y) => mxUtils.contains(bounds, x, y);

  arrowInsideBounds(arrow) {
    mxUtils.setOpacity(arrow, 100);
    this.activeArrow = arrow;
  }

  arrowOutsideBounds(arrow) {
    const { styleTarget } = this;
    mxUtils.setOpacity(arrow, arrow == styleTarget ? 30 : 20);
  }

  checkArrow = (x, y, bounds, arrow) => {
    const { arrowOutsideBounds, arrowInsideBounds, withinBounds } = this;
    if (!arrow.parentNode) return bounds;

    withinBounds(bounds, x, y)
      ? arrowInsideBounds(arrow)
      : arrowOutsideBounds(arrow);
    return bounds;
  }; // Hides guides and preview if target is active

  createArrowCreator(img, tooltip) {
    const { refreshTarget } = this;
    return new ArrowCreator({ refreshTarget, img, tooltip });
  }

  createArrow = (img, tooltip?) => {
    return this.createArrowCreator(img, tooltip).create();
  };
}
