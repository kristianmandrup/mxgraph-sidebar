import { DropConnect } from "./connect/DropConnect";
import { DropConnectGeo } from "./geo/DropConnectGeo";

export class DropConnector {
  editorUi: any;

  constructor(editorUi) {
    this.editorUi = editorUi;
  }

  createDropConnect(opts: any) {
    return new DropConnect(this.editorUi, opts);
  }

  createDropConnectGeo(opts: any) {
    return new DropConnectGeo(this.editorUi, opts);
  }

  /**
   * Creates a drag source for the given element.
   */
  dropAndConnect(source, targets, direction, dropCellIndex, evt) {
    this.createDropConnect({
      source,
      targets,
      direction,
      dropCellIndex,
      evt,
    }).connect();
  }

  /**
   * Creates a drag source for the given element.
   */
  getDropAndConnectGeometry(source, target, direction, targets) {
    this.createDropConnectGeo({
      source,
      target,
      direction,
      targets,
    }).connect();
  }
}
