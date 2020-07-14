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

  constructor(editorUi) {
    this.editorUi = editorUi;
    this.dropTarget = new DropTarget(editorUi);
    this.dropCheck = new DropCheck(editorUi);
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

  get sidebar() {
    return this;
  }

  /**
   * Creates a drag source for the given element.
   */
  create(elt, dropHandler, preview, cells) {
    // Checks if the cells contain any vertices
    const { graph, firstVertex, freeSourceEdge } = this;

    for (var i = 0; i < cells.length; i++) {
      if (firstVertex == null && graph.model.isVertex(cells[i])) {
        this.firstVertex = i;
      } else if (
        freeSourceEdge == null &&
        graph.model.isEdge(cells[i]) &&
        graph.model.getTerminal(cells[i], true) == null
      ) {
        this.freeSourceEdge = i;
      }

      if (firstVertex != null && freeSourceEdge != null) {
        break;
      }
    }

    const dragSource = new DragSourceCreator(this.editorUi).create({
      elt,
      dropHandler,
      preview,
      cells,
    });

    this.dropStyleEnabled = this.isDropStyleEnabled(cells, firstVertex);

    // Stops dragging if cancel is pressed
    graph.addListener(mxEvent.ESCAPE, (_sender, _evt) => {
      if (dragSource.isActive()) {
        dragSource.reset();
      }
    });

    new DragSourceConfig(this.graph, dragSource).configure();

    return dragSource;
  }
}
