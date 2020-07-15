import { DropProcessor } from "./DropProcessor";
import mx from "@mxgraph-app/mx";
const { mxEvent } = mx;

export class DropHandler {
  container: any;
  editorUi: any;
  cells: any;
  allowSplit: any;
  allowCellsInserted: any;
  bounds: any;

  constructor(sidebar, { cells, allowSplit, allowCellsInserted, bounds }) {
    this.container = sidebar.container;
    this.editorUi = sidebar.editorUi;
    this.cells = cells;
    this.allowSplit = allowSplit;
    this.allowCellsInserted = allowCellsInserted == false ? false : true;
    this.bounds = bounds;
  }

  createDropElement(force, evt) {
    return force
      ? null
      : mxEvent.isTouchEvent(evt) || mxEvent.isPenEvent(evt)
      ? document.elementFromPoint(
          mxEvent.getClientX(evt),
          mxEvent.getClientY(evt)
        )
      : mxEvent.getSource(evt);
  }

  /**
   * Creates a drop handler for inserting the given cells.
   */
  create() {
    const { createDropElement, process } = this;
    return (graph, evt, target, x, y, force) => {
      let element = createDropElement(force, evt);
      element = this.setElementToParent(element);

      process({ element, graph, evt, target, x, y });
    };
  }

  process(opts: any = {}) {
    if (!this.shouldProcess(opts.element, opts.graph)) return;
    const { allowCellsInserted, cells, allowSplit, editorUi, bounds } = this;
    return new DropProcessor(editorUi, {
      ...opts,
      bounds,
      allowSplit,
      cells,
      allowCellsInserted,
    }).process();
  }

  shouldProcess(element, graph) {
    return element == null && graph.isEnabled();
  }

  setElementToParent(element) {
    while (element && element !== this.container) {
      element = element.parentNode;
    }
    return element;
  }
}
