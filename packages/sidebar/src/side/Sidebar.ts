import mx from "@mxgraph-app/mx";
import resources from "@mxgraph-app/resources";
import { Thumbnail } from "../thumbnail";
import { SidebarInitializer } from "./initializer/SidebarInitializer";
import { SearchPalette, PaletteManager, Palettes } from "../palette";
import { DropHandler, DropConnect, DragSource } from "../drag-drop";
import { ClickHandler, SingleClickInserter } from "../click";
import { FoldingHandler } from "../folding";
import { SidebarDestroyer } from "./destroyer/SidebarDestroyer";
import { SidebarItemCreator } from "./item-creator/SidebarItemCreator";
// import { HoverIcons } from "";
const { mxResources, mxClient, mxUtils } = mx;
const { STENCIL_PATH, IMAGE_PATH } = resources;
/**
 * Copyright (c) 2006-2012, JGraph Ltd
 */
/**
 * Construcs a new sidebar for the given editor.
 */
export class Sidebar {
  editorUi: any;
  container: any;

  palettes: any; // Palettes

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
  shapeUpdater: any;
  thumbnail: any;

  paletteManager: PaletteManager;
  sidebarDestroyer: SidebarDestroyer;

  /**
   * Sets the default font size.
   */
  collapsedImage = !mxClient.IS_SVG
    ? IMAGE_PATH + "/collapsed.gif"
    : "data:image/gif;base64,R0lGODlhDQANAIABAJmZmf///yH/C1hNUCBEYXRhWE1QPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS4wLWMwNjAgNjEuMTM0Nzc3LCAyMDEwLzAyLzEyLTE3OjMyOjAwICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1IE1hY2ludG9zaCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDozNUQyRTJFNjZGNUYxMUU1QjZEOThCNDYxMDQ2MzNCQiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDozNUQyRTJFNzZGNUYxMUU1QjZEOThCNDYxMDQ2MzNCQiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjFERjc3MEUxNkY1RjExRTVCNkQ5OEI0NjEwNDYzM0JCIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjFERjc3MEUyNkY1RjExRTVCNkQ5OEI0NjEwNDYzM0JCIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+Af/+/fz7+vn49/b19PPy8fDv7u3s6+rp6Ofm5eTj4uHg397d3Nva2djX1tXU09LR0M/OzczLysnIx8bFxMPCwcC/vr28u7q5uLe2tbSzsrGwr66trKuqqainpqWko6KhoJ+enZybmpmYl5aVlJOSkZCPjo2Mi4qJiIeGhYSDgoGAf359fHt6eXh3dnV0c3JxcG9ubWxramloZ2ZlZGNiYWBfXl1cW1pZWFdWVVRTUlFQT05NTEtKSUhHRkVEQ0JBQD8+PTw7Ojk4NzY1NDMyMTAvLi0sKyopKCcmJSQjIiEgHx4dHBsaGRgXFhUUExIREA8ODQwLCgkIBwYFBAMCAQAAIfkEAQAAAQAsAAAAAA0ADQAAAhSMj6lrwAjcC1GyahV+dcZJgeIIFgA7";

  /**
   * Sets the default font size.
   */
  expandedImage = !mxClient.IS_SVG
    ? IMAGE_PATH + "/expanded.gif"
    : "data:image/gif;base64,R0lGODlhDQANAIABAJmZmf///yH/C1hNUCBEYXRhWE1QPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS4wLWMwNjAgNjEuMTM0Nzc3LCAyMDEwLzAyLzEyLTE3OjMyOjAwICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1IE1hY2ludG9zaCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoxREY3NzBERjZGNUYxMUU1QjZEOThCNDYxMDQ2MzNCQiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDoxREY3NzBFMDZGNUYxMUU1QjZEOThCNDYxMDQ2MzNCQiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjFERjc3MERENkY1RjExRTVCNkQ5OEI0NjEwNDYzM0JCIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjFERjc3MERFNkY1RjExRTVCNkQ5OEI0NjEwNDYzM0JCIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+Af/+/fz7+vn49/b19PPy8fDv7u3s6+rp6Ofm5eTj4uHg397d3Nva2djX1tXU09LR0M/OzczLysnIx8bFxMPCwcC/vr28u7q5uLe2tbSzsrGwr66trKuqqainpqWko6KhoJ+enZybmpmYl5aVlJOSkZCPjo2Mi4qJiIeGhYSDgoGAf359fHt6eXh3dnV0c3JxcG9ubWxramloZ2ZlZGNiYWBfXl1cW1pZWFdWVVRTUlFQT05NTEtKSUhHRkVEQ0JBQD8+PTw7Ojk4NzY1NDMyMTAvLi0sKyopKCcmJSQjIiEgHx4dHBsaGRgXFhUUExIREA8ODQwLCgkIBwYFBAMCAQAAIfkEAQAAAQAsAAAAAA0ADQAAAhGMj6nL3QAjVHIu6azbvPtWAAA7";

  /**
   *
   */
  searchImage = !mxClient.IS_SVG
    ? IMAGE_PATH + "/search.png"
    : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAEaSURBVHjabNGxS5VxFIfxz71XaWuQUJCG/gCHhgTD9VpEETg4aMOlQRp0EoezObgcd220KQiXmpretTAHQRBdojlQEJyukPdt+b1ywfvAGc7wnHP4nlZd1yKijQW8xzNc4Su+ZOYfQ3T6/f4YNvEJYzjELXp4VVXVz263+7cR2niBxAFeZ2YPi3iHR/gYERPDwhpOsd6sz8x/mfkNG3iOlWFhFj8y89J9KvzGXER0GuEaD42mgwHqUtoljbcRsTBCeINpfM/MgZLKPpaxFxGbOCqDXmILN7hoJrTKH+axhxmcYRxP0MIDnOBDZv5q1XUNIuJxifJp+UNV7t7BFM6xeic0RMQ4Bpl5W/ol7GISx/eEUUTECrbx+f8A8xhiZht9zsgAAAAASUVORK5CYII=";

  /**
   *
   */
  dragPreviewBorder = "1px dashed black";

  /**
   * Specifies if tooltips should be visible. Default is true.
   */
  enableTooltips = true;

  /**
   * Specifies the delay for the tooltip. Default is 16 px.
   */
  tooltipBorder = 16;

  /**
   * Specifies the delay for the tooltip. Default is 300 ms.
   */
  tooltipDelay = 300;

  /**
   * Specifies the delay for the drop target icons. Default is 200 ms.
   */
  dropTargetDelay = 200;

  /**
   * Specifies the URL of the gear image.
   */
  gearImage = STENCIL_PATH + "/clipart/Gear_128x128.png";

  /**
   * Specifies the width of the thumbnails.
   */
  thumbWidth = 42;

  /**
   * Specifies the height of the thumbnails.
   */
  thumbHeight = 42;

  /**
   * Specifies the width of the thumbnails.
   */
  minThumbStrokeWidth = 1;

  /**
   * Specifies the width of the thumbnails.
   */
  thumbAntiAlias = false;

  documentMode: any;

  /**
   * Specifies the padding for the thumbnails. Default is 3.
   */
  thumbPadding = this.documentMode >= 5 ? 2 : 3;

  /**
   * Specifies the delay for the tooltip. Default is 2 px.
   */
  thumbBorder = 2;

  /**
   * Specifies the size of the sidebar titles.
   */
  sidebarTitleSize = 9;

  /**
   * Specifies if titles in the sidebar should be enabled.
   */
  sidebarTitles = false;

  /**
   * Specifies if titles in the tooltips should be enabled.
   */
  tooltipTitles = true;

  /**
   * Specifies if titles in the tooltips should be enabled.
   */
  maxTooltipWidth = 400;

  /**
   * Specifies if titles in the tooltips should be enabled.
   */
  maxTooltipHeight = 400;

  /**
   * Specifies if stencil files should be loaded and added to the search index
   * when stencil palettes are added. If this is false then the stencil files
   * are lazy-loaded when the palette is shown.
   */
  addStencilsToIndex = true;

  /**
   * Specifies the width for clipart images. Default is 80.
   */
  defaultImageWidth = 80;

  /**
   * Specifies the height for clipart images. Default is 80.
   */
  defaultImageHeight = 80;

  pointerMoveHandler: any;
  pointerOutHandler: any;

  dropCheck: any;

  itemCreator: SidebarItemCreator;

  constructor(editorUi, container) {
    this.thumbnail = new Thumbnail(this.editorUi);
    this.editorUi = editorUi;
    this.container = container;
    this.paletteManager = new PaletteManager(this);
    this.palettes = new Palettes(this);
    this.sidebarDestroyer = new SidebarDestroyer(this);
    this.itemCreator = new SidebarItemCreator(this);
    this.init();
  }

  get graph() {
    return this.editorUi.graph;
  }

  /**
   * Adds all palettes to the sidebar.
   */
  init() {
    new SidebarInitializer(this).initialize();
    return this;
  }

  configure() {}

  /**
   * Adds all palettes to the sidebar.
   */
  getTooltipOffset() {
    return this.tooltip.getTooltipOffset();
  }

  /**
   * Adds all palettes to the sidebar.
   */
  showTooltip(elt, cells, w, h, title, showLabel?: boolean) {
    this.tooltip.showTooltip(elt, cells, w, h, title, showLabel);
  }

  /**
   * Hides the current tooltip.
   */
  hideTooltip() {
    this.tooltip.hideTooltip();
  }

  /**
   * Adds shape search UI.
   */
  filterTags(tags) {
    if (tags != null) {
      var arr = tags.split(" ");
      var result: any[] = [];
      var hash = {};

      // Ignores tags with leading numbers, strips trailing numbers
      for (var i = 0; i < arr.length; i++) {
        // Removes duplicates
        if (hash[arr[i]] == null) {
          hash[arr[i]] = "1";
          result.push(arr[i]);
        }
      }

      return result.join(" ");
    }

    return null;
  }

  /**
   * Adds the general palette to the sidebar.
   */
  cloneCell(cell, value) {
    var clone = cell.clone();

    if (value != null) {
      clone.value = value;
    }

    return clone;
  }

  /**
   * Adds shape search UI.
   */
  addSearchPalette(expand) {
    return new SearchPalette(this).create(expand);
  }

  /**
   * Adds the general palette to the sidebar.
   */
  insertSearchHint(
    div,
    searchTerm,
    _count?,
    page?,
    results?,
    _len?,
    _more?,
    _terms?
  ) {
    if (results.length == 0 && page == 1) {
      var err = document.createElement("div");
      err.className = "geTitle";
      err.style.cssText =
        "background-color:transparent;border-color:transparent;" +
        "color:gray;padding:6px 0px 0px 0px !important;margin:4px 8px 4px 8px;" +
        "text-align:center;cursor:default !important";

      mxUtils.write(err, mxResources.get("noResultsFor", [searchTerm]));
      div.appendChild(err);
    }
  }

  /**
   * Creates and returns the given title element.
   */
  createTitle(label) {
    var elt = document.createElement("a");
    elt.setAttribute("title", mxResources.get("sidebarTooltip"));
    elt.className = "geTitle";
    mxUtils.write(elt, label);

    return elt;
  }

  /**
   * Creates a thumbnail for the given cells.
   */
  createThumb(
    cells,
    width,
    height,
    parent,
    title,
    showLabel?,
    showTitle?,
    realWidth?,
    realHeight?
  ) {
    this.thumbnail.createThumb(
      cells,
      width,
      height,
      parent,
      title,
      showLabel,
      showTitle,
      realWidth,
      realHeight
    );
  }

  /**
   * TODO: extract to SidebarItemCreator
   * Creates and returns a new palette item for the given image.
   */
  createItem(
    cells,
    title,
    showLabel,
    showTitle,
    width,
    height,
    allowCellsInserted
  ) {
    return this.itemCreator.createItem(
      cells,
      title,
      showLabel,
      showTitle,
      width,
      height,
      allowCellsInserted
    );
  }

  /**
   * Creates a drop handler for inserting the given cells.
   */
  updateShapes(source, targets) {
    return this.shapeUpdater.updateShapes(source, targets);
  }

  /**
   * Creates a drop handler for inserting the given cells.
   */
  createDropHandler(cells, allowSplit, allowCellsInserted, bounds) {
    return new DropHandler(this.editorUi, {
      cells,
      allowSplit,
      allowCellsInserted,
      bounds,
    }).create();
  }

  /**
   * Creates and returns a preview element for the given width and height.
   */
  createDragPreview(width = 100, height = 100) {
    var elt = document.createElement("div");
    elt.style.border = this.dragPreviewBorder;
    elt.style.width = width + "px";
    elt.style.height = height + "px";

    return elt;
  }

  /**
   * Creates a drag source for the given element.
   */
  dropAndConnect(source, targets, direction, dropCellIndex, evt) {
    return new DropConnect(this.editorUi, {
      source,
      targets,
      direction,
      dropCellIndex,
      evt,
    }).dropAndConnect();
  }

  /**
   * Limits drop style to non-transparent source shapes.
   */
  isDropStyleEnabled(cells, firstVertex) {
    return this.dropCheck.isDropStyleEnabled(cells, firstVertex);
  }

  /**
   * Ignores swimlanes as drop style targets.
   */
  isDropStyleTargetIgnored(state) {
    return this.dropCheck.isDropStyleTargetIgnored(state);
  }

  /**
   * Creates a drag source for the given element.
   */
  createDragSource(elt, dropHandler, preview, cells, bounds) {
    return new DragSource(this.editorUi).create(
      elt,
      dropHandler,
      preview,
      cells,
      bounds
    );
  }

  /**
   * Adds a handler for inserting the cell with a single click.
   */
  itemClicked(cells, ds, evt, elt) {
    return new SingleClickInserter(this.editorUi).itemClicked(
      cells,
      ds,
      evt,
      elt
    );
  }

  /**
   * Adds a handler for inserting the cell with a single click.
   */
  addClickHandler(elt, ds, cells) {
    return new ClickHandler(this.editorUi, elt).add(elt, ds, cells);
  }

  addEntry(tags, fn?) {
    return this.entries.addEntry(tags, fn);
  }

  /**
   * Create the given title element.
   */
  addFoldingHandler(title, content, funct) {
    return new FoldingHandler({ title, content, funct }).configure();
  }

  /**
   * Creates the array of tags for the given stencil. Duplicates are allowed and will be filtered out later.
   */
  getTagsForStencil(packageName, stencilName, moreTags) {
    var tags = packageName.split(".");

    for (var i = 1; i < tags.length; i++) {
      tags[i] = tags[i].replace(/_/g, " ");
    }

    tags.push(stencilName.replace(/_/g, " "));

    if (moreTags != null) {
      tags.push(moreTags);
    }

    return tags.slice(1, tags.length);
  }

  /**
   * Destroys it
   * TODO: SidebarDestroyer
   */
  destroy() {
    this.sidebarDestroyer.destroy();
  }
}
