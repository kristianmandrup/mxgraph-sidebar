import { BaseEdge } from "./BaseEdge";

export class EdgeInserter extends BaseEdge {
  dx: any;
  dy: any;
  geo: any;

  constructor(opts) {
    super(opts);
    const { dx, dy, geo } = this;
    this.dx = dx;
    this.dy = dy;
    this.geo = geo;
  }

  get geo2() {
    const { graph, targets, dropCellIndex } = this;
    return graph.getCellGeometry(targets[dropCellIndex]);
  }

  setGeo() {
    const { geo2, geo } = this;
    this.dx = geo.x - Math.round(geo2.x);
    this.dy = geo.y - Math.round(geo2.y);
    geo.x = Math.round(geo2.x);
    geo.y = Math.round(geo2.y);
  }

  insert() {
    const { setGeo, graph, insertEdge, targets, dropCellIndex } = this;
    setGeo();
    const { geo, dx, dy } = this;
    graph.model.setGeometry(targets[dropCellIndex], geo);
    graph.cellsMoved(targets, dx, dy, null, null, true);
    // let tmp = targets.slice();
    // const editingCell = tmp.length == 1 ? tmp[0] : null;
    insertEdge();
  }

  insertEdge() {
    const { graph, source, targets, dropCellIndex } = this;
    targets.push(
      graph.insertEdge(
        null,
        null,
        "",
        source,
        targets[dropCellIndex],
        graph.createCurrentEdgeStyle()
      )
    );
  }
}
