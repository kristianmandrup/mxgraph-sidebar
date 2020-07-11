import mx from "@mxgraph-app/mx";
const { mxDictionary } = mx;

export class SidebarSearch {
  sidebar: any;
  taglist: any;
  success: any;
  error: any;

  searchTerms: any;
  count: number = 20;
  page: number = 0;
  results: any[] = [];
  index: number = 0;

  dict: any = new mxDictionary();
  tmpDict: any = new mxDictionary();

  constructor(sidebar, { success, error }: any = {}) {
    this.sidebar = sidebar;
    this.success = success;
    this.error = error;
  }

  /**
   * Adds shape search UI.
   */
  searchEntries(searchTerms, { count, page }) {
    const { onSearchTerms, onNoSearchTerms } = this;
    onSearchTerms(searchTerms, { count, page }) || onNoSearchTerms();
  }

  hasSearchTerms(searchTerms) {
    return this.taglist && searchTerms;
  }

  set(searchTerms, { count, page }) {
    this.searchTerms = searchTerms;
    this.count = count || 20;
    this.page = page || 0;
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

  onSearchTerms(searchTerms, { count, page }) {
    this.set(searchTerms, { count, page });
    const { hasSearchTerms, success } = this;
    if (!hasSearchTerms(searchTerms)) return;

    const { resetResults, terms, processSearchTerm } = this;
    resetResults();

    terms.map((term) => {
      processSearchTerm(term);
    });

    const { results, len } = this;
    success(results.slice(page * count, (page + 1) * count), len, false, terms);
    return true;
  }

  resetResults() {
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
  }

  processEntry(entry) {
    const { processSearchResults } = this;
    if (!entry) {
      this.results = [];
      return;
    }
    processSearchResults(entry);
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

    searchResults.find((searchResult, i) => {
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
