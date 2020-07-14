import mx from "@mxgraph-app/mx";
const { mxDragSource } = mx;

export class DragOver {
  config: any;
  sidebar: any;

  previewElement: any;

  currentGuide: any;
  currentStyleTarget: any;
  currentTargetState: any;

  activeArrow: any;
  styleTarget: any;
  firstVertex: any;
  freeSourceEdge: any;
  cells: any;
  direction: any;
  dragSource: any;
  bounds: any;
  previewElementWidth: any;
  previewElementHeight: any;

  constructor(config: any) {
    this.config = config;
  }

  dragOver = (graph, evt) => {
    const {
      sidebar,
      activeArrow,
      previewElement,
      styleTarget,
      firstVertex,
      freeSourceEdge,
      cells,
      direction,
      dragSource,
      bounds,

      currentGuide,
      currentStyleTarget,
      currentTargetState,
    } = this;

    mxDragSource.prototype.dragOver.apply(this, [graph, evt]);

    if (currentGuide && activeArrow) {
      currentGuide.hide();
    }

    if (previewElement) {
      var view = graph.view;

      if (currentStyleTarget && activeArrow == styleTarget) {
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
          graph.model.isEdge(currentTargetState.cell) || freeSourceEdge == null
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
        this.previewElement.style.left = (geo.x - dx2) * view.scale + dx + "px";
        this.previewElement.style.top = (geo.y - dy2) * view.scale + dy + "px";

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
