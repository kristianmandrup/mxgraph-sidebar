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

  /**
   * Adds all palettes to the sidebar.
   */
  // cells, w, h, title, showLabel?: boolean
  showTooltip(element, opts: any = {}) {
    const { show } = this;
    if (this.enableTooltips && this.showTooltips) {
      if (this.currentElt != element) {
        if (this.thread != null) {
          window.clearTimeout(this.thread);
          this.thread = null;
        }

        if (this.tooltip != null && this.tooltip.style.display != "none") {
          show(element, opts);
        } else {
          this.thread = window.setTimeout(show, this.tooltipDelay);
        }

        this.currentElt = element;
      }
    }
  }

  show(element, opts: any = {}) {
    new TooltipDisplayer(this.editorUi, this.tooltip, {
      element,
      classMap: this.classMap,
      ...opts,
    }).show();
  }

  /**
   * Hides the current tooltip.
   */
  hideTooltip() {
    if (this.thread != null) {
      window.clearTimeout(this.thread);
      this.thread = null;
    }

    if (this.tooltip != null) {
      this.tooltip.style.display = "none";
      this.currentElt = null;
    }
  }
}
