import mx from "@mxgraph-app/mx";
const { mxUtils, mxEvent, mxPoint } = mx;

export class ClickHandler {
  editorUi: any;
  dragElement: any;
  currentGraph: any;

  element: any;
  dragSource: any;
  cells: any;

  first: any;
  sb: any;

  constructor(editorUi, dragElement) {
    this.editorUi = editorUi;
    this.currentGraph = editorUi.graph;
    this.dragElement = dragElement;
  }

  /**
   * AddragSource a handler for inserting the cell with a single click.
   */
  set(element, dragSource, cells) {
    this.element = element;
    this.dragSource = dragSource;
    this.cells = cells;
    return this;
  }

  get graph() {
    return this.editorUi.editor.graph;
  }

  get mouseDown() {
    return this.dragSource.mouseDown;
  }

  get mouseMove() {
    return this.dragSource.mouseMove;
  }

  get mouseUp() {
    return this.dragSource.mouseUp;
  }

  get tol() {
    return this.graph.tolerance;
  }

  add(element, dragSource, cells) {
    const { set, setDragMouseDown, setDragMouseMove, setDragMouseUp } = this;
    set(element, dragSource, cells);
    setDragMouseDown();
    setDragMouseMove();
    setDragMouseUp();
  }

  setDragMouseDown() {
    const { mouseDown, dragElement, dragSource, element } = this;
    dragSource.mouseDown = (evt) => {
      mouseDown.apply(this, arguments);
      this.first = new mxPoint(
        mxEvent.getClientX(evt),
        mxEvent.getClientY(evt)
      );

      if (!dragElement) return;
      dragElement.style.display = "none";
      mxUtils.setOpacity(element, 50);
    };
  }

  setDragMouseMove() {
    const { first, mouseMove, dragSource, element, tol } = this;
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

      mouseMove.apply(this, arguments);
    };
  }

  setDragMouseUp() {
    const { mouseUp, dragSource, element, cells, sb } = this;
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

        mouseUp.apply(dragSource, arguments);
        mxUtils.setOpacity(element, 100);
        this.first = null;

        // Blocks tooltips on this element after single click
        sb.currentElt = element;
      } catch (e) {
        dragSource.reset();
        sb.editorUi.handleError(e);
      }
    };
  }
}
