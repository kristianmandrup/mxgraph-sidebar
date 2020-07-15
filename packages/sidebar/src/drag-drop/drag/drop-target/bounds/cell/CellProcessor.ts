import { BoxDirections } from "./BoxDirections";
import { BaseCellProcessor } from "./BaseCellProcessor";

export class CellProcessor extends BaseCellProcessor {
  boxDirections: any;

  constructor(config: any) {
    super(config);
    this.boxDirections = new BoxDirections(this);
  }

  get handler() {
    const { graph, currentTargetState } = this.config;
    return graph.selectionCellsHandler.getHandler(currentTargetState.cell);
  }

  addBoxDirections() {
    this.boxDirections.addBoxDirections();
  }

  process() {
    const { configureHandler, addBoxDirections, growBds } = this;
    growBds();
    configureHandler();
    addBoxDirections();
  }

  growBds() {
    const { graph, bds, dropArrow } = this.config;
    const { arrowSpacing } = dropArrow;
    bds.grow(graph.tolerance);
    bds.grow(arrowSpacing);
  }

  configureHandler() {
    const { bds } = this.config;
    const { handler, addBoundingBox } = this;
    if (!handler) return;
    bds.x -= handler.horizontalOffset / 2;
    bds.y -= handler.verticalOffset / 2;
    bds.width += handler.horizontalOffset;
    bds.height += handler.verticalOffset;

    addBoundingBox(handler);
  }

  addBoundingBox(handler) {
    const { bds } = this.config;
    const { hasVisibleNodeAndBoundingBox } = this;
    // Adds bounding box of rotation handle to avoid overlap
    if (hasVisibleNodeAndBoundingBox(handler)) {
      bds.add(handler.rotationShape.boundingBox);
    }
  }

  hasVisibleNodeAndBoundingBox(handler) {
    return (
      handler.rotationShape &&
      handler.rotationShape.node &&
      handler.rotationShape.boundingBox &&
      handler.rotationShape.node.style.visibility != "hidden" &&
      handler.rotationShape.node.style.display != "none"
    );
  }
}
