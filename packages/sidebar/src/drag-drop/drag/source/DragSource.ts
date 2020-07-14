import mx from "@mxgraph-app/mx";
import { DragSourceCreator } from "./DragSourceCreator";
import { DropTarget } from "../drop-target/DropTarget";
import { DropCheck } from "../../drop/check/DropCheck";
import { DragSourceConfig } from "./DragSourceConfig";

const { mxEvent } = mx;

export class DragSource {
  editorUi: any;
  updateThread: any;
  dropStyleEnabled: any;
  triangleUp: any;
  triangleDown: any;
  triangleLeft: any;
  triangleRight: any;
  updateShapes: any;
  refreshTarget: any;
  dropAndConnect: any;
  previewElement: any;
  previewElementWidth: any;
  previewElementHeight: any;
  currentGuide: any;
  getDropAndConnectGeometry: any;
  dropTargetDelay: any;
  isDropStyleTargetIgnored: any;
  roundDrop: any;
  freeSourceEdge: any;
  firstVertex: any;

  dragArrow: any;
  dropTarget: any;
  dropCheck: any;

  element: any;
  dropHandler: any;
  preview: any;
  cells: any;

  constructor(editorUi, opts: any = {}) {
    this.editorUi = editorUi;
    this.set(opts);
    this.init();
  }

  set({ element, dropHandler, preview, cells }) {
    this.element = element;
    this.dropHandler = dropHandler;
    this.preview = preview;
    this.cells = cells;
  }

  init() {
    const { createDropTarget, createDropCheck } = this;
    this.dropTarget = createDropTarget();
    this.dropCheck = createDropCheck();
  }

  createDropTarget() {
    return new DropTarget(this.editorUi);
  }

  createDropCheck() {
    return new DropCheck(this.editorUi);
  }

  isDropStyleEnabled(cells, firstVertex) {
    return this.dropCheck.isDropStyleEnabled(cells, firstVertex);
  }

  get ui() {
    return this.editorUi;
  }

  get graph() {
    return this.ui.editor.graph;
  }

  /**
   * Creates a drag source for the given element.
   */
  create() {
    // Checks if the cells contain any vertices
    const { processCells, cells } = this;

    processCells();

    const dragSource = this.createDragSourceCreator();
    this.dropStyleEnabled = this.isDropStyleEnabled(cells, this.firstVertex);

    this.setCancelHandler(dragSource);
    this.configureDragSource(dragSource);

    return dragSource;
  }

  processCells() {
    // Checks if the cells contain any vertices
    const { processCell, cells } = this;

    for (let index = 0; index < cells.length; index++) {
      const cell = cells[index];
      processCell(cell, index);

      if (this.firstVertex && this.freeSourceEdge) {
        break;
      }
    }
  }

  setCancelHandler(dragSource) {
    // Stops dragging if cancel is pressed
    this.graph.addListener(mxEvent.ESCAPE, (_sender, _evt) => {
      if (dragSource.isActive()) {
        dragSource.reset();
      }
    });
  }

  createDragSourceCreator() {
    const { element, dropHandler, preview, cells } = this;
    return new DragSourceCreator(this.editorUi).create({
      element,
      dropHandler,
      preview,
      cells,
    });
  }

  processCell(cell, index) {
    const { graph, firstVertex, freeSourceEdge } = this;
    if (firstVertex == null && graph.model.isVertex(cell)) {
      this.firstVertex = index;
    } else if (
      freeSourceEdge == null &&
      graph.model.isEdge(cell) &&
      graph.model.getTerminal(cell, true) == null
    ) {
      this.freeSourceEdge = index;
    }
  }

  configureDragSource(dragSource) {
    this.createDragSourceConfig(dragSource).configure();
  }

  createDragSourceConfig(dragSource) {
    return new DragSourceConfig(this.graph, dragSource);
  }
}
