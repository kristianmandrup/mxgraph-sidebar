import { PaletteDelegator } from "../PaletteDelegator";
import { AddPalette } from "./AddPalette";

export class PaletteManager extends PaletteDelegator {
  container: any;

  constructor(sidebar) {
    super(sidebar);
  }

  /**
   * Adds the given palette.
   */
  addPaletteFunctions(id, title, expanded, fns) {
    this.addPalette(id, title, expanded, (content) => {
      fns.map((fn) => {
        content.appendChild(fn(content));
      });
    });
  }

  /**
   * Adds the given palette.
   */
  addPalette(id, title, expanded, onInit) {
    return this.createAddPalette({
      id,
      title,
      expanded,
      onInit,
    }).add();
  }

  createAddPalette({ id, title, expanded, onInit }) {
    return new AddPalette(this, this.container, {
      id,
      title,
      expanded,
      onInit,
    });
  }
}
