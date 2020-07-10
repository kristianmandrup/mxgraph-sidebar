import mx from "@mxgraph-app/mx";
import { AbstractPalette } from "../AbstractPalette";
import { Sidebar } from "../../";
const { mxResources } = mx;

export class BasicPalette extends AbstractPalette {
  addStencilPalette: any;

  constructor(sidebar: Sidebar) {
    super(sidebar);
    this.addStencilPalette = sidebar.palettes.addStencilPalette;
  }

  /**
   * Adds the general palette to the sidebar.
   */
  addBasicPalette(dir) {
    const { id, style, partialRectangles, title, filePath } = this;
    this.addStencilPalette(
      id,
      title,
      filePath(dir),
      style,
      null,
      null,
      null,
      null,
      partialRectangles
    );
  }

  get id() {
    return "basic";
  }

  get title() {
    return mxResources.get("basic");
  }

  filePath(dir) {
    return dir + "/basic.xml";
  }

  get style() {
    return ";whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#000000;strokeWidth=2";
  }

  get partialRectangles() {
    return [
      this.partialRectangle1,
      this.partialRectangle2,
      this.partialRectangle3,
      this.partialRectangle4,
    ];
  }

  // TODO: extract each to separate class
  get partialRectangle1() {
    return this.createVertexTemplateEntry(
      "shape=partialRectangle;whiteSpace=wrap;html=1;top=0;bottom=0;fillColor=none;",
      120,
      60,
      "",
      "Partial Rectangle"
    );
  }

  get partialRectangle2() {
    return this.createVertexTemplateEntry(
      "shape=partialRectangle;whiteSpace=wrap;html=1;right=0;top=0;bottom=0;fillColor=none;routingCenterX=-0.5;",
      120,
      60,
      "",
      "Partial Rectangle"
    );
  }

  get partialRectangle3() {
    return this.createVertexTemplateEntry(
      "shape=partialRectangle;whiteSpace=wrap;html=1;bottom=0;right=0;fillColor=none;",
      120,
      60,
      "",
      "Partial Rectangle"
    );
  }

  get partialRectangle4() {
    return this.createVertexTemplateEntry(
      "shape=partialRectangle;whiteSpace=wrap;html=1;top=0;left=0;fillColor=none;",
      120,
      60,
      "",
      "Partial Rectangle"
    );
  }
}
