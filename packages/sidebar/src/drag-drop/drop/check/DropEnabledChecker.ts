import { DropBase } from "../../drag";
import mx from "@mxgraph-app/mx";
const { mxUtils, mxConstants } = mx;

export class DropEnabledChecker extends DropBase {
  editorUi: any;
  firstVertex: any;
  cells: any;

  constructor(editorUi, { firstVertex, cells }) {
    super(editorUi);
    this.firstVertex = firstVertex;
    this.cells = cells;
  }

  isSingle() {
    const { firstVertex, cells } = this;
    return firstVertex && cells.length == 1;
  }

  get vstyle() {
    const { graph, firstVertex, cells } = this;
    return graph.getCellStyle(cells[firstVertex]);
  }

  /**
   * Limits drop style to non-transparent source shapes.
   */
  get isDropStyleEnabled() {
    const { isSingle, dropStyleResult } = this;
    let result = true;
    if (!isSingle) return result;
    result = dropStyleResult();
    return result;
  }

  dropStyleResult() {
    const { vstyle } = this;
    if (!vstyle) return true;
    return (
      mxUtils.getValue(
        vstyle,
        mxConstants.STYLE_STROKECOLOR,
        mxConstants.NONE
      ) != mxConstants.NONE ||
      mxUtils.getValue(vstyle, mxConstants.STYLE_FILLCOLOR, mxConstants.NONE) !=
        mxConstants.NONE
    );
  }
}
