import mx from "@mxgraph-app/mx";
import { DropConnectGeo } from "../geo/DropConnectGeo";
const { mxPoint, mxStackLayout, mxEvent, mxEventObject } = mx;
import { SourceEdge } from "./SourceEdge";
import { TargetEdge } from "./TargetEdge";
import { EdgeInserter } from "./EdgeInserter";

export class DropConnect {
  editorUi: any;
  dropConnect: any;
  dropConnectGeo: any;

  source: any;
  targets: any;
  direction: any;
  dropCellIndex: any;
  evt: any;
  editingCell: any;

  _geo: any;
  validLayout: any;
  _dx: any;
  _dy: any;

  constructor(editorUi, opts: any = {}) {
    this.editorUi = editorUi;
    this.dropConnectGeo = opts.dropConnectGeo || new DropConnectGeo(editorUi);
    this.set(opts);
  }

  get graph() {
    return this.editorUi.editor.graph;
  }

  set({ source, targets, direction, dropCellIndex, evt }) {
    this.source = source;
    this.targets = targets;
    this.direction = direction;
    this.dropCellIndex = dropCellIndex;
    this.evt = evt;
    return this;
  }

  get geo() {
    this._geo = this._geo || this.calcGeo();
    return this._geo;
  }

  set geo(val) {
    this._geo = val;
  }

  calcGeo() {
    const { source, targets, direction, dropCellIndex } = this;
    return this.dropConnectGeo.getDropAndConnectGeometry(
      source,
      targets[dropCellIndex],
      direction,
      targets
    );
  }

  get sourceGeo() {
    const { graph, source } = this;
    return graph.getCellGeometry(source);
  }

  get geo2() {
    const { graph, targets, dropCellIndex } = this;
    return graph.getCellGeometry(targets[dropCellIndex]);
  }

  // Handles special case where target should be ignored for stack layouts
  get targetParent() {
    const { graph, source } = this;
    return graph.model.getParent(source);
  }

  get layoutManager() {
    return this.graph.layoutManager;
  }

  get layout() {
    const { layoutManager, targetParent } = this;
    return layoutManager.getLayout(targetParent);
  }

  get isTargetEdge() {
    const { graph, targets, dropCellIndex } = this;
    return graph.model.isEdge(targets[dropCellIndex]);
  }

  get useParent() {
    const { graph, source, sourceGeo, validLayout } = this;
    return (
      graph.model.isEdge(source) ||
      (sourceGeo != null && !sourceGeo.relative && validLayout)
    );
  }

  get isSourceEdge() {
    const { graph, source } = this;
    return graph.model.isEdge(source);
  }

  get sourceEdge(): any {
    const { graph, source, targets, dropCellIndex, direction } = this;
    return new SourceEdge({
      graph,
      source,
      targets,
      dropCellIndex,
      direction,
    });
  }

  get edgeInserter(): any {
    const { graph, source, targets, dropCellIndex, dx, dy, geo } = this;
    return new EdgeInserter({
      graph,
      source,
      targets,
      dropCellIndex,
      dx,
      dy,
      geo,
    });
  }

  get targetEdge(): any {
    const { graph, source, targets, dropCellIndex, useParent, geo } = this;
    return new TargetEdge({
      graph,
      source,
      targets,
      dropCellIndex,
      useParent,
      geo,
    });
  }

  get dx() {
    return this._dx;
  }

  set dx(val) {
    this._dx = val;
  }

  get dy() {
    return this._dy;
  }

  set dy(val) {
    this._dy = val;
  }

  adjustPosition() {
    const { geo, layoutManager, layout, graph, targetParent } = this;
    let validLayout = true;
    // Ignores parent if it has a stack layout
    if (!layoutManager || !layout || layout.constructor !== mxStackLayout) {
      this.validLayout = validLayout;
      return;
    }
    // LATER: Use parent of parent if valid layout
    validLayout = false;

    let tmp = graph.view.getState(targetParent);

    // Offsets by parent position
    if (tmp) {
      var offset = new mxPoint(
        tmp.x / graph.view.scale - graph.view.translate.x,
        tmp.y / graph.view.scale - graph.view.translate.y
      );
      geo.x += offset.x;
      geo.y += offset.y;
      let pt = geo.getTerminalPoint(false);

      if (pt != null) {
        pt.x += offset.x;
        pt.y += offset.y;
      }
    }
    this.validLayout = validLayout;
    this.geo = geo;
  }

  getTargets() {
    const { useParent, dx, dy, targetParent, targets, geo, graph } = this;
    return graph.importCells(
      targets,
      geo.x - (useParent ? dx : 0),
      geo.y - (useParent ? dy : 0),
      useParent ? targetParent : null
    );
  }

  setDeltaGeo() {
    const { geo2 } = this;
    this.dx = geo2.x;
    this.dy = geo2.y;
  }

  setDelta(dx, dy) {
    this.dx = dx;
    this.dy = dy;
  }

  /**
   * Creates a drag source for the given element.
   */
  connect() {
    const { graph } = this;
    let { geo } = this;

    // Targets without the new edge for selection
    let tmp: any = [];

    if (!geo) return [];
    graph.model.beginUpdate();
    const {
      setDelta,
      setDeltaGeo,
      adjustPosition,
      postProcess,
      isTargetEdge,
      isSourceEdge,
      handleError,
    } = this;
    let targets = this.targets;
    try {
      adjustPosition();
      setDeltaGeo();

      // Ignores geometry of edges
      if (isTargetEdge) {
        setDelta(0, 0);
      }

      const { getTargets } = this;
      targets = getTargets();
      tmp = targets;

      const { targetEdge, sourceEdge, edgeInserter } = this;
      if (isSourceEdge) {
        sourceEdge.addTerminalToEdge();
      } else if (isTargetEdge) {
        targetEdge.addTerminalToEdge();
      } else {
        edgeInserter.insert();
      }
      this.notifyCellsInserted();
    } catch (e) {
      handleError(e);
    } finally {
      graph.model.endUpdate();
    }

    postProcess();
    return tmp;
  }

  handleError(e) {
    this.editorUi.handleError(e);
  }

  notifyCellsInserted() {
    const { graph, evt, targets } = this;
    if (evt == null || !mxEvent.isShiftDown(evt)) {
      graph.fireEvent(new mxEventObject("cellsInserted", "cells", targets));
    }
  }

  postProcess() {
    const { isEditingCell, editCell } = this;
    isEditingCell && editCell();
  }

  get isEditingCell() {
    const { graph, evt, editingCell } = this;
    return (
      graph.editAfterInsert && evt && mxEvent.isMouseEvent(evt) && editingCell
    );
  }

  editCell() {
    const { graph, editingCell } = this;
    window.setTimeout(function () {
      graph.startEditing(editingCell);
    }, 0);
  }
}
