import { AbstractShaper, CellCreator } from "../../shapes";
// import { Graph } from "@mxgraph-app/graph";
import mx from "@mxgraph-app/mx";
import { SidebarSearch } from "./search";
const { mxDictionary } = mx;

export class SidebarEntries extends AbstractShaper {
  taglist: any[];
  editorUi: any;

  constructor(editorUi, cellCreator?: CellCreator) {
    super(cellCreator);
    this.taglist = [];
    this.editorUi = editorUi;
  }

  /**
   * Hides the current tooltip.
   */
  addDataEntry(tags, width, height, title, data) {
    return this.addEntry(tags, () => {
      return this.createVertexTemplateFromData(data, width, height, title);
    });
  }

  decompress(data, _arg1, _arg2) {
    // return Graph.decompress(xml, arg1, arg2)
    return data;
  }

  /**
   * Adds the give entries to the search index.
   */
  addEntries(images) {
    for (var i = 0; i < images.length; i++) {
      const add = (img) => {
        var data = img.data;
        var tags = img.title != null ? img.title : "";

        if (img.tags != null) {
          tags += " " + img.tags;
        }

        if (data != null && tags.length > 0) {
          this.addEntry(tags, () => {
            data = this.editorUi.convertDataUri(data);
            var s =
              "shape=image;verticalLabelPosition=bottom;verticalAlign=top;imageAspect=0;";

            if (img.aspect == "fixed") {
              s += "aspect=fixed;";
            }

            return this.createVertexTemplate(
              s + "image=" + data,
              img.w,
              img.h,
              "",
              img.title || "",
              false,
              false,
              true
            );
          });
        } else if (img.xml != null && tags.length > 0) {
          this.addEntry(tags, () => {
            var cells = this.editorUi.stringToCells(
              this.decompress(img.xml, undefined, undefined)
            );

            return this.createVertexTemplateFromCells(
              cells,
              img.w,
              img.h,
              img.title || "",
              true,
              false,
              true
            );
          });
        }
      };
      add(images[i]);
    }
  }

  /**
   * Hides the current tooltip.
   */
  addEntry(tags, fn?) {
    if (this.taglist != null && tags != null && tags.length > 0) {
      // Replaces special characters
      var tmp = tags
        .toLowerCase()
        .replace(/[\/\,\(\)]/g, " ")
        .split(" ");

      var doAddEntry = (tag) => {
        if (tag != null && tag.length > 1) {
          var entry = this.taglist[tag];

          if (typeof entry !== "object") {
            entry = { entries: [], dict: new mxDictionary() };
            this.taglist[tag] = entry;
          }

          // Ignores duplicates
          if (entry.dict.get(fn) == null) {
            entry.dict.put(fn, fn);
            entry.entries.push(fn);
          }
        }
      };

      for (var i = 0; i < tmp.length; i++) {
        doAddEntry(tmp[i]);

        // Adds additional entry with removed trailing numbers
        var normalized = tmp[i].replace(/\.*\d*$/, "");

        if (normalized != tmp[i]) {
          doAddEntry(normalized);
        }
      }
    }

    return fn;
  }

  /**
   * Adds shape search UI.
   */
  searchEntries(searchTerms, count, page, success, error) {
    new SidebarSearch(this, {
      success,
      error,
    }).searchEntries(searchTerms, { count, page });
  }
}
