import mx from "@mxgraph-app/mx";
const { mxUtils, mxEvent, mxPoint } = mx;

export class ClickHandler {
  editorUi: any;
  dragElement: any;
  currentGraph: any;

  constructor(editorUi, dragElement) {
    this.editorUi = editorUi;
    this.currentGraph = editorUi.graph;
    this.dragElement = dragElement;
  }

  /**
   * AddragSource a handler for inserting the cell with a single click.
   */
  add(element, dragSource, cells) {
    var graph = this.editorUi.editor.graph;
    var oldMouseDown = dragSource.mouseDown;
    var oldMouseMove = dragSource.mouseMove;
    var oldMouseUp = dragSource.mouseUp;
    var tol = graph.tolerance;
    var first: any;
    var sb: any;

    dragSource.mouseDown = function (evt) {
      oldMouseDown.apply(this, arguments);
      first = new mxPoint(mxEvent.getClientX(evt), mxEvent.getClientY(evt));

      if (this.dragElement != null) {
        this.dragElement.style.display = "none";
        mxUtils.setOpacity(element, 50);
      }
    };

    dragSource.mouseMove = (evt) => {
      if (
        this.dragElement != null &&
        this.dragElement.style.display == "none" &&
        first != null &&
        (Math.abs(first.x - mxEvent.getClientX(evt)) > tol ||
          Math.abs(first.y - mxEvent.getClientY(evt)) > tol)
      ) {
        this.dragElement.style.display = "";
        mxUtils.setOpacity(element, 100);
      }

      oldMouseMove.apply(this, arguments);
    };

    dragSource.mouseUp = (evt) => {
      try {
        if (
          !mxEvent.isPopupTrigger(evt) &&
          this.currentGraph == null &&
          this.dragElement != null &&
          this.dragElement.style.display == "none"
        ) {
          sb.itemClicked(cells, dragSource, evt, element);
        }

        oldMouseUp.apply(dragSource, arguments);
        mxUtils.setOpacity(element, 100);
        first = null;

        // Blocks tooltips on this element after single click
        sb.currentElt = element;
      } catch (e) {
        dragSource.reset();
        sb.editorUi.handleError(e);
      }
    };
  }
}
