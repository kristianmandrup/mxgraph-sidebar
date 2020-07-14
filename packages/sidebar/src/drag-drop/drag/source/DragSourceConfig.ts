import mx from "@mxgraph-app/mx";
import { DragArrow } from "../arrow";
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
    const { mouseDown } = this;
    mouseDown();
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
    const { dragSource, activeArrow } = this;
    const { currentStyleTarget, styleTarget, currentTargetState } = this;
    const { freeSourceEdge, sidebar, firstVertex } = this;
    const { cells, direction, bounds } = this;

    dragSource.dragOver = function (graph, evt) {
      mxDragSource.prototype.dragOver.apply(this, [graph, evt]);

      if (this.currentGuide != null && activeArrow != null) {
        this.currentGuide.hide();
      }

      if (this.previewElement != null) {
        var view = graph.view;

        if (currentStyleTarget != null && activeArrow == styleTarget) {
          this.previewElement.style.display = graph.model.isEdge(
            currentStyleTarget.cell
          )
            ? "none"
            : "";

          this.previewElement.style.left = currentStyleTarget.x + "px";
          this.previewElement.style.top = currentStyleTarget.y + "px";
          this.previewElement.style.width = currentStyleTarget.width + "px";
          this.previewElement.style.height = currentStyleTarget.height + "px";
        } else if (currentTargetState != null && activeArrow != null) {
          var index =
            graph.model.isEdge(currentTargetState.cell) ||
            freeSourceEdge == null
              ? firstVertex
              : freeSourceEdge;
          var geo = sidebar.getDropAndConnectGeometry(
            currentTargetState.cell,
            cells[index],
            direction,
            cells
          );
          var geo2 = !graph.model.isEdge(currentTargetState.cell)
            ? graph.getCellGeometry(currentTargetState.cell)
            : null;
          var geo3 = graph.getCellGeometry(cells[index]);
          var parent = graph.model.getParent(currentTargetState.cell);
          var dx = view.translate.x * view.scale;
          var dy = view.translate.y * view.scale;

          if (
            geo2 != null &&
            !geo2.relative &&
            graph.model.isVertex(parent) &&
            parent != view.currentRoot
          ) {
            var pState = view.getState(parent);

            dx = pState.x;
            dy = pState.y;
          }

          var dx2 = geo3.x;
          var dy2 = geo3.y;

          // Ignores geometry of edges
          if (graph.model.isEdge(cells[index])) {
            dx2 = 0;
            dy2 = 0;
          }

          // Shows preview at drop location
          this.previewElement.style.left =
            (geo.x - dx2) * view.scale + dx + "px";
          this.previewElement.style.top =
            (geo.y - dy2) * view.scale + dy + "px";

          if (cells.length == 1) {
            this.previewElement.style.width = geo.width * view.scale + "px";
            this.previewElement.style.height = geo.height * view.scale + "px";
          }

          this.previewElement.style.display = "";
        } else if (
          dragSource.currentHighlight.state != null &&
          graph.model.isEdge(dragSource.currentHighlight.state.cell)
        ) {
          // Centers drop cells when splitting edges
          this.previewElement.style.left =
            Math.round(
              parseInt(this.previewElement.style.left) -
                (bounds.width * view.scale) / 2
            ) + "px";
          this.previewElement.style.top =
            Math.round(
              parseInt(this.previewElement.style.top) -
                (bounds.height * view.scale) / 2
            ) + "px";
        } else {
          this.previewElement.style.width = this.previewElementWidth;
          this.previewElement.style.height = this.previewElementHeight;
          this.previewElement.style.display = "";
        }
      }
    };
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
