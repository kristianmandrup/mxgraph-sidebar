import mx from "@mxgraph-app/mx";
import { BaseEdge } from "./BaseEdge";
const { mxPoint } = mx;

export class TargetEdge extends BaseEdge {
  useParent: any;
  geo: any;

  constructor(opts) {
    super(opts);
    const { useParent, geo } = this;
    this.useParent = useParent;
    this.geo = geo;
  }

  addTerminalToEdge() {
    const {
      useParent,
      targetParent,
      graph,
      targets,
      dropCellIndex,
      source,
      geo,
    } = this;
    // Adds new outgoing connection to vertex and clears points
    graph.model.setTerminal(targets[dropCellIndex], source, true);
    var geo3 = graph.getCellGeometry(targets[dropCellIndex]);
    geo3.points = null;

    if (geo3.getTerminalPoint(false) != null) {
      geo3.setTerminalPoint(geo.getTerminalPoint(false), false);
    } else if (useParent && graph.model.isVertex(targetParent)) {
      // Adds parent offset to other nodes
      var tmpState = graph.view.getState(targetParent);
      var offset =
        tmpState.cell != graph.view.currentRoot
          ? new mxPoint(
              tmpState.x / graph.view.scale - graph.view.translate.x,
              tmpState.y / graph.view.scale - graph.view.translate.y
            )
          : new mxPoint(0, 0);

      graph.cellsMoved(targets, offset.x, offset.y, null, null, true);
    }
  }
}
