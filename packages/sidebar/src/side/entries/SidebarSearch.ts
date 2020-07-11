import mx from "@mxgraph-app/mx";
const { mxDictionary } = mx;

export class SidebarSearch {
  sidebar: any;
  taglist: any;
  success: any;
  error: any;

  count: number = 20;
  page: number = 0;
  results: any[] = [];
  index: number = 0;
  searchTerms: string = "";

  dict: any = new mxDictionary();
  tmpDict: any = new mxDictionary();

  constructor(sidebar, { success, error }: any = {}) {
    this.sidebar = sidebar;
    this.success = success;
    this.error = error;
  }

  get terms() {
    return this.searchTerms.toLowerCase().split(" ");
  }

  get max() {
    return (this.page + 1) * this.count;
  }

  get len() {
    return this.results.length;
  }

  /**
   * Adds shape search UI.
   */
  searchEntries(searchTerms, { count, page }: any = {}) {
    const { onSearchTerms, onNoSearchTerms } = this;
    onSearchTerms(searchTerms, { count, page }) || onNoSearchTerms();
  }

  hasSearchTerms(searchTerms) {
    return this.taglist && searchTerms;
  }

  set(searchTerms, { count, page }: any = {}) {
    this.searchTerms = searchTerms;
    this.count = count || 20;
    this.page = page || 0;
  }

  onSearchTerms(searchTerms, { count, page }: any = {}) {
    this.set(searchTerms, { count, page });
    const { hasSearchTerms, success } = this;
    if (!hasSearchTerms(searchTerms)) return;

    const { reset, terms, processSearchTerm } = this;
    reset();

    terms.map((term) => {
      processSearchTerm(term);
    });

    const { results, len } = this;
    success(results.slice(page * count, (page + 1) * count), len, false, terms);
    return true;
  }

  reset() {
    this.results = [];
    this.index = 0;
    this.tmpDict = new mxDictionary();
    this.dict = new mxDictionary();
  }

  processSearchTerm(term) {
    const { processEntry } = this;
    if (term.length === 0) return;
    const entry = this.taglist[term];
    const tmpDict = new mxDictionary();
    processEntry(entry);
    this.dict = tmpDict;
    this.index++;
    return true;
  }

  processEntry(entry) {
    const { processSearchResults } = this;
    if (!entry) {
      this.results = [];
      return;
    }
    return processSearchResults(entry);
  }

  processSearchResults(entry) {
    const searchResults = entry.entries;
    this.results = [];
    const {
      index,
      dict,
      tmpDict,
      results,
      page,
      count,
      max,
      terms,
      success,
    } = this;

    return searchResults.find((searchResult, i) => {
      // NOTE Array does not contain duplicates
      if ((index == 0) == (dict.get(searchResult) == null)) {
        tmpDict.put(searchResult, searchResult);
        results.push(searchResult);

        if (i == terms.length - 1 && results.length == max) {
          success(results.slice(page * count, max), max, true, terms);
          return true;
        }
      }
      return false;
    });
  }

  onNoSearchTerms() {
    const {
      success,
      // error
    } = this;
    success([], null, null, []);
  }
}
