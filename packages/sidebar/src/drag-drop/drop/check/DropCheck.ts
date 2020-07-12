import { DropBase } from "../../DropBase";
import { DropEnabledChecker } from "./DropEnabledChecker";

export class DropCheck extends DropBase {
  editorUi: any;

  constructor(editorUi) {
    super(editorUi);
  }

  /**
   * Limits drop style to non-transparent source shapes.
   */
  isDropStyleEnabled(firstVertex, cells) {
    return new DropEnabledChecker(firstVertex, cells).isDropStyleEnabled;
  }

  /**
   * Ignores swimlanes as drop style targets.
   */
  isDropStyleTargetIgnored(state) {
    return this.graph.isSwimlane(state.cell);
  }
}
