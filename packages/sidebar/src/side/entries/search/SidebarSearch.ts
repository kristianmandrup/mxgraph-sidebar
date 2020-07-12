import { SearchTermProcessor } from "./SearchTermProcessor";

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

  searchTermProcessor: SearchTermProcessor;

  constructor(sidebar, { success, error }: any = {}) {
    this.sidebar = sidebar;
    this.success = success;
    this.error = error;
    this.searchTermProcessor = this.createSearchTermProcessor();
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

  createSearchTermProcessor() {
    const opts = { success: this.success };
    return new SearchTermProcessor(this.terms, opts);
  }

  processSearchTerm(term) {
    return this.searchTermProcessor.process(term);
  }

  reset() {
    this.searchTermProcessor.reset();
  }

  onNoSearchTerms() {
    const {
      success,
      // error
    } = this;
    success([], null, null, []);
  }
}
