import mx from "@mxgraph-app/mx";
import { DragArrow } from "../arrow";
import { DragOver } from "./over";
const { mxDragSource, mxClient, mxEvent } = mx;

export class DragSourceConfig {
  ui: any;
  sidebar: any;

  dragSource: any;
  dropTarget: any;

  dragArrow: any;
  activeArrow: any;

  currentTargetState: any;
  currentStateHandle: any;
  currentStyleTarget: any;
  styleTarget: any;

  freeSourceEdge: any;
  firstVertex: any;
  cells: any;
  direction: any;
  bounds: any;

  constructor(ui, dragSource) {
    this.ui = ui;
    this.dragSource = dragSource;
    this.init();
  }

  get graph() {
    return this.ui.graph;
  }

  init() {
    this.dragArrow = new DragArrow();
  }

  configure() {
    const {
      mouseDown,
      createPreviewElement,
      dragEnter,
      dragExit,
      dragOver,
      getDropTarget,
      stopDrag,
    } = this;
    mouseDown();
    createPreviewElement();
    dragEnter();
    dragExit();
    dragOver();
    getDropTarget();
    stopDrag();
  }

  mouseDown() {
    const { graph, dragSource } = this;
    // Overrides mouseDown to ignore popup triggers
    var mouseDown = dragSource.mouseDown;

    dragSource.mouseDown = (evt) => {
      if (!mxEvent.isPopupTrigger(evt) && !mxEvent.isMultiTouchEvent(evt)) {
        graph.stopEditing();
        mouseDown.apply(this, arguments);
      }
    }; // Workaround for event redirection via image tag in quirks and IE8
  }

  createPreviewElement() {
    const { dragSource } = this;
    var dsCreatePreviewElement = dragSource.createPreviewElement;

    // Stores initial size of preview element
    dragSource.createPreviewElement = function (_graph) {
      var elt = dsCreatePreviewElement.apply(this, arguments);

      // Pass-through events required to tooltip on replace shape
      if (mxClient.IS_SVG) {
        elt.style.pointerEvents = "none";
      }

      this.previewElementWidth = elt.style.width;
      this.previewElementHeight = elt.style.height;

      return elt;
    }; // Shows/hides hover icons
  }

  dragEnter() {
    const { dragSource, ui } = this;
    var dragEnter = dragSource.dragEnter;
    dragSource.dragEnter = (_graph, _evt) => {
      if (ui.hoverIcons != null) {
        ui.hoverIcons.setDisplay("none");
      }

      dragEnter.apply(this, arguments);
    };
  }

  dragExit() {
    const { dragSource, ui } = this;
    var dragExit = dragSource.dragExit;
    dragSource.dragExit = (_graph, _evt) => {
      if (ui.hoverIcons != null) {
        ui.hoverIcons.setDisplay("");
      }

      dragExit.apply(this, arguments);
    };
  }

  dragOver() {
    const { dragSource } = this;
    dragSource.dragOver = this.createDragOver().dragOver;
  }

  createDragOver() {
    return new DragOver(this);
  }

  getDropTarget() {
    const { dragSource, dropTarget } = this;
    dragSource.getDropTarget = (graph, x, y, evt) => {
      dropTarget.getDropTarget(graph, x, y, evt);
    };
  }

  stopDrag() {
    const { dragSource, dragArrow } = this;
    const { currentTargetState, currentStateHandle } = this;
    const {
      arrowUp,
      arrowRight,
      arrowLeft,
      arrowDown,
      styleTarget,
      roundSource,
      roundTarget,
    } = dragArrow;

    dragSource.stopDrag = () => {
      mxDragSource.prototype.stopDrag.apply(this, []);

      var elts = [
        roundSource,
        roundTarget,
        styleTarget,
        arrowUp,
        arrowRight,
        arrowDown,
        arrowLeft,
      ];

      for (var i = 0; i < elts.length; i++) {
        if (elts[i].parentNode != null) {
          elts[i].parentNode.removeChild(elts[i]);
        }
      }

      if (currentTargetState != null && currentStateHandle != null) {
        currentStateHandle.reset();
      }

      this.currentStateHandle = null;
      this.currentTargetState = null;
      this.currentStyleTarget = null;

      dragArrow.styleTargetParent = null;
      dragArrow.activeArrow = null;
    };
  }
}
