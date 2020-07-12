import mx from "@mxgraph-app/mx";
import { SearchTermProcessor } from "./SearchTermProcessor";
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

  processSearchTerm(term) {
    return new SearchTermProcessor().process(term);
  }

  reset() {
    this.results = [];
    this.index = 0;
    this.tmpDict = new mxDictionary();
    this.dict = new mxDictionary();
  }

  onNoSearchTerms() {
    const {
      success,
      // error
    } = this;
    success([], null, null, []);
  }
}
