import mx from "@mxgraph-app/mx";
import { BaseEdge } from "./BaseEdge";
const { mxPoint } = mx;

export class TargetEdge extends BaseEdge {
  useParent: any;
  geo: any;
  _geo2: any;

  constructor(opts) {
    super(opts);
    const { useParent, geo } = this;
    this.useParent = useParent;
    this.geo = geo;
  }

  get geo2() {
    const { graph, targets, dropCellIndex } = this;
    this._geo2 = this._geo2 || graph.getCellGeometry(targets[dropCellIndex]);
    return this._geo2;
  }

  setTerminal() {
    const { graph, dropCellIndex, source, targets } = this;
    graph.model.setTerminal(targets[dropCellIndex], source, true);
  }

  get offset() {
    const { tmpState, graph } = this;
    return tmpState.cell != graph.view.currentRoot
      ? new mxPoint(
          tmpState.x / graph.view.scale - graph.view.translate.x,
          tmpState.y / graph.view.scale - graph.view.translate.y
        )
      : new mxPoint(0, 0);
  }

  get tmpState() {
    const { graph, targetParent } = this;
    return graph.view.getState(targetParent);
  }

  get hasParent() {
    const { useParent, targetParent, graph } = this;
    return useParent && graph.model.isVertex(targetParent);
  }

  hasTerminalPoints(geo) {
    return !!this.getTerminalPoints(geo);
  }

  getTerminalPoints(geo) {
    return geo.getTerminalPoint(false);
  }

  copyTerminalPoints() {
    const { geo2, getTerminalPoints } = this;
    geo2.setTerminalPoint(getTerminalPoints(geo2), false);
  }

  moveCellsByOffset() {
    const { graph, targets, offset } = this;
    // Adds parent offset to other nodes
    graph.cellsMoved(targets, offset.x, offset.y, null, null, true);
  }

  addTerminalToEdge() {
    const {
      setTerminal,
      moveCellsByOffset,
      copyTerminalPoints,
      getTerminalPoints,
      hasParent,
      geo2,
    } = this;
    // Adds new outgoing connection to vertex and clears points
    setTerminal();
    geo2.points = null;
    if (getTerminalPoints(geo2)) {
      copyTerminalPoints();
    } else if (hasParent) {
      moveCellsByOffset();
    }
  }
}
