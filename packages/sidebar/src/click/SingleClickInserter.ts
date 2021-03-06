import mx from "@mxgraph-app/mx";
import { DropConnect } from "../drag-drop/drop/connector/connect/DropConnect";
import { ShapeUpdater } from "../shapes/ShapeUpdater";
const { mxConstants, mxEvent } = mx;

export class SingleClickInserter {
  editorUi: any;

  constructor(editorUi) {
    this.editorUi = editorUi;
  }

  /**
   * Creates a drag source for the given element.
   */
  dropAndConnect(source, targets, direction, dropCellIndex, evt) {
    return new DropConnect(this.editorUi).dropAndConnect(
      source,
      targets,
      direction,
      dropCellIndex,
      evt
    );
  }

  updateShapes(source, targets) {
    return new ShapeUpdater(this.editorUi).updateShapes(source, targets);
  }

  /**
   * Adds a handler for inserting the cell with a single click.
   */
  itemClicked(cells, ds, evt, _elt) {
    var graph = this.editorUi.editor.graph;
    graph.container.focus();

    // Alt+Click inserts and connects
    if (
      mxEvent.isAltDown(evt) &&
      graph.getSelectionCount() == 1 &&
      graph.model.isVertex(graph.getSelectionCell())
    ) {
      var firstVertex: any;

      for (var i = 0; i < cells.length && firstVertex == null; i++) {
        if (graph.model.isVertex(cells[i])) {
          firstVertex = i;
        }
      }

      if (firstVertex != null) {
        graph.setSelectionCells(
          this.dropAndConnect(
            graph.getSelectionCell(),
            cells,
            mxEvent.isMetaDown(evt) || mxEvent.isControlDown(evt)
              ? mxEvent.isShiftDown(evt)
                ? mxConstants.DIRECTION_WEST
                : mxConstants.DIRECTION_NORTH
              : mxEvent.isShiftDown(evt)
              ? mxConstants.DIRECTION_EAST
              : mxConstants.DIRECTION_SOUTH,
            firstVertex,
            evt
          )
        );
        graph.scrollCellToVisible(graph.getSelectionCell());
      }
    } // Shift+Click updates shape
    else if (mxEvent.isShiftDown(evt) && !graph.isSelectionEmpty()) {
      this.updateShapes(cells[0], graph.getSelectionCells());
      graph.scrollCellToVisible(graph.getSelectionCell());
    } else {
      var pt = mxEvent.isAltDown(evt)
        ? graph.getFreeInsertPoint()
        : graph.getCenterInsertPoint(
            graph.getBoundingBoxFromGeometry(cells, true)
          );
      ds.drop(graph, evt, null, pt.x, pt.y, true);
    }
  }
}
