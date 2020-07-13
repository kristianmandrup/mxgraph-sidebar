import mx from "@mxgraph-app/mx";
import { BaseEdge } from "./BaseEdge";
const { mxConstants } = mx;

export class SourceEdge extends BaseEdge {
  constructor(opts) {
    super(opts);
  }

  addTerminalToEdge() {
    const { graph, source, targets, dropCellIndex, direction } = this;
    // Adds new terminal to edge
    // LATER: Push new terminal out radially from edge start point
    graph.model.setTerminal(
      source,
      targets[dropCellIndex],
      direction == mxConstants.DIRECTION_NORTH
    );
  }
}
