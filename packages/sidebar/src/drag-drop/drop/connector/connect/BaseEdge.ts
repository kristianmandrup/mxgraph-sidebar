export class BaseEdge {
  source: any;
  graph: any;
  targets: any;
  dropCellIndex: any;
  targetParent: any;
  direction: any;

  constructor({
    graph,
    source,
    targets,
    targetParent,
    direction,
    dropCellIndex,
  }) {
    this.graph = graph;
    this.source = source;
    this.targets = targets;
    this.targetParent = targetParent;
    this.direction = direction;
    this.dropCellIndex = dropCellIndex;
  }
}
