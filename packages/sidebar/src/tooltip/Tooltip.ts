import mx from "@mxgraph-app/mx";
import { TooltipDisplayer } from "./TooltipDisplayer";
// import { Graph } from "ui/graph/Graph";
const { mxPoint } = mx;

// const Graph: any = {};

export class Tooltip {
  classMap: any;
  editorUi: any;
  graph: any;
  container: any;
  palettes = new Object();
  taglist = new Object();
  showTooltips = true;
  pointerUpHandler: any;
  pointerDownHandler: any;
  thread: any;
  currentElt: any;
  tooltip: any;
  tooltipTitle: any;
  graph2: any;
  roundDrop: any;
  triangleDown: any;
  currentSearch: any;
  entries: any;
  tooltipBorder: any;
  maxTooltipHeight: any;
  maxTooltipWidth: any;
  tooltipTitles: any;
  tooltipDelay: any;
  originalNoForeignObject: any; // Editor.prototype.originalNoForeignObject;
  /**
   * Specifies if tooltips should be visible. Default is true.
   */
  enableTooltips = true;

  constructor(editorUi) {
    this.editorUi = editorUi;
  }
  /**
   * Adds all palettes to the sidebar.
   */
  getTooltipOffset() {
    return new mxPoint(0, 0);
  }

  get shouldShowTooltips() {
    return this.enableTooltips && this.showTooltips;
  }

  isNewElement(element) {
    return this.currentElt != element;
  }

  get isTooltipVisible() {
    return this.tooltip && this.tooltip.style.display != "none";
  }

  /**
   * Adds all palettes to the sidebar.
   */
  // cells, w, h, title, showLabel?: boolean
  showTooltip(element, opts: any = {}) {
    const {
      isNewElement,
      show,
      shouldShowTooltips,
      isTooltipVisible,
      showLater,
      resetThread,
    } = this;
    if (!shouldShowTooltips || !isNewElement(element)) return;

    resetThread();
    isTooltipVisible ? show(element, opts) : showLater();
    this.currentElt = element;
  }

  resetThread() {
    const { thread } = this;
    if (!thread) return;
    window.clearTimeout(thread);
    this.thread = null;
  }

  showLater() {
    this.thread = window.setTimeout(this.show, this.tooltipDelay);
  }

  show(element, opts: any = {}) {
    new TooltipDisplayer(this.editorUi, this.tooltip, {
      element,
      classMap: this.classMap,
      ...opts,
    }).show();
  }

  resetTooltip() {
    if (!this.tooltip) return;
    this.tooltip.style.display = "none";
    this.currentElt = null;
  }

  /**
   * Hides the current tooltip.
   */
  hideTooltip() {
    this.resetThread();
    this.resetTooltip();
  }
}
