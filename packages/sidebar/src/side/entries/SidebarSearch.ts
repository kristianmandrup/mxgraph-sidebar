import mx from "@mxgraph-app/mx";
const { mxDictionary } = mx;

export class SidebarSearch {
  sidebar: any;
  taglist: any;
  success: any;
  error: any;

  constructor(sidebar, { success, error }: any = {}) {
    this.sidebar = sidebar;
    this.success = success;
    this.error = error;
  }

  /**
   * Adds shape search UI.
   */
  searchEntries(searchTerms, count, page) {
    const {
      success,
      // error
    } = this;

    if (this.taglist != null && searchTerms != null) {
      var tmp = searchTerms.toLowerCase().split(" ");
      var dict = new mxDictionary();
      var max = (page + 1) * count;
      var results: any[] = [];
      var index = 0;

      for (var i = 0; i < tmp.length; i++) {
        if (tmp[i].length > 0) {
          var entry = this.taglist[tmp[i]];
          var tmpDict = new mxDictionary();

          if (entry != null) {
            var arr = entry.entries;
            results = [];

            for (var j = 0; j < arr.length; j++) {
              var entry = arr[j];

              // NOTE Array does not contain duplicates
              if ((index == 0) == (dict.get(entry) == null)) {
                tmpDict.put(entry, entry);
                results.push(entry);

                if (i == tmp.length - 1 && results.length == max) {
                  success(results.slice(page * count, max), max, true, tmp);

                  return;
                }
              }
            }
          } else {
            results = [];
          }

          dict = tmpDict;
          index++;
        }
      }

      var len = results.length;
      success(results.slice(page * count, (page + 1) * count), len, false, tmp);
    } else {
      success([], null, null, tmp);
    }
  }
}
